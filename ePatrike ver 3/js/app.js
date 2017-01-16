/*global define */

define([
    'backbone',
	'marionette',
    'regions/notification',
    'regions/dialog',
	'collections/Nav',
	'views/MenuView',
	'views/Footer'
], function (Backbone, Marionette, NotifyRegion, DialogRegion, Nav, MenuView, Footer) {
	'use strict';

	var app = new Marionette.Application();
	
	
/* old page model
 app.pages = new Nav([
        {title: 'Home', name: 'home', active: true},
        {title: 'Invitation', name: 'details'},
		{title: 'Details', name: 'links', subpages: true},
		{title: 'RSVP', name: 'rsvp'},
		{title: 'Photos', name: 'photos'}
    ]);
*/


/*new model */

  app.pages = new Nav([
        {title: 'HOME', name: 'home', next:'link2page2',previous:'none',active: true},
        {title: 'page2', name: 'page2', next:'link2page3',previous:'link2page1'},
		{title: 'page3', name: 'page3', next:'link2page4',previous:'link2page2'},
		{title: 'page4', name: 'page4', next:'link2page5',previous:'link2page3'},
		{title: 'page5', name: 'page5', next:'link2page6',previous:'link2page4'},
		{title: 'THANK YOU', name: 'thankU', next:'none',previous:'link2page5'}
    ]);
    
    
    
    
  
    
    var menu = new MenuView({collection: app.pages});

	app.addRegions({
		menu: '#main-nav',
		/*
		menu: {
			selector: "#main-nav",
			regionType: "MenuRegion"
		}
		*/
		main: '#main',
		footer: '#footer',
        notification: {
            selector: "#notification",
            regionType: NotifyRegion
        },
        dialog: {
            selector: "#dialog",
            regionType: DialogRegion
        }
	});

	app.addInitializer(function () {
        app.menu.show(menu);
		app.footer.show(new Footer());
	});

    app.on("initialize:after", function(options){
        if (Backbone.history){
            Backbone.history.start();
        }
    });

	app.vent.on('menu:activate', function (activePageModel) {
        menu.collection.findWhere({active: true})
            .set('active', false);
        activePageModel.set('active', true);
        menu.render();
	});

    /**
     * Sample JSON Data
     * app.commands.execute("app:notify", {
     *           type: 'warning'    // Optional. Can be info(default)|danger|success|warning
     *           title: 'Success!', // Optional
     *           description: 'We are going to remove Team state!'
     *       });
     */
    app.commands.setHandler("app:notify", function(jsonData) {
        require(['views/NotificationView'], function(NotifyView) {
            app.notification.show(new NotifyView({
                model: new Backbone.Model(jsonData)
            }));
        });
    });

    /**
     * @example
     * app.commands.execute("app:dialog:simple", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *       });
     */
    app.commands.setHandler("app:dialog:simple", function(data) {
        require(['views/DialogView', 'models/Dialog', 'tpl!templates/simpleModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data)
                }));
            });
    });

	
	// added by pavan
	
	 app.commands.setHandler("app:dialog:simple1", function(data) {
        require(['views/DialogView2', 'models/Dialog', 'tpl!templates/simpleModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data)
                }));
            });
    });
	/*by pavan/*
    /**
     * @example
     * app.commands.execute("app:dialog:confirm", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *           'confirmYes': callbackForYes, // Function to execute of Yes clicked
     *           'confirmNo': callbackForNo, // Function to execute of No clicked
     *       });
     */
    app.commands.setHandler("app:dialog:confirm", function(data) {
        require(['views/DialogView2', 'models/Dialog', 'tpl!templates/confirmModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data),
                    events: {
                        'click .dismiss': 'dismiss',
                        'click .confirm_yes': data.confirmYes,
                        'click .confirm_no': data.confirmNo
                    }
                }));
            });
    });

	return window.app = app;
});
