Ext.define('Winds.view.CompassRose', {
	extend: 'Ext.panel.Panel',
	requires: ['Ext.slider.Single'],
	xtype: 'compassrose',
	tbar: [{
		xtype: 'slider',
		fieldLabel: 'Rotate',
		labelWidth: 40,
		width: 200,
		minValue: 0,
		maxValue: 360,
		increment: 2,
		value: 0,
		name: 'rotate',
		listeners: {
			change: function(slider, value) {
				var draw = slider.up('compassrose').down('draw');
				var sprite = draw.surface.items.first();
				sprite.setAttributes({
					rotation: {
						degrees: value
					}
				}, true);
			}
		}
	},'hi'],
	layout: 'fit',
	items: [{
		xtype: 'draw',
		viewBox: true,
		items: [{
			type: 'path',
			path: 'M,10,675.32795,C,10,673.57572,270.18681,15.33843,270.61787,16.000147,C,272.06416,18.220368,530.86061,675.49217,530.38444,675.73581,C,530.07343,675.89493,471.43429,643.97006,400.07526,604.79165,L,270.33156,533.55814,L,140.79871,604.77908,C,69.555639,643.95057,10.981041,675.99999,10.63293,675.99999,C,10.284823,675.99999,10.000007,675.69756,10.000007,675.32795,L,10,675.32795,z',
			fill: '#aa0000',
			scale: {
				x: .15,
				y: .15,
				centerX: 100,
				centerY: 100
			},
			rotate: {
				degrees: 279
			},
			x: 100,
			y: 100
		}]

	}]
});