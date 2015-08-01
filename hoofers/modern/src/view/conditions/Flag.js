Ext.define('Hoofers.view.conditions.Flag', {
    extend: 'Ext.Img',
    requires: ['Hoofers.view.conditions.FlagController'],
    xtype: 'conditionsflag',
    controller: 'flag',
    config: {
        style: 'height: 10em; ',
        color: 'checkingtheflag'
    },
    applyColor: function(color) {
        return (color || 'none');
    },
    updateColor: function(color) {
        this.setSrc('resources/images/Flags/' + color + '.png');
    },
    // listeners: {
    //     tap: 'onFlagTap'
    // }

});