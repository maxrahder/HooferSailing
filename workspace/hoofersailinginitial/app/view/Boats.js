Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		// Initially, the navigation view has one thing in it --
		// a dataview showing the itemTpl for each record in the
		// Fleets store.
		items: [{
			title: 'Boats',
			xtype: 'dataview',
			store: 'Fleets',
			itemTpl: [
				'<div ',
				'   play:-webkit-box; ',
				'    padding: 4px; ',
				'    -webkit-box style="',
				'    height: 60px; ',
				'    border-bottom: solid 1px #555555; ',
				'    dis-align:center; ',
				'">',
				'{name}',
				'</div>'
			],
			listeners: {
				itemtap: function(dataview, index, target, record) {
					var navigationView = dataview.up('boats');
					var boats = record.boats();
					boats.sort([{
						property: 'isOut',
						direction: 'ASC'
					}, {
						property: 'outTime',
						direction: 'ASC'
					}, {
						property: 'name',
						direction: 'DESC'
					}]);
					// Push a new dataview onto this navigation view. 
					// The dataview will show the itemTpl for each 
					// record in the fleet record's list of boats.
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
							'Boat {name}<br/>',
							'{[values.isOut ? values.purpose + " " + values.outAgo: "Available"]}',
							'</td></tr></table>'
						]
					});
				}
			}
		}]
	}
});