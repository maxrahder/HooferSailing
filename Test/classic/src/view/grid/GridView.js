Ext.define('Test.view.grid.GridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'hoofersgrid',
    requires: [
        'Test.view.grid.GridViewController',
        'Test.view.grid.GridViewModel',
        'Ext.grid.feature.Summary'
    ],

    controller: 'grid-gridview',
    viewModel: {
        type: 'grid-gridview'
    },
    // features: [{
    //     ftype: 'summary',
    //     dock: 'top'
    // }],
    columns: [{
        xtype: 'rownumberer'
    }, {
        text: 'Direction',
        dataIndex: 'windDirectionDegrees',
        flex: 1
    }, {
        text: 'Wind Speed (MPS)',
        dataIndex: 'windSpeedMetersPerSecond',
        flex: 1
    }, {
        text: 'Wind Speed (KT)',
        dataIndex: 'windSpeedMetersPerSecond',
        renderer: function(value) {
            return (1.94384 * value);
        },
        flex: 1
    }, {
        text: 'Time',
        dataIndex: 'time',
        xtype: 'datecolumn',
        format: 'H:i:s, F j, Y',
        flex: 1
    }]
});
