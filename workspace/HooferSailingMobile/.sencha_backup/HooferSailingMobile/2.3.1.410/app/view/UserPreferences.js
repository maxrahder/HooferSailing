Ext.define('HooferSailingMobile.view.UserPreferences', {
  extend: 'Ext.Container',  // Is this the best choice?
  xtype: 'userpreferences',
  requires: [
    'Ext.TitleBar',
    'HooferSailingMobile.model.RefreshRatePreferenceModel', // Why isn't this necessary?
    'Ext.field.Select',
    'Ext.form.FieldSet',
  ],
  config: {
    layout: {
      type: 'vbox',
    },
    items: [ 
      { xtype: 'fieldset',
        title: 'User Preferences',
        items: [ 
          { label: 'Refresh Rate: ',
            labelWidth: 120,
            xtype: 'selectfield', // Use slider instead?
            id: '', // Not currently used
            options: [ 
              { text: 'Change Rate',  // (It's a bug that the placeholder config doesn't work?)
                value: null
              },
              { text: 'Every 30 seconds',
                value: 120
              }, 
              { text: 'Every minute',
                value: 60
              }, 
              { text: 'Every 5 minutes',
                value: 12
              }, 
              { text: 'Every 10 minutes',
                value: 6
              }, 
              { text: 'Every 30 minutes',
                value: 2
              }
            ],
            listeners: {
              change: function(selectfieldObject, newValue) { 
                var me = this;
                me.saveRefreshRateToLocalStorage(newValue);
                var container = selectfieldObject.up('userpreferences');
                container.fireEvent('change', container, newValue);
              }
            },

            saveRefreshRateToLocalStorage: function(newValue) {
              var me = this;  
              var refreshPrefModelClass = 'HooferSailingMobile.model.RefreshRatePreferenceModel';
              var refreshPrefModelObject = Ext.create(refreshPrefModelClass, {
                preferredRefreshRate: newValue
              });
              localStorage.removeItem('refreshRatePreferenceId');
              refreshPrefModelObject.save(); 
            },
          } // End of refresh rate preference selectfield
        ]  
      }
    ] 
  }, 
});