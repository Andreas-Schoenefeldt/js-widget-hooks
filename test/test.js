// our test widget
define(['jquery'], function($) {
    
	console.log('loaded test widget module');
	
	return function(elem){
		elem.html('initialized :)');
	}
});