module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var DialView = require('./dial');
	var Firebase = require('firebase');
	var fb = new Firebase('https://bekk-trappa.firebaseio.com/');


	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			fb.child('twitter').on('value', this.onMessage.bind(this));
			this.maxValue = 30;
			this.render(0);

			this.dial = new DialView({
				el: this.el.querySelector("svg")
			});
		},
		onMessage: function(data) {
			this.update(data.val());
		},
		calculateNumber: function(value) {
			return Math.max(0, Math.min(1, value / this.maxValue));
		},
		update: function(length) {
			var value = this.calculateNumber(length);

			this.$('.keyfigure-value').innerHTML = Math.round(length) + ' #bekkfagdag';
			this.dial.update(value);
		},
		render: function(length) {
			var value = this.calculateNumber(length);
			this.$('.keyfigure-value').innerHTML = Math.round(value) + ' #bekkfagdag';
		}
		
		
	});
})();
