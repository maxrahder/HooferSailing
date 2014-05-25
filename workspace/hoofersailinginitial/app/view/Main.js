Ext.define('HooferSailingMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    style: 'font-size: ' + 100*(window.outerHeight/568) +'%',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.view.Boats',
        'HooferSailingMobile.view.conditions.Conditions',
        'Ext.draw.Component',
        //'HooferSailingMobile.view.WindsForecast'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [{
            iconCls: 'flag',
            title: 'Conditions',
            xtype: 'conditions',
            store: 'WindsConditions',
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
        }
        // , 
        // {
        //     iconCls: 'anchor',
        //     title: 'Winds',
        //     xtype: 'windsforecast'
        // }
        ]
    }
});