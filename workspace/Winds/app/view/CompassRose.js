Ext.define('Winds.view.CompassRose', {
	extend: 'Ext.draw.Component',
	xtype: 'compassrose',
	viewBox: true,
	items: [{
		type: 'circle',
		fill: '#79BB3F',
		radius: 100,
		x: 100,   
		y: 100
	}, {
		type: 'text',
		text: '64',
		'font-family': 'Pictos',
		x: 100,
		y: 100
	}]
});