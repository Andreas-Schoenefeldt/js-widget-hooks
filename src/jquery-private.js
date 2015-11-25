// http://requirejs.org/docs/jquery.html
// and the 'jquery-private' module, in the
// jquery-private.js file:
define(['jquery'], function (jQuery) {
	return jQuery.noConflict(); // we do not remove everything, because we need the global jQuery variable in the window
});