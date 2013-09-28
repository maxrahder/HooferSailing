Ext.define('HooferSailingMobile.store.CompassPoints', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.util.Compass'],
	config: {
	      fields: ['direction', 'frequency'],
	      data: [

	        {
	          'direction': 'E',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'ESE',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'SE',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'SSE',
	          'frequency': 0,
	          'knots': 0
	        },

	        {
	          'direction': 'S',
	          'frequency': 50,
	          'knots': 10
	        }, {
	          'direction': 'SSW',
	          'frequency': 40,
	          'knots': 15
	        }, {
	          'direction': 'SW',
	          'frequency': 30,
	          'knots': 20
	        }, {
	          'direction': 'WSW',
	          'frequency': 0,
	          'knots': 0
	        },

	        {
	          'direction': 'W',
	          'frequency': ,
	          'knots': 0
	        }, {
	          'direction': 'WNW',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'NW',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'NNW',
	          'frequency': 0,
	          'knots': 0
	        },

	        {
	          'direction': 'N',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'NNE',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'NE',
	          'frequency': 0,
	          'knots': 0
	        }, {
	          'direction': 'ENE',
	          'frequency': 0,
	          'knots': 0
	        }

      	]



	}

});