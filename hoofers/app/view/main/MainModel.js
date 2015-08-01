Ext.define('Hoofers.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    requires: ['Hoofers.store.Fleet'],

    data: {
        name: 'Hoofers',
        interval: (5 * 60 * 1000)

    },

    stores: {
        fleet: {
            type: 'fleet'
        }
    }

});