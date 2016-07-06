Ext.define('Hoofers.view.fleet.FleetList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'fleetlist',
    config: {
        itemTpl: [
            '<div style="',
            '    border-bottom: solid 2px #aaaaaa; ',
            '    vertical-align: text-top;',
            '    font-size: 2em;',
            '    padding: 0.3em;',
            '"">',
            '{name}',
            '</div>'
        ],
        scrollable: true
    }
});