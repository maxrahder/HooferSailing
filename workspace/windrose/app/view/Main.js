Ext.define('WindRose.view.Main', {
    extend: 'Ext.Component',
    requires: ['Chart.ux.Highcharts'],
    xtype: 'main',

    layout: 'fit',
    items: [{
        xtype: 'highchart',
        chartConfig: {
            chart: {
                polar: true,
                type: 'column'
            },

            title: {
                text: 'Wind rose for South Shore Met Station, Oregon'
            },

            subtitle: {
                text: 'Source: or.water.usgs.gov'
            },

            pane: {
                size: '85%'
            },

            legend: {
                reversed: true,
                align: 'right',
                verticalAlign: 'top',
                y: 100,
                layout: 'vertical'
            },

            xAxis: {
                tickmarkPlacement: 'on'
            },

            yAxis: {
                min: 0,
                endOnTick: false,
                showLastLabel: true,
                title: {
                    text: 'Frequency (%)'
                },
                labels: {
                    formatter: function() {
                        return this.value + '%';
                    }
                }
            },

            tooltip: {
                valueSuffix: '%',
                followPointer: true
            },

            plotOptions: {
                series: {
                    stacking: 'normal',
                    shadow: false,
                    groupPadding: 0,
                    pointPlacement: 'on'
                }
            }
        },
        series: {
            dataIndex: 'data'
        },
        xField: 'name',
        store: 'Winds'
    }]
});