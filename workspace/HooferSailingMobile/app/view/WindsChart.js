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
      yField: 'frequency',
      style: {
        fillStyle: 'rgba(0, 0, 255, 0.1)',
        strokeStyle: 'rgba(0, 0, 0, 0.8)'
      },
      marker: {
        type: 'circle',
        radius: 5
      },
      renderer: function() {
        debugger; // ?? How to render the marker?
      }
    }],
    axes: [{
      type: 'numeric',
      position: 'radial',
      fields: 'frequency',
      grid: true,
      style: {
        estStepSize: 200
      },
      renderer: function(lable) {
        return '';
      }
    }, {
      type: 'category',
      position: 'angular',
      fields: 'direction',
      style: {
        estStepSize: 1
      },
      grid: true,
      label: {
        fontWeight: 'bold'
      }
    }]
  }

});