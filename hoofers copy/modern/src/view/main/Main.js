Ext.define('Hoofers.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    mixins: ['Ext.mixin.Responsive'],
    requires: [
        'Hoofers.view.main.MainViewController',
        'Hoofers.view.main.MainModel',
        'Hoofers.view.conditions.Main',
        'Hoofers.view.fleet.Main'

    ],
    controller: 'mainviewcontroller',
    viewModel: 'main',

    listeners: {
        resize: function(o) {
            var fontScale = (screen.height / 680) * 100;
            // console.log(screen.height + ' ' + fontScale);
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
    }, {
        iconCls: 'x-fa fa-anchor',
        title: 'Boats',
        xtype: 'fleetmain'
    }, {
        iconCls: 'x-fa fa-anchor',
        title: 'Boats',
        xtype: 'nestedlist',
        displayField: 'text',
        bind: {
            store: '{fleetTree}'
        }
    }]

});
