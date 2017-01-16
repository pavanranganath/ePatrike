/*global define */

define([
	'marionette',
	'lib/google-maps-loader'
], function (Marionette,GoogleMapsLoader) {
	'use strict';

	return Marionette.ItemView.extend({
		events: {
            'click .dismiss': 'dismiss'
        },

        dismiss: function(e) {
            e.preventDefault();
            this.trigger('dialog:close');
        },
        
         onRender: function() {
         	GoogleMapsLoader.done(function(){
              var mapOptions = {
    			center: new google.maps.LatLng(12.8779379, 77.6005651),
    			zoom: 12,
    			mapTypeId: google.maps.MapTypeId.ROADMAP
  			};
  			var map = new google.maps.Map(document.getElementById("mapCanvas"),
    			mapOptions);
  			var marker = new google.maps.Marker({
    			position: new google.maps.LatLng(12.8779379, 77.6005651)
  			});
  			marker.setMap(map);
  			google.maps.event.trigger(map, "resize");

  			}).fail(function(){
  				console.error("ERROR: Google maps library failed to load");
  			});
  			
  			// Resize map to show on a Bootstrap's modal
    		console.log("rendering map");
			// $('#myModal').on('shown.bs.modal', function() {
			$('#myModal').on('shown.bs.modal', function() {
			     resizeMap();
				 console.log("rendering map1");
				/*
  				var currentCenter = map.getCenter();  // Get current center before resizing
  				google.maps.event.trigger(map, "resize");
  				map.setCenter(currentCenter); // Re-set previous center
  				*/
			});
			
			
			function resizeMap() {
   				if(typeof map =="undefined") return;
   					setTimeout( function(){resizingMap();} , 400);
			};

			function resizingMap() {
   				if(typeof map =="undefined") return;
   					var center = map.getCenter();
   					google.maps.event.trigger(map, "resize");
  					 map.setCenter(center); 
			};
			


        }
        
        /* ,
        onRender: function() {
        
    		// Resize map to show on a Bootstrap's modal
    		console.log("rendering map");
			$('#myModal').on('shown.bs.modal', function() {
  				var currentCenter = map.getCenter();  // Get current center before resizing
  				google.maps.event.trigger(map, "resize");
  				map.setCenter(currentCenter); // Re-set previous center
			});
        }
        */
	});
});

// APIKey  AIzaSyCWLuea8teE8mobC9oi8QitOIILz0E2S-8
/*
<script type="text/javascript" 
     src="http://maps.google.com/maps/api/js?  
                   key=AIzaSyCWLuea8teE8mobC9oi8QitOIILz0E2S-8&sensor=false">
</script>



$('#myMapModal').on('show.bs.modal', function() {
   //Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)
   resizeMap();
})

function resizeMap() {
   if(typeof map =="undefined") return;
   setTimeout( function(){resizingMap();} , 400);
}

function resizingMap() {
   if(typeof map =="undefined") return;
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
}
*/