Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		items: [{
			title: 'Boats',
			xtype: 'dataview',
			store: 'Fleets',
			itemTpl: [
				'<div ',
				'    style="',
				'    height: 60px; ',
				'    border-bottom: solid 1px #555555; ',
				'    display:-webkit-box; ',
				'    padding: 4px; ',
				'    -webkit-box-align:center; ',
				'">',
				'{name}',
				'</div>'
			],
			listeners: {
				itemtap: function(dataview, index, target, record) {
					var navigationView = dataview.up('navigationview');
					var boats = record.boats();
					boats.sort([{
						property: 'isOut',
						direction: 'ASC'
					}, {
						property: 'outTime',
						direction: 'ASC'
					}, {
						property: 'hull',
						direction: 'DESC'
					}]);
					navigationView.push({
						xtype: 'dataview',
						title: record.get('name'),
						store: boats,
						itemTpl: [
							'<table',
							'    style="',
							'    height: 60px; ',
							'    border-bottom: solid 1px #555555; ',
							'    width: 100%',
							'">',
							'<tr ',
							'    style="',
							'    background-color: {[values.isOut ? "#cccccc" : "#ffffff"]}"',
							'>',
							'<td valign="middle" ',
							'    style="',
							'    font-family: Pictos; ',
							'    font-size: 200%; ',
							'    width: 38px; ',
							'    padding: 4px; ',
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