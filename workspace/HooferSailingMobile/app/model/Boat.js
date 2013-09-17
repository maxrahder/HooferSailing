Ext.define('HooferSailingMobile.model.Boat', {
	extend: 'Ext.data.Model',
	requires: ['HooferSailingMobile.model.Loan'],

	config: {
		fields: [{
			name: 'name',
			type: 'string'
		}, {
			name: 'hull',
			type: 'string'
		}],
		hasOne: {
			model: 'HooferSailingMobile.model.Loan',
			name: 'loan'
		}
	}
});