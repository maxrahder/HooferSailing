Ext.define('Hoofers.model.Boat', {
    extend: 'Ext.data.Model',
    requires: ['Hoofers.util.Util'],

    // Assumes a feed of: {name: '', status: '', id: '', purpose: '', 'checkout: ''}

    statics: {
        statusCodes: ['Available', 'Secured', 'Reserved', 'Checked out']
    },

    fields: ['statusCode', 'name', {
            name: 'sort',
            calculate: function(data) {
                var matches = /#\d*/.exec(data.name);
                if (!matches || (matches.length === 0)) {
                    result = data.name;
                } else {
                    result = Ext.String.leftPad(matches[0].substr(1), 5, '0');
                }
                return result;
            }
        }, {
            name: 'status',
            convert: function(value, record) {
                // return HooferSailingMobile.model.Boat.statusCodes[1];
                return Hoofers.model.Boat.statusCodes[record.data.statusCode - 1];
            }
        },
        'checkout', {
            name: 'isOut',
            calculate: function(data) {
                return (data.statusCode === 4);
            }
        }, {
            name: 'isAvailable',
            calculate: function(data) {
                return (data.statusCode === 1);
            }
        }, {
            name: 'outTime',
            calculate: function(data) {
                var result = null;
                if (data.checkout) {
                    // We're using the moment.js library. See http://momentjs.com/
                    result = moment(data.checkout).toDate();
                }
                return result;
            }
        },
        'use', {
            name: 'outAgo',
            calculate: function(data) {
                return Hoofers.util.Util.hoursMinutes(data.outTime);
            }
        }
    ]

});
