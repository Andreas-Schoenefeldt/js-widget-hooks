// the main function of the test script
// please note, that this is the only script, which starts with the require instead of the define
require(['jquery', 'dev/widget-hooks'], function($, Widgets) {
    
	Widgets.register('test', function(elem){
		
		console.log('executing test widget');
		
		require(['../test/test'], function(execute){
			
			console.log('resolved test widget dependencys');
			
			console.log(elem);
			console.log(execute);
			
			execute(elem);
		});
	});
	
	// execute the widgets
	Widgets.init($('body'));
});