Ext.define('Hoofers.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Hoofers.store.Fleet',
        'Hoofers.model.Winds',
        'Hoofers.model.Flag'
    ],

    config: {
        flag: null,
        intervalId: -1
    },

    initViewModel: function(vm) {
        var me = this;

        Hoofers.model.Flag.on('load', this.onFlagLoad, this);
        Hoofers.model.Winds.on('fetch', this.onWindsFetch, this);

        vm.bind('{interval}', me.triggerNewInterval, me);
    },

    onFlagLoad: function(flag, color, date) {
        this.getViewModel().set('flag', color.toLowerCase());
    },

    triggerNewInterval: function(interval) {
        this.setIntervalId(new Date().getTime());
        // Any interval greater than 5 seconds
        if (interval > 5000) {
            this.doAutoRefresh(this.getIntervalId());
        }
    },
    doAutoRefresh: function(intervalId) {
        var me = this;

        // Ignore invocations using an old ID
        if (intervalId !== this.getIntervalId()) {
            return;
        }
        me.refresh();
        // Due to the defer(), I don't think this is recursion.
        // So hopefully, no call stack issues.
        Ext.defer(me.doAutoRefresh, me.getViewModel().get('interval'), me, [intervalId]);
    },


    refresh: function() {
        console.log('refresh');
        var vm = this.getViewModel();
        vm.set('flag', 'checkingtheflag');
        vm.getStore('fleet').loadUsingAdapter();
        Hoofers.model.Flag.load();
        Hoofers.model.Winds.fetch();
    },

    onWindsFetch: function(winds) {
        var vm = this.getViewModel();
        var o = {
            averageKnots: winds.getAverageKnots(),
            gusts: winds.getGusts(),
            windDirectionDegrees: Hoofers.util.Compass.roseToDegrees(winds.getWindDirectionRose()),
            windDirectionRose: winds.getWindDirectionRose(),
            waterTemperature: winds.getWaterTemperature(),
            buoyTransmitting: winds.getBuoyTransmitting()
        };
        vm.set('conditions', o);
    }
});