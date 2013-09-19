Ext.define('HooferSailingMobile.view.Conditions', {
        extend: 'Ext.Component',
        xtype: 'conditions',
        requires: [
            'Ext.TitleBar',
            'HooferSailingMobile.view.Boats'
        ],
        config: {
            store: null,
            data: {
                windDirection: '',
                knots: '',
                gusts: ''
            },
            tpl: [
                '<div style="',
                '    vertical-align: middle;',
                '    margin-top: 1em; ',
                '">',
                '<p style="',
                '    text-align: center; ',
                '    font-size: 4em; ',
                '">',
                '<b>{windDirection}</b>',
                '<br><b>{knots}</b> kn',
                '</p>',
                '<p style="',
                '    text-align: center; ',
                '    margin-top: .5em; ',
                '    font-size: 2em; ',
                '">',
                '{gusts} kn gusts</span>',
                '</p>',
                '<p style="',
                '    font-family: Pictos; ',
                '    margin-top: .5em; ',
                '    text-align: center; ',
                '    font-size: 4em; ',
                //'    background-color: white',
                '">',
                '<span style="',
                '    color: green; ',
                '    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; ',
                '">^</span>',
            '&nbsp;',
                '<span style="',
                '    color: yellow; ',
                '    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; ',
                '">^</span>',
            '</p>',


            '</div>'
        ],
    },
    initialize: function() {
        var me = this;
        var store = me.getStore();
        if (Ext.isString(store)) {
            store = Ext.getStore(store);
            me.setStore(store);
        }
        store.on('fetch', function(store) {
            me.setData({
                windDirection: store.getWindDirectionRose(),
                knots: store.getAverageKnots(),
                gusts: store.getGusts()
            });
        });
        this.callParent();
    }
});