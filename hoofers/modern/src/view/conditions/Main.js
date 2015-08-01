Ext.define('Hoofers.view.conditions.Main', {
    extend: 'Ext.Container',
    xtype: 'conditions',
    requires: [
        'Ext.TitleBar',
        'Hoofers.view.conditions.Direction',
        'Hoofers.view.conditions.Flag',
        'Hoofers.view.conditions.WindAndTemp',
        'Hoofers.view.conditions.Hours'
    ],
    config: {
        store: null,
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [{
            xtype: 'button',
            cls: 'x-fa fa-refresh',
            top: 8,
            right: 8,
            handler: 'refresh'
        }, {
            xtype: 'windandtemp',
            bind: {
                conditions: '{conditions}',
                flag: '{flag}'
            }
        }, {
            xtype: 'conditionsflag',
            bind: {
                color: '{flag}'
            }
        }, {
            xtype: 'hours'
        }]

    }

});