Ext.define('Hoofers.view.fleet.TreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fleet-tree',

    initViewModel: function(vm) {
        this.callParent(arguments);
        this.getStore('fleet').on('load', function() {
            console.log('fleet on load');
        })
    }

});
