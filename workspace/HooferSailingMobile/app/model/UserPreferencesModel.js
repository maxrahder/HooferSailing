
Ext.define('HooferSailingMobile.model.UserPreferencesModel', {
    extend: "Ext.data.Model",
    requires: [

    ],
    config: {

        fields: [
            { name: 'preferredRefreshRate', type: 'string', defaultValue: 'five' }
        ],
    
        proxy: {
            type: 'localstorage',
            id: 'userPreferences'
        }
    }
});
