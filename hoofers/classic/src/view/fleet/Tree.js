    Ext.define('Hoofers.view.fleet.Tree', {
        extend: 'Ext.tree.Panel',
        xtype: 'fleettree',

        requires: [
            'Hoofers.view.fleet.TreeController',
            'Hoofers.view.fleet.TreeModel'
        ],
        controller: 'fleet-tree',
        viewModel: {
            type: 'fleet-tree'
        },

        title: 'Fleet',
        tools: [{
            type: 'plus',
            tooltip: 'Expand all',
            callback: function(panel, tool) {
                if (tool.type === 'plus') {
                    panel.expandAll();
                    tool.setType('minus');
                    tool.setTooltip('Collapse all');
                } else {
                    panel.collapseAll();
                    tool.setType('plus');
                    tool.setTooltip('Expand all');
                }
            }
        }],
        rootVisible: false,
        hideHeaders: true,
        columns: [{
            xtype: 'treecolumn',
            flex: 1,
            sortable: false,
            renderer: function(value, td, record) {
                var result = record.data.text;
                if (record.isLeaf()) {
                    var cls = (record.data.statusCode === 1) ? 'green bold x-fa fa-check' : 'red x-fa fa-times';
                    record.set('iconCls', cls);
                    if (record.data.out) {
                        if (record.data.use) {
                            result += ', ' + record.data.use;
                        }
                        if (record.data.date) {
                            result += ' ' + Hoofers.util.Util.hoursMinutes(record.data.date);
                        }
                    } else {
                        result += ' ' + record.data.statusText;
                    }
                }
                return result;
            }
        }]


    });
