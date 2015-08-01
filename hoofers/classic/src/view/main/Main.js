Ext.define('Hoofers.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',

        'Hoofers.view.main.MainController',
        'Hoofers.view.main.MainModel'

    ],



    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    html: 'app-main'

});