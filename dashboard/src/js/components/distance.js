module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var d3 = require('d3');
	var Firebase = require('firebase');
	var fb = new Firebase('https://bekk-trappa.firebaseio.com/sensors');

	return Simple.View.extend({
		initialize: function(options) {
			fb.child('distance').on('value', this.onMessage.bind(this));
		},
		onMessage: function(data) {
			this.render(data.val()*1.6);
		},
		normaliseNumber: function(value) {
			return value / 100;
		},
		getLineVal: function(value) {
			var max = 2.8;
			return Math.min(100, value * 100);
		},
		render: function(value) {
			var line = this.$('.keyfigure-bar--line');
			var p = this.normaliseNumber(value);
			line.style.left = this.getLineVal(p) + "%";
			this.$('.keyfigure-value').innerHTML = Math.round(p*100)/100 + ' m';
		}
	});
})();
