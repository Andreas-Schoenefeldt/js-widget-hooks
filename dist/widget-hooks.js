/*! js-widget-hooks - v1.1.0 - 2016-09-07 
 *  A standardized way to initialize and handle clientside widgets. Helps to keep them organized and only to load them if the code should realy be executed. It provides a strong linking of the actual html code with the executed javascript without much hassle.
 */
define(["jquery"],function(a){var b=function(){"object"==typeof console&&(arguments[0]="[js-widget-hooks] "+arguments[0],console.error.apply(console,arguments))};return{widgetClass:"widget",scriptClass:"dyn-script",vars:{},registered:{},registeredFinalls:{},register:function(a,c,d,e){var f=void 0===d?!1:d;this.registered[a]&&b("[WARNING] Widget "+a+" was already registered: Override."),this.registered[a]=[f,c,e]},init:function(c){var d,e,f,g,h=[],i={},j=[],k=this;for(d in this.registered)h[h.length]=[d,this.registered[d][2]],i[d]=[];for(h.sort(function(a,b){return void 0!==a[1]&&void 0==b[1]?-1:void 0==a[1]&&void 0!==b[1]?1:a[1]<b[1]?1:a[1]>b[1]?-1:0}),c||(c=a("body")),c.find("."+k.widgetClass).each(function(){var c,d,e=a(this),f=k.widgetClass+"s",g=e.data(f);if(g){g=g.split(" ");for(d in g)c=g[d],void 0!==i[c]?i[c].push(e):(b("No method for widget "+c+" provided on %o",e),e.addClass(k.widgetClass+"-config-error"))}else b("missing data-"+f+" attribute on %o",e),e.addClass(k.widgetClass+"-config-error")}),e=0;e<h.length;e++){if(d=h[e][0],g=i[d],g.length){for(f=0;f<g.length;f++)j[j.length]=g[f],this.initSpecific(g[f],d);this.registeredFinalls[d]&&this.registeredFinalls[d]()}delete i[d]}for(f in j)j[f].removeClass(this.widgetClass)},initSpecific:function(a,c,d){var e=this;try{(a.hasClass(this.widgetClass)||d)&&(this.registered[c][0]?require(this.registered[c][0],function(){var b=Array.prototype.slice.call(arguments);b.unshift(a),e.registered[c][1].apply(a,b),a.addClass(e.widgetClass+"-initialized")}):(this.registered[c][1](a),a.addClass(e.widgetClass+"-initialized")))}catch(d){return b("Error during execution of widget %o "+c+": "+d.message,a),a.addClass(this.widgetClass+"-error"),!1}return!0}}});