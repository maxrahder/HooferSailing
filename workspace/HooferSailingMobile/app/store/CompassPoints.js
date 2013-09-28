Ext.define('HooferSailingMobile.store.CompassPoints', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.util.Compass'],
	config: {
	      fields: ['direction', 'frequency', 'averageKnots'],
	      data: [

	        {
	          'direction': 'E',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'ESE',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'SE',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'SSE',
	          'frequency': 0,
	          'averageKnots': 0
	        },

	        {
	          'direction': 'S',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'SSW',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'SW',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'WSW',
	          'frequency': 0,
	          'averageKnots': 0
	        },

	        {
	          'direction': 'W',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'WNW',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'NW',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'NNW',
	          'frequency': 0,
	          'averageKnots': 0
	        },

	        {
	          'direction': 'N',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'NNE',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'NE',
	          'frequency': 0,
	          'averageKnots': 0
	        }, {
	          'direction': 'ENE',
	          'frequency': 0,
	          'averageKnots': 0
	        }
      	]
	},
	updateDataUsingWinds: function(windsStore){
		var me = this;
		var groups = windsStore.getGroups();
		Ext.Array.forEach(groups, function(group){
			var direction = group.name;
			var frequency = group.children.length;

			var recordData = Ext.Array.pluck(group.children, 'data');
			var allKnots = Ext.Array.pluck(recordData, 'windSpeedKnots');
			var averageKnots = Math.round(Ext.Array.mean(allKnots));
			console.log('Rounded: ' + averageKnots);

			var index = me.findExact('direction', direction);
			var r = me.getAt(index);
			r.set({frequency: frequency, averageKnots: averageKnots});
			console.log(r.data);
		});
	}

});