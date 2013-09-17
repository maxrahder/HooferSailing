Ext.define('Fleet', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'boats' }
        ],
        hasMany: 'Boat' 
    }
});