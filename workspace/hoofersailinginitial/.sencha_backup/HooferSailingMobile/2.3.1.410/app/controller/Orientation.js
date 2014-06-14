Ext.define('HooferSailingMobile.controller.Orientation', {
    extend: 'Ext.app.Controller',
    compassPoints: null,
    config: {

        refs: {
            windsForecast: 'windsforecast'
        },

        control: {
            viewport: {
                orientationchange: 'onViewportOrientationChange'
            },
            conditions: {
                firsttime: 'onConditionsPainted'
            }
        }
    },
    onConditionsPainted: function(conditions) {
        var dom = conditions.element.dom;
        this.getWindsForecast().setSize({
            height: dom.clientHeight,
            width: dom.clientWidth
        })
    },
    onViewportOrientationChange: function() {
        var conditions = this.getConditions();
        this.getWindsForecast().setSize({
            height: conditions.getHeight(),
            width: conditions.width
        })
    }

});