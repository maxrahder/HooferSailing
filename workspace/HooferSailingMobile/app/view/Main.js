Ext.define('HooferSailingMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            iconCls: 'action',
            text: 'Boats',
            title: 'Boats',
            xtype: 'boats'
        }]
    }
});