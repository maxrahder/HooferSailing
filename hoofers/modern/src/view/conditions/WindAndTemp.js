Ext.define('Hoofers.view.conditions.WindAndTemp', {
    extend: 'Ext.Component',
    xtype: 'windandtemp',
    config: {
        wide: true,
        flag: '',
        color: '',
        conditions: {},
        data: {},
        cls: 'x-pack-center x-vertical x-layout-box',
        tpl: [

            '<div style="',
            '    text-align: center; ',
            '    margin-top: 0em; ',
            '">',

            '<tpl if="this.transmitting(values)">',



            // '<i style="',
            // 'font-size: 10em; ',
            // 'color: {color}; ',
            // 'transform: rotate({conditions.windDirectionDegrees+180}deg); ',
            // '-ms-transform: rotate({conditions.windDirectionDegrees+180}deg); ', // IE 9
            // '-webkit-transform: rotate({conditions.windDirectionDegrees+180}deg); ', // Safari and Chrome
            // '" ',
            // 'class="fa fa-arrow-circle-up"></i>',
            //
            // '<p style="font-size: 4em; margin: 0em 0 0em 0;">',
            // '<b>{conditions.windAverage}</b> {conditions.speedUnits}',
            // '</p>',
            //
            // '<tpl if="this.gusting(values)">',
            // '<p style="font-size: 1.5em; margin: 0em 0 0 0;">',
            // 'From {conditions.windLulls} to {conditions.windGusts} {conditions.windSpeedUnits}',
            // '</p>',
            // '<tpl else>',
            // '<p style="font-size: 1.5em; margin: -0.5em 0 0 0;">',
            // 'Steady winds',
            // '</p>',
            // '</tpl>',

            '<i style="font-size: 8em; color: #aaaaaa;" ',
            'class="fa fa-meh-o"></i>',

            '<p style="font-size: 1.2em; margin: 0em 2em 0em 2em;">The buoy is temporarily damaged, and is<br/>only transmitting water temperature.',



            '<p style="',
            '    margin: 0.6em 0 0 0;',
            '    text-align: center; ',
            '    font-size: 1.5em; ',
            '">',
            'Water temp. ',
            '{conditions.waterTemperature}&deg;{conditions.temperatureUnits}',
            '</p>',

            '<tpl else>',

            '<i style="font-size: 8em; color: #aaaaaa;" ',
            'class="fa fa-meh-o"></i>',

            '<p style="font-size: 1.2em; margin: 0em 2em 0em 2em;">There is no information on winds or<br>water temperature because the Lake<br>Mendota buoy is not transmitting</p>',

            '</tpl>',

            '</div>', {
                gusting: function(values) {
                    return ((values.windGusts - values.windLulls) > 2);
                },
                transmitting: function(values) {
                    return !Ext.Object.isEmpty(values.conditions);
                }
            }
        ]

    },
    flagToColor: {
        'blue-red': 'blue',
        'blue-yellow': 'blue',
        'blue': 'blue',
        'green-yellow': 'green',
        'green': 'green',
        'none': 'red',
        'red': 'red',
        'tango-yellow': 'blue',
        'tango': 'blue'
    },

    doIt: function() {
        var data = {
            conditions: this.getConditions(),
            color: this.getColor()
        };
        this.setData(data);
    },
    updateConditions: function(conditions) {
        this.doIt();
    },
    updateColor: function(color) {
        this.doIt();
    },
    updateFlag: function(flag) {
        this.setColor(this.flagToColor[flag] || 'gray');
    }

});
