Ext.define('Hoofers.util.Units', {
    extend: 'Ext.Base',
    statics: {
        addEnum: function(config) {
            console.log('addEnum');
            this[config.id] = config;
        }
    }
}, function(klass) {
    // Each id must be unique to get instances via Hoofers.util.Units[id]
    this.addEnum({
        id: 'KNOTS',
        name: 'Knots',
        abbreviation: 'kt',
        convertFromMPS: function(mps) {
            return (1.9438477170141168493 * mps);
        }
    });
    this.addEnum({
        id: 'MPH',
        name: 'Miles per hour',
        abbreviation: 'mph',
        convertFromMPS: function(mps) {
            return (2.23694 * mps);
        }
    });
    this.addEnum({
        id: 'MPS',
        name: 'Meters per second',
        abbreviation: 'm/s',
        convertFromMPS: function(mps) {
            return mps;
        }
    });
    this.addEnum({
        id: 'KPH',
        name: 'Kilometers per hour',
        abbreviation: 'km/h',
        convertFromMPS: function(mps) {
            return (3.6000059687997 * mps);
        }
    });
    this.addEnum({
        id: 'F',
        name: 'Fahrenheit',
        abbreviation: 'F',
        convertFromC: function(c) {
            return (c * 9 / 5) + 32;
        }
    });
    this.addEnum({
        id: 'C',
        name: 'Centigrade',
        abbreviation: 'C',
        convertFromC: function(c) {
            return c;
        }
    });
    this.addEnum({
        id: 'K',
        name: 'Kelvin',
        abbreviation: 'K',
        convertFromC: function(c) {
            return (c + 273.15);
        }
    });

});
