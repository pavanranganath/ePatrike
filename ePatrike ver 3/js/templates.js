/*global define */

define(function (require) {
	'use strict';

	return {
        pages : {
          home: require('tpl!templates/pages/home.html'),
		  page2: require('tpl!templates/pages/page2.html'),
		  page3: require('tpl!templates/pages/page3.html'),
		  page4: require('tpl!templates/pages/page4.html'),
		  page5: require('tpl!templates/pages/page5.html'),
		  thankU: require('tpl!templates/pages/thankU.html'),
		   
        },
        page: require('tpl!templates/page.html'),
        menuItem: require('tpl!templates/menuItem.html'),
		footer: require('tpl!templates/footer.html')
	};
});

