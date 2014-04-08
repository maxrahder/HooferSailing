Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag'],
        refs: {},
        control: {},

        interval: 0,
        intervalId: -1, // Used to make sure we don't refresh using an old timer

        autoRefreshEnabled: false
    },

    init: function() {
        var me = this;
        me.setInterval(5 * 60 * 1000); // 5 minutes
    },


    applyInterval: function(interval) {
        if (interval > 5000) {
            return interval;
        }
    },
    updateInterval: function(interval) {
        this.setIntervalId(new Date().getTime());
        this.doAutoRefresh(this.getIntervalId());
    },


    updateAutoRefreshEnabled: function(newValue, oldValue) {
        this.doAutoRefresh();
    },

    doAutoRefresh: function(intervalId) {
        var me = this;
        if (intervalId !== this.getIntervalId()) {
            return;
        }
        me.refresh();
        Ext.defer(me.doAutoRefresh, me.getInterval(), me, intervalId);
    },

    refresh: function() {
        Ext.getStore('Winds').fetch();
        //Ext.getStore('Fleets').load();
        Ext.getStore('Fleets').loadUsingAdapter();
        HooferSailingMobile.model.Flag.load();
    },

});