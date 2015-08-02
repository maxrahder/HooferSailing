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
    mixins: ['Ext.mixin.Responsive'],
    responsiveConfig: {
        wide: {
            wide: true
        },
        tall: {
            wide: false
        }
    },
    updateWide: function(wide) {
        console.log(this.$className);
        console.log('setWide: ' + wide);
        this.setActiveItem(wide ? 1 : 0);
    },
    config: {
        wide: false,
        layout: 'card',
        items: [{
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
        }, {
            layout: {
                type: 'hbox',
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
                margin: '0 20 0 0',
                bind: {
                    conditions: '{conditions}',
                    flag: '{flag}'
                }
            }, {
                xtype: 'container',
                margin: '0 0 0 20',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [{
                    xtype: 'conditionsflag',
                    bind: {
                        color: '{flag}'
                    }
                }, {
                    xtype: 'hours'
                }]
            }]
        }]
    }

});