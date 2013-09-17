Ext.define('User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'hull', type: 'string' },
            { name: 'loan' },
        ],
        belongsTo: 'Fleet'
    }
});
