Ext.define('HooferSailingMobile.model.Flag', {
	extend: 'Ext.util.Observable',
	singleton: true,
	update: function(color, updated){
		this.setColor(color);
		this.setUpdated(updated);
		this.fireEvent('load', this, color, updated);
	},
	load: function() {
		var me = this;
		Ext.data.JsonP.request({
			url: 'http://ehs.wisc.edu/current-flag.php',
			success: function(result, request) {
				var flagUrlPrefix = 'http://ehs.wisc.edu/lake/';
				var flagURl = flagUrlPrefix + result.color + '.png';
				var img = '<img src="' + flagURl + '"/>');
				var element = Ext.fly('flag');
				Ext.DomHelper.append(element, img);
			},
			failure: function() {
				
			},
		})
	}
});