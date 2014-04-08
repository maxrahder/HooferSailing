Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag', 'RefreshRatePreferenceModel'], 
        refs: {},
        control: {
            'userpreferences': {
                change: 'refreshRateChangeHandler'
            }
        },
        autoRefreshEnabled: false,
        refreshPreferenceRecord: null,
        refreshPreferenceRecordId: 0, // The key for the 1 and only record that holds user preferences
    },
    
    init: function() {
        var me = this;
        HooferSailingMobile.model.RefreshRatePreferenceModel.load(me.getRefreshPreferenceRecordId(), {
            callback: function(record) {
                me.setRefreshPreferenceRecord(record);
            }
        });
        me.setAutoRefreshEnabled(true); 
    },
    
    applyRefreshPreferenceRecord: function(record) {
        var me = this;
        if (record) {
            return record;
        } else {
            var defaultRefreshPreferenceRecord = Ext.create('HooferSailingMobile.model.RefreshRatePreferenceModel');
            defaultRefreshPreferenceRecord.save(); 
            return defaultRefreshPreferenceRecord;
        }
    },
   
    updateAutoRefreshEnabled: function(newValue, oldValue) {
        this.doAutoRefresh();
    },

    doAutoRefresh: function() {
        var me = this;
        function recursiveRefresh() {
            if (me.getAutoRefreshEnabled()) {
                var rpr = me.getRefreshPreferenceRecord();
                var preferredRefreshRate = rpr.get('preferredRefreshRate'); // In refreshes per hour
                var intervalInMilliseconds = (1/preferredRefreshRate) * 3600000;
                //alert('The interval in seconds is ' + intervalInMilliseconds * 1000);
                me.refresh();
                Ext.defer(recursiveRefresh, intervalInMilliseconds, me);
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

    refreshRateChangeHandler: function(userPreferencesInstance, newRate) {
        var me = this;
        var rpRecord = me.getRefreshPreferenceRecord();
        if (rpRecord) { 
            rpRecord.set('preferredRefreshRate', newRate);
        }
        // Update the recursiveRefresh() deferral interval or
        // set autoRefreshEnabled to false and doAutoRefresh()
    },
});