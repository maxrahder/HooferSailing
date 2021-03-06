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
            gusts: '',
            waterTemperature: ''
        },
        tpl: [
            '<div style="',
            '    vertical-align: middle;',
            '    margin-top: .7em; ',
            '">',

            '<p style="',
            '    text-align: center; ',
            '    font-size: 3em; ',
            '">',
            '<b>{windDirection}</b>',
            '</p>',

            '<p style="',
            '    text-align: center; ',
            '    margin-top: 0em; ',
            '    font-size: 3em; ',
            '">',
            '<b>{knots}</b> kn',
            '</p>',

            '<p style="',
            '    text-align: center; ',
            '    font-size: 1.5em; ',
            '">',
            '{gusts} kn gusts</span>',
            '</p>',

            '<p style="',
            '    margin-top: .3em; ',
            '    text-align: center; ',
            '    font-size: 1.5em; ',
            '">',
            'Water temp. ',
            '{waterTemperature}&deg;F',
            '</p>',

            '<p style="',
            '    font-family: Pictos; ',
            '    margin-top: .3em; ',
            '    text-align: center; ',
            '    font-size: 4em; ',
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
        // The calling routine specifies the store. That may be an actual Ext.data.Store
        // object, or the string name of a store. So take a look and if it's a string
        // then get the actual store object via Ext.getStore() and have the Condition's
        // store property reference that, rather than the string.
        var store = me.getStore();
        if (Ext.isString(store)) {
            store = Ext.getStore(store);
            me.setStore(store);
        }

        // Assert: store (and me.getStore()) reference a store object for the winds.
        // When it's reloaded the fetch event is fired. When that happens update the
        // contents of the Conditions tpl with properties from the store.
        store.on('fetch', function(store) {
            me.setData({
                windDirection: store.getWindDirectionRose(),
                knots: store.getAverageKnots(),
                gusts: store.getGusts(),
                waterTemperature: Math.round(((9 / 5) * store.getWaterTemperature()) + 32)
            });
        });

        this.callParent();
    }
});