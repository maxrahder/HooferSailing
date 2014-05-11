Ext.define('HooferSailingMobile.store.Fleets', {
	extend: 'Ext.data.Store',
	requires: ['HooferSailingMobile.model.Fleet', 'Ext.data.reader.Array'],
	config: {
		model: 'HooferSailingMobile.model.Fleet',
		proxy: {
			type: 'memory'
		},
		sorters: ['name']
	},

	/*
	Example feed from Justin's backend: 
	420: [{ 
		equipment_ID: "53",
		name: "420 #1",
		status: 1 
	}, {
		equipment_ID: "62",
		name: "420 #10",
		status: 4,
		checkout: "2014-04-08 11:28:43"
	}]

	Our record assumes: 
	{name: '420', boats: [{name: '', status: '', id: '', purpose: '', 'checkout: ''}]}

	*/

	loadUsingAdapter: function() {
		var me = this;
		Ext.data.JsonP.request({
			url: 'http://hoofers.staging.threelakessoftware.com/api/equipment/status',
			params: {
				club_ID: 7
			},
			success: function(response) {
				var data = [];
				Ext.Object.each(response, function(key, value, object) {

						if (!((key === 'Winter Kiting') || (key === 'Tanks'))) {
							var datum = {};

							datum.name = key;
							datum.boats = [];

							// Populate the boats array
							Ext.Array.forEach(value, function(item) {
								var o = {};
								o.id = item.equipment_ID;
								o.name = item.name;
								if (item.checkout) {
									o.checkout = item.checkout.checkouttime;
									o.use = item.checkout.usage;
								}
								o.statusCode = item.status;

								datum.boats.push(o);
							});

							data.push(datum);
						}
				});
				me.setData(data);
			}
		});
	}
})