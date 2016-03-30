module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var DialView = require('./dial');
	var Firebase = require('firebase');
	var fb = new Firebase('https://bekk-trappa.firebaseio.com/sensors');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			fb.child('microphone').on('value', this.onMessage.bind(this));
			this.dial = new DialView({
				el: this.el.querySelector("svg"),
				maxValue: 100,
				color: '#28bcb3'
			});
		},
		onMessage: function(data) {
			this.render(data.val());
		},
		normaliseValue: function(value) {
			return Math.max(Math.sqrt((value / 2 * Math.sqrt(2))) -5, 0).toFixed(2);
		},
		getDialVaue: function(value) {
			var decMax = Math.sqrt(362) * 2;
			return Math.min(1, Math.max(0, value / decMax)).toFixed(4);
		},
		render: function(value) {
			var val = this.normaliseValue(value);
			var dialvalue = this.getDialVaue(val);
			this.dial.update(dialvalue);
			this.$('.keyfigure-value').innerHTML = val*2 + ' VOLUM';
		}
	});
})();
