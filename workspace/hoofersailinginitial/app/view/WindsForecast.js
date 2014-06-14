Ext.define('HooferSailingMobile.view.WindsForecast', {
	extend: 'Ext.Component',
	xtype: 'windsforecast',
	requires: ['Ext.XTemplate'],
	cls: 'windsforecast',
	config: {
		size: null
	},
	initialize: function() {
		this.iFrameTemplate = Ext.create(Ext.XTemplate, '<iframe align="top" src="http://widgets.windalert.com/widgets/web/forecastTable?spot_id=1200&units_wind=mph&units_height=ft&units_temp=F&days=2&width={width}&height={height}&color=870100&activity=Windsurf&app=windalert" width="{width}" height="{height}" frameborder="0" scrolling="no" allowtransparency="no"></iframe>');
		this.callParent();
	},
	maxFrameHeight: 350,
	updateSize: function(size) {
		if (size) {
			padding = (size.height - this.maxFrameHeight) / 2;
			this.setPadding(padding + ' 0 ' + padding + ' 0');
			this.setSize(size.width, size.height);
			size.height = Ext.Number.constrain(size.height, 0, this.maxFrameHeight);
			console.dir(size);
			this.setHtml(this.iFrameTemplate.apply(size));
		}
	}


});