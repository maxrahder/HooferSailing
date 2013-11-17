Ext.define('HooferSailingMobile.model.RefreshRatePreferenceModel', {
    //extend: 'Ext.util.Observable',
    extend: "Ext.data.Model",
    requires: [

    ],
    config: {

        fields: [
            {name: 'preferredRefreshRate', type: 'string'},
            //{name: 'id', type: 'int'}  // This id field was intended to facilitate the removal of old values from localstorage
        ],
    
        proxy: {
            type: 'localstorage',
            id: 'refreshRatePreference'
        }
    }
});
