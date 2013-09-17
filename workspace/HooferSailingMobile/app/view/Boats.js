Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		items: [{
			title: 'Boats',
			xtype: 'dataview',
			store: 'Fleets',
			itemTpl: '{name}<hr/>',
			listeners: {
				itemtap: function(dataview, index, target, record) {
					var navigationView = dataview.up('navigationview');
					var boats = record.boats();
					boats.sort([{
						property: 'isOut',
						direction: 'ASC'
					}, {
						property: 'hull',
						direction: 'ASC'
					}]);
					navigationView.push({
						xtype: 'dataview',
						title: 'Availability',
						store: boats,
						itemTpl: [
							'<table',
							'    style="',
							'    height: 64px; ',
							'    border-bottom: solid 1px #555555; ',
							'    width: 100%',
							'">',
							'<tr>',
							'<td valign="middle" ',
							'    style="',
							'    font-family: Pictos; ',
							'    font-size: 200%; ',
							'    width: 38px; ' ,
							'    valign: middle; ',
							'    color: {[values.isOut ? "red" : "green"]}; ',
							'">',
							'{[values.isOut ? "&#42;" : "&#51;"]}',
							'</td>',
							'<td valign="middle">',
							'Boat {hull}<br/>',
							'{[values.isOut ? values.outPurpose + " " + values.outAgo: "Available"]}',
							'</td></tr></table>'
						]
					});
				}
			}
		}]
	}
});