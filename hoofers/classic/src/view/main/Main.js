Ext.define('Hoofers.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Hoofers.view.main.MainViewController',
        'Hoofers.view.main.MainModel',
        'Hoofers.view.fleet.Tree'
    ],
    controller: 'mainviewcontroller',
    viewModel: {
        type: 'main'
    },

    layout: 'border',
    items: [{
        collapsible: true,
        collapseMode: 'mini',
        split: true,
        xtype: 'fleettree',
        width: 300,
        region: 'west',
        bind: {
            store: '{fleetTree}'
        }
    }]

});
