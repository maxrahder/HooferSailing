Ext.define('HooferSailingMobile.model.SunriseSunset', {
	extend: 'Ext.util.Observable',
	singleton: true,
	sunrise: null,
	sunset: null,
	load: function() {
		var me = this;
		Ext.data.JsonP.request({
			url: '//api.wunderground.com/api/b2e26ece224ebd4d/astronomy/q/WI/Madison.json',
			success: function(result, request) {
				var sun = result.sun_phase;
				me.sunrise = moment(sun.sunrise.hour + ':' + sun.sunrise.minute, 'H:m').toDate();
				me.sunset = moment(sun.sunset.hour + ':' + sun.sunset.minute, 'H:m').toDate();
				me.fireEvent('load', me, me.sunrise, me.sunset);
			},
			failure: function() {
				//alert('jsonp failed');
			},
		})
	}
});