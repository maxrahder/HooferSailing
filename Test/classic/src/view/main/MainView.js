 Ext.define('Test.view.main.MainView', {
     extend: 'Ext.tab.Panel',
     requires: [
         'Test.view.main.MainViewController',
         'Test.view.main.MainViewModel',
         'Test.view.grid.GridView',
         'Test.view.chart.ChartView'
     ],

     controller: 'main-mainview',
     viewModel: {
         type: 'main-mainview'
     },

     tabPosition: 'bottom',
     tbar: [{
         xtype: 'numberfield',
         fieldLabel: 'Since (minutes)',
         labelWidth: 96,
         allowDecimals: false,
         minValue: 1,
         maxValue: 180,
         width: 180,
         bind: '{since}'
     }, '', {
         xtype: 'numberfield',
         fieldLabel: 'Interval (seconds)',
         labelWidth: 112,
         width: 200,
         step: 5,
         minValue: 5,
         maxValue: 55,
         bind: '{interval}'
     }, '', {
         xtype: 'button',
         iconCls: 'x-fa fa-play',
         handler: 'onPlay'
     }],
     items: [{
         xtype: 'hoofersgrid',
         iconCls: 'x-fa fa-table',
         title: 'Grid',
         border: true,
         bind: {
             store: '{buoyData}'
         }
     }, {
         xtype: 'hooferschart',
         iconCls: 'x-fa fa-area-chart',
         title: 'Chart',
         border: true,
         bind: {
             store: '{buoyData}'
         }
     }]
 });
