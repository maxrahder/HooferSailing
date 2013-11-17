Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['Fleets', 'Winds', 'CompassPoints'],
        models: ['Flag', 'RefreshRatePreferenceModel'],

        refs: {
            refreshRate: 'refreshratepreference'
        },

        control: {
            'refreshratepreference': {
                change: 'refreshRateChangeHandler'
            }
        },

        autoRefresh: false,
        autoRefreshInterval: 10000, // Seconds
 

    },
    init: function() {
        var me = this;
        me.setAutoRefresh(true);
        alert('The autoRefreshInterval at startup is: ' + me.getAutoRefreshInterval());
        //alert('The rrp object in init() is: ' + me.getRefreshRate());  // Undefined at startup due to timing.
        //var rateFromLocalStorage = me.getRefreshRate().retrieveRefreshRateFromLocalstorage());
        //me.setAutoRefreshInterval(rateFromLocalStorage);
    },

    refreshRateChangeHandler: function(refreshRatePreference, minutes){
        this.setAutoRefreshInterval(minutes);
        // Could refresh once here for convenience
    },

    updateAutoRefresh: function(newValue, oldValue) {
        this.doAutoRefresh();
    },

    doAutoRefresh: function() {
        var me = this;

        function recursiveRefresh() {
            if (me.getAutoRefresh()) {
                var interval = me.getAutoRefreshInterval() * 1000;
                me.refresh();
                Ext.defer(recursiveRefresh, interval, me);
            }
        }
        recursiveRefresh();
    },
    refresh: function() {
        alert('Refreshing now');
        Ext.getStore('Winds').fetch();
        Ext.getStore('Fleets').load();
        HooferSailingMobile.model.Flag.load();
    },


});