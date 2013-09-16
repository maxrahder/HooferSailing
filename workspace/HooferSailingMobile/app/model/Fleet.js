Ext.define('Fleet', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'fleetId', type: 'int' },
            { name: 'fleetName', type: 'string' }
        ]
        hasMany: 'Boat' 
    }
});