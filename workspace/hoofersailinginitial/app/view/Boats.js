Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView','HooferSailingMobile.util.PullRefresh'],
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
				'<p style="',
				'padding: 16px; ',
				'font-size: 1em;',
				'border-bottom: solid 1px #555555; ',
				'">',
				'{name}',
				'</p>'
			],
			// plugins: [{
			// 	ptype: 'hooferspullrefresh'
			// }],
			listeners: {
				itemtap: function(dataview, index, target, record) {
					var navigationView = dataview.up('boats');
					var boats = record.boats();
					boats.sort([{
						property: 'status',
						direction: 'ASC'
					}, {
						property: 'outTime',
						direction: 'ASC'
					}, {
						property: 'name',
						direction: 'ASC'
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
							'    background-color: {[values.isAvailable ? "#ffffff":"#cccccc"]}"',
							'>',
							'<td valign="middle" ',
							'    style="',
							'    font-family: Pictos; ',
							'    font-size: 1.8em; ',
							'    width: 38px; ',
							'    padding: 4px; ',
							'    color: {[values.isAvailable ? "green" : "red"]}; ',
							'">',
							'{[values.isAvailable ?  "&#51;": "&#42;"]}',
							'</td>',
							'<td valign="middle" ',
							'style="',
							'font-size: 1em;"',
							'>',
							'{name}<br/>',
							'{[values.isOut ? values.use + " " + values.outAgo: values.status]}',
							'</td></tr></table>'
						]
					});
				}
			}
		}]
	}
});