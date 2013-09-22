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
    padding: 24,
    store: {
      fields: ['direction', 'frequency'],
      data: [{
        'direction': 'N',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'NNE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'NE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'ENE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'E',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'ESE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'SE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'SSE',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'S',
        'frequency': 50,
        'knots': 10
      }, {
        'direction': 'SSW',
        'frequency': 40,
        'knots': 15
      }, {
        'direction': 'SW',
        'frequency': 10,
        'knots': 20
      }, {
        'direction': 'WSW',
        'frequency': 0,
        'knots': 0
      }, {
        'direction': 'W',
        'frequency': 0
      }, {
        'direction': 'WNW',
        'frequency': 0
      }, {
        'direction': 'NW',
        'frequency': 0
      }, {
        'direction': 'NNW',
        'frequency': 0
      }]
    },
    animate: true,
    interactions: ['rotate'],
    series: [{
      type: 'radar',
      xField: 'direction',
      yField: 'frequency',
      style: {
        fillStyle: 'rgba(0, 0, 255, 0.1)',
        strokeStyle: 'rgba(0, 0, 0, 0.8)',
        render: function() {
          return {};
        }
      },
      render: function() {
        alert('sdfs');
        return {};
      },
      marker: {
        type: 'circle',
        radius: 5,
        render: function() {
          alert('hi');
          return {};
        }
      }
    }],
    axes: [{
      type: 'numeric',
      position: 'radial',
      fields: 'frequency',
      grid: true,
      style: {
        estStepSize: 100
      },
      label: {
        fontSize: 0
      }
    }, {
      type: 'category',
      position: 'angular',
      fields: 'direction',
      style: {
        estStepSize: 1
      },
      grid: true
    }]
  }
});