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
				itemTpl: '{name}<hr/>',
				listeners: {
					itemtap: function(dataview, index, target, record){
						var navigationView = dataview.up('navigationview');
						var boats = record.boats();
						navigationView.push({
							xtype: 'dataview',
							title: 'Availability',
							store: boats,
							itemTpl: '{hull}'
						});
					}
				}
			} 
		]
	}
});