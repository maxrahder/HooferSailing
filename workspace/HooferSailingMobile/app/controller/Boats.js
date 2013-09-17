Ext.define('HooferSailingMobile.controller.Boats', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['Fleets'],
        refs: {

        },
        control: {

        }
    },
    init: function(){
        // HooferSailingMobile.now = new Date();
        HooferSailingMobile.now = Ext.Date.add(moment('2013-10-10T10:01:01Z').toDate(), Ext.Date.MINUTE, 90);

        Ext.getStore('Fleets').on('load', this.fleetsLoadHandler, this);
    },

    fleetsLoadHandler: function(store){
        console.log(store);
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    }
});