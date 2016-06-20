Ext.define('Test.model.BuoyDatum', {
    extend: 'Ext.data.Model',
    // windDirection: number, degrees
    // windSpeedMetersPerSecond: number, meters per second,
    // waterTemperatureCentigrade: number, centigrade
    // timestamp: string, 2016-06-11 17:14:30Z
    fields: ['timeZulu', 'windSpeedMetersPerSecond', {
        name: 'time',
        calculate: function(data) {
            return new Date(data.timeZulu)
        }
    }, {
        name: 'windSpeedKnots',
        calculate: function(data) {
            return (1.94384 * data.windSpeedMetersPerSecond);
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
