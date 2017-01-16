/*global define */

define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.page,
		ui: { head: 'h6' },

        
        
         /* onRender: function() {
        	//this.ui.head.addClass("hidden");
        	//this.ui.head.hide();
        }, */
    
    
        onBeforeRender: function(){
            this.model.set('content', _.result(templates.pages, this.model.get('name')))
        }

	});
});
