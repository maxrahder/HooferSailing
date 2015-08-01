Ext.define('Hoofers.view.conditions.FlagController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flag',
    requires: [],

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

    onFlagTap: function(flag) {
        var message = '<large>' + this.flagText[flag.getColor()] + '</large>';
        Ext.toast({
            style: 'background-color: white; font-size: 1.3em;',
            message: message,
            timeout: 5000
        });
        return;
    }
});