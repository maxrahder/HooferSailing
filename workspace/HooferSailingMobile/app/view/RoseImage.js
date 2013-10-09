Ext.define('HooferSailingMobile.view.RoseImage', {
	extend: 'Ext.Component',
	xtype: 'roseimage',
	config: {
		height: 100,
		degrees: 0,
		src: 'resources/images/CompassRoseWindDirectionSimple.png',
		tpl: [
			'<div style="',
			'text-align: center; ',
			'height: {height}px; ',
			'transform:rotate({degrees}deg) ;',
			'-ms-transform:rotate({degrees}deg) ;', // IE 9
			'-webkit-transform:rotate({degrees}deg); ', // Safari and Chrome
			'">',
			'<img src="{src}" height="{height}px"/>',
			'</div>'
		],
	},
	initialize: function() {
		this.setData({
			src: this.getSrc(),
			height: this.getHeight()
		});
		this.callParent();
	},
	rotate: function(degrees){
		var data = this.getData();
		data = Ext.apply(data, {degrees: degrees});
		this.setData(data);
	}
});

