

Ext.define('HooferSailingMobile.view.WindsChart', {
    extend: 'Ext.Component',
    xtype: 'windschart',
    requires: [
        'Ext.TitleBar',
        'Ext.chart.PolarChart',
        'Ext.chart.Chart',

    ],

  	config: {
		store: {
		      fields: ['name', 'data1'],
		      data: [
		          {'name':'N'   , 'data1':  0},
		          {'name':'NNE' , 'data1':  0},
		          {'name':'NE'  , 'data1':  0},
		          {'name':'ENE' , 'data1':  0},
		          
		          {'name':'E'   , 'data1':  0},
		          {'name':'ESE' , 'data1':  0},
		          {'name':'SE'  , 'data1':  0},
		          {'name':'SSE' , 'data1':  0},
		          
		          {'name':'S'   , 'data1': 50},
		          {'name':'SSW' , 'data1': 40},
		          {'name':'SW'  , 'data1': 10},
		          {'name':'WSW' , 'data1':  0},

		          {'name':'W'   , 'data1':  0},
		          {'name':'WNW' , 'data1':  0},
		          {'name':'NW'  , 'data1':  0},
		          {'name':'NNW' , 'data1':  0}

		      ]
		    }, // End of store,
		data: {chart: {
			//xtype: chart,
		    animate: true,
		    interactions: ['rotate'],
		    
		    series: [{
		        type: 'radar',
		        xField: 'name',
		        yField: 'data1',
		        style: {
		          fillStyle: 'rgba(0, 0, 255, 0.1)',
		          strokeStyle: 'rgba(0, 0, 0, 0.8)'
		        }
		    }],
		    axes: [
		      {
		        type: 'numeric',
		        position: 'radial',
		        fields: 'data1',
		        grid: true,
		        style: {
		            estStepSize: 100
		        },
		        label: { fontSize: 0 },
		      },
		      {
		        type: 'category',
		        position: 'angular',
		        fields: 'name',
		        style: { estStepSize: 1 },
		        grid: true
		      }
		    ], 
		}}, // End of data
		tpl: [
	    '<p style="',
	    '    text-align: center; ',
	    '    font-size: 3em; ',
	    '">',
	    '{chart}</p>'
	   
	    ]
	}, //End of config

});

