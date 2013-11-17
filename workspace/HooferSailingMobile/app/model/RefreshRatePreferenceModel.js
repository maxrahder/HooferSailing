Ext.define('HooferSailingMobile.model.RefreshRatePreferenceModel', {
    //extend: 'Ext.util.Observable',
    //singleton: true,
    extend: "Ext.data.Model",
    requires: [

    ],
    config: {

        fields: [{
            name: 'preferredRefreshRate',
            type: 'string'
        }],

        proxy: {
            type: 'localstorage',
            id: 'refreshRatePreference'
        }
    }
});