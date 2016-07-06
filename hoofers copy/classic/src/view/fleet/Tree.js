Ext.define('Hoofers.view.fleet.Tree', {
    extend: 'Ext.panel.Panel',
    xtype: 'fleettree',

    requires: [
        'Hoofers.view.fleet.TreeController',
        'Hoofers.view.fleet.TreeModel'
    ],

    controller: 'fleet-tree',
    viewModel: {
        type: 'fleet-tree'
    },

    html: 'Hello, World!!'
});
