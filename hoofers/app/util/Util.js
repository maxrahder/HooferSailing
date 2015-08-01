Ext.define('Hoofers.util.Util', {
    singleton: true,
    config: {

    },
    pluralize: function(count, oneString, pluralString) {
        pluralString = pluralString || oneString + 's';
        return count + ' ' + ((count == 1) ? oneString : pluralString);
    }
});