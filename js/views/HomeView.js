/*global define */

define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.page,

        ui: {
            header: 'h6'
        },

        events: {
            'click #notify' : 'notify',
            'click #modal' : 'showSampleModal',
            'click #confirm' : 'showSampleConfirm',
            //added by pavan to implement modal inside images 
            'click #calendar' : 'calendar'
            
        },

        onBeforeRender: function(){
            this.model.set('content', _.result(templates.pages, this.model.get('name')))
        },

        onRender: function() {
            this.ui.header.remove();
        },

        // Event handlers
        notify: function(e) {
            app.commands.execute('app:notify', {
                type: 'warning',
                title: 'Information',
                description: 'Please visit the Video page for details.'
            });
        },
        showSampleModal: function(e) {
            app.commands.execute("app:dialog:simple", {
                title: 'Location', // Optional
                message: 'Details are in Video page, March 11th is the function'
                // message: 'https://www.google.co.in/maps/place/Elegant+Orchid,+Akshayanagara+East,+Akshayanagar,+Bengaluru,+Karnataka+560076/@12.8779379,77.6005651,15z/data=!4m2!3m1!1s0x3bae6b301a12b37b:0x2bee35a5b1b91071'
            });
        },
        //added by pavan to implement modal inside  image
        calendar: function(e) {
            app.commands.execute("app:dialog:simple1", {
                title: 'Calendar', // Optional
                message: 'Details are yet to be decided'
                // message: 'https://www.google.co.in/maps/place/Elegant+Orchid,+Akshayanagara+East,+Akshayanagar,+Bengaluru,+Karnataka+560076/@12.8779379,77.6005651,15z/data=!4m2!3m1!1s0x3bae6b301a12b37b:0x2bee35a5b1b91071'
            });
        },
        
     

        showSampleConfirm: function(e) {
            app.commands.execute("app:dialog:confirm", {
                icon: 'info-sign',
                title: 'RSVP info!',
                message: 'Will you be attending the party?',
                confirmNo: function() {
                    app.commands.execute('app:notify', {
                        type: 'warning',
                        title: 'You\'ve choosed No',
                        description: 'We\'re Sorry that you can\'t make it. Can we reuest youre consider'
                    }
                )},
                confirmYes: function() {
                    app.commands.execute('app:notify', {
                        type: 'success',
                        title: 'You\'ve choosed Yes',
                        description: 'Thanks :We\'re eager to see you.'
                    }
                )}
            });
        }


	});
});
