Ext.define('HooferSailingMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats',
        'HooferSailingMobile.view.Conditions',
        'Ext.draw.Component',
        'HooferSailingMobile.view.RotatingImage',
        // 'HooferSailingMobile.view.WindsForecast',
        'Ext.draw.sprite.Image'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            iconCls: 'flag',
            title: 'Conditions',
            xtype: 'conditions',
            store: 'Winds',
            listeners: {
                element: 'element',
                doubletap: function() {
                    this.fireEvent('refreshdata', this);
                }
            }
        }, {
            iconCls: 'anchor',
            title: 'Boats',
            xtype: 'boats'
        }]
    }
});