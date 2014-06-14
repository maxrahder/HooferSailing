Ext.define('Winds.view.WindChart', {
	extend: 'Ext.chart.Chart',
	xtype: 'windchart',
	requires: ['Ext.chart.axis.Time','Ext.chart.series.Line'],
	
	axes: [{
		title: 'Speed (knots)',
		type: 'Numeric',
		position: 'left',
		minimum: 0,
		maximum: 20
	}, {
		title: 'Time',
		type: 'Time',
		position: 'bottom',
		fields: ['time'],
		step: [Ext.Date.MINUTE, 1],
		dateFormat: 'G:i'
	},{
		title: 'Speed (knots)',
		type: 'Numeric',
		position: 'right',
		minimum: 0,
		maximum: 20
	}],
	series: [{
		type: 'line',
        axis : ['left', 'bottom'],
		xField: 'time',
		yField: 'windSpeedKnots',
		smooth: true,
	}]
});