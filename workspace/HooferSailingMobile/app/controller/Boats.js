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
        Ext.getStore('Fleets').on('load', this.fleetsLoadHandler, this);
    },

    fleetsLoadHandler: function(store){
        console.log(store);
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    }
});