Ext.define('HooferSailingMobile.view.Boats', {
	extend: 'Ext.navigation.View',
	requires: ['Ext.dataview.DataView'],
	xtype: 'boats',
	config: {
		items: [
			{
				title: 'Boats',
				xtype: 'dataview',
				store: 'Fleets',
				itemTpl: '{name}<hr/>'
			}
			/*
                // Configures the detail views. 
                detailCard: {  
                    xtype: 'panel',
                    scrollable: true,
                    // "Uses styleHtmlContent to make the text look good."
                    styleHtmlContent: true
                },

                // Event handler. Pushes a detail view.
                // 'content' is the text (from the JSONP) that will appear as HTML in the detail panel
                listeners: { 
                    itemtap: function(nestedList, list, index, element, post) {
                        this.getDetailCard().setHtml(post.get('content'));
                    }
                }
            */

            
		]
	}
});