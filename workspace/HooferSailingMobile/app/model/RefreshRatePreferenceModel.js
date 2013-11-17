Ext.define('HooferSailingMobile.model.RefreshRatePreferenceModel', {
    extend: "Ext.data.Model",
    config: {

        fields: [{
            name: 'preferredRefreshRate',
            type: 'string',
            defaultValue: 1000
        }],

        proxy: {
            type: 'localstorage',
            id: 'refreshRatePreference'
        }
    }
});