Ext.define('Winds.store.WindData', {
	extend: 'Ext.data.ArrayStore',
	requires: ['Ext.data.JsonP', 'Winds.util.Compass'],
	// Gets the past five minutes of buoy data to calculate current
	// speed and direction. We're averaging the speeds.
	// TODO: Average the direction, which obviously, will be a 
	// little tricky.
	// Note: The interval setting seems to be ignored by the 
	// buoy server. It's always returning five second data, which
	// is maybe a little more than we'd like. I think five minutes at
	// ten second intervals is probably fine.
	config: {
		url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
		symbols: 'dir:spd',
		interval: '00:00:00',
		begin: '-00:05:00',
		averageKnots: 0,
		gusts: 0,
		weightedAverage: true,
		windDirectionRose: ''
	},
	//groupField: 'windDirectionRose',
	fields: ['windDirectionDegrees', 'metersPerSecond', 'time', 'windDirectionRose', 'windSpeedKnots'],

	fetch: function() {
		var me = this;
		Ext.data.JsonP.request({
			url: this.getUrl(),
			params: {
				symbols: this.getSymbols(),
				begin: this.getBegin(),
				interval: this.getInterval()
			},
			success: function(response) {

				// Buoy data is two separate arrays of equal length: one of 
				// time stamps for each measurement, and another array of 
				// the requested values for each time stamp.

				// This is an array store, which means the feed needs to be
				// an array of arrays, with each element in the order defined
				// in the fields array (above). The buoy feed doesn't match 
				// that, so here we're manually constructing each item and
				// adding it to the array "d" -- then out of the loop we're
				// running store.loadData(d) to populate the data store.

				// There's also a topSpeeds array of the three top wind speeds.
				// The average of those is the value for "gusting". 

				// Finally, we're taking the moving average of the wind speeds.
				// I.e., each wind speed data point is actually the average of
				// the three adjacent values. 

				var d = [];
				var topSpeeds = [0, 0, 0];
				var knotsSum = 0;
				var length = response.stamps.length;

				var buoyData = response.data;
				var stamps = response.stamps;
				for (var i = 0; i < length; i++) {


					// Assert: 
					// buoyData[i][0] = wind direction (degrees)
					// buoyData[i][1] = wind speed (meters per second)

					if (me.getWeightedAverage() && ((i == 0) || ((i + 1) == length))) {
						continue;
					}

					var windDirectionDegrees = buoyData[i][0];

					var windSpeedMetersPerSecond;
					if (me.getWeightedAverage()) {
						windSpeedMetersPerSecond = (buoyData[i - 1][1] + buoyData[i][1] + buoyData[i + 1][1]) / 3;
					} else {
						windSpeedMetersPerSecond = buoyData[i][1];
					}

					var time = moment(stamps[i] + 'Z').toDate();

					var windDirectionRose = Winds.util.Compass.degreesToRose(windDirectionDegrees);

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
				me.loadData(d);

				// Figure out the most common wind direction
				var groups = me.getGroups();
				var biggestGroup = groups[0];
				Ext.Array.forEach(groups, function(g){
					if (g.children.length > biggestGroup.children.length){
						biggestGroup = g;
					}
				});
				me.setWindDirectionRose(biggestGroup.name);

				var knots = Ext.Array.pluck(d, 'knots');
				me.setAverageKnots(knotsSum / d.length);
				me.setGusts(Ext.Array.mean(topSpeeds));
				me.fireEvent('fetched', me);
			}
		});
	}

});