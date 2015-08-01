Ext.define('Hoofers.view.conditions.Hours', {
    extend: 'Ext.Component',
    xtype: 'hours',
    config: {
        data: {
            sunset: SunCalc.getTimes(new Date(), 43.076328, -89.399856).sunset
        },
        tpl: [
            '<tpl if="this.isData(values)">',
            '<div style="font-size: 1.3em; text-align:center">',
            'Lake open 11:00 am to {[Ext.Date.format(values.sunset, "g:i a")]}',
            '<div>',
            '</tpl>', {
                isData: function(data) {
                    return !Ext.isEmpty(data);
                }
            }
        ]
    },
    refreshHours: function() {
        this.setData({
            sunset: SunCalc.getTimes(new Date(), 43.076328, -89.399856).sunset
        });
    }
});