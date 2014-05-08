Ext.define('HooferSailingMobile.view.RotatingArrow', {
	extend: 'Ext.Component',
	xtype: 'rotatingarrow',
	config: {
		degrees: 0,
	},
	template: [{
		tag: 'div',
		cls: 'rotating-arrow-viewport',
		children: [{
			tag: 'div',
			cls: 'rotating-arrow-circle',
			children: [{
				tag: 'div',
				cls: 'rotating-arrow-arrow',
				style: '{}'
			}]
		}],

	}],
	applyDegrees: function(degrees) {
		return Ext.Number.from(degrees, 0);
	},
	updateDegrees: function(degrees) {
		var data = this.getData();
		data = Ext.apply(data, {
			degrees: degrees
		});
		this.setData(data);
	}
});