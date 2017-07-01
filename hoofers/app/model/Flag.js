Ext.define('Hoofers.model.Flag', {
    extend: 'Ext.util.Observable',
    singleton: true,
    config: {
        color: '',
        updated: ''
    },
    update: function(color, updated) {
        this.setColor(color);
        this.setUpdated(updated);
        this.fireEvent('load', this, color, updated);
    },
    load: function() {
        var me = this;
        Ext.data.JsonP.request({
            url: 'http://ehs.wisc.edu/current-flag.php',
            // url: 'http://testout.hoofersailing.org/feed.php',
            success: function(result, request) {
                var updated = {}; //Ext.Date.format(result.updated, 'Y-m-d H:i:s');
                me.update(result.color, updated);
            },
            failure: function() {
                //alert('jsonp failed');
            }
        });
    }
});
