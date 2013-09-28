Ext.define('HooferSailingMobile.store.CompassPoints', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.util.Compass'],
	config: {
		//autoLoad: true,
		store: {
	      fields: ['direction', 'frequency'],
	      data: [

	        {
	          'direction': 'E',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'ESE',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'SE',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'SSE',
	          'frequency': 3,
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
	          'frequency': 3,
	          'knots': 0
	        },

	        {
	          'direction': 'W',
	          'frequency': 3
	        }, {
	          'direction': 'WNW',
	          'frequency': 3
	        }, {
	          'direction': 'NW',
	          'frequency': 3
	        }, {
	          'direction': 'NNW',
	          'frequency': 3
	        },

	        {
	          'direction': 'N',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'NNE',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'NE',
	          'frequency': 3,
	          'knots': 0
	        }, {
	          'direction': 'ENE',
	          'frequency': 3,
	          'knots': 0
	        }

      ]

    }, // End of store

	},

});