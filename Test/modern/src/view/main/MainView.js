
Ext.define('Test.view.main.MainView',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Test.view.main.MainViewController',
        'Test.view.main.MainViewModel'
    ],

    controller: 'main-mainview',
    viewModel: {
        type: 'main-mainview'
    },

    html: 'Hello, World!!'
});
