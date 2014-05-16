Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.device.Connection'],
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag'],
        refs: {
            conditions: 'conditions'
        },

        control: {
            conditions: {
                refreshdata: 'userRefresh'
            }
        },

        interval: 0, // 0 = off
        intervalId: -1, // Used to make sure we don't refresh using an old timer

    },

    init: function() {
        var me = this;
        me.setInterval(5 * 60 * 1000); // 5 minutes
    },


    applyInterval: function(interval) {
        // Allowed intervals: 0 (off) or more than 5 seconds 
        if ((interval === 0) || (interval > 5000)) {
            return interval;
        }
    },
    updateInterval: function(interval) {
        this.setIntervalId(new Date().getTime());
        if (interval > 0) {
            this.doAutoRefresh(this.getIntervalId());
        }
    },

    doAutoRefresh: function(intervalId) {
        var me = this;
        if (intervalId !== this.getIntervalId()) {
            return;
        }
        me.refresh();
        // Due to the defer(), I don't think this is recursion. 
        // So hopefully, no call stack issues.
        Ext.defer(me.doAutoRefresh, me.getInterval(), me, [intervalId]);
    },



    refreshConditions: function() {
        if (Ext.device.Connection.isOnline()) {
            Ext.getStore('Winds').fetch();
            HooferSailingMobile.model.Flag.load();
        } else {
            Ext.Msg.alert('Error', 'You are not connected to the Internet.');
        }
    },
    refreshFleets: function() {
        if (Ext.device.Connection.isOnline()) {
            Ext.getStore('Fleets').loadUsingAdapter();
        } else {
            Ext.Msg.alert('Error', 'You are not connected to the Internet.');
        }
    },

    refresh: function() {
        if (Ext.device.Connection.isOnline()) {
            this.refreshConditions();
            this.refreshFleets();
        } else {
            Ext.Msg.alert('Error', 'You are not connected to the Internet.');
        }
    },

    userRefresh: function() {
        var me = this;
        var doMask = Ext.Function.createThrottled(function(mask) {
            if (mask) {
                me.getConditions().mask();
            } else {
                me.getConditions().unmask();
            }
        }, 1000);
        if (Ext.device.Connection.isOnline()) {
            doMask(true);
        }
        Ext.getStore('Winds').on('fetch', function() {
            doMask(false);
        }, this, {
            single: true
        });
        this.refresh();
    }

});