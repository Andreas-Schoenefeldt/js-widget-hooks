# js-widget-hooks
A simple js module, which allows to keep an standardized aproach of client side javascript widget implementation. Usuualy client side widgets are develped in a way, that during dom load a certain css class is targeted and then triggers the dynamic javascript enhancement. While this is not bad, it makes it difficult to debug and identify widget components later on. 

The widget hooks try to porvide a standardized approach to link and initialize javascript client side widgets and also only load the required sometimes very complex code blocks if te widget is actualy present on the side.

# Benefits

Using a standardized approach to javascript widgets has the following benefits:

* it is already obvious in the html template and easy to identify, that additional javascript is run on an element
* reduction of similar code, concentration on the actual widget specific logic
* easy to expand
* unobstrusive (You have a easy possibility to program your widget in a way, that the page will still work, if javascript is deactivated)
* easily understand why there is a html5 data attribute on a certain html tag
* use similar syntax for a multitude of different widgets
* don't care about selectors and plugin calls
* simply call Widgets.init() to reinitialization any widgets, when they are included via ajax
* new developers can easily find the code, used to handle a widget

# Installation

```
npm install --save-dev js-widget-hooks
```

# Examples

## Simple Initilization
```js
import Widgets from '../src/dev/widget-hooks';
	
Widgets.register('your-name', function(elem){		
		// do something
});
	
Widgets.init($('body'));
``` 
