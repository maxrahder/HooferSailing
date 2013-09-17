Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		items: [{
			title: 'Boats',
			xtype: 'dataview',
			store: 'Fleets',
			itemTpl: '{name}<hr/>',
			text: 'Push a new view!',
		}]
	}
});