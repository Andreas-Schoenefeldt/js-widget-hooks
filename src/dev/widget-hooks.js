/**
 *	The Wisget Hooks, which allow to hook javascript execution in the following form: 
 *
 *	<div class="widget" id="my-widget-root" data-widgetname="my-widget">...</div>
 */
define(['jquery'], function($){
	
	// debug helper function
	var debug = function(){
		if (typeof(console) == 'object') {
			console.log.apply(this, arguments);
		}
	}
	
	// this is the Widgets Object
	return { 
		
		  widgetClass : 'widget'
		, scriptClass : 'dyn-script'
		
		, vars: {} // place to put data
		
		// registered widgets
		, registered : {
			
		}
		
		// place for function calls after widget initialization
		, registeredFinalls : {
		  }
		
		// to register a new widget dynamically
		// @param Number Priority			- an optional priority in order to have controll, which widget is executed first
		, register : function(id, func, dependencys, priority) {
			var dependencysVar = (dependencys === undefined) ? false : dependencys;
			if (this.registered[id]) debug("[WARNING] Widget " + id + " was already registered: Override.");
			this.registered[id] = [dependencysVar, func, priority];
		}
		
		, init : function(root) {
			var priorityList = []
			  , wdgArrays = {}
			  , wdg, i, k, cList, allWidgets = []
			;
			
			for (wdg in this.registered) {
				priorityList[priorityList.length] = [wdg, this.registered[wdg][2]]; // 2 is the priority
				wdgArrays[wdg] = [];
			}
			
			priorityList.sort(function(a, b){
				if (a[1] !== undefined && b[1] == undefined) return -1;
				if (a[1] == undefined && b[1] !== undefined) return 1;
				return a[1] < b[1] ? 1 : (a[1] > b[1]) ? -1 : 0;
			});
			
			if (! root) root = $('body'); // fallback to complete DOM execution, if we get not a subnode
			
			// get all the elements of the type widget
			root.find('.' + this.widgetClass).each(function(){
				var elem = $(this)
				  , names = elem.data('widgetname').split(' ')
				  , name
				  , i
				;
				
				for (i in names) {
					name = names[i];
					if (wdgArrays[name] !== undefined) {
						wdgArrays[name].push(elem);
					} else {
						debug("No method for widget " + name + " provided");
					}
				}
			});
			//  and initialise them according to the priority
			for (i = 0; i < priorityList.length; i++) {
				wdg = priorityList[i][0];
				cList = wdgArrays[wdg];
				if (cList.length) {
					for (k = 0; k < cList.length; k++) {
						allWidgets[allWidgets.length] = cList[k];
						this.initSpecific(cList[k], wdg);
					}
					
					if (this.registeredFinalls[wdg]) this.registeredFinalls[wdg]();
				}
				delete wdgArrays[wdg]; // remove the initialized array, in order to check, if something was not initialized
			}
			
			// delete the widget class later in case of multi widgets
			for (k in allWidgets) {
				allWidgets[k].removeClass(this.widgetClass); // remove the class to prevent a second initialization
			}
		}
		
			// @param Boolean force 		- allows to initialize a widget also, if it was already initialized
		, initSpecific : function(elem, widgetname, force){
			var that = this;
			
			try {
				if (elem.hasClass(this.widgetClass) || force){ // just in case something has changed meanwhile...
					
					// now check, if we need external requirements
					if (this.registered[widgetname][0]) {
						require(this.registered[widgetname][0], function(){
							that.registered[widgetname][1](elem);
							elem.addClass(this.widgetClass + '-initialized');
						});
					} else {
						this.registered[widgetname][1](elem);	
						elem.addClass(this.widgetClass + '-initialized');
					}
				}
			} catch (e) {
				debug("Error during execution of widget " + widgetname + ": " + e.message);
				elem.addClass(this.widgetClass + '-error');
				return false;
			}
			
			return true;		
		}
	}
});