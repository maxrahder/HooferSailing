Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag'],
        refs: {},
        control: {},

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
        // I don't think this is recursion. So hopefully, no call stack issues.
        Ext.defer(me.doAutoRefresh, me.getInterval(), me, [intervalId]);
    },

    refresh: function() {
        Ext.getStore('Winds').fetch();
        //Ext.getStore('Fleets').load();
        Ext.getStore('Fleets').loadUsingAdapter();
        HooferSailingMobile.model.Flag.load();
    },

});