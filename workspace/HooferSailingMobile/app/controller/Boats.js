Ext.define('HooferSailingMobile.controller.Boats', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['Fleets', 'Winds', 'CompassPoints'],
        models: ['Flag'],
        views: ['HooferSailingMobile.view.Rose'],

        refs: {
            conditions: 'conditions',
            rose: 'rose'
        },

        control: {

        },
        autoRefreshInterval: 5,
        autoRefresh: false
    },
    init: function() {
        // HooferSailingMobile.now = new Date();
        HooferSailingMobile.now = Ext.Date.add(moment('2013-10-10T10:01:01Z').toDate(), Ext.Date.MINUTE, 90);

        Ext.getStore('Fleets').on('load', this.fleetsLoadHandler, this);
        Ext.getStore('Winds').on('fetch', this.updateCompassPoints, this);
        this.setAutoRefresh(true);
        HooferSailingMobile.model.Flag.on('load', this.updateFlag, this);
    },

    updateFlag: function(flag, color, updated){
        //debugger;
        color = color.toLowerCase();
        this.getConditions().updateConditions({color: color});
    },

    updateCompassPoints: function(winds) {
        Ext.getStore('CompassPoints').updateDataUsingWinds(winds);
    },

    fleetsLoadHandler: function(store) {
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    },


    doAutoRefresh: function() {
        var interval = this.getAutoRefreshInterval() * 1000 * 60;
        var me = this;

        function recursiveRefresh() {
            if (me.getAutoRefresh()) {
                // Only do this if the autorefresh flag is still true
                me.refresh();
                Ext.defer(recursiveRefresh, interval, me);
            }
        }
        recursiveRefresh();
    },
    refresh: function() {
        Ext.getStore('Winds').fetch();
        Ext.getStore('Fleets').load();
        HooferSailingMobile.model.Flag.load();
    },
    updateAutoRefresh: function(newValue, oldValue) {
        this.doAutoRefresh();
    }


});