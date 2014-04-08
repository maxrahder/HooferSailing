Ext.define('HooferSailingMobile.model.Boat', {
	extend: 'Ext.data.Model',

	// Assumes a feed of: {name: '', status: '', id: '', purpose: '', 'checkout: ''}

	statics: {
		statusCodes: ['Available', 'Secured', 'Reserved', 'Checked out']
	},

	config: {
		fields: ['name', 'statusCode', {
			name: 'status',
			convert: function(value, record) {
				return HooferSailingMobile.model.Boat.statusCodes[record.data.statusCode];
			}
		}, 'checkout', {
			name: 'isOut',
			convert: function(value, record) {
				return !Ext.isEmpty(record.data.checkout);
			}
		}, {
			name: 'outTime',
			convert: function(value, record) {
				var result = null;
				if (record.data.checkout) {
					// We're using the moment.js library. See http://momentjs.com/
					result = moment(record.data.checkout).toDate();
				}
				return result;
			}
		}, 'purpose', {
			name: 'outAgo',
			convert: function(value, record) {
				var outTime = record.get('outTime');
				if (outTime) {
					var pluralize = HooferSailingMobile.util.Util.pluralize;
					var elapsed = Ext.Date.getElapsed(HooferSailingMobile.now, outTime);
					var seconds = Math.round(elapsed / 1000, 0);
					var minutes = Math.round(seconds / 60, 0);
					var hours = Math.floor(minutes / 60, 0);
					minutes = (minutes % 60);
					var result = (hours ? pluralize(hours, 'hour') + ' ' : '') + pluralize(minutes, 'minute');
					return result;
				}
			}
		}]
	}
});