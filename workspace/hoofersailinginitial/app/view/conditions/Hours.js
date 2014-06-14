Ext.define('HooferSailingMobile.view.conditions.Hours', {
	extend: 'Ext.Component',
	xtype: 'hours',
	config: {
		data: {
			sunset: SunCalc.getTimes(new Date(), 43.076328, -89.399856).sunset
		},
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
	refreshHours: function() {
		this.setData({
			sunset: SunCalc.getTimes(new Date(), 43.076328, -89.399856).sunset
		});
	}
});