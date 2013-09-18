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
		}, 'loan', {
			name: 'isOut',
			convert: function(value, record) {
				return !Ext.isEmpty(record.data.loan.out);
			}
		}, {
			name: 'outTime',
			convert: function(value, record) {
				console.log('outTime');
				var result = null;
				if (record.data.loan.out) {
					// We're using the momenent.js library. See http://momentjs.com/
					result = moment(record.data.loan.out).toDate();
				}
				return result;
			}
		}, {
			name: 'outPurpose',
			convert: function(value, record) {
				return record.data.loan.purpose || '';
			}
		}, {
			name: 'outAgo',
			convert: function(value, record){
				var outTime = record.get('outTime');
				if (outTime){
					var pluralize = HooferSailingMobile.util.Util.pluralize;
					var elapsed = Ext.Date.getElapsed(HooferSailingMobile.now, outTime);
					var seconds = Math.round(elapsed/1000, 0);
					var minutes = Math.round(seconds/60, 0);
					var hours = Math.floor(minutes/60, 0);
					minutes = (minutes % 60);
					var result = (hours?pluralize(hours,'hour') + ' ':'') + pluralize(minutes,'minute');
					return result;
				}
			}
		}]
	}
});