Ext.define('HooferSailingMobile.controller.Refresh', {
    extend: 'Ext.app.Controller',
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag'], 
        refs: {},
        control: {},
        autoRefreshEnabled: false,
    },
    
    init: function() {
        var me = this;
        me.setAutoRefreshEnabled(true); 
    },
   
    updateAutoRefreshEnabled: function(newValue, oldValue) {
        this.doAutoRefresh();
    },

    doAutoRefresh: function() {
        var me = this;
        function recursiveRefresh() {
            if (me.getAutoRefreshEnabled()) {
                me.refresh();
                Ext.defer(recursiveRefresh, 300000, me); // 5 minutes
            }
        }
        recursiveRefresh();
    },

    refresh: function() {
        Ext.getStore('Winds').fetch();
        //Ext.getStore('Fleets').load();
        HooferSailingMobile.model.Flag.load();
    },

});