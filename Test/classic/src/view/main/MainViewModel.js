Ext.define('Test.view.main.MainViewModel', {
    extend: 'Test.view.main.MainViewModelBase',
    alias: 'viewmodel.main-mainview',
    requires: ['Test.model.BuoyDatum'],
    data: {
        interval: 30,
        since: 60,
    },
    stores: {
        buoyData: {
            model: 'Test.model.BuoyDatum'
        }
    }

});
