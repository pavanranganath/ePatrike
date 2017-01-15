/*global define */

define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette) {
	'use strict';

	return Marionette.ItemView.extend({
		events: {
            'click .dismiss': 'dismiss'
        },

        dismiss: function(e) {
            e.preventDefault();
            this.trigger('dialog:close');
        }
	});
});
