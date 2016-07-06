Ext.define('Hoofers.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    requires: [
        'Hoofers.store.Fleet',
        'Hoofers.util.Units'
    ],

    data: {
        name: 'Hoofers',
        interval: (5 * 60 * 1000),

        // speedUnits: Hoofers.util.Units.KNOTS, // Constant class doesn't exist at parse time
        // temperatureUnits: Hoofers.util.Units.F,  // Constant class doesn't exist at parse time

        conditions: null,
        flag: 'checkingtheflag'

    },

    formulas: {
        conditions: {
            // bind: {
            //     rawConditions: '{rawConditions}',
            //     speedUnits: '{speedUnits}',
            //     temperatureUnits: '{temperatureUnits}'
            // },
            bind: ['{rawConditions}', '{speedUnits}', '{temperatureUnits}'],
            get: function(array) {

                var rawConditions = array[0];
                var speedUnits = array[1];
                var temperatureUnits = array[2];

                if (!(rawConditions && speedUnits && temperatureUnits)) {
                    return;
                }

                var result = {
                    windAverage: Math.round(speedUnits.convertFromMPS(rawConditions.averageWindSpeed)),
                    windGusts: Math.round(speedUnits.convertFromMPS(rawConditions.gusts)),
                    windLulls: Math.round(speedUnits.convertFromMPS(rawConditions.lulls)),
                    speedUnits: speedUnits.abbreviation,
                    windDirectionDegrees: Hoofers.util.Compass.roseToDegrees(rawConditions.windDirectionRose),
                    windDirectionRose: rawConditions.windDirectionRose,
                    waterTemperature: Math.round(temperatureUnits.convertFromC(rawConditions.waterTemperature)),
                    temperatureUnits: temperatureUnits.abbreviation
                }

                // console.log(Ext.JSON.encode(rawConditions));
                // console.log(Ext.JSON.encode(result));
                return result;
            }
        }
    },

    stores: {
        fleet: {
            type: 'fleet'
        }
        // This should work, but it doesn't. There's a bug in 6.2 that results in the tree/NestedList
        // not reflecting the data updated via setRoot(), so instead, the controller creates the
        // store procedurally.
        // fleetTree: {
        //     type: 'tree',
        //     model: 'Ext.data.TreeModel'
        // }
    }

});
