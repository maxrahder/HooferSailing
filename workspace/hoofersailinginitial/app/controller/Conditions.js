Ext.define('HooferSailingMobile.controller.Conditions', {
    extend: 'Ext.app.Controller',
    compassPoints: null,
    config: {
        models: ['Flag'],

        refs: {
            conditionsFlag: 'conditionsflag'
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
        if (this.getConditionsFlag()) {
            this.getConditionsFlag().setColor(color);
        }
    }

});