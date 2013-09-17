Ext.define('HooferSailingMobile.store.Fleets', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.model.Fleet'],
	config: {
		model: 'HooferSailingMobile.model.Fleet',
		proxy: {
			type: 'ajax',
			url: '../../data/boats.json'
		},
		autoLoad: true,
		sorters: ['name']
	}
})