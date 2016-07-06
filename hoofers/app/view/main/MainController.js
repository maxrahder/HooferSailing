Ext.define('Hoofers.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        'Hoofers.store.Fleet',
        'Hoofers.model.Winds',
        'Hoofers.model.Flag',
        'Hoofers.model.BuoyData',
        'Hoofers.util.Fleet'
    ],

    config: {
        intervalId: -1
    },

    initUnits: function(bindVariable, defaultUnits) {
        vm = this.getViewModel();
        var binding = '{' + bindVariable + '}';
        vm.bind(binding, function(u) {
            try {
                window.localStorage.setItem(bindVariable, u.id);
            } catch (e) {
                // Don't render the alert too soon because it ends up
                // being off-center. Wait a bit...
                Ext.defer(function() {
                    if (Ext.isSafari && (e.code === 22)) {
                        Ext.Msg.alert('Error',
                            'You must turn off private browsing to use wind and temperature unit preferences. Defalut values are being used.');
                    } else {
                        Ext.Msg.alert('Error', 'Your browser doesn\'t store wind and temperature unit preferances. Defalut values are being used.');
                    }
                }, 100);
            }
        });
        var unitsId = window.localStorage.getItem(bindVariable);
        var units = Hoofers.util.Units[unitsId] || defaultUnits;
        vm.set(bindVariable, units);
    },

    initViewModel: function(vm) {
        var me = this;

        me.initUnits('temperatureUnits', Hoofers.util.Units.F);
        me.initUnits('speedUnits', Hoofers.util.Units.MPH);

        Hoofers.model.Flag.on('load', this.onFlagLoad, this);

        vm.bind('{interval}', me.triggerNewInterval, me);

        // In theory the store would already exist, and would just
        // have its data updated. However, there's some timing issue
        // with Ext JS 6.2 and the setRoot() wasn't waking up the
        // nested list and tree panel. The only way I could get it to
        // work was to create the store on the fly.
        Hoofers.util.Fleet.fetch().then(
            function(root) {
                var store = Ext.create('Ext.data.TreeStore', {
                    model: 'Ext.data.TreeModel',
                    root: root
                });
                vm.set('fleetTree', store);
            }
        );

    },

    onFlagBeforeLoad: function(flag, color, date) {
        this.getViewModel().set('flag', checkingtheflag);
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

        // The intervalId is used because the user could manually do a refersh,
        // yet the old interval will still time out and run refresh. When the
        // old one runs, it will see it's for the previous ID, and just return.
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
        var vm = me.getViewModel();

        Hoofers.model.Flag.load();

        vm.getStore('fleet').loadUsingAdapter();

        var interval = '00:00:10';
        var begin = '-00:05:00';

        Hoofers.model.BuoyData.fetch(begin, interval).then(
            function(data) {
                var d = Hoofers.model.Winds.summarizeConditions(data);
                me.getViewModel().set('rawConditions', d);
            },
            function(data) {
                vm.set('conditions', null);
            }
        );
    }

});
