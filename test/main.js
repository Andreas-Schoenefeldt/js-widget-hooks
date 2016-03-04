// the main function of the test script
// please note, that this is the only script, which starts with the require instead of the define
require(['jquery', 'dev/widget-hooks'], function($, Widgets) {
    var now = function(){
		return (new Date()).getMilliseconds() + ': ';
	}
	
	console.log(now() + 'Starting Javascript');
	
	Widgets.register('test-with-additional-requirements', function(elem, test2){
		
		console.log(now() + 'test2 execution');
		
		test2(elem, now() + 'awsome !');
		
	}, ['../test/test2'])
	
	
	Widgets.register('test', function(elem){
		
		console.log(now() + 'test1 execution');
		
		require(['../test/test1'], function(execute){
			
			console.log(now() + 'resolved test dependencys internal');
			
		
			
			execute(elem);
		});
	});
	
	// execute the widgets
	console.log(now() + 'Executing Widgets');
	Widgets.init($('body'));
	console.log(now() + 'After Executing Widgets');
});