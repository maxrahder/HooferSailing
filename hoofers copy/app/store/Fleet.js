Ext.define('Hoofers.store.Fleet', {
    extend: 'Ext.data.Store',
    alias: 'store.fleet',
    requires: [
        'Hoofers.model.Fleet',
        'Hoofers.store.Boats'
    ],

    model: 'Hoofers.model.Fleet',
    proxy: {
        type: 'memory'
    },
    sorters: ['name'],

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
            // url: 'http://hoofers.staging.threelakessoftware.com/api/equipment/status',
            url: 'http://members.hoofers.org/api/equipment/status?club_ID=7',
            params: {
                club_ID: 7
            },
            success: function(response) {

                var root = {};

                var data = [];
                // Omit Winter Kiting, Tanks, and within Techs, Tech Sails.
                Ext.Object.each(response, function(key, value, object) {

                    if (!((key === 'Winter Kiting') || (key === 'Tanks') || (key === 'Tools'))) {


                        var datum = {};

                        datum.name = key;
                        datum.boats = [];

                        // Populate the boats array
                        Ext.Array.forEach(value, function(item) {
                            if (item.name.indexOf('Tech Sail') !== 0) {
                                var o = {};
                                o.id = item.equipment_ID;

                                o.name = item.name;
                                if (item.checkout) {
                                    o.checkout = item.checkout.checkouttime;
                                    o.use = item.checkout.usage;
                                }
                                o.statusCode = item.status;
                                datum.boats.push(o);
                            }
                        });
                        data.push(datum);
                    }

                });
                me.setData(data);
                // I shouldn't have to do this.
                me.each(function(record) {
                    var store = Ext.create('Hoofers.store.Boats', {
                        data: record.data.boats
                    });
                    record.boats = store;
                });
            }
        });
    }
})
