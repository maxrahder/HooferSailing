Ext.define('User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'boatId', type: 'int' },
            { name: 'boatName', type: 'string' },
            { name: 'boatHull', type: 'string' },
        ],
        belongsTo: 'Fleet'
    }
});
