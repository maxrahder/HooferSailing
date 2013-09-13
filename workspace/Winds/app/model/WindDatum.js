Ext.define('Winds.model.WindDatum', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'air_temp', type: 'auto' },
        { name: 'wind_speed', type: 'auto' },
        { name: 'wind_direction', type: 'auto' },
        { name: 'wt_DEPTH', type: 'auto' }

    ]
});
