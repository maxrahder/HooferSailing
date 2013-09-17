Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		items: [
			{
				title: 'Boats',
				xtype: 'dataview',
				store: 'Fleets',
				itemTpl: '{name}<hr/>'
				// itemtap( this, index, item, e )
			}
		

            
		]
	}
});