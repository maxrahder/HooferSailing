Ext.define('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    data: {
        name: 'Homer',
        age: 38
    },
    tpl: '<tpl for=".">{i}</tpl>'
});