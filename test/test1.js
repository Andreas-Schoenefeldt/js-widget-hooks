// our test widget
define(['jquery'], function($) {
    
	console.log('loaded test1 widget module');
	
	return function(elem){
		elem.html('executed test1 :)');
	}
});