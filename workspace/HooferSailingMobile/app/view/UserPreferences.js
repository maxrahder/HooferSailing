// The refresh rate is currently set in the controller. Want it set from localStorage.
Ext.define('HooferSailingMobile.view.UserPreferences', {
    extend: 'Ext.Container',
	xtype: 'userpreferences',
	title: 'User Preferences',
    requires: [
        'Ext.TitleBar',
        'HooferSailingMobile.controller.Boats',
        //'HooferSailingMobile.model.UserPreferencesModel',
        'Ext.field.Select',
        'Ext.form.FieldSet'
    ],
    config: {
        layout: 'vbox',
        items: [
            {title: 'UserPreferencesForm',
            items: [
            	{title: 'RefreshRateSelectionList',
            	xtype: 'fieldset',
                instructions: 'Please select a refresh rate.', // Redundant
                items: [
                	{xtype: 'selectfield',
                    id: '',
                    label: 'Refresh every: ', //Redundant
                    options: [
                    	{
                        	text: 'Thirty seconds',
                        	value: 'half'
                    	}, {
                            text: 'One minute',
                            value: 'one'
                        }, { 
                        	text: 'Five minutes',
                        	value: 'five'
                    	}, {
                        	text: 'Ten minutes',
                        	value: 'ten'
                    	},

              		],
                    listeners: {                                
                        change: function(refreshValue) {

                            alert("The refreshValue is " + refreshValue.getValue());
                            localStorage.removeItem('userPreferences'); 
                            var prefsModelClass = 'HooferSailingMobile.model.UserPreferencesModel'
                            var prefsModelObject = Ext.create(prefsModelClass, {preferredRefreshRate: refreshValue});
                            prefsModelObject.save();
                            

                            //localStorage.removeItem('userPreferences-ext-record-77'); // Works
                            //localStorage.removeItem('userPreferences'); // Works
                            //var uP = localStorage.userPreferences; // Works

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