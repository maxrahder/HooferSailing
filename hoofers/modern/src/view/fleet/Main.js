Ext.define('Hoofers.view.fleet.Main', {
    extend: 'Ext.navigation.View',
    requires: [
        'Hoofers.view.fleet.FleetList',
        'Hoofers.view.fleet.BoatsList'
    ],
    xtype: 'fleetmain',
    config: {
        items: [{
            title: 'Boats',
            xtype: 'fleetlist',
            bind: {
                store: '{fleet}'
            },
            listeners: {
                select: function(list, record) {
                    list.up('fleetmain').push({
                        xtype: 'boatslist',
                        store: record.boats,
                        title: record.data.name
                    });
                    return true;
                }
            }
        }]
    }
});