Ext.define('HooferSailingMobile.controller.Boats', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['Fleets', 'Winds', 'CompassPoints'],
        models: ['Flag'],
  
        refs: {
            conditions: 'conditions',
            rotatingImage: 'rotatingimage',
        },

        control: {

        }
    },
    init: function() {
        var me = this;
        // HooferSailingMobile.now = new Date();
        HooferSailingMobile.now = Ext.Date.add(moment('2013-10-10T10:01:01Z').toDate(), Ext.Date.MINUTE, 90);

        Ext.getStore('Fleets').on('load', this.fleetsLoadHandler, this);
        Ext.getStore('Winds').on('fetch', this.updateCompassPoints, this);
        HooferSailingMobile.model.Flag.on('load', this.updateFlag, this);

    },

    updateFlag: function(flag, color, updated) {
        //debugger;
        color = color.toLowerCase();
        this.getConditions().updateConditions({
            color: color
        });
    },

    updateCompassPoints: function(winds) {
        Ext.getStore('CompassPoints').updateDataUsingWinds(winds);
    },

    fleetsLoadHandler: function(store) {},

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    }


});