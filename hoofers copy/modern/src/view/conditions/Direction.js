Ext.define('Hoofers.view.conditions.Direction', {
    extend: 'Ext.Component',
    xtype: 'direction',
    config: {
        degrees: 0,
        flag: '',
        data: {},
        style: 'height: 10em; position: absolute; top: 6em; left: 50%; margin-right: -50%; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%);',
        tpl: [
            '<i style="',
            'font-size: 10em; ',
            'color: {color}; ',
            'transform: rotate({degrees}deg); ',
            '-ms-transform: rotate({degrees}deg); ', // IE 9
            '-webkit-transform: rotate({degrees}deg); ', // Safari and Chrome
            '" ',
            'class="fa fa-arrow-circle-up"></i>'
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

    updateFlag: function(flag) {
        var color = this.flagToColor[flag] || 'gray';
        var data = Ext.apply(this.getData(), {
            color: color
        });
        this.setData(data);
    },
    applyDegrees: function(degrees) {
        return Ext.Number.from(degrees, 0);
    },
    updateDegrees: function(degrees) {
        console.log('degrees = ' + degrees);
        var data = Ext.apply(this.getData(), {
            degrees: degrees + 180
        });
        this.setData(data);
        console.log(data);
    }
});
