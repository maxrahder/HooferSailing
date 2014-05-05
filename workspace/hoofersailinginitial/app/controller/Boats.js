Ext.define('HooferSailingMobile.controller.Boats', {
    extend: 'Ext.app.Controller',
    // requires: ['HooferSailingMobile.store.CompassPoints'],
    compassPoints: null,
    config: {
        stores: ['Fleets', 'Winds'],
        models: ['Flag'],

        refs: {
            conditions: 'conditions',
            conditionsFlag: 'conditionsflag',
            rotatingImage: 'rotatingimage'
        },

        control: {

        }
    },
    init: function() {
        var me = this;
        HooferSailingMobile.now = new Date();
        // HooferSailingMobile.now = Ext.Date.add(moment('2013-10-10T10:01:01Z').toDate(), Ext.Date.MINUTE, 90);

        // me.compassPoints = Ext.create('HooferSailingMobile.store.CompassPoints', {
        //     winds: Ext.getStore('Winds')
        // });
        HooferSailingMobile.model.Flag.on('load', this.updateFlag, this);

    },

    updateFlag: function(flag, color, updated) {
        this.getConditionsFlag().setColor(color);
    }

});