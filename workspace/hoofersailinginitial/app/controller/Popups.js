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
	flagText: {
		"blue-red": 'Very heavy winds. Only specially-rated sailors may sail. See <a href="http://hoofersailing.org/?q=instruction/safety/flags" target="_blank"> the Ground School Manual</a> for details.',
		"blue-yellow": 'Heavy winds. Only heavy-rated sailors may sail <i>within</i> the yellow line.',
		"blue": 'Heavy winds. Only heavy-rated sailors may sail.',
		"checkingtheflag": 'Checking conditions with UW Lifesaving.',
		"green-yellow": 'Light winds. Sailors with a light weather rating may sail <i>within</i> the yellow line.',
		"green": 'Light winds. Sailors with a light weather rating may sail.',
		"none": 'The lake is closed. UW Lifesaving is closed. No sailing.',
		"red": 'The lake is closed. No sailing.',
		"tango-yellow": 'Heavy winds. Only heavy-rated sailors may sail <i>within</i> the yellow line. Heavy testouts are being given.',
		"tango": 'Heavy winds. Only heavy-rated sailors may sail. Heavy testouts are being given.'
	},

	onConditionsFlagTap: function(flag) {
		this.conditionsFlagPopup = this.conditionsFlagPopup || Ext.create('Ext.Panel', {
			xtype: 'panel',

			left: 0, // Make it floating
			padding: 4,

			modal: true,
			hideOnMaskTap: true

		});
		var color = flag.getColor();
		this.conditionsFlagPopup.setHtml(this.flagText[color]);
		this.conditionsFlagPopup.showBy(flag);
	}



});