Ext.define('HooferSailingMobile.model.Fleet', {
	extend: 'Ext.data.Model',
	requires: ['HooferSailingMobile.model.Boat'],
	config: {
		fields: [{
			name: 'name',
			type: 'string'
		}],
		hasMany: {
			model: 'HooferSailingMobile.model.Boat',
			name: 'boats'
		}
	}
});