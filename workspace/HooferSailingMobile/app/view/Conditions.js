Ext.define('HooferSailingMobile.view.Conditions', {
    extend: 'Ext.Container',
    xtype: 'conditions',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats', 
        'HooferSailingMobile.view.RotatingImage'
    ],
    config: {
        store: null,
        layout: 'vbox',
        items: [{
            xtype: 'rotatingimage',
            margin: 6,
            itemId: 'rotatingImage',
            src: 'resources/images/CompassRoseWindDirectionSimple.png'
        }, {
            xtype: 'component',
            itemId: 'tpl',
            data: {
                windDirection: '',
                knots: '',
                gusts: '',
                waterTemperature: '',
                color: ''
            },
            tpl: [
                '<div style="',
                '    vertical-align: middle;',
                '    margin-top: 0em; ',
                '">',

                // '<p style="',
                // '    text-align: center; ',
                // '    font-size: 3em; ',
                // '">',
                // '<b>{windDirection}</b>',
                // '</p>',

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

                '<tpl if="color">',
                '<img src="resources/images/Flags/{color}.png" ',
                'style="',
                'margin-top: .3em; ',
                'display: block;',
                'margin-left: auto;',
                'margin-right: auto; ' ,
                'height: 120px; ',
                '"/>',
                '</tpl>',

                '</div>'
            ]
        }]

    },
    updateConditions: function(data) {
        var tplComponent = this.down('#tpl');
        data = Ext.apply(tplComponent.getData(), data);
        tplComponent.setData(data);
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

            var image = me.down('#rotatingImage');
            var roseDirection = store.getWindDirectionRose();
            var degrees = HooferSailingMobile.util.Compass.roseToDegrees(roseDirection);
            image.rotate(degrees);

            me.updateConditions({
                windDirection: store.getWindDirectionRose(),
                knots: store.getAverageKnots(),
                gusts: store.getGusts(),
                waterTemperature: Math.round(((9 / 5) * store.getWaterTemperature()) + 32)
            });
        });

        this.callParent();
    }
});