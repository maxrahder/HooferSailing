Ext.define('Hoofers.model.BuoyData', {
    extend: 'Ext.util.Observable',
    singleton: true,
    requires: ['Ext.data.JsonP', 'Hoofers.util.Compass'],
    // Gets the past five minutes of buoy data to calculate current
    // speed and direction. We're averaging the speeds.

    // Note: The interval setting seems to be ignored by the
    // buoy server. It's always returning five second data, which
    // is maybe a little more than we'd like. I think five minutes at
    // ten second intervals is probably fine.

    config: {
        url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
        interval: '00:00:10',
        begin: '-00:05:00',
        buoyTransmitting: false
    },
    constructor: function(config) {
        this.callParent(arguments);
        this.initConfig(config);
    },
    _symbols: 'dir:spd:wt_1.0',
    // Returns an array of items of the form
    // windDirection: number, degrees
    // windSpeed: number, meters per second,
    // waterTemperature: number, centigrade
    // timestamp: string, 2016-06-11 17:14:30Z

    fetch: function() {
        var me = this;
        var deferred = Ext.create('Ext.Deferred');
        Ext.data.JsonP.request({
            url: me.getUrl(),
            timeout: 5000, // UW buoy data should come quickly, or not at all
            params: {
                symbols: me._symbols,
                begin: me.getBegin(),
                interval: me.getInterval()
            },
            failure: function() {
                me.buoyTransmitting = false;
                me.fireEvent('failure', me);
                deferred.reject('Failure');
            },
            success: function(response) {
                if (!response) {
                    me.buoyTransmitting = false;
                    deferred.reject('Failure');
                    return;
                }

                // Buoy data is two separate arrays of equal length: one of
                // time stamps for each measurement, and another array of
                // the requested values for each time stamp.

                // This is an array store, which is an array of arrays. Each
                // item is an array of three values. The buoy feed doesn't match
                // that, so here we're manually constructing each item and
                // adding it to the array "result".

                var result = [];

                var buoyData = response.data;
                // buoyData[i][0] = wind direction (degrees)
                // buoyData[i][1] = wind speed (meters per second)
                // buoyData[i][2] = water temperature at 1 meter (celsius)

                var stamps = response.stamps;
                me.setBuoyTransmitting(true);

                for (var i = 0; i < stamps.length; i++) {
                    var item = [
                        buoyData[i][0],
                        buoyData[i][1],
                        buoyData[i][2],
                        (stamps[i] + 'Z')
                    ];
                    if (isNaN(buoyData[i][0])) {
                        me.setBuoyTransmitting(false);
                        deferred.reject('Failure');
                        break;
                    }
                    result.push(item);
                }
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

});
