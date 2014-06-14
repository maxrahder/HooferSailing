Ext.define('HooferSailingMobile.controller.Popups', {
	extend: 'Ext.app.Controller',
	requires: [],

	config: {

		refs: {
			conditionsFlag: 'conditionsflag'
		},

		control: {

			'conditionsflag': {
				tap: 'onConditionsFlagTap'
			}

		}


	},

	onConditionsFlagTap: function(flag) {
		this.conditionsFlagPopup = this.conditionsFlagPopup || Ext.create('Ext.Panel', {
			xtype: 'panel',

			left: 0, // Make it floating
			//padding: 4,

			modal: true,
			hideOnMaskTap: true,
			height: 120,
			width: 220,

			html: 'Green Flag: Light winds. Sailors with a light weather rating may sail.',

			// Set the width and height of the panel
			// Style the content and make it scrollable
			styleHtmlContent: true,
			scrollable: true
		});
		this.conditionsFlagPopup.showBy(flag);
	}



});