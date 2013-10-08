Ext.define('MyApp.model.Person', {
	extend: 'Ext.data.Model',
	fields: ['instruments', 'name']
});
var p = Ext.create('MyApp.model.Person', {
	instruments: ['base', 'guitar', 'vocals', 'keyboards'],
	name: 'Paul McCartney'
});
alert(p.get('name'));
alert(p.get('instruments')[3]);
