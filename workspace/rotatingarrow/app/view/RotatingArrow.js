Ext.define('RotatingArrow.view.RotatingArrow', {
	extend: 'Ext.Component',
	xtype: 'rotatingarrow',
	config: {
		degrees: 0,

		// width: 400,
		// height: 400,

		html: '<div class="rotating-arrow-viewport"><div class="rotating-arrow-circle"><div class="rotating-arrow-arrow"></div"></div"></div">',

	},
	initialize: function() {
		this.callParent();
		this.arrowDiv = this.element.down('div.rotating-arrow-arrow');
	},
	updateDegrees: function(degrees) {
		if (this.arrowDiv) {
			// The original image points to the right,
			// so rotating 0 would look like the wind was
			// from 270 degrees. Therefore, add 90 to 
			// any setting.
			var d = (degrees + 90) % 360;
			var rotate = 'rotate(' + d + 'deg)';
			this.arrowDiv.setStyle({
				transform: rotate,
				'-ms-transform': rotate,
				'-webkit-transform': rotate
			});
		}
	}
});