Ext.define('Hoofers.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Hoofers.store.Fleet',
        'Hoofers.model.Winds',
        'Hoofers.model.Flag',
        'Hoofers.model.BuoyData'
    ],

    config: {
        flag: null,
        intervalId: -1
    },

    initViewModel: function(vm) {
        var me = this;

        Hoofers.model.Flag.on('load', this.onFlagLoad, this);

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
        var me = this;
        // console.log('refresh');
        var vm = me.getViewModel();
        vm.set('flag', 'checkingtheflag');
        vm.getStore('fleet').loadUsingAdapter();
        Hoofers.model.Flag.load();
        vm.set('conditions', {});
        Hoofers.model.BuoyData.fetch().then(
            function(data) {
                var d = Hoofers.model.Winds.summarizeConditions(data);
                me.updateConditions(d);
                foo = data;
                console.log(data);
            },
            function() {
                vm.set('conditions', {
                    transmitting: false
                });
            });
    },


    MPS_TO_KNOTS: 1.94384,

    updateConditions: function(data) {
        /* returns an object of the form
          {
            averageWindSpeed: number -- meters per second
            gusts: 0: number -- meters per second
            lulls: 0: number -- meters per second
            windDirectionRose: String -- N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW
            waterTemperature: number -- degrees centigrade
          }
        */
        var me = this;
        var o = {
            transmitting: true,
            averageKnots: Math.round(me.MPS_TO_KNOTS * data.averageWindSpeed),
            gusts: Math.round(me.MPS_TO_KNOTS * data.gusts),
            lulls: Math.round(me.MPS_TO_KNOTS * data.lulls),
            windDirectionDegrees: Hoofers.util.Compass.roseToDegrees(data.windDirectionRose),
            windDirectionRose: data.windDirectionRose,
            waterTemperature: Math.round(32 + (9 / 5 * data.waterTemperature))
        };
        me.getViewModel().set('conditions', o);
    },

    onWindsFetch: function(winds) {
        var vm = this.getViewModel();
        var o = {
            averageKnots: winds.getAverageKnots(),
            gusts: winds.getGusts(),
            lulls: winds.getLulls(),
            windDirectionDegrees: Hoofers.util.Compass.roseToDegrees(winds.getWindDirectionRose()),
            windDirectionRose: winds.getWindDirectionRose(),
            waterTemperature: winds.getWaterTemperature(),
            buoyTransmitting: winds.getBuoyTransmitting()
        };
        vm.set('conditions', o);
    }
});
