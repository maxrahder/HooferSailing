Ext.define('Winds.view.WindChart', {
	extend: 'Ext.chart.Chart',
	xtype: 'windchart',
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
		dateFormat: 'G:i:s'
	}],
	series: [{
		type: 'line',
        axis : ['left', 'bottom'],
		xField: 'time',
		yField: 'knots'
	}]
});