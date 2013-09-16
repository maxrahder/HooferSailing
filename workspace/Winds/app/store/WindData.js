Ext.define('Winds.store.WindData', {
	extend: 'Ext.data.ArrayStore',
	requires: ['Ext.data.JsonP', 'Winds.util.Compass'],
	config: {
		url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
		symbols: 'dir:spd',
		interval: '00:00:00',
		begin: '-00:05:00',
		averageKnots: 0,
		gusts: 0,
		weightedAverage: true
	},
	fields: ['degrees', 'metersPerSecond', 'time', 'direction', 'knots'],

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
				var d = [];
				var topSpeeds = [0, 0, 0];
				var knotsSum = 0;
				var length = response.stamps.length;
				var data = response.data;
				var stamps = response.stamps;
				for (var i = 0; i < length; i++) {
					// [0] = degrees
					// [1] = MPS

					if (me.getWeightedAverage() && ( (i == 0) || ((i + 1) == length) )){
						continue;
					}

					var datum = data[i];
					var stamp = stamps[i];

					stamp += 'Z';
					time = moment(stamp)

					datum.push(time.toDate());

					datum.push(Winds.util.Compass.degreesToDirection(data[0]));

					var mps = me.getWeightedAverage()?((data[i-1][1] + data[i][1] + data[i+1][1]) / 3):data[i][1];
					var knot = (mps * 1.94384); // MPS -> knots
					datum.push(knot);
					d.push(datum);

					knotsSum += knot;

					var unWeightedKnot = data[i][1] * 1.94384;
					for (var index = 0 ; index < topSpeeds.length ; index++){
						if (unWeightedKnot > topSpeeds[index]){
							topSpeeds[index] = knot;
							break;
						}
					}
				}
				me.loadData(d);
				var knots = Ext.Array.pluck(d, 'knots');
				me.setAverageKnots(knotsSum / d.length);
				me.setGusts(Ext.Array.mean(topSpeeds));
				me.fireEvent('fetched', me);
			}
		});
	}

});