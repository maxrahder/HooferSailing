Ext.define('HooferSailingMobile.view.conditions.Conditions', {
    extend: 'Ext.Container',
    xtype: 'conditions',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.conditions.Hours',
        'HooferSailingMobile.view.conditions.RotatingImage',
        'HooferSailingMobile.view.conditions.ConditionsFlag'
    ],
    initialize: function() {
        this.on('painted', function() {
            this.fireEvent('firsttime', this);
        }, this, {
            single: true
        });
        this.callParent();
    },
    config: {
        store: null,
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [{
            xtype: 'rotatingimage',
            margin: 6,
            itemId: 'rotatingImage',
            backgroundSrc: 'resources/images/RoseBackground.png',
            src: 'resources/images/RoseForeground.png'
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
                '    text-align: center; ',
                '    margin-top: 0em; ',
                '">',

                '<p style="font-size: 3em; margin-bottom: 0;">',
                '<b>{knots}</b> kn',
                '</p`>',

                '<p style="font-size: 1.5em; margin-top: 0;">',
                '{gusts} kn gusts',
                '</p>',

                '<p style="',
                '    margin-top: .3em; ',
                '    text-align: center; ',
                '    font-size: 1.5em; ',
                '">',
                'Water temp. ',
                '{waterTemperature}&deg;F',
                '</p>',

                '</div>'
            ]
        }, {
            xtype: 'conditionsflag'
        },{
            xtype: 'hours'
        }, ]

    },
    updateConditions: function(data) {
        var tplComponent = this.down('#tpl');
        data = Ext.apply(tplComponent.getData(), data);
        tplComponent.setData(data);
    },
    applyStore: function(store) {
        if (Ext.isString(store)) {
            store = Ext.getStore(store);
        }
        return store;
    },
    onStoreFetch: function(store) {
        var me = this;
        if (store.buoyTransmitting) {

            var image = me.down('#rotatingImage');
            var roseDirection = store.getWindDirectionRose();
            var degrees = HooferSailingMobile.util.Compass.roseToDegrees(roseDirection);
            image.setDegrees(degrees);
            image.show();

            me.updateConditions({
                windDirection: store.getWindDirectionRose(),
                knots: store.getAverageKnots(),
                gusts: store.getGusts(),
                waterTemperature: Math.round(((9 / 5) * store.getWaterTemperature()) + 32)
            });
        } else {

            var image = me.down('#rotatingImage');
            image.hide();

            var p = '<p style="';
            p += 'text-align: center;'
            p += 'font-size: 2em;';
            p += 'color: #666666;';
            p += 'margin: 1em;';
            p += '">';
            p += 'The UW Mendota Buoy<br>Is Not Transmitting';
            p += '</p>';
            this.down('#tpl').update(p);

        }
    },
    updateStore: function(store) {
        var me = this;
        if (store) {
            store.on('fetch', me.onStoreFetch, me);
        }
    }
});