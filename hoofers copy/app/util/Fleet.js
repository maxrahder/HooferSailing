Ext.define('Hoofers.util.Fleet', {
    extend: 'Ext.Base',
    singleton: true,

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

    fetch: function() {
        var me = this;
        var deferred = new Ext.Deferred()

        Ext.data.JsonP.request({
            url: 'http://members.hoofers.org/api/equipment/status?club_ID=7',
            success: function(response) {
                var root = {
                    text: 'Root',
                    children: []
                };
                // Omit Winter Kiting, Tanks, and within Techs, Tech Sails.
                Ext.Object.each(response, function(key, value, object) {
                    if (!((key === 'Winter Kiting') || (key === 'Tanks') || (key === 'Tools'))) {
                        var fleet = {};
                        fleet.text = key;
                        fleet.children = [];
                        // Populate the boats array
                        Ext.Array.forEach(value, function(item) {
                            if (item.name.indexOf('Tech Sail') !== 0) {
                                fleet.children.push(me.getItem(item));
                            }
                        });
                        fleet.children.sort(me.sortBoats);
                        root.children.push(fleet);
                    }
                });
                deferred.resolve(root);
            }
        });
        return deferred.promise;
    },
    sortBoats: function(a, b) {
        var result = (a.status.sort - b.status.sort);
        if (result === 0) {
            result = a.checkout.localeCompare(b.checkout);
            if (result === 0) {
                result = a.text.localeCompare(b.text);
            }
        }
        return result;
    },

    getItem: function(item) {
        var me = this;
        var o = {
            checkout: '',
            use: '',
            leaf: true
        };
        o.id = item.equipment_ID;
        o.text = item.name;
        o.status = me._status[item.status];
        if (item.checkout) {
            o.checkout = item.checkout.checkouttime;
            o.use = item.checkout.usage;
        }
        return o;
    },
    _status: {
        1: {
            text: 'Available',
            sort: 1
        },
        2: {
            text: 'Secured',
            sort: 4
        },
        3: {
            text: 'Reserved',
            sort: 3
        },
        4: {
            test: 'Checked out',
            sort: 2
        }
    }

});
