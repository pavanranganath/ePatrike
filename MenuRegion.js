define([
    'app',
    'marionette'
], function(app, Marionette){

    return  Marionette.Region.extend({
        onShow: function(view){

        },

        setup: function(){
        	// setting up menu.
            this.stopListening();
            this.close();
            this.$el.modal('hide');
        }
    });

});


// Currently this region is not used.