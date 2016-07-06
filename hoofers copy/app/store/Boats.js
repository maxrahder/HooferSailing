Ext.define('Hoofers.store.Boats', {
    extend: 'Ext.data.Store',
    alias: 'store.boats',
    requires: [
        'Hoofers.model.Boat'
    ],
    model: 'Hoofers.model.Boat',
    proxy: {
        type: 'memory'
    },
    sorters: [{
        property: 'status',
        direction: 'ASC'
    }, {
        property: 'outTime',
        direction: 'ASC'
    }, {
        property: 'sort', // name
        direction: 'ASC'
    }]
});