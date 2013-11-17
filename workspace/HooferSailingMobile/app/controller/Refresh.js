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
        recordId: 0, // The key for the 1 and only record that holds user preferences
        record: null


    },
    init: function() {
        var me = this;
        me.setAutoRefresh(true);

        // Load the one record using its unique key. 
        // Save a reference via me.setRecord()
        HooferSailingMobile.model.RefreshRatePreferenceModel.load(me.getRecordId(), {
            callback: function(record) {
                me.setRecord(record);
            }
        });

        //alert('The autoRefreshInterval at startup is: ' + me.getAutoRefreshInterval());


        //alert('The rrp object in init() is: ' + me.getRefreshRate());  // Undefined at startup due to timing.
        //var rateFromLocalStorage = me.getRefreshRate().retrieveRefreshRateFromLocalstorage());
        //me.setAutoRefreshInterval(rateFromLocalStorage);
    },

    applyRecord: function(record) {
        if (record) {
            return record;
        } else {
            var config = {
                id: this.getRecordId()
            };
            var record = Ext.create('HooferSailingMobile.model.RefreshRatePreferenceModel', config);
            record.save();
            return record;
        }
    },

    updateAutoRefreshInterval: function(interval) {
        var record = this.getRecord();
        if (record) {
            this.getRecord().set('preferredRefreshRate', interval);
            this.getRecord().save();
        }
    },

    refreshRateChangeHandler: function(refreshRatePreference, minutes) {
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
        //alert('Refreshing now');
        Ext.getStore('Winds').fetch();
        Ext.getStore('Fleets').load();
        HooferSailingMobile.model.Flag.load();
    },


});