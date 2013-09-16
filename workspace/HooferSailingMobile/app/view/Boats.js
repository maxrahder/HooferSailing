Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	xtype: 'boats',
	
	items: [{
		store: {
			/*
	        fields: ['name', 'age'],
	        data: [
	            {name: 'Jamie Avins',  age: 100},
	            {name: 'Rob Dougan',   age: 21},
	            {name: 'Tommy Maintz', age: 24},
	            {name: 'Jacky Nguyen', age: 24},
	            {name: 'Ed Spencer',   age: 26}
	        ]
	        */
    	},
		//fullscreen: true,
		//title: 'Boats View',
        //html: 'This is a dataview within the navigationview. The list of boat categories, drawn from boats.json, goes here',
		xtype: 'dataview',
		itemTpl: '{name} is {age} years old'
	}]
});