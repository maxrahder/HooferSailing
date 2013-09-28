Ext.define('HooferSailingMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats',
        'HooferSailingMobile.view.Conditions',
        'HooferSailingMobile.view.WindsChart',

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