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
            xtype: 'selectfield', // Use slider instead?
            id: '', // Not currently used
            options: [ 
              { text: 'Click to change your refresh rate',  // (It's a bug that the placeholder config doesn't work?)
                value: null
              },
              { text: 'Refresh every thirty seconds',
                value: 120
              }, 
              { text: 'Refresh every minute',
                value: 60
              }, 
              { text: 'Refresh every five minutes',
                value: 12
              }, 
              { text: 'Refresh every ten minutes',
                value: 6
              }, 
              { text: 'Refresh every thirty minutes',
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