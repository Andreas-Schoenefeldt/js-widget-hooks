/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dev/js-widget-hooks.js":
/*!************************************!*\
  !*** ./src/dev/js-widget-hooks.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\n/**\n *\tThe Widget Hooks, which allow to hook javascript execution in the following form:\n *\n *\t<div class=\"widget\" id=\"my-widget-root\" data-widgets=\"my-widget\">...</div>\n */\n(function (root, factory) {\n\n    // https://github.com/umdjs/umd/blob/master/returnExports.js\n    if (typeof module === 'object' && module.exports) {\n        // Node\n        module.exports = factory();\n    } else if (true) {\n        // AMD. Register as an anonymous module.\n        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    } else {}\n}(this, function() {\n\n    // debug helper function\n    var debug = function () {\n        if (typeof(console) === 'object') {\n            arguments[0] = '[js-widget-hooks] ' + arguments[0];\n            console.error.apply(console, arguments);\n        }\n    };\n\n    // this is the Widgets Object\n    return {\n\n        widgetClass: 'widget',\n        scriptClass: 'dyn-script',\n\n        vars: {}, // place to put data\n\n        // registered widgets\n        registered: {},\n\n        // place for function calls after widget initialization\n        registeredFinalls: {},\n\n        // to register a new widget dynamically\n        // @param Number Priority\t\t\t- an optional priority in order to have control, which widget is executed first\n        register: function (id, func, priority) {\n            if (this.registered[id]) debug(\"[WARNING] Widget \" + id + \" was already registered: Override.\");\n            this.registered[id] = [func, priority];\n        },\n\n        /**\n         *\n         * @param [root=body] the note to initialize the widgets on\n         */\n        init: function (root) {\n            var priorityList = [],\n                wdgArrays = {},\n                wdg, k, cList, allWidgets = [],\n                that = this\n            ;\n\n            for (wdg in this.registered) {\n                priorityList[priorityList.length] = [wdg, this.registered[wdg][1]]; // 1 is the priority\n                wdgArrays[wdg] = [];\n            }\n\n            priorityList.sort(function (a, b) {\n                if (a[1] !== undefined && b[1] === undefined) return -1;\n                if (a[1] === undefined && b[1] !== undefined) return 1;\n                return a[1] < b[1] ? 1 : (a[1] > b[1]) ? -1 : 0;\n            });\n\n            if (!root) root = document.querySelector('body'); // fallback to complete DOM execution, if we get not a subnode\n\n            // get all the elements of the type widget\n            /** @type {Node} elem */\n            root.querySelectorAll('.' + that.widgetClass).forEach(function (elem) {\n                var dataWidgetsAttributeName = that.widgetClass + 's';\n                var names = elem.dataset[dataWidgetsAttributeName];\n\n                if (names) {\n                    names.split(' ').forEach(function (name) {\n                        if (wdgArrays[name] !== undefined) {\n                            wdgArrays[name].push(elem);\n                        } else {\n                            debug(\"No method for widget \" + name + \" provided on %o\", elem);\n                            elem.classList.add(that.widgetClass + '-config-error');\n                        }\n                    });\n                } else {\n                    debug(\"missing data-\" + dataWidgetsAttributeName + \" attribute on %o\", elem);\n                    elem.classList.add(that.widgetClass + '-config-error');\n                }\n            });\n\n            //  and initialise them according to the priority\n            priorityList.forEach(function (wdg) {\n                var widgetName = wdg[0];\n                var cList = wdgArrays[widgetName];\n\n                cList.forEach(function (classEl) {\n                    allWidgets[allWidgets.length] = classEl;\n                    that.initSpecific(classEl, widgetName);\n                });\n\n                if (that.registeredFinalls[widgetName]) that.registeredFinalls[widgetName]();\n\n                delete wdgArrays[widgetName]; // remove the initialized array, in order to check, if something was not initialized\n            });\n\n            // delete the widget class later in case of multi widgets\n            for (k in allWidgets) {\n                allWidgets[k].classList.remove(this.widgetClass); // remove the class to prevent a second initialization\n            }\n        },\n\n        /**\n         *\n         * @param {Node} elem\n         * @param {string} widgetName\n         * @param {boolean} force - allows to initialize a widget also, if it was already initialized\n         * @returns {boolean}\n         */\n        initSpecific: function (elem, widgetName, force) {\n            var that = this;\n            try {\n                if (elem.classList.contains(that.widgetClass) || force) { // just in case something has changed meanwhile...\n\n                    this.registered[widgetName][0](elem);\n                    elem.classList.add(that.widgetClass + '-initialized');\n\n                }\n            } catch (e) {\n                debug(\"Error during execution of widget %o \" + widgetName + \": \" + e.message, elem);\n                elem.classList.add(that.widgetClass + '-error');\n                return false;\n            }\n\n            return true;\n        }\n    };\n}));\n\n//# sourceURL=webpack:///./src/dev/js-widget-hooks.js?");

/***/ }),

/***/ "./test/main.js":
/*!**********************!*\
  !*** ./test/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/dev/js-widget-hooks */ \"./src/dev/js-widget-hooks.js\");\n/* harmony import */ var _src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet now = function(){\n    return (new Date()).getMilliseconds() + ': ';\n};\n\n_src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0___default.a.register('test', function (elem) {\n    let str = now() + 'test1 execution';\n    elem.innerHTML += '<br/>' + str;\n    console.log(str);\n}, 5);\n\n\n_src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0___default.a.register('test2', function (elem) {\n    let str = now() + 'test2 execution';\n    elem.innerHTML += '<br/>' + str;\n    console.log(str);\n}, 1);\n\n\n_src_dev_js_widget_hooks__WEBPACK_IMPORTED_MODULE_0___default.a.init();\n\n//# sourceURL=webpack:///./test/main.js?");

/***/ })

/******/ });