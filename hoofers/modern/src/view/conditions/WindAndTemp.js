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

            '<tpl if="this.beforeTransmitting(values)">',

            '<i style="font-size: 8em; color: #aaaaaa;" ',
            'class="fa fa-wifi"></i>',
            '<p style="font-size: 1.2em; margin: 0em 2em 2em 2em;">Checking the Lake Mendota buoy</p>',

            '<tpl elseif="transmitting">',

            '<i style="',
            'font-size: 10em; ',
            'color: {color}; ',
            'transform: rotate({windDirectionDegrees+180}deg); ',
            '-ms-transform: rotate({windDirectionDegrees+180}deg); ', // IE 9
            '-webkit-transform: rotate({windDirectionDegrees+180}deg); ', // Safari and Chrome
            '" ',
            'class="fa fa-arrow-circle-up"></i>',


            '<p style="font-size: 4em; margin: 0em 0 0 0;">',
            '<b>{averageKnots}</b> kt',
            '</p>',

            '<tpl if="this.gusting(values)">',
            '<p style="font-size: 1.5em; margin: -0.5em 0 0 0;">',
            'From {lulls} to {gusts} kts',
            '</p>',
            '</tpl>',

            '<tpl if="!this.gusting(values)">',
            '<p style="font-size: 1.5em; margin: -0.5em 0 0 0;">',
            'Steady winds',
            '</p>',
            '</tpl>',

            '<p style="',
            '    margin: 0.2em 0 0 0;',
            '    text-align: center; ',
            '    font-size: 1.5em; ',
            '">',
            'Water temp. ',
            '{waterTemperature}&deg;F',
            '</p>',

            '<tpl else>',

            '<i style="font-size: 8em; color: #aaaaaa;" ',
            'class="fa fa-meh-o"></i>',

            '<p style="font-size: 1.2em; margin: 0em 2em 2em 2em;">There is no information on winds or water temperature because the Lake Mendota buoy is not transmitting</p>',


            '</tpl>',
            '</div>', {
                gusting: function(values) {
                    return ((values.gusts - values.lulls) > 2);
                },
                beforeTransmitting: function(values) {
                    return !Ext.isDefined(values.transmitting);
                }
            }
        ],

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
        var data = Ext.apply(this.getConditions(), {
            color: this.getColor()
        });
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
    },

});
