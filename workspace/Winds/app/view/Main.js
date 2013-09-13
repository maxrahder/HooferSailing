Ext.define('Winds.view.Main', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.layout.container.Fit', 
		'Ext.tab.Panel', 
		'Winds.view.WindGrid', 
		'Winds.view.WindChart', 
		'Winds.view.CompassRose'
	],
	layout: 'fit',
	xtype: 'app-main',
	tbar: [{
		text: 'Reload',
		itemId: 'reload',
		handler: function(button) {
			var panel = button.up('app-main');
			panel.fireEvent('reload', panel);
		}
	}, {
		text: 'Range',
		itemId: 'range'
	}],
	items: [{
		xtype: 'tabpanel',
		items: [{
			xtype: 'windgrid',
			title: 'Table',
			store: 'WindData'
		}, {
			title: 'Chart',
			xtype: 'windchart',
			store: 'WindData'
		}, {
			title: 'Compass',
			xtype: 'compassrose',
			store: 'WindData'
		}]
	}]
});