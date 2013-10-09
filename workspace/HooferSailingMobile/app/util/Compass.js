 Ext.define('HooferSailingMobile.util.Compass', {
 	singleton: true,
 	fromTo: [
 		[11.25, 'N'],
 		[33.75, 'NNE'],
 		[56.25, 'NE'],
 		[78.75, 'ENE'],

 		[101.25, 'E'],
 		[123.75, 'ESE'],
 		[146.25, 'SE'],
 		[168.75, 'SSE'],

 		[191.25, 'S'],
 		[213.75, 'SSW'],
 		[236.25, 'SW'],
 		[258.75, 'WSW'],

 		[258.75, 'W'],
 		[303.75, 'WNW'],
 		[326.25, 'NW'],
 		[348.75, 'NNW'],

 		[360.0, 'N'],
 	],
 	rtd: {
 		'N': 0,
 		'NNE': 0 + Math.round(45 / 2),
 		'NE': 45,
 		'ENE': 45 + Math.round(45 / 2),

 		'E': 90,
 		'ESE': 90 + Math.round(45 / 2),
 		'SE': 135,
 		'SSE': 135 + Math.round(45 / 2),

 		'S': 180,
 		'SSW': 180 + Math.round(45 / 2),
 		'SW': 225,
 		'WSW': 225 + Math.round(45 / 2),

 		'W': 270,
 		'WNW': 270 + Math.round(45 / 2),
 		'NW': 315,
 		'NNW': 315 + Math.round(45 / 2)
 	},
 	roseToDegrees: function(direction) {
 		var result = this.rtd[direction];
 		return result || 0;
 	},
 	degreesToRose: function(degrees) {
 		for (var i = 0; i < this.fromTo.length; i++) {
 			var item = this.fromTo[i];
 			if (degrees <= item[0]) {
 				return item[1];
 			}
 		}
 	}
 });