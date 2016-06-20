Ext.define('Test.view.chart.ChartView', {
    xtype: 'hooferschart',
    extend: 'Ext.chart.CartesianChart',

    requires: [
        'Test.view.chart/ChartViewController',
        'Test.view.chart/ChartViewModel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.series.Line',

    ],

    controller: 'chart/chartview',
    viewModel: {
        type: 'chart/chartview'
    },

    axes: [{
        type: 'numeric',
        position: 'left',
        title: {
            text: 'Wind Speed (knots)',
            fontSize: 15
        },
        fields: ['windSpeedKnots'],
        grid: true,
        minimum: 0
    }, {
        type: 'time',
        position: 'bottom',
        title: {
            text: 'Time',
            fontSize: 15
        },
        renderer: function(axis, point) {
            return Ext.Date.format(point, 'H:i')
        }
    }],

    series: [{
        type: 'line',
        xField: 'time',
        yField: 'windSpeedKnots'

        // }, {
        //     type: 'scatter',
        //     xField: 'time',
        //     yField: 'windSpeedKnots',
        //     marker: {
        //         type: 'text',
        //         fontFamily: 'FontAwesome',
        //         text: '\uf0aa'
        //     },
        //     renderer: function(series, sprite, data, index) {
        //         console.log(arguments);
        //         var store = data.store;
        //         var result = {
        //             y: 0
        //         };
        //         return result;
        //     }
    }]
});
