Ext.define('HooferSailingMobile.view.Rose', {
	extend: 'Ext.Container',
	xtype: 'rose',
	requires: [
		'Ext.draw.Component',
		'Ext.draw.sprite.Image',
		'Ext.chart.interactions.Rotate'
	],
	rotate: function(degrees) {
		//debugger;
		var draw = this.down('draw');
		var surface = draw.getSurface();
		var image = surface.getItems().get('image');
		image.setAttributes({
			rotation: degrees
		});
		image.repaint();
		surface.repaint();
	},
	config: {

		store: null,

		layout: 'fit',

		items: [
			{
				xtype: 'draw',
				viewBox: true,
				items: [{
					type: 'image',
					height: 100,
					width: 100,
					rotation: 0,
					id: 'image',
					src: 'resources/images/CompassRoseWindDirectionSimple.png'
				}]

			}
		]

	},
	initialize: function() {
		var me = this;
		// The calling routine specifies the store. That may be an actual Ext.data.Store
		// object, or the string name of a store. So take a look and if it's a string
		// then get the actual store object via Ext.getStore() and have the Rose's
		// store property reference that, rather than the string.
		var store = me.getStore();
		if (Ext.isString(store)) {
			store = Ext.getStore(store);
			me.setStore(store);
		}

		// Assert: store (and me.getStore()) reference a store object for the winds.
		// When it's reloaded the fetch event is fired. When that happens update the
		// contents of the Conditions tpl with properties from the store.
		store.on('fetch', function(winds) {
			var roseDirection = winds.getWindDirectionRose();
			var degrees = HooferSailingMobile.util.Compass.roseToDegrees(roseDirection);
			me.rotate(degrees);
		});

		this.callParent();

	}
});