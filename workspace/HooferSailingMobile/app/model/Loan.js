Ext.define('Loan', {
	extend: 'Ext.data.Model',
	config: {
		fields: ['purpose', {
			name: 'out',
			type: 'date',
			dateFormat: 'Y-m-dTH:i:sZ'
		}]
	}
});