Ext.define('Hoofers.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Hoofers.view.main.MainViewController',
        'Hoofers.view.main.MainModel',
        'Hoofers.view.fleet.Tree'
    ],
    controller: 'mainviewcontroller',
    viewModel: 'main',

    layout: 'hbox',
    items: [{
        xtype: 'fleettree'
    }]

});
