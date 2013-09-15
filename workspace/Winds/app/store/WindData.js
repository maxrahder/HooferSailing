Ext.define('Winds.store.WindData', {
	extend: 'Ext.data.ArrayStore',
	requires: ['Ext.data.JsonP', 'Winds.util.Compass'],
	config: {
		url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
		symbols: 'dir:spd',
		interval: '00:00:00',
		begin: '-01:00:00'
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
				for (var i = 0; i < response.stamps.length; i++) {

					var data = response.data[i];

					var stamp = response.stamps[i];
					stamp += 'Z';
					time = moment(stamp)
					
					data.push(time);
					data.push(Winds.util.Compass.degreesToDirection(data[0]));
					data.push(data[1]*1.94384);
					d.push(data);
				}
				me.loadData(d);
				console.log(d);
			}
		});
	}

});