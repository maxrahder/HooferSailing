Ext.define('HooferSailingMobile.model.RefreshRatePreferenceModel', {
    //extend: 'Ext.util.Observable',
    extend: "Ext.data.Model",
    requires: [

    ],
    config: {

        fields: [
            {name: 'preferredRefreshRate', type: 'string'}
        ],
    
        proxy: {
            type: 'localstorage',
            id: 'refreshRatePreference'
        }
    }
});
