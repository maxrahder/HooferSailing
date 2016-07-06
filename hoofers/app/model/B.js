Ext.define('Hoofers.model.B', {
    extend: 'Ext.data.TreeModel',
    requires: ['Hoofers.util.Util'],

    // Assumes a feed of: {name: '', status: '', id: '', purpose: '', 'checkout: ''}

    statics: {
        statusCodes: ['', 'Available', 'Secured', 'Reserved', 'Checked out']
    },

    fields: ['status', 'name', 'use', {
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
            name: 'statusText',
            calculate: function(data) {
                return Hoofers.model.Boat.statusCodes[data.statusCode];
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
        }, {
            name: 'outAgo',
            calculate: function(data) {
                var outTime = data.outTime;
                if (outTime) {
                    var pluralize = Hoofers.util.Util.pluralize;
                    var elapsed = Ext.Date.getElapsed(Hoofers.now, outTime);
                    var seconds = Math.round(elapsed / 1000, 0);
                    var minutes = Math.round(seconds / 60, 0);
                    var hours = Math.floor(minutes / 60, 0);
                    minutes = (minutes % 60);
                    var result = (hours ? pluralize(hours, 'hour') + ' ' : '') + pluralize(minutes, 'minute');
                    return result;
                }
            }
        }
    ]

});
