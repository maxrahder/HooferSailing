Ext.define('Hoofers.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    mixins: ['Ext.mixin.Responsive'],
    requires: [
        'Hoofers.view.main.MainViewController',
        'Hoofers.view.main.MainModel',
        'Hoofers.view.conditions.Main',
        'Hoofers.view.fleet.Main',

        'Hoofers.view.fleet.NestedList',
        'Hoofers.view.settings.Form'

    ],
    controller: 'mainviewcontroller',
    viewModel: {
        type: 'main'
    },

    listeners: {
        resize: function(o) {
            var fontScale = (screen.height / 680) * 90;
            o.setStyle('font-size', fontScale + '%');
        }
    },

    tabBarPosition: 'bottom',
    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },
    items: [{
            iconCls: 'x-fa fa-flag',
            title: 'Conditions',
            xtype: 'conditions'
                // }, {
                //     iconCls: 'x-fa fa-anchor',
                //     title: 'Boats',
                //     xtype: 'fleetmain'
        }, {
            xtype: 'hoofersnestedlist',
            title: 'Boats',
            iconCls: 'x-fa fa-anchor',
            reference: 'nestedlist',
            bind: {
                store: '{fleetTree}'
            }
        }
        // , {
        //     xtype: 'settingsform',
        //     iconCls: 'x-fa fa-gear',
        //     title: 'Settings',
        //     bind: {
        //         temperatureUnits: '{temperatureUnits}',
        //         speedUnits: '{speedUnits}'
        //     }
        // }
    ]

});
