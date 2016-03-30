module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	
	var DialView = require('./dial');
	var Firebase = require('firebase');
	var fb = new Firebase('https://bekk-trappa.firebaseio.com/');

	return Simple.View.extend({
		initialize: function(options) {
			fb.child('buss').on('value', this.onMessage.bind(this));
		},
		onMessage: function(data) {
			this.update(data);
		},
		update: function(length) {
			this.$('.keyfigure-value').innerHTML = Math.round(length.val()) + ' minutter';
			this.dial.update(value.val());
		},
		render: function(length) {
			var value = this.calculateNumber(length);
			this.$('.keyfigure-value').innerHTML = value + ' minutter';
		}
		
		
	});
})();
