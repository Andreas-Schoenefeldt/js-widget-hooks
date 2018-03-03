'use strict';

/**
 *	The Widget Hooks, which allow to hook javascript execution in the following form:
 *
 *	<div class="widget" id="my-widget-root" data-widgets="my-widget">...</div>
 */
(function (root, factory) {

    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if (typeof module === 'object' && module.exports) {
        // Node
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals (root is window)
        root.Widgets = factory();
    }
}(this, function() {

    // debug helper function
    var debug = function () {
        if (typeof(console) === 'object') {
            arguments[0] = '[js-widget-hooks] ' + arguments[0];
            console.error.apply(console, arguments);
        }
    };

    // this is the Widgets Object
    return {

        widgetClass: 'widget',
        scriptClass: 'dyn-script',

        vars: {}, // place to put data

        // registered widgets
        registered: {},

        // place for function calls after widget initialization
        registeredFinalls: {},

        // to register a new widget dynamically
        // @param Number Priority			- an optional priority in order to have control, which widget is executed first
        register: function (id, func, priority) {
            if (this.registered[id]) debug("[WARNING] Widget " + id + " was already registered: Override.");
            this.registered[id] = [func, priority];
        },

        /**
         *
         * @param [root=body] the note to initialize the widgets on
         */
        init: function (root) {
            var priorityList = [],
                wdgArrays = {},
                wdg, k, cList, allWidgets = [],
                that = this
            ;

            for (wdg in this.registered) {
                priorityList[priorityList.length] = [wdg, this.registered[wdg][1]]; // 1 is the priority
                wdgArrays[wdg] = [];
            }

            priorityList.sort(function (a, b) {
                if (a[1] !== undefined && b[1] === undefined) return -1;
                if (a[1] === undefined && b[1] !== undefined) return 1;
                return a[1] < b[1] ? 1 : (a[1] > b[1]) ? -1 : 0;
            });

            if (!root) root = document.querySelector('body'); // fallback to complete DOM execution, if we get not a subnode

            // get all the elements of the type widget
            /** @type {Node} elem */
            root.querySelectorAll('.' + that.widgetClass).forEach(function (elem) {
                var dataWidgetsAttributeName = that.widgetClass + 's';
                var names = elem.dataset[dataWidgetsAttributeName];

                if (names) {
                    names.split(' ').forEach(function (name) {
                        if (wdgArrays[name] !== undefined) {
                            wdgArrays[name].push(elem);
                        } else {
                            debug("No method for widget " + name + " provided on %o", elem);
                            elem.classList.add(that.widgetClass + '-config-error');
                        }
                    });
                } else {
                    debug("missing data-" + dataWidgetsAttributeName + " attribute on %o", elem);
                    elem.classList.add(that.widgetClass + '-config-error');
                }
            });

            //  and initialise them according to the priority
            priorityList.forEach(function (wdg) {
                var widgetName = wdg[0];
                var cList = wdgArrays[widgetName];

                cList.forEach(function (classEl) {
                    allWidgets[allWidgets.length] = classEl;
                    that.initSpecific(classEl, widgetName);
                });

                if (that.registeredFinalls[widgetName]) that.registeredFinalls[widgetName]();

                delete wdgArrays[widgetName]; // remove the initialized array, in order to check, if something was not initialized
            });

            // delete the widget class later in case of multi widgets
            for (k in allWidgets) {
                allWidgets[k].classList.remove(this.widgetClass); // remove the class to prevent a second initialization
            }
        },

        /**
         *
         * @param {Node} elem
         * @param {string} widgetName
         * @param {boolean} force - allows to initialize a widget also, if it was already initialized
         * @returns {boolean}
         */
        initSpecific: function (elem, widgetName, force) {
            var that = this;
            try {
                if (elem.classList.contains(that.widgetClass) || force) { // just in case something has changed meanwhile...

                    this.registered[widgetName][0](elem);
                    elem.classList.add(that.widgetClass + '-initialized');

                }
            } catch (e) {
                debug("Error during execution of widget %o " + widgetName + ": " + e.message, elem);
                elem.classList.add(that.widgetClass + '-error');
                return false;
            }

            return true;
        }
    };
}));