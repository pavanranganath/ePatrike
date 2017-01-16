/**
 * GoogleMapsAPI Loader Module
 * 
 * Returns a promise that resolves with the google.maps object when all of the google maps api loading process is complete
 * 
 * Example Usage:
 *
 * 	define([ 'app/lib/google-maps-loader' ], function(GoogleMapsLoader){
 * 		GoogleMapsLoader.done(function(GoogleMaps){
 *			// your google maps code here!
 *			var geocoder = new GoogleMaps.Geocoder();
 *		}).fail(function(){	
 *			console.error("ERROR: Google maps library failed to load");
 *		});
 *	});
 *
 *	-OR-
 *
 *	define([ 'app/lib/google-maps-loader' ], function(GoogleMapsLoader){
 * 		GoogleMapsLoader.done(function(){
 *			// your google maps code here!
 *			var geocoder = new google.maps.Geocoder();
 *		}).fail(function(){	
 *			console.error("ERROR: Google maps library failed to load");
 *		});
 *	});
 *
 */
 
 //	Our APIKey  AIzaSyCWLuea8teE8mobC9oi8QitOIILz0E2S-8
 // Key for mavis.dev    AIzaSyCHRj5NxVN9Q1Qw3mn5nGz8mz9L9rr0L4I
 // AIzaSyB12yP4dBPdYE6q7kjWL0ZrCVzYeCkCrak
 // AIzaSyCglVmCQMrR8mScOM0zuVMmp9zCyXOm_pY      for all domains we use.
/*
<script type="text/javascript" 
     src="http://maps.google.com/maps/api/js?  
                   key=AIzaSyCWLuea8teE8mobC9oi8QitOIILz0E2S-8&sensor=false">
</script>
*/
 

var google_maps_loaded_def = null;

define(['jquery'],function($) {
  
  if(!google_maps_loaded_def) {
    
    google_maps_loaded_def = $.Deferred();
  
    window.google_maps_loaded = function() {
      google_maps_loaded_def.resolve(google.maps);    
    }
    
    // UN comment below line before loading into sridhara.org
    
    require(['http://maps.googleapis.com/maps/api/js?key=AIzaSyCglVmCQMrR8mScOM0zuVMmp9zCyXOm_pY&sensor=false&callback=google_maps_loaded'],function(){},function(err) {
      google_maps_loaded_def.reject();
      //throw err; // maybe freak out a little?
    });
    
    
    
    // Un comment below line for testing in mavis.dev. API key is different.
    /*
    require(['http://maps.googleapis.com/maps/api/js?key=AIzaSyB12yP4dBPdYE6q7kjWL0ZrCVzYeCkCrak&sensor=false&callback=google_maps_loaded'],function(){},function(err) {
      google_maps_loaded_def.reject();
      //throw err; // maybe freak out a little?
    });
    */
  }
  
  return google_maps_loaded_def.promise();
  
});