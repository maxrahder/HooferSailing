Ext.define('Hoofers.view.conditions.WindAndTemp', {
    extend: 'Ext.Component',
    xtype: 'windandtemp',
    config: {
        flag: '',
        color: '',
        conditions: {},
        data: {},
        tpl: [

            '<div style="',
            '    vertical-align: middle;',
            '    text-align: center; ',
            '    margin-top: 0em; ',
            '">',


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

            '<p style="font-size: 1.5em; margin: -0.5em 0 0 0;">',
            '{gusts} kt gusts',
            '</p>',

            '<tpl if="waterTemperature">',
            '<p style="',
            '    margin: 0.2em 0 0.2em 0;',
            '    text-align: center; ',
            '    font-size: 1.5em; ',
            '">',
            'Water temp. ',
            '{waterTemperature}&deg;F',
            '</p>',
            '</tpl>',

            '</div>'
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