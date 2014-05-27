// This class is unused. Eventually, it may be a good utility for fetching 
// the raw buoy data.

Ext.define('HooferSailingMobile.store.Winds', {
	extend: 'Ext.util.Observable',
	requires: ['Ext.data.JsonP', 'HooferSailingMobile.util.Compass'],
	// Gets the past five minutes of buoy data to calculate current
	// speed and direction. We're averaging the speeds.

	// Note: The interval setting seems to be ignored by the 
	// buoy server. It's always returning five second data, which
	// is maybe a little more than we'd like. I think five minutes at
	// ten second intervals is probably fine.
	
	config: {
		url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
		symbols: 'dir:spd:wt_1.0',
		interval: '00:00:10',
		begin: '-00:05:00',
		averageKnots: 0,
		gusts: 0,
		weightedAverage: true,
		windDirectionRose: 0,
		waterTemperature: 0,
		groupField: 'windDirectionRose',
		fields: ['windDirectionDegrees', 'metersPerSecond', 'time', 'windDirectionRose', 'windSpeedKnots'],
	},
	buoyTransmitting: false,

	fetch: function() {
		var me = this;

		Ext.data.JsonP.request({
			url: this.getUrl(),
			timeout: 5000, // UW buoy data should come quickly, or not at all
			params: {
				symbols: this.getSymbols(),
				begin: this.getBegin(),
				interval: this.getInterval()
			},
			failure: function() {
				me.buoyTransmitting = false;
				me.fireEvent('fetch', me, false);
			},
			success: function(response) {

				// Buoy data is two separate arrays of equal length: one of 
				// time stamps for each measurement, and another array of 
				// the requested values for each time stamp.

				// Determine whether we got any data, then fire an event
				// to pass it on to whoever needs it.


				var d = [];
				var topSpeeds = [0, 0, 0];
				var knotsSum = 0;
				var length = response.stamps.length;

				var buoyData = response.data;
				var stamps = response.stamps;
				me.buoyTransmitting = true;

				for (var i = 0; i < length; i++) {

					// Assert: 
					// buoyData[i][0] = wind direction (degrees)
					// buoyData[i][1] = wind speed (meters per second)
					// buoyData[i][2] = water temperature at 1 meter (celsius)

					if (me.getWeightedAverage() && ((i == 0) || ((i + 1) == length))) {
						continue;
					}

					var windDirectionDegrees = buoyData[i][0];

					if (isNaN(windDirectionDegrees)) {
						me.buoyTransmitting = false;
						break;
					}

					var windSpeedMetersPerSecond;
					if (me.getWeightedAverage()) {
						windSpeedMetersPerSecond = (buoyData[i - 1][1] + buoyData[i][1] + buoyData[i + 1][1]) / 3;
					} else {
						windSpeedMetersPerSecond = buoyData[i][1];
					}

					var time = moment(stamps[i] + 'Z').toDate();

					var windDirectionRose = HooferSailingMobile.util.Compass.degreesToRose(windDirectionDegrees);

					var windSpeedKnots = (windSpeedMetersPerSecond * 1.94384);

					d.push([
						windDirectionDegrees,
						windSpeedMetersPerSecond,
						time,
						windDirectionRose,
						windSpeedKnots
					]);


					knotsSum += windSpeedKnots;

					var unWeightedKnot = buoyData[i][1] * 1.94384;
					for (var index = 0; index < topSpeeds.length; index++) {
						if (unWeightedKnot > topSpeeds[index]) {
							topSpeeds[index] = windSpeedKnots;
							break;
						}
					}
				}
				me.setData(d);

				if (!me.buoyTransmitting) {
					me.fireEvent('fetch', me);
					return;
				}

				if (i > 0) {
					me.setWaterTemperature(buoyData[i - 1][2]);
				}

				// Figure out the most common wind direction
				var groups = me.getGroups();
				var biggestGroup = groups[0];

				Ext.Array.forEach(groups, function(g) {
					if (g.children.length > biggestGroup.children.length) {
						biggestGroup = g;
					}
				});
				me.setWindDirectionRose(biggestGroup.name);

				me.setAverageKnots(Math.round(knotsSum / d.length));
				me.setGusts(Math.round(Ext.Array.mean(topSpeeds)));
				me.fireEvent('fetch', me);

			}
		});
	}

});