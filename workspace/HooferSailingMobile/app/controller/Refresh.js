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
        // If we read it, save a reference via me.setRecord()
        // If we don't read it, create a new record, save it to local
        // storage and save a reverenc via me.setRecord()
        HooferSailingMobile.model.RefreshRatePreferenceModel.load(me.getRecordId(), {
            success: function(record) {
                me.setRecord(record);
            },
            failure: function() {
                var config = {
                    id: me.getRecordId()
                };
                var record = Ext.create('HooferSailingMobile.model.RefreshRatePreferenceModel', config);
                me.setRecord(record);
                record.save();
            }
        });

        //alert('The autoRefreshInterval at startup is: ' + me.getAutoRefreshInterval());


        //alert('The rrp object in init() is: ' + me.getRefreshRate());  // Undefined at startup due to timing.
        //var rateFromLocalStorage = me.getRefreshRate().retrieveRefreshRateFromLocalstorage());
        //me.setAutoRefreshInterval(rateFromLocalStorage);
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