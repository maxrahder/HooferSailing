/**
This isn't used right now. Maybe when we get back to the chart we'll use it.
*/

Ext.define('HooferSailingMobile.store.CompassPoints', {
	extend: 'Ext.util.Observable',
	requires: ['HooferSailingMobile.util.Compass'],
	config: {
		winds: null
	},
	constructor: function(config) {
		var me = this;
		this.initConfig(config);
		this.callParent(arguments);
		me.initData();
		this.getWinds().on('fetch', this.refresh(), this);
	},
	refresh: function() {
		// The winds store groups its data by "windDirectionRose" --
		// a value like N, NE, NNE, etc.
		// Set frequency to the number of items in the group.
		// Set averageKnows to the average of those values.

		var me = this;
		var groups = this.getWinds().getGroups();
		if (groups.length === 0) {
			return;
		}
		var biggestGroup = groups[0];
		Ext.Array.forEach(groups, function(g) {
			if (g.children.length > biggestGroup.children.length) {
				biggestGroup = g;
			}
		});
		var radiusUnit = biggestGroup.children.length;

		Ext.Array.forEach(groups, function(group) {
			var direction = group.name;
			var frequency = group.children.length;

			var recordData = Ext.Array.pluck(group.children, 'data');

			var allKnots = Ext.Array.pluck(recordData, 'windSpeedKnots');
			var averageKnots = Math.round(Ext.Array.mean(allKnots));

			var compassPoint = me.data[direction];
			if (compassPoint) {
				compassPoint.frequency = frequency;
				compassPoint.averageKnots = (averageKnots / 30) * radiusUnit
			}
		});
		this.fireEvent('refresh', me);
	},
	updateWinds: function(winds) {
		this.refresh();
	},
	initData: function() {
		var me = this;
		me.data = {};
		Ext.Array.forEach(HooferSailingMobile.util.Compass.rosePoints, function(rose) {
			me.data[rose] = {
				frequency: 0,
				averageKnots: 0
			};
		});
		// Assert: This has a data property indexed by each value in the compass
		// rose. Each of those is initialized to {frequency:0, averageKnots: 0}
	}
});