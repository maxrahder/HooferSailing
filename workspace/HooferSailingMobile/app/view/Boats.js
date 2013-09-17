Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	xtype: 'boats',
	
	items: [{
		xtype: 'dataview',
		
		
		itemTpl: '{name}'
	}]
});