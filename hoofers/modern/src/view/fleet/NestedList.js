    Ext.define('Hoofers.view.fleet.NestedList', {
        extend: 'Ext.dataview.NestedList',
        xtype: 'hoofersnestedlist',
        requires: ['Hoofers.util.Util'],
        displayField: 'text',
        getItemTextTpl: function(node) {
            return this.depthTemplates[node.getDepth()].join('');
        },
        depthTemplates: [
            [
                '<div style="',
                'vertical-align: text-top;',
                'font-size: 2em;',
                'padding: 0.4em 0.2em 0.4em 0.2em',
                '">',
                '{text}',
                '</div>'
            ],
            [
                '<table',
                '    style="',
                '    margin: 0; ',
                '    width: 100%',
                '">',
                '<tr ',
                '    style="',
                '    background-color: {[ (values.available ? "#ffffff":"transparent") ]}',
                '"',
                '>',
                '<td valign="middle" ',
                '    class="{[ (values.available ? \'fa-check\':\'fa-times\') ]}"',
                '    style="',
                '    font-family: FontAwesome; ',
                '    font-size: 2.2em; ',
                '    width: 38px; ',
                '    padding: 0.6em; ',
                '    color: {[ (values.available ? "green" : "red") ]}; ',
                '">',
                '</td>',
                '<td valign="middle" ',
                'style="',
                '    padding: 0.6em; ',
                '    font-size: 1.4em;',
                '    line-height: 1.4em;',
                '">',
                '{text}<br/>',
                '{[values.out ? values.use + " " + Hoofers.util.Util.hoursMinutes(values.date): values.statusText]}',
                '</td></tr></table>'
            ]
        ]
    });
