Ext.define('HooferSailingMobile.store.Fleets', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.model.Fleet', 'Ext.data.reader.Array'],
	config: {
		model: 'HooferSailingMobile.model.Fleet',
		proxy: {
			type: 'ajax',
			url: 'data/boats.json'
		},
		sorters: ['name']
	}
})