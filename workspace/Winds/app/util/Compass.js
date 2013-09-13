Ext.define('Winds.util.Compass', {
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
		[258.75, 'W'],
		[303.75, 'WNW'],
		[326.25, 'NW'],
		[348.75, 'NNW'],
		[360.0, 'N'],
	],
	degreesToDirection: function(degrees) {
		for (var i = 0 ; i < this.fromTo.length ; i++){
			var item = this.fromTo[i];
			if (degrees <= item[0]){
				return item[1];
			}
		}
	}
});