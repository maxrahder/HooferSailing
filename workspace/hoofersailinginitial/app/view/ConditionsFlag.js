Ext.define('HooferSailingMobile.view.ConditionsFlag', {
	extend: 'Ext.Img',
	xtype: 'conditionsflag',
	requires: [],
	config: {
		height: 120,
		color: 'checkingtheflag'
	},
	applyColor: function(color) {
		return (color || 'none').toLowerCase();
	},
	updateColor: function(color) {
		this.setSrc('resources/images/Flags/' + color + '.png');
	}

});

// '<tpl if="color">',
// '<img src="resources/images/Flags/{color}.png" ',
// 'style="',
// 'margin-top: .3em; ',
// 'display: block;',
// 'margin-left: auto;',
// 'margin-right: auto; ',
// 'height: 120px; ',
// '"/>',
// '</tpl>',