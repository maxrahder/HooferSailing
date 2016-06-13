Ext.define('Test.model.BuoyDatum', {
    extend: 'Ext.data.Model',
    // windDirection: number, degrees
    // windSpeed: number, meters per second,
    // waterTemperature: number, centigrade
    // timestamp: string, 2016-06-11 17:14:30Z
    fields: ['timeZulu', {
        name: 'time',
        calculate: function(data) {
            return new Date(data.timeZulu)
        }
    }],
    proxy: {
        type: 'ajax',
        url: 'buoyData.json',
        // reader: {
        //     type: 'array'
        // }
    }
});
