Ext.define('HooferSailingMobile.view.WindsChart', {
  extend: 'Ext.chart.PolarChart',
  xtype: 'windschart',
  requires: [
    'Ext.TitleBar', ,
    'Ext.chart.Chart',
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.Radar',
  ],
  config: {
    animate: true,
    interactions: ['rotate'],
    series: [{
      type: 'radar',
      xField: 'direction',
      yField: 'averageKnots',
      //marker: {
      //type: 'circle',
      //radius: 10
      //},
      style: {
        fillStyle: 'rgba(255, 0, 0, 0.5)',
        strokeStyle: 'rgba(0, 0, 0, 0.8)'
      }
    }, {
      type: 'radar',
      xField: 'direction',
      yField: 'frequency',
      style: {
        fillStyle: 'rgba(0, 0, 255, 0.5)',
        strokeStyle: 'rgba(0, 0, 0, 0.8)'
      }
    }],
    axes: [{
      type: 'category',
      position: 'angular',
      fields: 'direction',
      grid: true,
      style: {
        estStepSize: 1
      },
      label: {
        fontWeight: 'bold'
      }
    }, {
      type: 'numeric',
      position: 'radial',
      fields: ['frequency'],
      //fields: ['averageKnots', 'frequency'],
      grid: true,
      style: {
        estStepSize: 200
      },
      label: {
        fontWeight: 'bold'
      }
    }]
  }

});