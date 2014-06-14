Ext.define('HooferSailingMobile.view.conditions.RotatingImage', {
	extend: 'Ext.Component',
	xtype: 'rotatingimage',
	config: {
		height: 100,
		degrees: 0,
		src: '',
		backgroundSrc: '',
		tpl: [

			'<div style="',
			'text-align: center; ',
			'">',

			'<div style="',
			'height: {height}px; ',
			'background-image: url({backgroundSrc}); ',
			'background-size: {height}px {height}px; ',
			'background-position: center; ',
			'background-repeat: no-repeat; ',
			'">',

			'<img style="',
			'height: {height}px; ',
			'transform:rotate({degrees}deg) ;',
			'-ms-transform:rotate({degrees}deg) ;', // IE 9
			'-webkit-transform:rotate({degrees}deg); ', // Safari and Chrome
			'"',
			'src="{src}" height="{height}px"/>',

			'</div>',

			'</div>'
		],
		degrees: 0
	},
	initialize: function() {
		this.setData({
			src: this.getSrc(),
			backgroundSrc: this.getBackgroundSrc(),
			height: this.getHeight()
		});
		this.callParent();
	},
	applyDegrees: function(degrees){
		return Ext.Number.from(degrees, 0);
	},
	updateDegrees: function(degrees){
		var data = this.getData();
		data = Ext.apply(data, {degrees: degrees});
		this.setData(data);
	}
});

