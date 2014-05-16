Ext.define('HooferSailingMobile.view.WindsForecast', {
	extend: 'Ext.Component',
	xtype: 'windsforecast',
	requires: [],
	cls: 'windsforecast',
	config: {
		html: ['<iframe align="top" src="http://widgets.windalert.com/widgets/web/forecastTable?spot_id=1200&amp;units_wind=mph&amp;units_height=ft&amp;units_temp=F&amp;days=2&amp;width=203&amp;height=210&amp;color=870100&amp;activity=Windsurf&amp;app=windalert" width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="no"></iframe>']
	}

});