Ext.define('Hoofers.view.settings.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings-form',


    onTemperatureUnitsChange: function(segmentedbutton, value) {
        var units = Hoofers.util.Units[value];
        this.getView().setTemperatureUnits(units);
    },
    onSpeedUnitsChange: function(segmentedbutton, value) {
        var units = Hoofers.util.Units[value];
        this.getView().setSpeedUnits(units);
    }

});
