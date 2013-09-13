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
		type: "path",
		path: "M 500 50 l 100 100 l -100 0 l 0 -100",
		stroke: "none",
		rotate: '45',
		fill: "#000",
		x: 100,
		y: 100
	}]
});