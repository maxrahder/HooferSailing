/*
Ext.onReady(function(){
	Ext.data.JsonP.request({
		url: 'http://ehs.wisc.edu/current-flag.php',
		success: function(result, request) {
			debugger;
			var f = {
				'green': 'GreenFlag.png', 
				'green-yellow': 'GreenYellowFlag.png',
				'blue': 'BlueFlag.png', 
				'blue-yellow':'BlueYellowFlag.png',
				'blue-red': 'BlueRedFlag.png', 
				'red': 'RedFlag.png',
				'none': 'Closed.png'
			};
			var color = result.color.toLowerCase();
			var flagUrlPrefix = 'http://ehs.wisc.edu/lake/';
			var image = f[color];
			var flagURl = flagUrlPrefix + image;
			var img = '<img src="' + flagURl + '"/>';
			var element = Ext.fly('flagimage');
			Ext.DomHelper.append(element, img);
		},
			failure: function() {
		}
	});
})
*/