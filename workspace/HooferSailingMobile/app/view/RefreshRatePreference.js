// The refresh rate is currently set in the controller. Want it set from localStorage.
Ext.define('HooferSailingMobile.view.RefreshRatePreference', {
    extend: 'Ext.Container',
	xtype: 'refreshratepreference',
	title: 'Refresh Rate Preference',
    requires: [
        'Ext.TitleBar',
        //'HooferSailingMobile.model.RefreshRatePreferenceModel',
        'HooferSailingMobile.store.RefreshRatePreferenceStore',
        'Ext.field.Select',
        'Ext.form.FieldSet'
    ],
    config: {
        store: null, // Needed(?) to be initialized here to create a property, which is set later.
        layout: 'vbox',
        items: [
            {title: 'RefreshRatePreferenceForm',
            items: [
            	{title: 'RefreshRateSelectionList',
            	xtype: 'fieldset',
                instructions: 'Please select a refresh rate.', // Redundant
                items: [
                	{xtype: 'selectfield',
                    id: '',
                    label: 'Refresh: ', //Redundant
                    options: [
                    	{
                        	text: 'Every thirty seconds',
                        	value: 'half'
                    	}, {
                            text: 'Every minute',
                            value: 'one'
                        }, { 
                        	text: 'Every five minutes',
                        	value: 'five'
                    	}, {
                        	text: 'Every ten minutes',
                        	value: 'ten'
                    	},

              		],
                    listeners: {                                
                        change: function(selectfieldObject, newValue) {
                            alert(" The new value is: " + newValue);
                            //localStorage.removeItem('refreshRatePreference');
                            //localStorage.removeItem('refreshRatePreference-ext-record-78');

                            /* 
                            //This has been superseded by the addition of RefreshRatePreferenceStore
                            var prefsModelClass = 'HooferSailingMobile.model.RefreshRatePreferenceModel';
                            var prefsModelObject = Ext.create(prefsModelClass, {preferredRefreshRate: newValue});
                            prefsModelObject.save(); // Syncs(?) to localstorage but bypasses use of a store
                            */
                            /*
                            var refreshPrefModelClass = 'HooferSailingMobile.model.RefreshRatePreferenceModel';
                            var refreshPrefModelObject = Ext.create(refreshPrefModelClass, {preferredRefreshRate: newValue});
                            alert("The model object is " + refreshPrefModelObject);
                            */
                            ///*
                            var me = this;
                            var store = me.getStore();
                            if (Ext.isString(store)) {
                                store = Ext.getStore(store);
                                me.setStore(store);
                            }
                            //*/
                            /*
                            var store = 'HooferSailingMobile.store.RefreshRatePreferenceStore';
                            var me = this;
                            me.setStore(store);
                            */
                            store.add({preferredRefreshRate: newValue}); // add() instantiates model instances and adds them
                            store.sync();
                            //Ext.getStore(store).sync();
                            //store.remove(0);

                            //var refreshPrefStoreClass = 'HooferSailingMobile.model.RefreshRatePreferenceStore';
                            //var refreshPrefStoreObject = Ext.create(refreshPrefStoreClass);
                            //var refreshPrefStoreObject = Ext.create('HooferSailingMobile.model.RefreshRatePreferenceStore');
                            alert("The store's id is " + store.id);
                            alert("The store's data is " + store.data);
                            alert("The store's first record is " + store.getAt(0));
                            alert("The store's count is " + store.getCount());

        // store is presumably the correct store, because it knows to use the localstorage proxy.
        // currently store.add() adds to the store's count and store.sync() adds a name to the localstorage namespace, 
            // but doesn't add the key/value pair


                            ///*
                            Ext.getStore(store).load()
                            store.each(function(record){ 
                                alert('The value retrieved from localstorage is: ' + record.get('preferredRefreshRate'));  
                            });
                            //*/
                        }
                    },
                    }, // End of selectfield 
                ]} // End of RefreshRateSelectionList
            ]}, // End of UserPreferencesForm



            /*
            {
            title: '2nd Display Item'
            xtype: 'component',
            itemId: 'tpl',
            tpl: [
                '<div ',
                '   style= ', 
                '		"vertical-align: middle;',
                '    	margin-top: 0em; ',
                '">',

                '	<p ',
                '		style="',
                '    		text-align: center; ',
                '    		font-size: 3em; ',
                '	">',

                '		<b>{knots}</b> kn',

                '	</p>',

                '</div>'
            ] // End of tpl
            
        } // End of second display item
        */
        ]

    }, // End of config

    updateRefreshRate: function(newRate) {
        HooferSailingMobile.controller.Boats.setAutoRefreshInterval(newRate);
    },



});