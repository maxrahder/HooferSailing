Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	xtype: 'boats',
	
	items: [{
		xtype: 'dataview',
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
		
		itemTpl: '{name} is {age} years old'
	}]
});