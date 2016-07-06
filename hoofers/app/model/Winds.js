Ext.define('Hoofers.model.Winds', {
    extend: 'Ext.util.Observable',
    singleton: true,
    requires: ['Ext.data.JsonP', 'Hoofers.util.Compass'],
    // Average the past five minutes of buoy data to calculate current
    // speed and direction.

    // Note: The interval setting seems to be ignored by the
    // buoy server. It's always returning five second data, which
    // is maybe a little more than we'd like. I think five minutes at
    // ten second intervals is probably fine.

    config: {
        url: 'http://metobs.ssec.wisc.edu/app/mendota/buoy/data/jsonp',
        symbols: 'dir:spd:wt_1.0',
        interval: '00:00:10',
        begin: '-00:05:00',
        averageKnots: 0,
        gusts: 0,
        lulls: 0,
        weightedAverage: true,
        windDirectionRose: 0,
        waterTemperature: 0,
        store: null,
        buoyTransmitting: false
    },
    constructor: function(config) {
        this.callParent(arguments);
        this.initConfig(config);
    },
    applyWaterTemperature: function(temp) {
        return Ext.util.Format.round(((temp * 9 / 5) + 32), 0);
    },
    /* returns an object of the form
      {
        averageWindSpeed: number -- meters per second
        gusts: 0: number -- meters per second
        lulls: 0: number -- meters per second
        windDirectionRose: String -- N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW
        waterTemperature: number -- degrees centigrade
      }
    */
    summarizeConditions: function(buoyData) {
        var me = this;
        // buoyData is an array of arrays. Each element holds
        // - Wind direction (degrees centigrade)
        // - Wind speed (meters per second)
        // - Water temperature at 1 meter (celsius)
        // - Time (string), of the form "2016-06-09 23:06:10Z"

        var rosePointCount = {};
        var rosePoints = Hoofers.util.Compass.rosePoints;
        for (var i = 0; i < rosePoints.length; i++) {
            rosePointCount[rosePoints[i]] = 0;
        }

        var windSpeeds = [];
        var windSpeedsSum = 0;
        // Does a quick sort visit every element once and only once?
        // If so, just sort it and figuring out the rose direction as you go.
        for (var i = 0; i < buoyData.length; i++) {
            var item = buoyData[i];
            rosePointCount[Hoofers.util.Compass.degreesToRose(item[0])]++;
            windSpeeds.push(item[1]);
            windSpeedsSum += item[1];
        }

        var result = {
            averageWindSpeed: (windSpeedsSum / buoyData.length),
            gusts: 0,
            lulls: 0,
            windDirectionRose: 0,
            waterTemperature: 0
        };

        // The last (latest) water temperature is the most up to date.
        // Do this *before* sorting.
        result.waterTemperature = buoyData[buoyData.length - 1][2];

        // Gusts and lulls is the average of the top three.
        // Note we're assuming the buoyData has at least three items.
        // Why not just sort buoyData?
        windSpeeds.sort();
        var l = windSpeeds.length;
        result.gusts = Math.round((windSpeeds[l - 1] + windSpeeds[l - 2] + windSpeeds[l - 3]) / 3);
        result.lulls = Math.round((windSpeeds[0] + windSpeeds[1] + windSpeeds[2]) / 3);

        var biggestRose = {
            direction: 'S',
            value: 0
        };
        Ext.Object.each(rosePointCount, function(key, value, object) {
            if (value > biggestRose.value) {
                biggestRose.direction = key;
                biggestRose.value = value;
            }
        });
        result.windDirectionRose = biggestRose.direction;
        return result;
    }

});
