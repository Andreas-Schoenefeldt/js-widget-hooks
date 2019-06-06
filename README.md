# js-widget-hooks

## Installation

```
npm install --save-dev js-widget-hooks
```

## Philosophy 

A simple js module, which allows to keep an standardized aproach of client side javascript widget implementation. 
Often client side widgets are developed in a way, that during dom load a certain css class is targeted and then 
triggers the dynamic javascript enhancement. 

While this is not bad, it makes it quite difficult to debug and identify widget components later on. 

The **widget hooks** try to provide a super simple jet standardized approach to link and initialize javascript client side 
widgets and also only load the required sometimes very complex code blocks if te widget is actually present on the side.

## Benefits

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

## Examples

### Simple Initilization

```html
<button class="widget" data-widgets="your-name">Make me functional!</button>
```

```javascript
import Widgets from 'js-widget-hooks';
	
Widgets.register('your-name', function(domElem){		
		// do something with domElem 
});

Widgets.init();

// or a specific doom node, if you have it:

Widgets.init(document.querySelector('.page-root'));

```

### Change the default js-class, which is used for triggering
In case some other javascript functionality beyond your controll is already hooked to the widget class.

```html
<button class="different-widget" data-different="your-name">Make me functional!</button>
```

```javascript
import Widgets from 'js-widget-hooks';
	
Widgets.register('your-name', function(domElem){		
		// do something with domElem 
});

Widgets.init(null, {
    widgetClass: 'different-widget',
    widgetDataName: 'different'
});
```

Possible options are:
* widgetClass: The html-class to mark the elements as widgets (default: widget)
* widgetDataName: the data attribute name (default: widgets)
* scriptClass: The html-class set for dynamic script imports  
