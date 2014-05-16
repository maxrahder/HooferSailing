Ext.define('HooferSailingMobile.controller.Conditions', {
    extend: 'Ext.app.Controller',
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
        HooferSailingMobile.model.Flag.on('load', this.updateFlag, this);
    },

    updateFlag: function(flag, color, updated) {
        this.getConditionsFlag().setColor(color);
    }

});