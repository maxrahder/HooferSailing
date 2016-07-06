Ext.define('Hoofers.util.Date', {
    singleton: true,
    /**
	Parse the buoy date string and return a Date.
	Buoy dates are Zulu time.
	Example date string: 2013-09-15 14:37:00
	*/
    parseBuoyDate: function(s) {
        var year = s.substr(0, 4);
        var month = s.substr(5, 2);
        var day = s.substr(8, 2);
        var hour = s.substr(11, 2);
        var minute = s.substr(14, 2);
        var second = s.substr(17, 2);
        var timestamp = Date.UTC(year, month, day, hour, minute, second);
        var result = new Date(timestamp);
        return result;
    }
});