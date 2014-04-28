Ext.define('HooferSailingMobile.model.RefreshRatePreferenceModel', {
    extend: "Ext.data.Model",
    config: {

        fields: [
            {   name: 'id',                     defaultValue: 0},
            {   name: 'preferredRefreshRate',   defaultValue: 12} // In refreshes per hour
        ],

        proxy: {
            type: 'localstorage',
            id: 'refreshRatePreferenceId'
        }
    }
});