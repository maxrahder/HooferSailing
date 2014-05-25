Ext.define('HooferSailingMobile.util.PullRefresh', {
	extend: 'Ext.plugin.PullRefresh',
	alias: 'plugin.hooferspullrefresh',
	fetchLatest: function() {
		this.fireEvent('refresh', this);
        this.setState("loaded");
		if (this.getAutoSnapBack()) {
			this.snapBack();
		}
	}
});