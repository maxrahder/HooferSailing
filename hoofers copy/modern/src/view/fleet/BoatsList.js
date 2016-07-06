Ext.define('Hoofers.view.fleet.BoatsList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'boatslist',
    config: {
        itemTpl: [
            '<table',
            '    style="',
            '    margin: 0; ',
            '    border-bottom: solid 2px #aaaaaa; ',
            '    width: 100%',
            '">',
            '<tr ',
            '    style="',
            '    background-color: {[values.isAvailable ? "#ffffff":"transparent"]}',
            '"',
            '>',
            '<td valign="middle" ',
            '    class="{[values.isAvailable?\'fa-check\':\'fa-times\']}"',
            '    style="',
            '    font-family: FontAwesome; ',
            '    font-size: 1.8em; ',
            '    width: 38px; ',
            '    padding: 0.6em; ',
            '    color: {[values.isAvailable ? "green" : "red"]}; ',
            '">',
            '</td>',
            '<td valign="middle" ',
            'style="',
            '    padding: 0.6em; ',
            '    font-size: 1.2em;"',
            '>',
            '{name}<br/>',
            '{[values.isOut ? values.use + " " + values.outAgo: values.status]}',
            '</td></tr></table>'
        ]
    }
});