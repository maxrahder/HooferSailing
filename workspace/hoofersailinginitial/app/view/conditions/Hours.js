Ext.define('HooferSailingMobile.view.conditions.Hours', {
	extend: 'Ext.Component',
	xtype: 'hours',
	config: {
		sunset: '',
		tpl: [
			'<tpl if="this.isData(values)">',
			'<div style="text-align:center">',
			'Sunset {[Ext.Date.format(values.sunset, "g:i a")]}',
			'</div>',
			'</tpl>',
			'<div style="text-align:center">',
			'Lake hours: 11:00 am - 8:00 pm',
			'<div>', {
				isData: function(data) {
					return !Ext.isEmpty(data);
				}
			}
		]
	},
	updateSunset: function(sunset) {
		this.setData({
			sunset: sunset
		});
	}

});