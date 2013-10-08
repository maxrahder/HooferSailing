Ext.define('HooferSailingMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats',
        'HooferSailingMobile.view.Conditions',
        'HooferSailingMobile.view.Rose',
        'HooferSailingMobile.view.WindsChart',
        'Ext.draw.Component',
        'Ext.draw.sprite.Image',
        'Ext.draw.Component'

    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            iconCls: 'flag',
            title: 'Conditions',
            xtype: 'conditions',
            store: 'Winds'
        }, {
            iconCls: 'anchor',
            title: 'Boats',
            xtype: 'boats'
        }, {
            iconCls: 'settings',
            title: 'Rose',
            xtype: 'rose',
            store: 'Winds'
        }, {
            iconCls: 'action',
            title: 'Chart',
            layout: 'fit',
            margin: 40,
            items: [{
                xtype: 'windschart',
                store: 'CompassPoints'
            }]
        }]
    }
});