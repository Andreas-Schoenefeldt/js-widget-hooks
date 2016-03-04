// our test2 widget, it exports an amazing functionality
define(['jquery'], function($) {
    
	console.log('loaded test2 module as direct dependency');
	
	return function(elem, optionText){
		elem.html('executed test2 :) - ' + optionText);
	}
});