Ext.define('HooferSailingMobile.controller.Conditions', {
    extend: 'Ext.app.Controller',
    compassPoints: null,
    config: {
        stores: ['Fleets', 'WindsConditions'],
        models: ['Flag','SunriseSunset'],

        refs: {
            conditions: 'conditions',
            conditionsFlag: 'conditionsflag',
            hours: 'hours',
            rotatingImage: 'rotatingimage'
        },

        control: {

        }
    },
    init: function() {
        var me = this;
        HooferSailingMobile.now = new Date();
        HooferSailingMobile.model.Flag.on('load', this.updateFlag, this);
        HooferSailingMobile.model.SunriseSunset.on('load', this.updateSunriseSunset, this);
    },

    updateFlag: function(flag, color, updated) {
        if (this.getConditionsFlag()) {
            this.getConditionsFlag().setColor(color);
        }
    },
    updateSunriseSunset: function(sunriseSunset, sunrise, sunset){
        this.getHours().setSunset(sunset);
    }

});