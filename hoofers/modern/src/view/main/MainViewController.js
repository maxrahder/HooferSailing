Ext.define('Hoofers.view.main.MainViewController', {
    extend: 'Hoofers.view.main.MainController',
    alias: 'controller.mainviewcontroller',

    requires: ['Hoofers.view.settings.Form'],

    showSettings: function(button) {
        var me = this;
        console.log('showSettings');

        if (!me.overlay) {
            me.overlay = this.getView().add({
                xtype: 'panel',
                modal: true,
                hideOnMaskTap: true,
                showAnimation: {
                    type: 'popIn',
                    duration: 250,
                    easing: 'ease-out'
                },
                hideAnimation: {
                    type: 'popOut',
                    duration: 250,
                    easing: 'ease-out'
                },
                centered: true,
                items: [{
                    xtype: 'settingsform',
                    iconCls: 'x-fa fa-gear',
                    title: 'Units',
                    width: 240,
                    bind: {
                        temperatureUnits: '{temperatureUnits}',
                        speedUnits: '{speedUnits}'
                    }
                    // temperatureUnits: me.getViewModel().get('temperatureUnits'),
                    // speedUnits: me.getViewModel().get('speedUnits'),
                    // listeners: {
                    //     temperatureunitschange: function(form, units) {
                    //         me.getViewModel().set('temperatureUnits', units);
                    //     },
                    //     speedunitschange: function(form, units) {
                    //         me.getViewModel().set('speedUnits', units);
                    //     }
                    //
                    // }
                }, {
                    xtype: 'button',
                    margin: 4,
                    ui: 'action',
                    text: 'Close',
                    handler: function(button) {
                        me.overlay.hide();
                    }
                }],
                scrollable: true
            });
        }
        me.overlay.show();
    }
});
