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
            text: 'Wind Speed (meters per second)',
            fontSize: 15
        },
        grid: true,
        minimum: 0
    }, {
        type: 'time',
        position: 'bottom',
        title: {
            text: 'Time',
            fontSize: 15
        }
    }],

    series: [{
        type: 'line',
        xField: 'time',
        yField: 'windSpeedMetersPerSecond'
    }]
});
