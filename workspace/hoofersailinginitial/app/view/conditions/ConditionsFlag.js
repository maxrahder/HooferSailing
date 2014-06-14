Ext.define('HooferSailingMobile.view.conditions.ConditionsFlag', {
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

