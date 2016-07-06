Ext.define('Hoofers.view.settings.Form', {
    xtype: 'settingsform',
    extend: 'Ext.panel.Panel',
    requires: [
        'Hoofers.view.settings.FormController',
        'Hoofers.view.settings.FormModel'
    ],

    controller: 'settings-form',
    viewModel: {
        type: 'settings-form'
    },
    config: {
        temperatureUnits: null,
        speedUnits: null
    },
    publishes: ['temperatureUnits', 'speedUnits'],
    updateTemperatureUnits: function(units) {
        this.down('#temperature').setValue(units.id);
    },
    updateSpeedUnits: function(units) {
        this.down('#speed').setValue(units.id);
    },
    padding: 8,
    layout: 'vbox',
    items: [{
        xtype: 'label',
        html: 'Water Temperature'
    }, {
        xtype: 'segmentedbutton',
        itemId: 'temperature',
        listeners: {
            change: 'onTemperatureUnitsChange'
        },
        defaults: {
            flex: 1
        },
        items: [{
            text: 'C&deg;',
            value: 'C'
        }, {
            text: 'F&deg;',
            value: 'F'
        }, {
            text: 'K&deg;',
            value: 'K'
        }]
    }, {
        xtype: 'component',
        margin: 8
    }, {
        xtype: 'label',
        html: 'Wind-speed'
    }, {
        xtype: 'segmentedbutton',
        itemId: 'speed',
        listeners: {
            change: 'onSpeedUnitsChange'
        },
        defaults: {
            flex: 1
        },
        items: [{
            text: 'km/h',
            value: 'KPH'
        }, {
            text: 'kt',
            value: 'KNOTS'
        }, {
            text: 'mph',
            value: 'MPH'
        }]
    }]
});
