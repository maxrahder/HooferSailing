Ext.define('Hoofers.util.Util', {
    singleton: true,
    config: {

    },
    pluralize: function(count, oneString, pluralString) {
        pluralString = pluralString || oneString + 's';
        return count + ' ' + ((count == 1) ? oneString : pluralString);
    },
    // Returns a sentence stating how many hours and minutes in the past
    hoursMinutes: function(date) {
        if (date) {
            var elapsed = Ext.Date.getElapsed(Hoofers.now, date);
            var seconds = Math.round(elapsed / 1000, 0);
            var minutes = Math.round(seconds / 60, 0);
            var hours = Math.floor(minutes / 60, 0);
            minutes = (minutes % 60);

            var pluralize = Hoofers.util.Util.pluralize;
            var result = (hours ? pluralize(hours, 'hour') + ' ' : '') + pluralize(minutes, 'minute');
            return result;
        } else {
            return '';
        }
    }
});
