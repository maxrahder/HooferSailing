Ext.define('Winds.view.Main', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.layout.container.Fit',
		'Ext.tab.Panel',
		'Winds.view.WindGrid',
		'Winds.view.WindChart',
		'Winds.view.CompassRose',
		'Ext.panel.Panel',
		'Ext.form.field.Display'
	],
	layout: 'fit',
	xtype: 'app-main',
	tbar: [{ 
		text: 'Reload',
		itemId: 'reload',
		handler: function(button) {
			var panel = button.up('app-main');
			panel.fireEvent('reload', panel);
		}
	}, {
		text: 'Range',
		itemId: 'range'
	}],
	items: [{
		xtype: 'tabpanel',
		items: [{
			xtype: 'windgrid',
			title: 'Table',
			store: 'WindData'
		}, {
			title: 'Chart',
			tbar: [{
				xtype: 'button',
				enableToggle: true,
				text: 'Moving Average',
				pressed: true,
				itemId: 'movingAverage',
				glyph: '51@Pictos',
				handler: function(button){
					button.setGlyph(button.pressed?'51@Pictos':'42@Pictos')
				}
			},{
				xtype: 'displayfield',
				fieldLabel: 'Average',
				itemId: 'average',
				labelWidth: 30
			},{
				xtype: 'displayfield',
				fieldLabel: 'Gusting',
				itemId: 'gusting',
				labelWidth: 30
			},{
		xtype: 'slider',
		fieldLabel: 'Rotate',
		width: 200,
		minValue: 0,
		maxValue: 360,
		value: 315,
		listeners: {
			change: function(slider, value) {
				var draw = slider.up('compassrose draw');
				var sprite = draw.surface.items.first();
				sprite.setAttributes({
					rotation: {
						degrees: value
					}
				}, true);
			}
		}
	}],
			layout: 'fit',
			items: [{
				xtype: 'windchart',
				store: 'WindData'
			}]
		}, {
			title: 'Compass',
			xtype: 'compassrose',
			store: 'WindData'
		}]
	}]
});