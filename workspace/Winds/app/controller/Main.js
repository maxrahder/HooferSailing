Ext.define('Winds.controller.Main', {
  extend: 'Ext.app.Controller',
  stores: ['WindData'],
  refs: [{
    ref: 'averageField',
    selector: 'app-main #average'
  }, {
    ref: 'gustingField',
    selector: 'app-main #gusting'
  }],
  init: function() {
    this.control({
      'app-main': {
        reload: this.reload
      },
      'app-main #movingAverage': {
        click: this.movingAverageClickHandler
      }
    });
    this.getWindDataStore().on('fetched', this.windDataStoreLoadHandler, this);
  },
  reload: function() {
    this.getWindDataStore().fetch();
  },
  windDataStoreLoadHandler: function(store) {
    this.getAverageField().setValue(Math.round(store.getAverageKnots(), 0));
    this.getGustingField().setValue(Math.round(store.getGusts(), 0));
  },
  movingAverageClickHandler: function(button) {
    var store = this.getWindDataStore();
    store.setWeightedAverage(button.pressed);
    store.fetch();
  }


});