  Ext.define('HooferSailingMobile.view.RefreshRatePreference', {
  extend: 'Ext.Container',
  xtype: 'refreshratepreference',
  title: 'Refresh Rate Preference',
  requires: [
    'Ext.TitleBar',
    'HooferSailingMobile.model.RefreshRatePreferenceModel', 
    'Ext.field.Select',
    'Ext.form.FieldSet',
    'HooferSailingMobile.model.Flag'
  ],
  refreshRateFromLocalstorage: null,
  autoRefresh: false,
  autoRefreshInterval: 5,
  config: {
    layout: 'vbox',
    items: [{
        title: 'RefreshRatePreferenceForm',
        items: [{
          title: 'RefreshRateSelectionList',
          xtype: 'fieldset',
          instructions: 'Please select a refresh rate.', // Redundant
          items: [{
            xtype: 'selectfield',
            id: '',
            label: 'Refresh: ', //Redundant
            options: [{
              text: 'Every thirty seconds',
              value: 30
            }, {
              text: 'Every minute',
              value: 60
            }, {
              text: 'Every five minutes',
              value: 300
            }, {
              text: 'Every ten minutes',
              value: 600
            }, ],
            listeners: {
              change: function(selectfieldObject, newValue, oldValue) {
                var container = selectfieldObject.up('refreshratepreference');
                container.fireEvent('change', container, newValue);

                //alert('XXXThis is: ' + this.$className);
                var me = this;
                me.saveRefreshRateToLocalStorage(newValue, oldValue);
                me.refreshRateFromLocalstorage = newValue;
                alert('The refresh rate now in localstorage is: ' + me.refreshRateFromLocalstorage);

              }
            },

            saveRefreshRateToLocalStorage: function(newValue, oldValue) {
              var me = this;
              localStorage.removeItem('refreshRatePreference');
              localStorage.removeItem('refreshRatePreference-ext-record-64');
              localStorage.removeItem('refreshRatePreference-ext-record-66');
              localStorage.removeItem('refreshRatePreference-ext-record-68');
              localStorage.removeItem('refreshRatePreference-ext-record-69');
              localStorage.removeItem('refreshRatePreference-ext-record-70');


              var refreshPrefModelClass = 'HooferSailingMobile.model.RefreshRatePreferenceModel';
              me.refreshPrefModelObject = Ext.create(refreshPrefModelClass, {
                preferredRefreshRate: newValue
              });
              me.refreshPrefModelObject.save(); 
            },


            retrieveRefreshRateFromLocalstorage: function() {
              var me = this;
              var readBackStore = new Ext.data.Store({
                model: 'HooferSailingMobile.model.RefreshRatePreferenceModel',
              });
              Ext.getStore(readBackStore).load();
              readBackStore.each(function(record) {
                console.log(me === this);
                me.refreshRateFromLocalstorage = record.get('preferredRefreshRate'); 
                alert('XXXThe refreshRateFromLocalstorage is: ' + me.refreshRateFromLocalstorage); //Fine here 
                alert('XXXThis is: ' + this.$className); // Fine?
              });
              /*
              switch (this.refreshRateFromLocalstorage) {    
                case '30':
                         
                    return 30;    
                case '60':
                          
                    return 60;
                case '300':
                         
                    return 300;    
                case '600':
                          
                    return 600;            
                default:
                              
                    return 300   
              }
              */
            },

          }] // End of selectfield 
        }] 
      }
    ]
  }, 



});