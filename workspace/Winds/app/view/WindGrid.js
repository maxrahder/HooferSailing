Ext.define('Winds.view.WindGrid', {
	extend: 'Ext.grid.Panel',
	requires: ['Ext.grid.column.RowNumberer','Ext.grid.column.Date', 'Ext.grid.column.Number'],
	xtype: 'windgrid',
	columns: [{
		xtype: 'rownumberer',
		width: 80
	}, {
		text: 'Time',
		xtype: 'datecolumn',
		dataIndex: 'time',
		format: 'G:i:s'
	}, {
		text: 'Degrees',
		dataIndex: 'windDirectionDegrees',
		xtype: 'numbercolumn',
		align: 'right',
		format: '0'
	}, {
		text: 'Compass',
		dataIndex: 'windDirectionRose',
		align: 'center'
	}, {
		text: 'Speed (knots)',
		dataIndex: 'windSpeedKnots',
		xtype: 'numbercolumn',
		align: 'right',
		format: '0'
	}]
});