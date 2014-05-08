/*
 * File: app/view/RotatingImage.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HooferSailingMobile.view.RotatingImage', {
    extend: 'Ext.Component',
    alias: 'widget.rotatingimage',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        degrees: 0,
        src: 'resources/images/RoseForeground.png',
        backgroundSrc: 'resources/images/RoseBackground.png',
        height: 100,
        tpl: [
            '<div style="text-align: center;">',
            '<div style="',
            '    height: {height}px;background-image: url({backgroundSrc}) ;',
            '    background-size: {height}px {height}px ;',
            '	background-position: center ;',
            '	background-repeat: no-repeat ;',
            '	">',
            '<img style="',
            '    height: {height}px;',
            '    transform:rotate({degrees}deg) ;',
            '	-ms-transform:rotate({degrees}deg) ;',
            '    -webkit-transform:rotate({degrees}deg) ;',
            '    "',
            '    src="{src}" ',
            '    height="{height}px"',
            '/>',
            '</div>',
            '</div>'
        ]
    },

    initialize: function() {
        this.setData({
            src: this.getSrc(),
        	backgroundSrc: this.getBackgroundSrc(),
        	height: this.getHeight()
        });

        this.callParent();

    },

    applyDegrees: function(degrees) {
        return Ext.Number.from(degrees, 0);
    },

    updateDegrees: function(degrees) {
        var data = this.getData();
        data = Ext.apply(data, {degrees: degrees});
        this.setData(data);

    }

});