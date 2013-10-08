Ext.define('CertificationQuestions.view.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    }, {
        xtype: 'panel',
        itemId: 'mainPanel',
        tools: [{
            type: 'pin',
            handler: function(event, el, owner, tool) {
                tool.setType((tool.type === 'pin') ? 'unpin' : 'pin');
            }
        }]
    }]
});