Ext.define('Winds.controller.Main', {
	extend: 'Ext.app.Controller',
	stores: ['WindData'],
	init: function() {
		this.control({
			'app-main': {
				reload: this.reload
			},
			'app-main #range': {
				click: this.showRange
			}
		})
	},
	reload: function() {
		this.getWindDataStore().fetch();
	},
	showRange: function(button) {
		var data = this.getWindDataStore().data;
		var min = 0;
		var max = 0;
		data.each(function(item) {
			debugger;
		});
	}
});