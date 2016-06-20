Ext.define('Test.view.main.MainViewController', {
    extend: 'Test.view.main.MainViewControllerBase',
    alias: 'controller.main-mainview',
    requires: ['Test.util.Buoy'],

    initViewModel: function(vm) {
        var me = this;
        me.callParent(arguments);
        me.onPlay();
    },
    fetch: function(begin, interval) {
        var vm = this.getViewModel();
        Test.util.Buoy.fetch(begin, interval).then(function(data) {
            var store = vm.getStore('buoyData');
            store.setData(data);
        });
    },

    onPlay: function() {
        var vm = this.getViewModel();

        var since = vm.get('since');

        var sinceHours = String(Math.floor(since / 60));
        sinceHours = Ext.String.leftPad(sinceHours, 2, '0')

        var sinceMinutes = String(since % 60);
        sinceMinutes = Ext.String.leftPad(sinceMinutes, 2, '0')

        var interval = '00:00:10';
        var begin = '-' + sinceHours + ':' + sinceMinutes + ':00';

        var interval = Ext.String.leftPad(vm.get('interval'), 2, '0');

        this.fetch(begin, interval);
    }

});
