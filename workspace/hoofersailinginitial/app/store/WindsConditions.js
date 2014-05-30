// Winds subclass configured for getting current conditions
Ext.define('HooferSailingMobile.store.WindsConditions', {

	extend: 'HooferSailingMobile.store.Winds',

	// Gets the past five minutes of buoy data to calculate current
	// speed and direction. We're averaging the speeds.

	// Note: The interval setting seems to be ignored by the 
	// buoy server. It's always returning five second data, which
	// is maybe a little more than we'd like. I think five minutes at
	// ten second intervals is probably fine.
	
	config: {
		symbols: 'dir:spd:wt_1.0:skin',
		interval: '00:00:10',
		begin: '-00:10:00',
		averageKnots: 0,
		gusts: 0,
		weightedAverage: true,
		windDirectionRose: 0,
		waterTemperature: 0,
		groupField: 'windDirectionRose'
	}

});