Ext.define('Hoofers.model.Winds', {
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
  fetch: function() {
    var me = this;

    me.setStore(me.getStore() || Ext.create('Ext.data.ArrayStore', {
      groupField: 'windDirectionRose',
      fields: ['windDirectionDegrees', 'metersPerSecond', 'time', 'windDirectionRose', 'windSpeedKnots']
    }));

    Ext.data.JsonP.request({
      url: me.getUrl(),
      timeout: 5000, // UW buoy data should come quickly, or not at all
      params: {
        symbols: this.getSymbols(),
        begin: this.getBegin(),
        interval: this.getInterval()
      },
      failure: function() {
        me.buoyTransmitting = false;
        me.fireEvent('fetch', me);
      },
      success: function(response) {

        // Buoy data is two separate arrays of equal length: one of
        // time stamps for each measurement, and another array of
        // the requested values for each time stamp.

        // This is an array store, which means the feed needs to be
        // an array of arrays, with each element in the order defined
        // in the fields array (above). The buoy feed doesn't match
        // that, so here we're manually constructing each item and
        // adding it to the array "d" -- then out of the loop we're
        // running store.loadData(d) to populate the data store.

        // There's also a topSpeeds array of the three top wind speeds.
        // The average of those is the value for "gusting".

        // Finally, we're taking the moving average of the wind speeds.
        // I.e., each wind speed data point is actually the average of
        // the three adjacent values.

        var d = [];
        var topSpeeds = [0, 0, 0];
        var lowSpeeds = [0, 0, 0];
        var knotsSum = 0;
        var length = response.stamps.length;

        var buoyData = response.data;
        var stamps = response.stamps;
        me.setBuoyTransmitting(true);

        windSpeeds = [];

        for (var i = 0; i < length; i++) {

          // Assert:
          // buoyData[i][0] = wind direction (degrees)
          // buoyData[i][1] = wind speed (meters per second)
          // buoyData[i][2] = water temperature at 1 meter (celsius)

          if (me.getWeightedAverage() && ((i === 0) || ((i + 1) === length))) {
            continue;
          }

          var windDirectionDegrees = buoyData[i][0];

          if (isNaN(windDirectionDegrees)) {
            me.setBuoyTransmitting(false);
            break;
          }

          var windSpeedMetersPerSecond;
          if (me.getWeightedAverage()) {
            windSpeedMetersPerSecond = (buoyData[i - 1][1] + buoyData[i][1] + buoyData[i + 1][1]) / 3;
          } else {
            windSpeedMetersPerSecond = buoyData[i][1];
          }

          windSpeeds.push(buoyData[i][1]);

          var time = moment(stamps[i] + 'Z').toDate();

          var windDirectionRose = Hoofers.util.Compass.degreesToRose(windDirectionDegrees);

          var windSpeedKnots = (windSpeedMetersPerSecond * 1.94384);

          d.push([
            windDirectionDegrees,
            windSpeedMetersPerSecond,
            time,
            windDirectionRose,
            windSpeedKnots
          ]);


          knotsSum += windSpeedKnots;

        }

        windSpeeds.sort(function(a, b){return a-b;});
        var l = windSpeeds.length;
        var gusts = Math.round(1.94384 * ((windSpeeds[l - 1] + windSpeeds[l-2] + windSpeeds[l-3]) / 3));
        var lulls = Math.round(1.94384 * ((windSpeeds[0] + windSpeeds[1] + windSpeeds[2]) / 3));
        me.setGusts(gusts);
        me.setLulls(lulls);

        console.log(Ext.Array.mean(windSpeeds)*1.94384);
        var store = me.getStore();
        store.setData(d);

        if (!me.getBuoyTransmitting()) {
          me.fireEvent('fetch', me);
          return;
        }

        if (i > 0) {
          var t = buoyData[i - 1][2] || buoyData[i - 1][3];
          me.setWaterTemperature(t);
        }

        // Figure out the most common wind direction
        var groups = store.getGroups();
        var biggestGroup = groups.getAt(0);
        groups.each(function(group) {
          if (group.getCount() > biggestGroup.getCount()) {
            biggestGroup = group;
          }
        });
        me.setWindDirectionRose(biggestGroup.getGroupKey());

        me.setAverageKnots(Math.round(knotsSum / d.length));
        me.fireEvent('fetch', me);

      }
    });
  }

});
