module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+Pt7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"welcome":"welcome__3RwKj","welcomeButtonContainer":"welcomeButtonContainer__3KA9U"};

/***/ }),

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "82Kw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"SortArrow":"SortArrow__1heMW","Desc":"Desc__2iPDo","Asc":"Asc__2KFfg","Hidden":"Hidden__2jAoa","TableHeader":"TableHeader__1jMeO"};

/***/ }),

/***/ "A8Bg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2uitE","active":"active__3taVy","whiteIcon":"whiteIcon__2Exj4","headerItemPadding":"headerItemPadding__1McZ-","headerLabelLarge":"headerLabelLarge__cO5DT","headerLabelSmall":"headerLabelSmall__1_Sda"};

/***/ }),

/***/ "G5m+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"creditCardContainer":"creditCardContainer__1blnv"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ./components/Header/style.css
var Header_style = __webpack_require__("A8Bg");
var Header_style_default = /*#__PURE__*/__webpack_require__.n(Header_style);

// CONCATENATED MODULE: ./components/Icons/IconGitHub.js



var _ref2 = Object(preact_min["h"])("path", { "fill-rule": "evenodd", d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" });

var IconGitHub_IconGitHub = function IconGitHub(_ref) {
	var id = _ref.id,
	    className = _ref.className;
	return Object(preact_min["h"])(
		"svg",
		{ id: id, "aria-hidden": "true", className: className, height: "32", viewBox: "0 0 16 16",
			width: "32"
		},
		_ref2
	);
};


// CONCATENATED MODULE: ./components/Header/index.js





var Header_Header = function Header(className) {
	return Object(preact_min["h"])(
		'header',
		{ 'class': Header_style_default.a.header },
		Object(preact_min["h"])(
			'h1',
			{ id: 'LabelLarge', 'class': Header_style_default.a.headerLabelLarge },
			'Credit Card Reward Calculator'
		),
		Object(preact_min["h"])(
			'h1',
			{ id: 'LabelSmall', 'class': Header_style_default.a.headerLabelSmall },
			'CC Reward Calc'
		),
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])(
				'a',
				{ href: 'https://github.com/bhubie/CreditCardRewardCalc', target: '_blank', rel: 'noopener noreferrer',
					'class': Header_style_default.a.headerItemPadding, title: 'Contribute on Github'
				},
				Object(preact_min["h"])(IconGitHub_IconGitHub, { id: 'githubIco', className: Header_style_default.a.whiteIcon })
			)
		)
	);
};


// EXTERNAL MODULE: ./components/Disclaimer/style.css
var Disclaimer_style = __webpack_require__("tDJy");
var Disclaimer_style_default = /*#__PURE__*/__webpack_require__.n(Disclaimer_style);

// CONCATENATED MODULE: ./components/Disclaimer/index.js




var Disclaimer__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Disclaimer'
);

var Disclaimer__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'The information contained on https://creditcardrewardcalc.github.io website (the "Service") is for general information purposes only.'
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Credit Card Reward Calc assumes no responsibility for errors or omissions in the contents on the Service.'
);

var _ref4 = Object(preact_min["h"])(
	'p',
	null,
	'In no event shall Credit Card Reward Calc be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Credit Card Reward Calc reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.'
);

var Disclaimer_Disclaimer = function Disclaimer() {
	return Object(preact_min["h"])(
		'div',
		{ id: 'disclaimerContainer', 'class': Disclaimer_style_default.a.disclaimer },
		Disclaimer__ref,
		Disclaimer__ref2,
		_ref3,
		_ref4
	);
};


// EXTERNAL MODULE: ./components/Home/style.css
var Home_style = __webpack_require__("On8Y");
var Home_style_default = /*#__PURE__*/__webpack_require__.n(Home_style);

// EXTERNAL MODULE: ./components/WelcomeMessage/style.css
var WelcomeMessage_style = __webpack_require__("+Pt7");
var WelcomeMessage_style_default = /*#__PURE__*/__webpack_require__.n(WelcomeMessage_style);

// CONCATENATED MODULE: ../node_modules/@material/base/foundation.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  MDCFoundation.prototype.init = function init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/* harmony default export */ var base_foundation = (MDCFoundation);
// CONCATENATED MODULE: ../node_modules/@material/base/component.js
function component__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */

var component_MDCComponent = function () {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  MDCComponent.attachTo = function attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new base_foundation());
  };

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    component__classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.prototype.initialize = function initialize() /* ...args */{}
  // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.


  /**
   * @return {!F} foundation
   */
  ;

  MDCComponent.prototype.getDefaultFoundation = function getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.listen = function listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.unlisten = function unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  MDCComponent.prototype.emit = function emit(evtType, evtData) {
    var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/* harmony default export */ var component = (component_MDCComponent);
// CONCATENATED MODULE: ../node_modules/@material/ripple/adapter.js
function adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    adapter__classCallCheck(this, MDCRippleAdapter);
  }

  /** @return {boolean} */
  MDCRippleAdapter.prototype.browserSupportsCssVars = function browserSupportsCssVars() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isUnbounded = function isUnbounded() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceActive = function isSurfaceActive() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceDisabled = function isSurfaceDisabled() {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerDocumentInteractionHandler = function registerDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterDocumentInteractionHandler = function deregisterDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  MDCRippleAdapter.prototype.updateCssVariable = function updateCssVariable(varName, value) {};

  /** @return {!ClientRect} */


  MDCRippleAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /** @return {{x: number, y: number}} */


  MDCRippleAdapter.prototype.getWindowPageOffset = function getWindowPageOffset() {};

  return MDCRippleAdapter;
}();

/* harmony default export */ var ripple_adapter = (MDCRippleAdapter);
// CONCATENATED MODULE: ../node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
};


// CONCATENATED MODULE: ../node_modules/@material/ripple/util.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}


// CONCATENATED MODULE: ../node_modules/@material/ripple/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @typedef {!{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {!{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {!{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {!{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var foundation_MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  foundation__createClass(MDCRippleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    foundation__classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.xfDuration_ = 0;

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    /** @private {function(!Event)} */
    _this.deactivateHandler_ = function (e) {
      return _this.deactivate_(e);
    };

    /** @private {function(?Event=)} */
    _this.focusHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {function(?Event=)} */
    _this.blurHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {!{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    _this.previousActivationEvent_ = null;
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  MDCRippleFoundation.prototype.isSupported_ = function isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  };

  /**
   * @return {!ActivationStateType}
   */


  MDCRippleFoundation.prototype.defaultActivationState_ = function defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  };

  MDCRippleFoundation.prototype.init = function init() {
    var _this2 = this;

    if (!this.isSupported_()) {
      return;
    }
    this.registerRootHandlers_();

    var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$.ROOT,
        UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

    requestAnimationFrame(function () {
      _this2.adapter_.addClass(ROOT);
      if (_this2.adapter_.isUnbounded()) {
        _this2.adapter_.addClass(UNBOUNDED);
      }
      _this2.layoutInternal_();
    });
  };

  MDCRippleFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    if (!this.isSupported_()) {
      return;
    }
    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();

    var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$2.ROOT,
        UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

    requestAnimationFrame(function () {
      _this3.adapter_.removeClass(ROOT);
      _this3.adapter_.removeClass(UNBOUNDED);
      _this3.removeCssVars_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function registerRootHandlers_() {
    var _this4 = this;

    ACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
    });
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  };

  /**
   * @param {!Event} e
   * @private
   */


  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function registerDeactivationHandlers_(e) {
    var _this5 = this;

    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
      });
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function deregisterRootHandlers_() {
    var _this6 = this;

    ACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function deregisterDeactivationHandlers_() {
    var _this7 = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.removeCssVars_ = function removeCssVars_() {
    var _this8 = this;

    var strings = MDCRippleFoundation.strings;

    Object.keys(strings).forEach(function (k) {
      if (k.indexOf('VAR_') === 0) {
        _this8.adapter_.updateCssVariable(strings[k], null);
      }
    });
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.activate_ = function activate_(e) {
    var _this9 = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

    if (e) {
      this.registerDeactivationHandlers_(e);
    }

    requestAnimationFrame(function () {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this9.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        _this9.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        _this9.activationState_ = _this9.defaultActivationState_();
      }
    });
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function activate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.activate_(event);
  };

  /** @private */


  MDCRippleFoundation.prototype.animateActivation_ = function animateActivation_() {
    var _this10 = this;

    var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
    var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
        FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
          startPoint = _getFgTranslationCoor.startPoint,
          endPoint = _getFgTranslationCoor.endPoint;

      translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
      translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this10.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function getFgTranslationCoordinates_() {
    var activationState = this.activationState_;
    var activationEvent = activationState.activationEvent,
        wasActivatedByPointer = activationState.wasActivatedByPointer;


    var startPoint = void 0;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
      /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };

    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };

    return { startPoint: startPoint, endPoint: endPoint };
  };

  /** @private */


  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function runDeactivationUXLogicIfReady_() {
    var _this11 = this;

    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _activationState_ = this.activationState_,
        hasDeactivationUXRun = _activationState_.hasDeactivationUXRun,
        isActivated = _activationState_.isActivated;

    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this11.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function rmBoundedActivationClasses_() {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function resetActivationState_() {
    var _this12 = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(function () {
      return _this12.previousActivationEvent_ = null;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.deactivate_ = function deactivate_(e) {
    var _this13 = this;

    var activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    var state = /** @type {!ActivationStateType} */_extends({}, activationState);

    if (activationState.isProgrammatic) {
      var evtObject = null;
      requestAnimationFrame(function () {
        return _this13.animateDeactivation_(evtObject, state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this13.activationState_.hasDeactivationUXRun = true;
        _this13.animateDeactivation_(e, state);
        _this13.resetActivationState_();
      });
    }
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.deactivate = function deactivate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.deactivate_(event);
  };

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  MDCRippleFoundation.prototype.animateDeactivation_ = function animateDeactivation_(e, _ref) {
    var wasActivatedByPointer = _ref.wasActivatedByPointer,
        wasElementMadeActive = _ref.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layout = function layout() {
    var _this14 = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function () {
      _this14.layoutInternal_();
      _this14.layoutFrame_ = 0;
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.layoutInternal_ = function layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    var maxDim = Math.max(this.frame_.height, this.frame_.width);
    var surfaceDiameter = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));

    // 60% of the largest dimension of the surface
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;

    // Diameter of the surface + 10px
    this.maxRadius_ = surfaceDiameter + MDCRippleFoundation.numbers.PADDING;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  };

  /** @private */


  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function updateLayoutCssVars_() {
    var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
        VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
        VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
        VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };

      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
    }
  };

  /** @param {boolean} unbounded */


  MDCRippleFoundation.prototype.setUnbounded = function setUnbounded(unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  return MDCRippleFoundation;
}(base_foundation);

/* harmony default export */ var ripple_foundation = (foundation_MDCRippleFoundation);
// CONCATENATED MODULE: ../node_modules/@material/ripple/index.js
var ripple__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function ripple__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ripple__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ripple__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

var ripple_MDCRipple = function (_MDCComponent) {
  ripple__inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    ripple__classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = ripple__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  MDCRipple.attachTo = function attachTo(root) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isUnbounded = _ref.isUnbounded,
        isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

    var ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */isUnbounded;
    }
    return ripple;
  };

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  MDCRipple.createAdapter = function createAdapter(instance) {
    var MATCHES = getMatchesProperty(HTMLElement.prototype);

    return {
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      isUnbounded: function isUnbounded() {
        return instance.unbounded;
      },
      isSurfaceActive: function isSurfaceActive() {
        return instance.root_[MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return instance.disabled;
      },
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    };
  };

  /** @return {boolean} */


  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */
  MDCRipple.prototype.setUnbounded_ = function setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  };

  MDCRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /** @return {!MDCRippleFoundation} */


  MDCRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    return new ripple_foundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  };

  ripple__createClass(MDCRipple, [{
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    }
  }]);

  return MDCRipple;
}(component);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


var RippleCapableSurface = function RippleCapableSurface() {
  ripple__classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;


// CONCATENATED MODULE: ../node_modules/preact-material-components/MaterialComponent.js
var MaterialComponent__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function MaterialComponent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MaterialComponent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function MaterialComponent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent_MaterialComponent = function (_Component) {
  MaterialComponent__inherits(MaterialComponent, _Component);

  function MaterialComponent() {
    MaterialComponent__classCallCheck(this, MaterialComponent);

    // Attributes inside this array will be check for boolean value true
    // and will be converted to mdc classes
    var _this = MaterialComponent__possibleConstructorReturn(this, _Component.call(this));

    _this._mdcProps = [];
    // This will again be used to add apt classname to the component
    _this.componentName = "";
    // The final class name given to the dom
    _this.classText = "";
    return _this;
  }

  MaterialComponent.prototype.attachRipple = function attachRipple() {
    if (this.props.ripple && this.control) {
      ripple_MDCRipple.attachTo(this.control);
    }
  };
  // Build the className


  MaterialComponent.prototype.buildClassName = function buildClassName(props) {
    this.classText = "mdc-" + this.componentName;
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey)) {
        var prop = this.props[propKey];
        if (typeof prop === "boolean" && prop) {
          if (this._mdcProps.indexOf(propKey) !== -1) {
            this.classText += " mdc-" + this.componentName + "--" + propKey;
          }
        }
      }
    }
  };

  MaterialComponent.prototype.getClassName = function getClassName(element) {
    if (!element) {
      return "";
    }
    var attrs = element.attributes = element.attributes || {};
    var classText = this.classText;
    if (attrs.class) {
      classText += " " + attrs.class;
    }
    if (attrs.className && attrs.className !== attrs.class) {
      classText += " " + attrs.className;
    }
    return classText;
  };
  // Components must implement this method for their specific DOM structure


  MaterialComponent.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("div", MaterialComponent__extends({}, props), props.children);
  };

  MaterialComponent.prototype.render = function render() {
    this.buildClassName();
    // Fetch a VNode
    var componentProps = this.props;
    if (componentProps.class) {
      // We delete class prop here so that any sub node's class doesn't get over-ridden from this
      delete componentProps.class;
    }
    var element = this.materialDom(componentProps);
    element.attributes = element.attributes || {};
    // Fix for className
    element.attributes.class = this.getClassName(element);
    element.attributes.className = this.getClassName(element);
    // Clean this shit of proxy attributes
    this._mdcProps.forEach(function (prop) {
      delete element.attributes[prop];
    });
    return element;
  };

  return MaterialComponent;
}(preact_min["Component"]);


// CONCATENATED MODULE: ../node_modules/preact-material-components/Icon/index.js
function Icon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Icon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Icon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 * @prop disabled = false
 */

var Icon_Icon = function (_MaterialComponent) {
  Icon__inherits(Icon, _MaterialComponent);

  function Icon() {
    Icon__classCallCheck(this, Icon);

    var _this = Icon__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "icon";
    return _this;
  }

  Icon.prototype.materialDom = function materialDom(props) {
    var classes = ["material-icons"];
    if (props.className) {
      classes.push(props.className);
    }
    return Object(preact_min["h"])("i", Icon__extends({}, props, { className: classes.join(" ") }), props.children);
  };

  return Icon;
}(MaterialComponent_MaterialComponent);


// CONCATENATED MODULE: ../node_modules/preact-material-components/themeUtils/generateThemeClass.js
/* harmony default export */ var generateThemeClass = (function (prop) {
  return "mdc-theme--" + prop + "-bg";
});
// CONCATENATED MODULE: ../node_modules/preact-material-components/Button/index.js
function Button__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Button__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Button__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};






/**
 *  @prop dense = false
 *  @prop raised = false
 *  @prop compact = false
 *  @prop disabled = false
 *  @prop unelevated = false
 *  @prop stroked = false
 */

var Button_Button = function (_MaterialComponent) {
  Button__inherits(Button, _MaterialComponent);

  function Button() {
    Button__classCallCheck(this, Button);

    var _this = Button__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "button";
    _this._mdcProps = ["dense", "raised", "compact", "unelevated", "stroked"];
    _this.themeProps = ["primary", "secondary"];
    return _this;
  }

  Button.prototype.componentDidMount = function componentDidMount() {
    _MaterialComponent.prototype.attachRipple.call(this);
  };

  Button.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    var ButtonElement = props.href ? "a" : "button";
    var className = "";
    this.themeProps.forEach(function (themeProp) {
      if (themeProp in props && props[themeProp] !== false) className += generateThemeClass(themeProp) + " ";
    });

    return Object(preact_min["h"])(ButtonElement, Button__extends({
      className: className,
      ref: function ref(control) {
        _this2.control = control;
      }
    }, props), this.props.children);
  };

  return Button;
}(MaterialComponent_MaterialComponent);

var ButtonIcon = function (_Icon) {
  Button__inherits(ButtonIcon, _Icon);

  function ButtonIcon() {
    Button__classCallCheck(this, ButtonIcon);

    var _this3 = Button__possibleConstructorReturn(this, _Icon.call(this));

    _this3.componentName = "button__icon";
    return _this3;
  }

  return ButtonIcon;
}(Icon_Icon);

Button_Button.Icon = ButtonIcon;
/* harmony default export */ var preact_material_components_Button = (Button_Button);
// EXTERNAL MODULE: ../node_modules/preact-material-components/Button/style.css
var Button_style = __webpack_require__("aqQ4");
var Button_style_default = /*#__PURE__*/__webpack_require__.n(Button_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Theme/style.css
var Theme_style = __webpack_require__("a81U");
var Theme_style_default = /*#__PURE__*/__webpack_require__.n(Theme_style);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// CONCATENATED MODULE: ./components/WelcomeMessage/index.js









var WelcomeMessage__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Welcome!'
);

var WelcomeMessage__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Find the Reward Credit Card that will give you the most bang for your buck. Get started by entering your Monthly Spendatures.'
);

var WelcomeMessage__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'The accuracy of the information presented on this site cannot be gauranteed and should be used for informational purposes only. \xA0',
	Object(preact_min["h"])(
		match["Link"],
		{ activeClassName: 'active', href: '/disclaimer' },
		'Full Disclaimer'
	)
);

var WelcomeMessage__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'See a missing credit card, or one that has incorrect information? Please, open an issue on Github.'
);

var WelcomeMessage_WelcomeMessage = function WelcomeMessage(props) {
	return Object(preact_min["h"])(
		'div',
		{ id: 'welcomeMessageContainer', 'class': WelcomeMessage_style_default.a.welcome },
		WelcomeMessage__ref,
		WelcomeMessage__ref2,
		WelcomeMessage__ref3,
		WelcomeMessage__ref4,
		Object(preact_min["h"])(
			'div',
			{ id: 'welcomeButtonContainer', 'class': WelcomeMessage_style_default.a.welcomeButtonContainer },
			Object(preact_min["h"])(
				preact_material_components_Button,
				{ raised: true, className: 'mdc-theme--secondary-bg', onClick: props.onClick },
				'Get Started'
			)
		)
	);
};


// EXTERNAL MODULE: ./components/Spendatures/style.css
var Spendatures_style = __webpack_require__("w/Y3");
var Spendatures_style_default = /*#__PURE__*/__webpack_require__.n(Spendatures_style);

// CONCATENATED MODULE: ../node_modules/@material/textfield/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var constants_strings = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-text-field__label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  OUTLINE_SELECTOR: '.mdc-text-field__outline',
  BOTTOM_LINE_SELECTOR: '.mdc-text-field__bottom-line'
};

/** @enum {string} */
var constants_cssClasses = {
  ROOT: 'mdc-text-field',
  UPGRADED: 'mdc-text-field--upgraded',
  DISABLED: 'mdc-text-field--disabled',
  DENSE: 'mdc-text-field--dense',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  BOX: 'mdc-text-field--box',
  OUTLINED: 'mdc-text-field--outlined'
};

/** @enum {number} */
var constants_numbers = {
  LABEL_SCALE: 0.75,
  DENSE_LABEL_SCALE: 0.923
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/bottom-line/adapter.js
function bottom_line_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC TextField Bottom Line.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField bottom line into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldBottomLineAdapter = function () {
  function MDCTextFieldBottomLineAdapter() {
    bottom_line_adapter__classCallCheck(this, MDCTextFieldBottomLineAdapter);
  }

  /**
   * Adds a class to the bottom line element.
   * @param {string} className
   */
  MDCTextFieldBottomLineAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the bottom line element.
   * @param {string} className
   */


  MDCTextFieldBottomLineAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Sets an attribute with a given value on the bottom line element.
   * @param {string} attr
   * @param {string} value
   */


  MDCTextFieldBottomLineAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Registers an event listener on the bottom line element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldBottomLineAdapter.prototype.registerEventHandler = function registerEventHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the bottom line element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldBottomLineAdapter.prototype.deregisterEventHandler = function deregisterEventHandler(evtType, handler) {};

  /**
   * Emits a custom event "MDCTextFieldBottomLine:animation-end" denoting the
   * bottom line has finished its animation; either the activate or
   * deactivate animation
   */


  MDCTextFieldBottomLineAdapter.prototype.notifyAnimationEnd = function notifyAnimationEnd() {};

  return MDCTextFieldBottomLineAdapter;
}();

/* harmony default export */ var bottom_line_adapter = (MDCTextFieldBottomLineAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/bottom-line/constants.js
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var bottom_line_constants_strings = {
  ANIMATION_END_EVENT: 'MDCTextFieldBottomLine:animation-end'
};

/** @enum {string} */
var bottom_line_constants_cssClasses = {
  BOTTOM_LINE_ACTIVE: 'mdc-text-field__bottom-line--active'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/bottom-line/foundation.js
var foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var bottom_line_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function bottom_line_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldBottomLineAdapter>}
 * @final
 */

var foundation_MDCTextFieldBottomLineFoundation = function (_MDCFoundation) {
  foundation__inherits(MDCTextFieldBottomLineFoundation, _MDCFoundation);

  bottom_line_foundation__createClass(MDCTextFieldBottomLineFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return bottom_line_constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return bottom_line_constants_strings;
    }

    /**
     * {@see MDCTextFieldBottomLineAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldBottomLineAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldBottomLineAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          setAttr: function setAttr() {},
          registerEventHandler: function registerEventHandler() {},
          deregisterEventHandler: function deregisterEventHandler() {},
          notifyAnimationEnd: function notifyAnimationEnd() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldBottomLineAdapter=} adapter
     */

  }]);

  function MDCTextFieldBottomLineFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldBottomLineAdapter} */{};

    bottom_line_foundation__classCallCheck(this, MDCTextFieldBottomLineFoundation);

    /** @private {function(!Event): undefined} */
    var _this = foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, foundation__extends(MDCTextFieldBottomLineFoundation.defaultAdapter, adapter)));

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };
    return _this;
  }

  MDCTextFieldBottomLineFoundation.prototype.init = function init() {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCTextFieldBottomLineFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  /**
   * Activates the bottom line
   */


  MDCTextFieldBottomLineFoundation.prototype.activate = function activate() {
    this.adapter_.addClass(bottom_line_constants_cssClasses.BOTTOM_LINE_ACTIVE);
  };

  /**
   * Sets the transform origin given a user's click location.
   * @param {!Event} evt
   */


  MDCTextFieldBottomLineFoundation.prototype.setTransformOrigin = function setTransformOrigin(evt) {
    var targetClientRect = evt.target.getBoundingClientRect();
    var evtCoords = { x: evt.clientX, y: evt.clientY };
    var normalizedX = evtCoords.x - targetClientRect.left;
    var attributeString = 'transform-origin: ' + normalizedX + 'px center';

    this.adapter_.setAttr('style', attributeString);
  };

  /**
   * Deactivates the bottom line
   */


  MDCTextFieldBottomLineFoundation.prototype.deactivate = function deactivate() {
    this.adapter_.removeClass(bottom_line_constants_cssClasses.BOTTOM_LINE_ACTIVE);
  };

  /**
   * Handles a transition end event
   * @param {!Event} evt
   */


  MDCTextFieldBottomLineFoundation.prototype.handleTransitionEnd = function handleTransitionEnd(evt) {
    // Wait for the bottom line to be either transparent or opaque
    // before emitting the animation end event
    if (evt.propertyName === 'opacity') {
      this.adapter_.notifyAnimationEnd();
    }
  };

  return MDCTextFieldBottomLineFoundation;
}(base_foundation);

/* harmony default export */ var bottom_line_foundation = (foundation_MDCTextFieldBottomLineFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/adapter.js
function helper_text_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Helper Text.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the TextField helper text into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldHelperTextAdapter = function () {
  function MDCTextFieldHelperTextAdapter() {
    helper_text_adapter__classCallCheck(this, MDCTextFieldHelperTextAdapter);
  }

  /**
   * Adds a class to the helper text element.
   * @param {string} className
   */
  MDCTextFieldHelperTextAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the helper text element.
   * @param {string} className
   */


  MDCTextFieldHelperTextAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns whether or not the helper text element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  MDCTextFieldHelperTextAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Sets an attribute with a given value on the helper text element.
   * @param {string} attr
   * @param {string} value
   */


  MDCTextFieldHelperTextAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Removes an attribute from the helper text element.
   * @param {string} attr
   */


  MDCTextFieldHelperTextAdapter.prototype.removeAttr = function removeAttr(attr) {};

  /**
   * Sets the text content for the helper text element.
   * @param {string} content
   */


  MDCTextFieldHelperTextAdapter.prototype.setContent = function setContent(content) {};

  return MDCTextFieldHelperTextAdapter;
}();

/* harmony default export */ var helper_text_adapter = (MDCTextFieldHelperTextAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var helper_text_constants_strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};

/** @enum {string} */
var helper_text_constants_cssClasses = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/foundation.js
var helper_text_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var helper_text_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function helper_text_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function helper_text_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function helper_text_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
 * @final
 */

var foundation_MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
  helper_text_foundation__inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);

  helper_text_foundation__createClass(MDCTextFieldHelperTextFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return helper_text_constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return helper_text_constants_strings;
    }

    /**
     * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldHelperTextAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldHelperTextAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          setAttr: function setAttr() {},
          removeAttr: function removeAttr() {},
          setContent: function setContent() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldHelperTextAdapter=} adapter
     */

  }]);

  function MDCTextFieldHelperTextFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldHelperTextAdapter} */{};

    helper_text_foundation__classCallCheck(this, MDCTextFieldHelperTextFoundation);

    return helper_text_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, helper_text_foundation__extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
  }

  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */


  MDCTextFieldHelperTextFoundation.prototype.setContent = function setContent(content) {
    this.adapter_.setContent(content);
  };

  /** @param {boolean} isPersistent Sets the persistency of the helper text. */


  MDCTextFieldHelperTextFoundation.prototype.setPersistent = function setPersistent(isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(helper_text_constants_cssClasses.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(helper_text_constants_cssClasses.HELPER_TEXT_PERSISTENT);
    }
  };

  /**
   * @param {boolean} isValidation True to make the helper text act as an
   *   error validation message.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidation = function setValidation(isValidation) {
    if (isValidation) {
      this.adapter_.addClass(helper_text_constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(helper_text_constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };

  /** Makes the helper text visible to the screen reader. */


  MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function showToScreenReader() {
    this.adapter_.removeAttr(helper_text_constants_strings.ARIA_HIDDEN);
  };

  /**
   * Sets the validity of the helper text based on the input validity.
   * @param {boolean} inputIsValid
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidity = function setValidity(inputIsValid) {
    var helperTextIsPersistent = this.adapter_.hasClass(helper_text_constants_cssClasses.HELPER_TEXT_PERSISTENT);
    var helperTextIsValidationMsg = this.adapter_.hasClass(helper_text_constants_cssClasses.HELPER_TEXT_VALIDATION_MSG);
    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(helper_text_constants_strings.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(helper_text_constants_strings.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  };

  /**
   * Hides the help text from screen readers.
   * @private
   */


  MDCTextFieldHelperTextFoundation.prototype.hide_ = function hide_() {
    this.adapter_.setAttr(helper_text_constants_strings.ARIA_HIDDEN, 'true');
  };

  return MDCTextFieldHelperTextFoundation;
}(base_foundation);

/* harmony default export */ var helper_text_foundation = (foundation_MDCTextFieldHelperTextFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/adapter.js
function icon_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Icon.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the text field icon into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldIconAdapter = function () {
  function MDCTextFieldIconAdapter() {
    icon_adapter__classCallCheck(this, MDCTextFieldIconAdapter);
  }

  /**
   * Sets an attribute on the icon element.
   * @param {string} attr
   * @param {string} value
   */
  MDCTextFieldIconAdapter.prototype.setAttr = function setAttr(attr, value) {};

  /**
   * Registers an event listener on the icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldIconAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldIconAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
   */


  MDCTextFieldIconAdapter.prototype.notifyIconAction = function notifyIconAction() {};

  return MDCTextFieldIconAdapter;
}();

/* harmony default export */ var icon_adapter = (MDCTextFieldIconAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var icon_constants_strings = {
  ICON_EVENT: 'MDCTextField:icon'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/foundation.js
var icon_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var icon_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function icon_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icon_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function icon_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
 * @final
 */

var foundation_MDCTextFieldIconFoundation = function (_MDCFoundation) {
  icon_foundation__inherits(MDCTextFieldIconFoundation, _MDCFoundation);

  icon_foundation__createClass(MDCTextFieldIconFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return icon_constants_strings;
    }

    /**
     * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldIconAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldIconAdapter} */{
          setAttr: function setAttr() {},
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          notifyIconAction: function notifyIconAction() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldIconAdapter=} adapter
     */

  }]);

  function MDCTextFieldIconFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldIconAdapter} */{};

    icon_foundation__classCallCheck(this, MDCTextFieldIconFoundation);

    /** @private {function(!Event): undefined} */
    var _this = icon_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, icon_foundation__extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };
    return _this;
  }

  MDCTextFieldIconFoundation.prototype.init = function init() {
    var _this2 = this;

    ['click', 'keydown'].forEach(function (evtType) {
      _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    ['click', 'keydown'].forEach(function (evtType) {
      _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
    });
  };

  /**
   * Sets the content of the helper text field.
   * @param {boolean} disabled
   */


  MDCTextFieldIconFoundation.prototype.setDisabled = function setDisabled(disabled) {
    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
    } else {
      this.adapter_.setAttr('tabindex', '0');
    }
  };

  /**
   * Handles an interaction event
   * @param {!Event} evt
   */


  MDCTextFieldIconFoundation.prototype.handleInteraction = function handleInteraction(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyIconAction();
    }
  };

  return MDCTextFieldIconFoundation;
}(base_foundation);

/* harmony default export */ var icon_foundation = (foundation_MDCTextFieldIconFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/label/adapter.js
function label_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldLabelAdapter = function () {
  function MDCTextFieldLabelAdapter() {
    label_adapter__classCallCheck(this, MDCTextFieldLabelAdapter);
  }

  /**
   * Adds a class to the label element.
   * @param {string} className
   */
  MDCTextFieldLabelAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the label element.
   * @param {string} className
   */


  MDCTextFieldLabelAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns the width of the label element.
   * @return {number}
   */


  MDCTextFieldLabelAdapter.prototype.getWidth = function getWidth() {};

  return MDCTextFieldLabelAdapter;
}();

/* harmony default export */ var label_adapter = (MDCTextFieldLabelAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/label/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var label_constants_cssClasses = {
  LABEL_FLOAT_ABOVE: 'mdc-text-field__label--float-above',
  LABEL_SHAKE: 'mdc-text-field__label--shake'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/label/foundation.js
var label_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var label_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function label_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function label_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function label_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldLabelAdapter>}
 * @final
 */

var foundation_MDCTextFieldLabelFoundation = function (_MDCFoundation) {
  label_foundation__inherits(MDCTextFieldLabelFoundation, _MDCFoundation);

  label_foundation__createClass(MDCTextFieldLabelFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return label_constants_cssClasses;
    }

    /**
     * {@see MDCTextFieldLabelAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldLabelAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldLabelAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          getWidth: function getWidth() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldLabelAdapter=} adapter
     */

  }]);

  function MDCTextFieldLabelFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldLabelAdapter} */{};

    label_foundation__classCallCheck(this, MDCTextFieldLabelFoundation);

    return label_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, label_foundation__extends(MDCTextFieldLabelFoundation.defaultAdapter, adapter)));
  }

  /**
   * Returns the width of the label element.
   * @return {number}
   */


  MDCTextFieldLabelFoundation.prototype.getWidth = function getWidth() {
    return this.adapter_.getWidth();
  };

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} isValid Whether the input's value is valid (passes all
   *     validity checks).
   * @param {boolean} isFocused Whether the input is focused.
   */


  MDCTextFieldLabelFoundation.prototype.styleShake = function styleShake(isValid, isFocused) {
    var LABEL_SHAKE = MDCTextFieldLabelFoundation.cssClasses.LABEL_SHAKE;

    if (isValid || isFocused) {
      this.adapter_.removeClass(LABEL_SHAKE);
    } else {
      this.adapter_.addClass(LABEL_SHAKE);
    }
  };

  /**
   * Styles the label to float or defloat as necessary.
   * @param {string} value The value of the input.
   * @param {boolean} isFocused Whether the input is focused.
   * @param {boolean} isBadInput The input's `validity.badInput` value.
   */


  MDCTextFieldLabelFoundation.prototype.styleFloat = function styleFloat(value, isFocused, isBadInput) {
    var LABEL_FLOAT_ABOVE = MDCTextFieldLabelFoundation.cssClasses.LABEL_FLOAT_ABOVE;

    if (!!value || isFocused) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else if (!isBadInput) {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
    }
  };

  return MDCTextFieldLabelFoundation;
}(base_foundation);

/* harmony default export */ var label_foundation = (foundation_MDCTextFieldLabelFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/outline/adapter.js
function outline_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Text Field Outline.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field outline into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
var MDCTextFieldOutlineAdapter = function () {
  function MDCTextFieldOutlineAdapter() {
    outline_adapter__classCallCheck(this, MDCTextFieldOutlineAdapter);
  }

  /**
   * Returns the width of the root element.
   * @return {number}
   */
  MDCTextFieldOutlineAdapter.prototype.getWidth = function getWidth() {};

  /**
   * Returns the height of the root element.
   * @return {number}
   */


  MDCTextFieldOutlineAdapter.prototype.getHeight = function getHeight() {};

  /**
   * Sets the "d" attribute of the outline element's SVG path.
   * @param {string} value
   */


  MDCTextFieldOutlineAdapter.prototype.setOutlinePathAttr = function setOutlinePathAttr(value) {};

  /**
   * Returns the idle outline element's computed style value of the given css property `propertyName`.
   * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
   * @param {string} propertyName
   * @return {string}
   */


  MDCTextFieldOutlineAdapter.prototype.getIdleOutlineStyleValue = function getIdleOutlineStyleValue(propertyName) {};

  return MDCTextFieldOutlineAdapter;
}();

/* harmony default export */ var outline_adapter = (MDCTextFieldOutlineAdapter);
// CONCATENATED MODULE: ../node_modules/@material/textfield/outline/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var outline_constants_strings = {
  PATH_SELECTOR: '.mdc-text-field__outline-path',
  IDLE_OUTLINE_SELECTOR: '.mdc-text-field__idle-outline'
};


// CONCATENATED MODULE: ../node_modules/@material/textfield/outline/foundation.js
var outline_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var outline_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function outline_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outline_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function outline_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCTextFieldOutlineAdapter>}
 * @final
 */

var foundation_MDCTextFieldOutlineFoundation = function (_MDCFoundation) {
  outline_foundation__inherits(MDCTextFieldOutlineFoundation, _MDCFoundation);

  outline_foundation__createClass(MDCTextFieldOutlineFoundation, null, [{
    key: 'strings',

    /** @return enum {string} */
    get: function get() {
      return outline_constants_strings;
    }

    /**
     * {@see MDCTextFieldOutlineAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldOutlineAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldOutlineAdapter} */{
          getWidth: function getWidth() {},
          getHeight: function getHeight() {},
          setOutlinePathAttr: function setOutlinePathAttr() {},
          getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldOutlineAdapter=} adapter
     */

  }]);

  function MDCTextFieldOutlineFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldOutlineAdapter} */{};

    outline_foundation__classCallCheck(this, MDCTextFieldOutlineFoundation);

    return outline_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, outline_foundation__extends(MDCTextFieldOutlineFoundation.defaultAdapter, adapter)));
  }

  /**
   * Updates the SVG path of the focus outline element based on the given width of the
   * label element and the RTL context.
   * @param {number} labelWidth
   * @param {boolean=} isRtl
   */


  MDCTextFieldOutlineFoundation.prototype.updateSvgPath = function updateSvgPath(labelWidth) {
    var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    var radius = parseFloat(radiusStyleValue);
    var width = this.adapter_.getWidth();
    var height = this.adapter_.getHeight();
    var cornerWidth = radius + 1.2;
    var leadingStrokeLength = Math.abs(11 - cornerWidth);
    var paddedLabelWidth = labelWidth + 8;

    // The right, bottom, and left sides of the outline follow the same SVG path.
    var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

    var path = void 0;
    if (!isRtl) {
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedLabelWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedLabelWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedLabelWidth - leadingStrokeLength);
    }

    this.adapter_.setOutlinePathAttr(path);
  };

  return MDCTextFieldOutlineFoundation;
}(base_foundation);

/* harmony default export */ var outline_foundation = (foundation_MDCTextFieldOutlineFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/adapter.js
function textfield_adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-unused-vars */






/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * @typedef {{
 *   value: string,
 *   disabled: boolean,
 *   badInput: boolean,
 *   validity: {
 *     badInput: boolean,
 *     valid: boolean,
 *   },
 * }}
 */
var NativeInputType = void 0;

/**
 * @typedef {{
 *   bottomLine: (!MDCTextFieldBottomLineFoundation|undefined),
 *   helperText: (!MDCTextFieldHelperTextFoundation|undefined),
 *   icon: (!MDCTextFieldIconFoundation|undefined),
 *   label: (!MDCTextFieldLabelFoundation|undefined),
 *   outline: (!MDCTextFieldOutlineFoundation|undefined)
 * }}
 */
var FoundationMapType = void 0;

/**
 * Adapter for MDC Text Field.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Text Field into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */

var MDCTextFieldAdapter = function () {
  function MDCTextFieldAdapter() {
    textfield_adapter__classCallCheck(this, MDCTextFieldAdapter);
  }

  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  MDCTextFieldAdapter.prototype.addClass = function addClass(className) {};

  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  MDCTextFieldAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * Returns true if the root element contains the given class name.
   * @param {string} className
   */


  MDCTextFieldAdapter.prototype.hasClass = function hasClass(className) {};

  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.registerTextFieldInteractionHandler = function registerTextFieldInteractionHandler(type, handler) {};

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.deregisterTextFieldInteractionHandler = function deregisterTextFieldInteractionHandler(type, handler) {};

  /**
   * Registers an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.registerInputInteractionHandler = function registerInputInteractionHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.deregisterInputInteractionHandler = function deregisterInputInteractionHandler(evtType, handler) {};

  /**
   * Registers an event listener on the bottom line element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.registerBottomLineEventHandler = function registerBottomLineEventHandler(evtType, handler) {};

  /**
   * Deregisters an event listener on the bottom line element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */


  MDCTextFieldAdapter.prototype.deregisterBottomLineEventHandler = function deregisterBottomLineEventHandler(evtType, handler) {};

  /**
   * Returns an object representing the native text input element, with a
   * similar API shape. The object returned should include the value, disabled
   * and badInput properties, as well as the checkValidity() function. We never
   * alter the value within our code, however we do update the disabled
   * property, so if you choose to duck-type the return value for this method
   * in your implementation it's important to keep this in mind. Also note that
   * this method can return null, which the foundation will handle gracefully.
   * @return {?Element|?NativeInputType}
   */


  MDCTextFieldAdapter.prototype.getNativeInput = function getNativeInput() {};

  /**
   * Returns true if the textfield is focused.
   * We achieve this via `document.activeElement === this.root_`.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.isFocused = function isFocused() {};

  /**
   * Returns true if the direction of the root element is set to RTL.
   * @return {boolean}
   */


  MDCTextFieldAdapter.prototype.isRtl = function isRtl() {};

  return MDCTextFieldAdapter;
}();


// CONCATENATED MODULE: ../node_modules/@material/textfield/foundation.js
var textfield_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var textfield_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function textfield_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function textfield_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function textfield_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/* eslint-disable no-unused-vars */




/* eslint-enable no-unused-vars */


/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */

var foundation_MDCTextFieldFoundation = function (_MDCFoundation) {
  textfield_foundation__inherits(MDCTextFieldFoundation, _MDCFoundation);

  textfield_foundation__createClass(MDCTextFieldFoundation, null, [{
    key: 'cssClasses',

    /** @return enum {string} */
    get: function get() {
      return constants_cssClasses;
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return constants_strings;
    }

    /** @return enum {string} */

  }, {
    key: 'numbers',
    get: function get() {
      return constants_numbers;
    }

    /**
     * {@see MDCTextFieldAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCTextFieldAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCTextFieldAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {},
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
          registerInputInteractionHandler: function registerInputInteractionHandler() {},
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
          registerBottomLineEventHandler: function registerBottomLineEventHandler() {},
          deregisterBottomLineEventHandler: function deregisterBottomLineEventHandler() {},
          getNativeInput: function getNativeInput() {},
          isFocused: function isFocused() {},
          isRtl: function isRtl() {}
        }
      );
    }

    /**
     * @param {!MDCTextFieldAdapter=} adapter
     * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
     */

  }]);

  function MDCTextFieldFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCTextFieldAdapter} */{};
    var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};

    textfield_foundation__classCallCheck(this, MDCTextFieldFoundation);

    /** @type {!MDCTextFieldBottomLineFoundation|undefined} */
    var _this = textfield_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, textfield_foundation__extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

    _this.bottomLine_ = foundationMap.bottomLine;
    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
    _this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */
    _this.icon_ = foundationMap.icon;
    /** @type {!MDCTextFieldLabelFoundation|undefined} */
    _this.label_ = foundationMap.label;
    /** @type {!MDCTextFieldOutlineFoundation|undefined} */
    _this.outline_ = foundationMap.outline;

    /** @private {boolean} */
    _this.isFocused_ = false;
    /** @private {boolean} */
    _this.receivedUserInput_ = false;
    /** @private {boolean} */
    _this.useCustomValidityChecking_ = false;
    /** @private {boolean} */
    _this.isValid_ = true;
    /** @private {function(): undefined} */
    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };
    /** @private {function(): undefined} */
    _this.inputInputHandler_ = function () {
      return _this.autoCompleteFocus();
    };
    /** @private {function(!Event): undefined} */
    _this.setPointerXOffset_ = function (evt) {
      return _this.setBottomLineTransformOrigin(evt);
    };
    /** @private {function(!Event): undefined} */
    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };
    /** @private {function(!Event): undefined} */
    _this.bottomLineAnimationEndHandler_ = function () {
      return _this.handleBottomLineAnimationEnd();
    };
    return _this;
  }

  MDCTextFieldFoundation.prototype.init = function init() {
    var _this2 = this;

    this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    // Ensure label does not collide with any pre-filled value.
    if (this.label_ && this.getValue()) {
      this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
    }

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(function (evtType) {
      _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(function (evtType) {
      _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
    });
    this.adapter_.registerBottomLineEventHandler(bottom_line_foundation.strings.ANIMATION_END_EVENT, this.bottomLineAnimationEndHandler_);
  };

  MDCTextFieldFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(function (evtType) {
      _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(function (evtType) {
      _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterBottomLineEventHandler(bottom_line_foundation.strings.ANIMATION_END_EVENT, this.bottomLineAnimationEndHandler_);
  };

  /**
   * Handles user interactions with the Text Field.
   */


  MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function handleTextFieldInteraction() {
    if (this.adapter_.getNativeInput().disabled) {
      return;
    }
    this.receivedUserInput_ = true;
  };

  /**
   * Updates the focus outline for outlined text fields.
   */


  MDCTextFieldFoundation.prototype.updateOutline = function updateOutline() {
    if (!this.outline_ || !this.label_) {
      return;
    }

    var isDense = this.adapter_.hasClass(constants_cssClasses.DENSE);
    var labelScale = isDense ? constants_numbers.DENSE_LABEL_SCALE : constants_numbers.LABEL_SCALE;
    var labelWidth = this.label_.getWidth() * labelScale;
    var isRtl = this.adapter_.isRtl();
    this.outline_.updateSvgPath(labelWidth, isRtl);
  };

  /**
   * Activates the text field focus state.
   */


  MDCTextFieldFoundation.prototype.activateFocus = function activateFocus() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    if (this.bottomLine_) {
      this.bottomLine_.activate();
    }
    if (this.outline_) {
      this.updateOutline();
    }
    if (this.label_) {
      this.label_.styleShake(this.isValid(), this.isFocused_);
      this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
    }
    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  };

  /**
   * Sets the bottom line's transform origin, so that the bottom line activate
   * animation will animate out from the user's click location.
   * @param {!Event} evt
   */


  MDCTextFieldFoundation.prototype.setBottomLineTransformOrigin = function setBottomLineTransformOrigin(evt) {
    if (this.bottomLine_) {
      this.bottomLine_.setTransformOrigin(evt);
    }
  };

  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   */


  MDCTextFieldFoundation.prototype.autoCompleteFocus = function autoCompleteFocus() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };

  /**
   * Handles when bottom line animation ends, performing actions that must wait
   * for animations to finish.
   */


  MDCTextFieldFoundation.prototype.handleBottomLineAnimationEnd = function handleBottomLineAnimationEnd() {
    // We need to wait for the bottom line to be entirely transparent
    // before removing the class. If we do not, we see the line start to
    // scale down before disappearing
    if (!this.isFocused_ && this.bottomLine_) {
      this.bottomLine_.deactivate();
    }
  };

  /**
   * Deactivates the Text Field's focus state.
   */


  MDCTextFieldFoundation.prototype.deactivateFocus = function deactivateFocus() {
    this.isFocused_ = false;
    var input = this.getNativeInput_();
    var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);
    if (this.label_) {
      this.label_.styleShake(this.isValid(), this.isFocused_);
      this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
    }
    if (shouldRemoveLabelFloat) {
      this.receivedUserInput_ = false;
    }
  };

  /**
   * @return {string} The value of the input Element.
   */


  MDCTextFieldFoundation.prototype.getValue = function getValue() {
    return this.getNativeInput_().value;
  };

  /**
   * @param {string} value The value to set on the input Element.
   */


  MDCTextFieldFoundation.prototype.setValue = function setValue(value) {
    this.getNativeInput_().value = value;
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    if (this.label_) {
      this.label_.styleShake(isValid, this.isFocused_);
      this.label_.styleFloat(this.getValue(), this.isFocused_, this.isBadInput_());
    }
  };

  /**
   * @return {boolean} If a custom validity is set, returns that value.
   *     Otherwise, returns the result of native validity checks.
   */


  MDCTextFieldFoundation.prototype.isValid = function isValid() {
    return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
  };

  /**
   * @param {boolean} isValid Sets the validity state of the Text Field.
   */


  MDCTextFieldFoundation.prototype.setValid = function setValid(isValid) {
    this.useCustomValidityChecking_ = true;
    this.isValid_ = isValid;
    // Retrieve from the getter to ensure correct logic is applied.
    isValid = this.isValid();
    this.styleValidity_(isValid);
    if (this.label_) {
      this.label_.styleShake(isValid, this.isFocused_);
    }
  };

  /**
   * @return {boolean} True if the Text Field is disabled.
   */


  MDCTextFieldFoundation.prototype.isDisabled = function isDisabled() {
    return this.getNativeInput_().disabled;
  };

  /**
   * @param {boolean} disabled Sets the text-field disabled or enabled.
   */


  MDCTextFieldFoundation.prototype.setDisabled = function setDisabled(disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };

  /**
   * @return {boolean} True if the Text Field is required.
   */


  MDCTextFieldFoundation.prototype.isRequired = function isRequired() {
    return this.getNativeInput_().required;
  };

  /**
   * @param {boolean} isRequired Sets the text-field required or not.
   */


  MDCTextFieldFoundation.prototype.setRequired = function setRequired(isRequired) {
    this.getNativeInput_().required = isRequired;
    // Addition of the asterisk is automatic based on CSS, but validity checking
    // needs to be manually run.
    this.styleValidity_(this.isValid());
  };

  /**
   * @param {string} content Sets the content of the helper text.
   */


  MDCTextFieldFoundation.prototype.setHelperTextContent = function setHelperTextContent(content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };

  /**
   * @return {boolean} True if the Text Field input fails in converting the
   *     user-supplied value.
   * @private
   */


  MDCTextFieldFoundation.prototype.isBadInput_ = function isBadInput_() {
    return this.getNativeInput_().validity.badInput;
  };

  /**
   * @return {boolean} The result of native validity checking
   *     (ValidityState.valid).
   */


  MDCTextFieldFoundation.prototype.isNativeInputValid_ = function isNativeInputValid_() {
    return this.getNativeInput_().validity.valid;
  };

  /**
   * Styles the component based on the validity state.
   * @param {boolean} isValid
   * @private
   */


  MDCTextFieldFoundation.prototype.styleValidity_ = function styleValidity_(isValid) {
    var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }
    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  };

  /**
   * Styles the component based on the focused state.
   * @param {boolean} isFocused
   * @private
   */


  MDCTextFieldFoundation.prototype.styleFocused_ = function styleFocused_(isFocused) {
    var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  };

  /**
   * Styles the component based on the disabled state.
   * @param {boolean} isDisabled
   * @private
   */


  MDCTextFieldFoundation.prototype.styleDisabled_ = function styleDisabled_(isDisabled) {
    var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
        DISABLED = _MDCTextFieldFoundati.DISABLED,
        INVALID = _MDCTextFieldFoundati.INVALID;

    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
    if (this.icon_) {
      this.icon_.setDisabled(isDisabled);
    }
  };

  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */


  MDCTextFieldFoundation.prototype.getNativeInput_ = function getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */{
      value: '',
      disabled: false,
      validity: {
        badInput: false,
        valid: true
      }
    };
  };

  return MDCTextFieldFoundation;
}(base_foundation);

/* harmony default export */ var textfield_foundation = (foundation_MDCTextFieldFoundation);
// CONCATENATED MODULE: ../node_modules/@material/textfield/bottom-line/index.js
var bottom_line__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var bottom_line__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function bottom_line__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function bottom_line__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function bottom_line__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldBottomLineFoundation>}
 * @final
 */

var bottom_line_MDCTextFieldBottomLine = function (_MDCComponent) {
  bottom_line__inherits(MDCTextFieldBottomLine, _MDCComponent);

  function MDCTextFieldBottomLine() {
    bottom_line__classCallCheck(this, MDCTextFieldBottomLine);

    return bottom_line__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldBottomLine}
   */
  MDCTextFieldBottomLine.attachTo = function attachTo(root) {
    return new MDCTextFieldBottomLine(root);
  };

  /**
   * @return {!MDCTextFieldBottomLineFoundation}
   */


  /**
   * @return {!MDCTextFieldBottomLineFoundation}
   */
  MDCTextFieldBottomLine.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new bottom_line_foundation( /** @type {!MDCTextFieldBottomLineAdapter} */bottom_line__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      registerEventHandler: function registerEventHandler(evtType, handler) {
        return _this2.root_.addEventListener(evtType, handler);
      },
      deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
        return _this2.root_.removeEventListener(evtType, handler);
      },
      notifyAnimationEnd: function notifyAnimationEnd() {
        _this2.emit(bottom_line_foundation.strings.ANIMATION_END_EVENT, {});
      }
    }));
  };

  bottom_line__createClass(MDCTextFieldBottomLine, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldBottomLine;
}(component);


// CONCATENATED MODULE: ../node_modules/@material/textfield/helper-text/index.js
var helper_text__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var helper_text__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function helper_text__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function helper_text__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function helper_text__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldHelperTextFoundation>}
 * @final
 */

var helper_text_MDCTextFieldHelperText = function (_MDCComponent) {
  helper_text__inherits(MDCTextFieldHelperText, _MDCComponent);

  function MDCTextFieldHelperText() {
    helper_text__classCallCheck(this, MDCTextFieldHelperText);

    return helper_text__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldHelperText}
   */
  MDCTextFieldHelperText.attachTo = function attachTo(root) {
    return new MDCTextFieldHelperText(root);
  };

  /**
   * @return {!MDCTextFieldHelperTextFoundation}
   */


  /**
   * @return {!MDCTextFieldHelperTextFoundation}
   */
  MDCTextFieldHelperText.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new helper_text_foundation( /** @type {!MDCTextFieldHelperTextAdapter} */helper_text__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      removeAttr: function removeAttr(attr) {
        return _this2.root_.removeAttribute(attr);
      },
      setContent: function setContent(content) {
        _this2.root_.textContent = content;
      }
    }));
  };

  helper_text__createClass(MDCTextFieldHelperText, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldHelperText;
}(component);


// CONCATENATED MODULE: ../node_modules/@material/textfield/icon/index.js
var icon__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var icon__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function icon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function icon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldIconFoundation>}
 * @final
 */

var icon_MDCTextFieldIcon = function (_MDCComponent) {
  icon__inherits(MDCTextFieldIcon, _MDCComponent);

  function MDCTextFieldIcon() {
    icon__classCallCheck(this, MDCTextFieldIcon);

    return icon__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldIcon}
   */
  MDCTextFieldIcon.attachTo = function attachTo(root) {
    return new MDCTextFieldIcon(root);
  };

  /**
   * @return {!MDCTextFieldIconFoundation}
   */


  /**
   * @return {!MDCTextFieldIconFoundation}
   */
  MDCTextFieldIcon.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new icon_foundation( /** @type {!MDCTextFieldIconAdapter} */icon__extends({
      setAttr: function setAttr(attr, value) {
        return _this2.root_.setAttribute(attr, value);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this2.root_.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this2.root_.removeEventListener(evtType, handler);
      },
      notifyIconAction: function notifyIconAction() {
        return _this2.emit(icon_foundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */);
      }
    }));
  };

  icon__createClass(MDCTextFieldIcon, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldIcon;
}(component);


// CONCATENATED MODULE: ../node_modules/@material/textfield/label/index.js
var label__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var label__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function label__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function label__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function label__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends {MDCComponent<!MDCTextFieldLabelFoundation>}
 * @final
 */

var label_MDCTextFieldLabel = function (_MDCComponent) {
  label__inherits(MDCTextFieldLabel, _MDCComponent);

  function MDCTextFieldLabel() {
    label__classCallCheck(this, MDCTextFieldLabel);

    return label__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldLabel}
   */
  MDCTextFieldLabel.attachTo = function attachTo(root) {
    return new MDCTextFieldLabel(root);
  };

  /**
   * @return {!MDCTextFieldLabelFoundation}.
   */


  /**
   * @return {!MDCTextFieldLabelFoundation}
   */
  MDCTextFieldLabel.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new label_foundation( /** @type {!MDCTextFieldLabelAdapter} */label__extends({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      getWidth: function getWidth() {
        return _this2.root_.offsetWidth;
      }
    }));
  };

  label__createClass(MDCTextFieldLabel, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldLabel;
}(component);


// CONCATENATED MODULE: ../node_modules/@material/textfield/outline/index.js
var outline__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var outline__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function outline__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outline__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function outline__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/**
 * @extends {MDCComponent<!MDCTextFieldOutlineFoundation>}
 * @final
 */

var outline_MDCTextFieldOutline = function (_MDCComponent) {
  outline__inherits(MDCTextFieldOutline, _MDCComponent);

  function MDCTextFieldOutline() {
    outline__classCallCheck(this, MDCTextFieldOutline);

    return outline__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextFieldOutline}
   */
  MDCTextFieldOutline.attachTo = function attachTo(root) {
    return new MDCTextFieldOutline(root);
  };

  /**
   * @return {!MDCTextFieldOutlineFoundation}
   */


  /**
   * @return {!MDCTextFieldOutlineFoundation}
   */
  MDCTextFieldOutline.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new outline_foundation( /** @type {!MDCTextFieldOutlineAdapter} */outline__extends({
      getWidth: function getWidth() {
        return _this2.root_.offsetWidth;
      },
      getHeight: function getHeight() {
        return _this2.root_.offsetHeight;
      },
      setOutlinePathAttr: function setOutlinePathAttr(value) {
        var path = _this2.root_.querySelector(outline_constants_strings.PATH_SELECTOR);
        path.setAttribute('d', value);
      },
      getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
        var idleOutlineElement = _this2.root_.parentNode.querySelector(outline_constants_strings.IDLE_OUTLINE_SELECTOR);
        if (idleOutlineElement) {
          return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
        }
      }
    }));
  };

  outline__createClass(MDCTextFieldOutline, [{
    key: 'foundation',
    get: function get() {
      return this.foundation_;
    }
  }]);

  return MDCTextFieldOutline;
}(component);


// CONCATENATED MODULE: ../node_modules/@material/textfield/index.js
var textfield__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var textfield__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function textfield__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function textfield__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function textfield__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */





/* eslint-disable no-unused-vars */





/* eslint-enable no-unused-vars */

/**
 * @extends {MDCComponent<!MDCTextFieldFoundation>}
 * @final
 */

var textfield_MDCTextField = function (_MDCComponent) {
  textfield__inherits(MDCTextField, _MDCComponent);

  /**
   * @param {...?} args
   */
  function MDCTextField() {
    textfield__classCallCheck(this, MDCTextField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {?Element} */
    var _this = textfield__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.input_;
    /** @type {?MDCRipple} */
    _this.ripple;
    /** @private {?MDCTextFieldBottomLine} */
    _this.bottomLine_;
    /** @private {?MDCTextFieldHelperText} */
    _this.helperText_;
    /** @private {?MDCTextFieldIcon} */
    _this.icon_;
    /** @private {?MDCTextFieldLabel} */
    _this.label_;
    /** @private {?MDCTextFieldOutline} */
    _this.outline_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextField}
   */


  MDCTextField.attachTo = function attachTo(root) {
    return new MDCTextField(root);
  };

  /**
   * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
   * creates a new MDCRipple.
   * @param {(function(!Element): !MDCTextFieldBottomLine)=} bottomLineFactory A function which
   * creates a new MDCTextFieldBottomLine.
   * @param {(function(!Element): !MDCTextFieldHelperText)=} helperTextFactory A function which
   * creates a new MDCTextFieldHelperText.
   * @param {(function(!Element): !MDCTextFieldIcon)=} iconFactory A function which
   * creates a new MDCTextFieldIcon.
   * @param {(function(!Element): !MDCTextFieldLabel)=} labelFactory A function which
   * creates a new MDCTextFieldLabel.
   * @param {(function(!Element): !MDCTextFieldOutline)=} outlineFactory A function which
   * creates a new MDCTextFieldOutline.
   */


  MDCTextField.prototype.initialize = function initialize() {
    var rippleFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el, foundation) {
      return new ripple_MDCRipple(el, foundation);
    };
    var bottomLineFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
      return new bottom_line_MDCTextFieldBottomLine(el);
    };
    var helperTextFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (el) {
      return new helper_text_MDCTextFieldHelperText(el);
    };
    var iconFactory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (el) {
      return new icon_MDCTextFieldIcon(el);
    };

    var _this2 = this;

    var labelFactory = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (el) {
      return new label_MDCTextFieldLabel(el);
    };
    var outlineFactory = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (el) {
      return new outline_MDCTextFieldOutline(el);
    };

    this.input_ = this.root_.querySelector(constants_strings.INPUT_SELECTOR);
    var labelElement = this.root_.querySelector(constants_strings.LABEL_SELECTOR);
    if (labelElement) {
      this.label_ = labelFactory(labelElement);
    }
    var bottomLineElement = this.root_.querySelector(constants_strings.BOTTOM_LINE_SELECTOR);
    if (bottomLineElement) {
      this.bottomLine_ = bottomLineFactory(bottomLineElement);
    }
    var outlineElement = this.root_.querySelector(constants_strings.OUTLINE_SELECTOR);
    if (outlineElement) {
      this.outline_ = outlineFactory(outlineElement);
    }
    if (this.input_.hasAttribute(constants_strings.ARIA_CONTROLS)) {
      var helperTextElement = document.getElementById(this.input_.getAttribute(constants_strings.ARIA_CONTROLS));
      if (helperTextElement) {
        this.helperText_ = helperTextFactory(helperTextElement);
      }
    }
    var iconElement = this.root_.querySelector(constants_strings.ICON_SELECTOR);
    if (iconElement) {
      this.icon_ = iconFactory(iconElement);
    }

    this.ripple = null;
    if (this.root_.classList.contains(constants_cssClasses.BOX) || this.root_.classList.contains(constants_cssClasses.OUTLINED)) {
      // For outlined text fields, the ripple is instantiated on the outline element instead of the root element
      // to clip the ripple at the outline while still allowing the label to be visible beyond the outline.
      var rippleCapableSurface = outlineElement ? this.outline_ : this;
      var rippleRoot = outlineElement ? outlineElement : this.root_;
      var MATCHES = getMatchesProperty(HTMLElement.prototype);
      var adapter = textfield__extends(ripple_MDCRipple.createAdapter( /** @type {!RippleCapableSurface} */rippleCapableSurface), {
        isSurfaceActive: function isSurfaceActive() {
          return _this2.input_[MATCHES](':active');
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.input_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.input_.removeEventListener(type, handler);
        }
      });
      var foundation = new ripple_foundation(adapter);
      this.ripple = rippleFactory(rippleRoot, foundation);
    }
  };

  MDCTextField.prototype.destroy = function destroy() {
    if (this.ripple) {
      this.ripple.destroy();
    }
    if (this.bottomLine_) {
      this.bottomLine_.destroy();
    }
    if (this.helperText_) {
      this.helperText_.destroy();
    }
    if (this.icon_) {
      this.icon_.destroy();
    }
    if (this.label_) {
      this.label_.destroy();
    }
    if (this.outline_) {
      this.outline_.destroy();
    }
    _MDCComponent.prototype.destroy.call(this);
  };

  /**
   * Initiliazes the Text Field's internal state based on the environment's
   * state.
   */


  MDCTextField.prototype.initialSyncWithDom = function initialSyncWithDom() {
    this.disabled = this.input_.disabled;
  };

  /**
   * @return {string} The value of the input.
   */


  /**
   * Recomputes the outline SVG path for the outline element, and recomputes
   * all dimensions and positions for the ripple element.
   */
  MDCTextField.prototype.layout = function layout() {
    if (this.outline_) {
      this.foundation_.updateOutline();
    }
    if (this.ripple) {
      this.ripple.layout();
    }
  };

  /**
   * @return {!MDCTextFieldFoundation}
   */


  MDCTextField.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this3 = this;

    return new textfield_foundation(
    /** @type {!MDCTextFieldAdapter} */textfield__extends({
      addClass: function addClass(className) {
        return _this3.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this3.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this3.root_.classList.contains(className);
      },
      registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
        return _this3.root_.addEventListener(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
        return _this3.root_.removeEventListener(evtType, handler);
      },
      registerBottomLineEventHandler: function registerBottomLineEventHandler(evtType, handler) {
        if (_this3.bottomLine_) {
          _this3.bottomLine_.listen(evtType, handler);
        }
      },
      deregisterBottomLineEventHandler: function deregisterBottomLineEventHandler(evtType, handler) {
        if (_this3.bottomLine_) {
          _this3.bottomLine_.unlisten(evtType, handler);
        }
      },
      isFocused: function isFocused() {
        return document.activeElement === _this3.root_.querySelector(constants_strings.INPUT_SELECTOR);
      },
      isRtl: function isRtl() {
        return window.getComputedStyle(_this3.root_).getPropertyValue('direction') === 'rtl';
      }
    }, this.getInputAdapterMethods_()), this.getFoundationMap_());
  };

  /**
   * @return {!{
   *   registerInputInteractionHandler: function(string, function()): undefined,
   *   deregisterInputInteractionHandler: function(string, function()): undefined,
   *   getNativeInput: function(): ?Element,
   * }}
   */


  MDCTextField.prototype.getInputAdapterMethods_ = function getInputAdapterMethods_() {
    var _this4 = this;

    return {
      registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
        return _this4.input_.addEventListener(evtType, handler);
      },
      deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
        return _this4.input_.removeEventListener(evtType, handler);
      },
      getNativeInput: function getNativeInput() {
        return _this4.input_;
      }
    };
  };

  /**
   * Returns a map of all subcomponents to subfoundations.
   * @return {!FoundationMapType}
   */


  MDCTextField.prototype.getFoundationMap_ = function getFoundationMap_() {
    return {
      bottomLine: this.bottomLine_ ? this.bottomLine_.foundation : undefined,
      helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      icon: this.icon_ ? this.icon_.foundation : undefined,
      label: this.label_ ? this.label_.foundation : undefined,
      outline: this.outline_ ? this.outline_.foundation : undefined
    };
  };

  textfield__createClass(MDCTextField, [{
    key: 'value',
    get: function get() {
      return this.foundation_.getValue();
    }

    /**
     * @param {string} value The value to set on the input.
     */
    ,
    set: function set(value) {
      this.foundation_.setValue(value);
    }

    /**
     * @return {boolean} True if the Text Field is disabled.
     */

  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    }

    /**
     * @param {boolean} disabled Sets the Text Field disabled or enabled.
     */
    ,
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    }

    /**
     * @return {boolean} valid True if the Text Field is valid.
     */

  }, {
    key: 'valid',
    get: function get() {
      return this.foundation_.isValid();
    }

    /**
     * @param {boolean} valid Sets the Text Field valid or invalid.
     */
    ,
    set: function set(valid) {
      this.foundation_.setValid(valid);
    }

    /**
     * @return {boolean} True if the Text Field is required.
     */

  }, {
    key: 'required',
    get: function get() {
      return this.foundation_.isRequired();
    }

    /**
     * @param {boolean} required Sets the Text Field to required.
     */
    ,
    set: function set(required) {
      this.foundation_.setRequired(required);
    }

    /**
     * Sets the helper text element content.
     * @param {string} content
     */

  }, {
    key: 'helperTextContent',
    set: function set(content) {
      this.foundation_.setHelperTextContent(content);
    }
  }]);

  return MDCTextField;
}(component);


// CONCATENATED MODULE: ../node_modules/preact-material-components/TextField/index.js
function TextField__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TextField__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function TextField__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}






/**
 * @prop persistent = false
 * @prop validation-msg = false
 */

var TextField_HelperText = function (_MaterialComponent) {
  TextField__inherits(HelperText, _MaterialComponent);

  function HelperText() {
    TextField__classCallCheck(this, HelperText);

    var _this = TextField__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "text-field-helper-text";
    _this._mdcProps = ["persistent", "validation-msg"];
    return _this;
  }

  HelperText.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("p", TextField__extends({}, props, { "aria-hidden": "true" }), props.children);
  };

  return HelperText;
}(MaterialComponent_MaterialComponent);

var TextField_Label = function (_MaterialComponent2) {
  TextField__inherits(Label, _MaterialComponent2);

  function Label() {
    TextField__classCallCheck(this, Label);

    var _this2 = TextField__possibleConstructorReturn(this, _MaterialComponent2.call(this));

    _this2.componentName = "text-field__label";
    return _this2;
  }

  Label.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("label", props, props.children);
  };

  return Label;
}(MaterialComponent_MaterialComponent);

var defaultProps = {
  valid: true
};

/**
 * @prop fullwidth = false
 * @prop textarea = false
 * @prop dense = false
 * @prop disabled = false
 * @prop box = false
 * @prop type = 'text'
 * @prop value = ''
 * @prop label = ''
 */

var TextField_TextFieldInput = function (_MaterialComponent3) {
  TextField__inherits(TextFieldInput, _MaterialComponent3);

  function TextFieldInput() {
    TextField__classCallCheck(this, TextFieldInput);

    var _this3 = TextField__possibleConstructorReturn(this, _MaterialComponent3.call(this));

    _this3.componentName = "text-field";
    _this3._mdcProps = ["fullwidth", "textarea", "dense", "disabled", "box"];
    _this3.state = {
      showFloatingLabel: false
    };
    return _this3;
  }

  TextFieldInput.prototype.componentDidMount = function componentDidMount() {
    var _this4 = this;

    this.setState({
      showFloatingLabel: true
    }, function () {
      _this4.MDComponent = new textfield_MDCTextField(_this4.control);
      _this4.props.onInit && _this4.props.onInit(_this4.MDComponent);
      setValid(defaultProps, _this4.props, _this4.MDComponent);
    });
  };

  TextFieldInput.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    setValid(this.props, nextProps, this.MDComponent);
  };

  TextFieldInput.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent && this.MDComponent.destroy && this.MDComponent.destroy();
  };

  TextFieldInput.prototype.materialDom = function materialDom(allprops) {
    var _this5 = this;

    var className = allprops.className,
        props = _objectWithoutProperties(allprops, ["className"]);

    className = className || "";

    if ("leadingIcon" in props) {
      className += " mdc-text-field--box mdc-text-field--with-leading-icon";
    }

    if ("trailingIcon" in props) {
      className += " mdc-text-field--box mdc-text-field--with-trailing-icon";
    }

    if ("value" in props && this.state.showFloatingLabel) {
      className = [className, "mdc-text-field--upgraded"].join(" ");
    }
    if (props.label && props.fullwidth) {
      console.log('Passing a "label" prop is not supported when using a "fullwidth" text field.');
    }

    return Object(preact_min["h"])("div", { className: className, ref: function ref(control) {
        return _this5.control = control;
      } }, props.leadingIcon ? Object(preact_min["h"])(Icon_Icon, { className: "mdc-text-field__icon" }, props.leadingIcon) : null, props.textarea ? Object(preact_min["h"])("textarea", TextField__extends({ className: "mdc-text-field__input" }, props)) : Object(preact_min["h"])("input", TextField__extends({
      type: props.type || "text",
      className: "mdc-text-field__input"
    }, props)), props.label && this.state.showFloatingLabel && Object(preact_min["h"])(TextField_Label, { "for": props.id }, props.label), props.trailingIcon ? Object(preact_min["h"])(Icon_Icon, { className: "mdc-text-field__icon" }, props.trailingIcon) : null, props.textarea ? "" : Object(preact_min["h"])("div", { "class": "mdc-text-field__bottom-line" }));
  };

  return TextFieldInput;
}(MaterialComponent_MaterialComponent);

/**
 * @prop fullwidth = false
 * @prop textarea = false
 * @prop dense = false
 * @prop disabled = false
 * @prop box = false
 * @prop type = 'text'
 * @prop value = ''
 * @prop label = ''
 * @prop helperText = ''
 * @prop helperTextPersistent = false
 * @prop helperTextValidationMsg = false
 */


var TextField_TextField = function (_Component) {
  TextField__inherits(TextField, _Component);

  function TextField() {
    TextField__classCallCheck(this, TextField);

    var _this6 = TextField__possibleConstructorReturn(this, _Component.call(this));

    _this6.id = TextField.uid();
    _this6.state = {
      showFloatingLabel: false
    };
    return _this6;
  }

  TextField.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      showFloatingLabel: true
    });
  };

  TextField.uid = function uid() {
    if (!this.uidCounter) {
      this.uidCounter = 0;
    }
    return ++this.uidCounter;
  };

  TextField.prototype.render = function render(allprops, _ref) {
    var _this7 = this;

    var showFloatingLabel = _ref.showFloatingLabel;

    var className = allprops.className,
        helperTextPersistent = allprops.helperTextPersistent,
        helperTextValidationMsg = allprops.helperTextValidationMsg,
        props = _objectWithoutProperties(allprops, ["className", "helperTextPersistent", "helperTextValidationMsg"]);

    var showDiv = props.helperText || props.label && !showFloatingLabel;

    if (showDiv && !props.id) {
      props.id = "tf-" + this.id;
    }

    // Helper text
    var helperTextProps = {
      persistent: helperTextPersistent,
      "validation-msg": helperTextValidationMsg
    };

    return showDiv ? Object(preact_min["h"])("div", { className: className }, props.label && !showFloatingLabel && Object(preact_min["h"])("label", { "for": props.id }, props.cssLabel || props.label + ": "), Object(preact_min["h"])(TextField_TextFieldInput, TextField__extends({}, props, {
      onInit: function onInit(MDComponent) {
        _this7.MDComponent = MDComponent;
      },
      "aria-controls": props.helperText && props.id + "-helper-text"
    })), props.helperText && Object(preact_min["h"])(TextField_HelperText, TextField__extends({ id: props.id + "-helper-text" }, helperTextProps), props.helperText)) : Object(preact_min["h"])(TextField_TextFieldInput, TextField__extends({}, props, {
      className: className,
      onInit: function onInit(MDComponent) {
        _this7.MDComponent = MDComponent;
      }
    }));
  };

  return TextField;
}(preact_min["Component"]);

function setValid(oldprops, newprops, textfield) {
  if ("valid" in oldprops && "valid" in newprops && oldprops.valid !== newprops.valid) {
    textfield.valid = newprops.valid;
  }
}

TextField_TextField.Helptext = TextField_HelperText;

/* harmony default export */ var preact_material_components_TextField = (TextField_TextField);
// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/style.css
var TextField_style = __webpack_require__("qKn3");
var TextField_style_default = /*#__PURE__*/__webpack_require__.n(TextField_style);

// EXTERNAL MODULE: ./components/Spendatures/SpendatureItem/style.css
var SpendatureItem_style = __webpack_require__("UotE");
var SpendatureItem_style_default = /*#__PURE__*/__webpack_require__.n(SpendatureItem_style);

// CONCATENATED MODULE: ./components/Spendatures/SpendatureItem/index.js






var SpendatureItem_SpendatureItem = function SpendatureItem(_ref) {
	var id = _ref.id,
	    category = _ref.category,
	    monthlyValue = _ref.monthlyValue,
	    yearlyValue = _ref.yearlyValue,
	    handleMonthlyValueChange = _ref.handleMonthlyValueChange;
	return Object(preact_min["h"])(
		'div',
		{ id: 'spendature' + id, 'class': SpendatureItem_style_default.a.spendature },
		Object(preact_min["h"])(preact_material_components_TextField, { multiline: false,
			value: monthlyValue, onKeyUp: handleMonthlyValueChange,
			label: category, id: id,
			type: 'number',
			min: '0',
			step: '.01'
		})
	);
};


// EXTERNAL MODULE: ./components/Spendatures/MonthlyTransactions/style.css
var MonthlyTransactions_style = __webpack_require__("KNFG");
var MonthlyTransactions_style_default = /*#__PURE__*/__webpack_require__.n(MonthlyTransactions_style);

// CONCATENATED MODULE: ./components/Spendatures/MonthlyTransactions/index.js






var MonthlyTransactions_MonthlyTransactions = function MonthlyTransactions(_ref) {
	var monthlyTransactions = _ref.monthlyTransactions,
	    handleMonthlyTransactionChange = _ref.handleMonthlyTransactionChange;
	return Object(preact_min["h"])(
		'div',
		{ id: 'spendature7', 'class': MonthlyTransactions_style_default.a.spendature },
		Object(preact_min["h"])(preact_material_components_TextField, { multiline: false,
			value: monthlyTransactions, onKeyUp: handleMonthlyTransactionChange,
			label: 'CC Transactions',
			type: 'number'
		})
	);
};


// CONCATENATED MODULE: ./components/Spendatures/index.js


function Spendatures__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Spendatures__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Spendatures__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Spendatures_Spendatures = function (_Component) {
	Spendatures__inherits(Spendatures, _Component);

	function Spendatures(props) {
		Spendatures__classCallCheck(this, Spendatures);

		var _this = Spendatures__possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleSpendacureItemChange = function (event) {
			var s = _this.state.spendatures;
			s[event.target.id].monthlyValue = event.target.value;
			s[event.target.id].updateYearlyValue(event.target.value);

			// re-render
			_this.forceUpdate();
		};

		_this.handleMonthlyTransactionChange = function (event) {
			_this.setState({ monthlyTransactions: event.target.value });
		};

		_this.state = {
			spendatures: props.spendatures,
			monthlyTransactions: props.monthlyTransactions
		};
		return _this;
	}

	Spendatures.prototype.componentDidMount = function componentDidMount() {};

	Spendatures.prototype.componentWillUnmount = function componentWillUnmount() {};

	Spendatures.prototype.render = function render(_ref) {
		var _this2 = this;

		var className = _ref.className,
		    spendatures = _ref.spendatures,
		    monthlyTransactions = _ref.monthlyTransactions;

		var spendatureItems = spendatures.map(function (spendatureCategory, index) {
			return Object(preact_min["h"])(SpendatureItem_SpendatureItem, { category: spendatureCategory.category,
				monthlyValue: spendatureCategory.monthlyValue,
				yearlyValue: spendatureCategory.yearlyValue,
				handleMonthlyValueChange: _this2.handleSpendacureItemChange,
				id: index,
				type: 'number',
				'class': Spendatures_style_default.a.spendature
			});
		});

		return Object(preact_min["h"])(
			'div',
			{ id: 'spendatureWrapper', 'class': Spendatures_style_default.a.spendatureWrapper },
			Object(preact_min["h"])(
				'div',
				{ id: 'spendaturesContainer', 'class': Spendatures_style_default.a.spendatures },
				Object(preact_min["h"])(
					'h1',
					{ 'class': Spendatures_style_default.a.header },
					'Monthly Spendatures'
				),
				spendatureItems,
				Object(preact_min["h"])(MonthlyTransactions_MonthlyTransactions, { monthlyTransactions: monthlyTransactions,
					handleMonthlyTransactionChange: this.handleMonthlyTransactionChange
				}),
				Object(preact_min["h"])(
					'div',
					{ 'class': Spendatures_style_default.a.button },
					Object(preact_min["h"])(
						preact_material_components_Button,
						{ raised: true, className: 'mdc-theme--secondary-bg', onClick: this.props.handleSubmitSpendatures.bind(this, this.state.spendatures, this.state.monthlyTransactions) },
						'Press to Calculate'
					)
				)
			)
		);
	};

	return Spendatures;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./Utils/SpendatureCategory.js
function SpendatureCategory__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpendatureCategory = function () {
	function SpendatureCategory(category, monthlyValue) {
		SpendatureCategory__classCallCheck(this, SpendatureCategory);

		this.category = category;
		this.monthlyValue = monthlyValue;
		this.yearlyValue = monthlyValue * 12;
	}

	SpendatureCategory.prototype.updateYearlyValue = function updateYearlyValue(monthlyValue) {
		this.yearlyValue = monthlyValue * 12;
	};

	return SpendatureCategory;
}();

/* harmony default export */ var Utils_SpendatureCategory = (SpendatureCategory);
// CONCATENATED MODULE: ./Utils/Utils.js


var formatAsCurrency = function formatAsCurrency(number) {
	if (isNaN(number)) {
		return number;
	}

	var options = { style: 'currency', currency: 'USD' };
	var currencyFormat = new Intl.NumberFormat('en-US', options);
	return currencyFormat.format(number);
};

var defaultSpendatures = [new Utils_SpendatureCategory('Restaurants', 200.00), new Utils_SpendatureCategory('Groceries', 300.00), new Utils_SpendatureCategory('Air Travel', 50.00), new Utils_SpendatureCategory('Other Travel', 50.00), new Utils_SpendatureCategory('Gas', 80.00), new Utils_SpendatureCategory('Amazon', 200.00), new Utils_SpendatureCategory('Misc', 800.00)];

var defaultMonthlyTransactions = 50;


// CONCATENATED MODULE: ./Utils/CreditCardRewardCalculator.js
/*
            1.) Calcualate Bonus for each Reward Category
                - IF Yearly Value for category > category cap (ex restaurants)
                    - yearly value for cat / 12 * category factor * credit card point value + (yearly value for cat - category cap ) / 12 * Credit Card Base factor * Credit Card Point Value
                - Else 
                    - Category Factor * Credit card poit value * monthly value category
			2.) calcualte Base Bonus
            3.) Calculate Monthly Reward Value:
				- Sum each reward category Bonus + Base Bonus
            4.) Calcualte Anual Reward Value
                - Monthly reward * 12
			5.) Calculate Anual Reward Total
				- IF Monthly Transactions > Credit Card Min Transaction Amount
					- Annual Reward Value + (Annual Reward Value * Bonus Reward) + Travel Bonus 
				- Else 
					- Annual Reward Value + Travel Bonus
			6.) calculate Reward Year One
				- Welcome Bonus + Annual Reward Total - AnnualFeeYearOne
			7.) calculate reward 2 years
				- Reward 1 year + (annual reward total - AnnualFeeYearOnePlus)
			8.) calcualte reward 5 years

*/

function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var calcCategoryBonus = function calcCategoryBonus(categoryMonthlyValue, categoryYearlyValue, categoryCap, categoryFactor, creditCardPointValue, creditCardBaseFactor) {
	var categoryBonus = 0;
	if (categoryCap > 0) {
		if (categoryYearlyValue > categoryCap) {
			categoryBonus = categoryCap / 12 * categoryFactor * creditCardPointValue + (categoryYearlyValue - categoryCap) / 12 * creditCardBaseFactor * creditCardPointValue;
			// (((categoryCap / 12) * categoryFactor * creditCardPointValue) + (categoryYearlyValue - categoryCap) / 12) * creditCardBaseFactor * creditCardPointValue;
		} else {
			categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
		}
	} else {
		categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
	}
	return round(categoryBonus, 2);
};

var calcBaseBonus = function calcBaseBonus(creditCardBaseFactor, creditCardPointValue, monthlyMiscExpense) {
	var baseBonus = creditCardBaseFactor * creditCardPointValue * monthlyMiscExpense;
	return round(baseBonus, 2);
};

var calcMonthlyRewardValue = function calcMonthlyRewardValue(arrayOfRewardCategoryBonus, baseBonus) {
	return round(arrayOfRewardCategoryBonus.reduce(function (accum, val) {
		return accum + Number(val);
	}, 0) + baseBonus, 2);
};

var calcYearlyRewardValue = function calcYearlyRewardValue(monthlyRewardValue) {
	var yearlyRewardValue = monthlyRewardValue * 12;
	return round(yearlyRewardValue, 2);
};

var setRewardCategoryBonuses = function setRewardCategoryBonuses(spendatureCategories, creditCardRewardCategories, creditCardPointValue, creditCardBaseFactor) {
	try {
		creditCardRewardCategories.map(function (category) {
			var spendatureCatValues = spendatureCategories.filter(function (rewardCategory) {
				return rewardCategory.category === category.Name;
			});
			if (spendatureCatValues[0] !== undefined) {
				category.Bonus = calcCategoryBonus(spendatureCatValues[0].monthlyValue, spendatureCatValues[0].yearlyValue, category.Cap, category.Factor, creditCardPointValue, creditCardBaseFactor);
			}
		});
		return creditCardRewardCategories;
	} catch (e) {
		return e;
	}
};

var calcAnnualRewardValue = function calcAnnualRewardValue(monthlyTransactions, creditCardMinTransactions, annualRewardValue, bonusReward, travelBonus) {
	if (monthlyTransactions > creditCardMinTransactions) {
		return round(annualRewardValue + annualRewardValue * bonusReward + travelBonus, 2);
	}
	return round(annualRewardValue + travelBonus, 2);
};

var calcRewardOneYear = function calcRewardOneYear(annualRewardTotal, welcomeBonus, annualFeeYearOne) {
	return round(annualRewardTotal + welcomeBonus - annualFeeYearOne, 2);
};

var calcRewardTwoYears = function calcRewardTwoYears(rewardOneYear, annualRewardValue, annualFeeYearOnePlus) {
	return round(rewardOneYear + annualRewardValue - annualFeeYearOnePlus, 2);
};

var calcRewardFiveYears = function calcRewardFiveYears(rewardOneYear, annualRewardValue, annualFeeYearOnePlus) {
	return round(rewardOneYear + (annualRewardValue - annualFeeYearOnePlus) * 4, 2);
};

var calcCreditCardRewards = function calcCreditCardRewards(creditCards, spendatures, monthlyTransactions) {
	return new Promise(function (resolve, reject) {
		try {
			resolve(creditCards.map(function (creditCard) {

				creditCard.RewardCategories = setRewardCategoryBonuses(spendatures, creditCard.RewardCategories, creditCard.PointValue, creditCard.BaseFactor);

				creditCard.BaseBonus = calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, spendatures.filter(function (spendature) {
					return spendature.category === 'Misc';
				})[0].monthlyValue);

				var catBonus = creditCard.RewardCategories.map(function (category) {
					return category.Bonus;
				});
				creditCard.MonthlyRewardValue = calcMonthlyRewardValue(catBonus, creditCard.BaseBonus);

				creditCard.AnnualRewardValue = calcYearlyRewardValue(creditCard.MonthlyRewardValue);

				creditCard.AnnualRewardTotal = calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction, creditCard.AnnualRewardValue, creditCard.BonusReward, creditCard.TravelBonus);

				creditCard.RewardOneYear = calcRewardOneYear(creditCard.AnnualRewardTotal, creditCard.WelcomeBonus, creditCard.AnnualFeeYearOne);

				creditCard.RewardTwoYears = calcRewardTwoYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal, creditCard.AnnualFeeYearOnePlus);

				creditCard.RewardFiveYears = calcRewardFiveYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal, creditCard.AnnualFeeYearOnePlus);

				return creditCard;
			}));
		} catch (e) {
			reject(e);
		}
	});
};


// EXTERNAL MODULE: ./components/Table/style.css
var Table_style = __webpack_require__("SCQC");
var Table_style_default = /*#__PURE__*/__webpack_require__.n(Table_style);

// CONCATENATED MODULE: ./components/Icons/IconArrowDown.js



var IconArrowDown__ref2 = Object(preact_min["h"])(
	"title",
	{ id: "title" },
	"Icon Arrow"
);

var IconArrowDown__ref3 = Object(preact_min["h"])("path", { d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" });

var IconArrowDown_IconArrowDown = function IconArrowDown(_ref) {
	var id = _ref.id,
	    className = _ref.className;
	return Object(preact_min["h"])(
		"svg",
		{ id: id, className: className, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24",
			"aria-labelledby": "title"
		},
		IconArrowDown__ref2,
		IconArrowDown__ref3
	);
};


// EXTERNAL MODULE: ./components/Table/TableColumnHeader/style.css
var TableColumnHeader_style = __webpack_require__("82Kw");
var TableColumnHeader_style_default = /*#__PURE__*/__webpack_require__.n(TableColumnHeader_style);

// CONCATENATED MODULE: ./components/Table/TableColumnHeader/index.js




var TableColumnHeader_TableColumnHeader = function TableColumnHeader(_ref) {
	var allowSorting = _ref.allowSorting,
	    sortDirection = _ref.sortDirection,
	    onHeaderClick = _ref.onHeaderClick,
	    children = _ref.children,
	    index = _ref.index,
	    sortActiveIndex = _ref.sortActiveIndex;


	var handleClick = function handleClick() {
		onHeaderClick(sortActiveIndex, index);
	};

	var icon = void 0;
	if (allowSorting && sortActiveIndex === index) {
		var arrowClass = sortDirection === 'Asc' ? TableColumnHeader_style_default.a.Asc : TableColumnHeader_style_default.a.Desc;
		icon = Object(preact_min["h"])(IconArrowDown_IconArrowDown, { id: arrowClass, className: TableColumnHeader_style_default.a.SortArrow });
	} else {
		var _arrowClass = TableColumnHeader_style_default.a.Hidden;
		icon = Object(preact_min["h"])(IconArrowDown_IconArrowDown, { id: _arrowClass, className: _arrowClass });
	}
	return Object(preact_min["h"])(
		'th',
		{ onClick: handleClick, className: TableColumnHeader_style_default.a.TableHeader },
		children,
		icon
	);
};


// CONCATENATED MODULE: ./components/Table/index.js


function Table__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Table__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Table__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Table_Table = function (_Component) {
	Table__inherits(Table, _Component);

	Table.prototype.onHeaderClick = function onHeaderClick(prevSortActive, nextSortActive) {
		var columnHeaders = this.state.columnHeaders;

		if (columnHeaders[nextSortActive].allowSorting && prevSortActive !== nextSortActive) {
			columnHeaders[nextSortActive].sortDirection = this.setSortDirection(columnHeaders[nextSortActive].sortDirection);
			this.setState({
				columnHeaders: columnHeaders,
				sortActiveIndex: nextSortActive
			});
		} else if (columnHeaders[nextSortActive].allowSorting && prevSortActive === nextSortActive) {
			columnHeaders[nextSortActive].sortDirection = this.setSortDirection(columnHeaders[nextSortActive].sortDirection);

			this.setState({
				columnHeaders: columnHeaders
			});
		}
	};

	Table.prototype.setSortDirection = function setSortDirection(currentDirection) {
		if (currentDirection === 'Asc') {
			return 'Desc';
		} else if (currentDirection === 'Desc') {
			return 'Asc';
		}

		throw 'Unknown Sort Direction Passed In';
	};

	Table.prototype.setSortActiveIndex = function setSortActiveIndex(defaultHeader, headers) {
		var index = 0;
		var i = void 0;
		for (i = 0; i < headers.length; i++) {
			if (headers.name === defaultHeader) {
				index = i;
				break;
			}
		}
		return index;
	};

	function Table(props) {
		Table__classCallCheck(this, Table);

		var _this = Table__possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			sortActiveIndex: _this.setSortActiveIndex(_this.props.defaultSortColumn, _this.props.columnHeaders),
			columnHeaders: _this.props.columnHeaders
		};

		_this.onHeaderClick = _this.onHeaderClick.bind(_this);
		return _this;
	}

	Table.prototype.renderRows = function renderRows(data, sortedColumn) {
		var rows = void 0;
		if (sortedColumn.sortDirection === 'Asc') {
			rows = data.sort(function (a, b) {
				if (a[sortedColumn.name] < b[sortedColumn.name]) {
					return -1;
				}
				if (a[sortedColumn.name] > b[sortedColumn.name]) {
					return 1;
				}
				return 0;
			});
		} else {
			rows = data.sort(function (a, b) {
				if (a[sortedColumn.name] > b[sortedColumn.name]) {
					return -1;
				}
				if (a[sortedColumn.name] < b[sortedColumn.name]) {
					return 1;
				}
				return 0;
			});
		}

		var headers = this.state.columnHeaders;

		return rows.map(function (item, index) {
			return Object(preact_min["h"])(
				'tr',
				{ key: index },
				headers.map(function (header) {
					return Object(preact_min["h"])(
						'td',
						{ 'class': header.isNumber ? Table_style_default.a.tableColumnNumber : Table_style_default.a.tableColumnString },
						formatAsCurrency(item[header.name])
					);
				})
			);
		});
	};

	Table.prototype.render = function render() {
		var _this2 = this;

		var tableColumnHeaders = this.state.columnHeaders.map(function (header, index) {
			return Object(preact_min["h"])(
				TableColumnHeader_TableColumnHeader,
				{ allowSorting: header.allowSorting,
					sortDirection: header.sortDirection,
					onHeaderClick: _this2.onHeaderClick,
					sortActiveIndex: _this2.state.sortActiveIndex, index: index
				},
				header.friendlyName
			);
		});

		var rows = this.renderRows(this.props.tableData, this.state.columnHeaders[this.state.sortActiveIndex]);

		return Object(preact_min["h"])(
			'table',
			{ 'class': Table_style_default.a.table + ' ' + Table_style_default.a.tableBordered, id: 'creditCardTable' },
			Object(preact_min["h"])(
				'thead',
				null,
				tableColumnHeaders
			),
			Object(preact_min["h"])(
				'tbody',
				null,
				rows
			)
		);
	};

	return Table;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/CreditCards/style.css
var CreditCards_style = __webpack_require__("G5m+");
var CreditCards_style_default = /*#__PURE__*/__webpack_require__.n(CreditCards_style);

// CONCATENATED MODULE: ./components/CreditCards/index.js


function CreditCards__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CreditCards__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function CreditCards__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CreditCards_CreditCards = function (_Component) {
	CreditCards__inherits(CreditCards, _Component);

	CreditCards.prototype.calculateCreditCardRewards = function calculateCreditCardRewards(nextProps, creditCards) {
		var _this2 = this;

		calcCreditCardRewards(creditCards, nextProps.spendatures, nextProps.monthlyTransactions).then(function (results) {
			_this2.setState({
				creditCards: results
			});
		});
	};

	function CreditCards(props) {
		CreditCards__classCallCheck(this, CreditCards);

		var _this = CreditCards__possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			creditCards: []
		};
		return _this;
	}

	CreditCards.prototype.componentDidMount = function componentDidMount() {
		var _this3 = this;

		fetch('CreditCards.json').then(function (res) {
			return res.json();
		}).then(function (j) {
			_this3.calculateCreditCardRewards(_this3.props, j.creditCards);
		});
	};

	CreditCards.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		this.calculateCreditCardRewards(nextProps, this.state.creditCards);
	};

	CreditCards.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'creditCardContainer', 'class': CreditCards_style_default.a.creditCardContainer },
			Object(preact_min["h"])(Table_Table, { tableData: this.state.creditCards,
				defaultSortColumn: 'Institution',
				columnHeaders: [{
					friendlyName: 'Institution',
					name: 'Institution',
					sortDirection: 'Asc',
					allowSorting: true,
					isNumber: false
				}, {
					friendlyName: 'Credit Card Name',
					name: 'Name',
					sortDirection: 'Desc',
					allowSorting: true,
					isNumber: false
				}, {
					friendlyName: 'Type',
					name: 'RewardType',
					sortDirection: 'Desc',
					allowSorting: true,
					isNumber: false
				}, {
					friendlyName: 'Reward One Year',
					name: 'RewardOneYear',
					sortDirection: 'Desc',
					allowSorting: true,
					isNumber: true
				}, {
					friendlyName: 'Reward Two Years',
					name: 'RewardTwoYears',
					sortDirection: 'Desc',
					allowSorting: true,
					isNumber: true
				}, {
					friendlyName: 'Reward Five Years',
					name: 'RewardFiveYears',
					sortDirection: 'Desc',
					allowSorting: true,
					isNumber: true
				}]
			})
		);
	};

	return CreditCards;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/Home/index.js


function Home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var Home_Home = function (_Component) {
	Home__inherits(Home, _Component);

	function Home(props) {
		Home__classCallCheck(this, Home);

		var _this = Home__possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		};

		_this.handleGetStarted = function () {
			var creditCardTable = document.getElementById('spendatureWrapper');
			creditCardTable.scrollIntoView(true);
		};

		_this.handleSubmitSpendatures = function (spendatures, monthlyTransactions) {
			_this.setState({
				spendatures: spendatures,
				monthlyTransactions: monthlyTransactions
			});

			//Scroll To Credit Card Table
			var creditCardTable = document.getElementById('creditCardContainer');
			creditCardTable.scrollIntoView(true);
			var scrolledY = window.scrollY;
			if (scrolledY) {
				window.scroll(0, scrolledY - 50);
			}
		};

		_this.handleGetStarted = _this.handleGetStarted.bind(_this);
		_this.state = {
			spendatures: defaultSpendatures,
			monthlyTransactions: defaultMonthlyTransactions
		};
		return _this;
	}

	Home.prototype.render = function render() {

		return Object(preact_min["h"])(
			'div',
			{ id: 'homeContainer', 'class': Home_style_default.a.home },
			Object(preact_min["h"])(WelcomeMessage_WelcomeMessage, { onClick: this.handleGetStarted }),
			Object(preact_min["h"])(Spendatures_Spendatures, { handleSubmitSpendatures: this.handleSubmitSpendatures,
				className: Home_style_default.a.spendatures, spendatures: this.state.spendatures,
				monthlyTransactions: this.state.monthlyTransactions }),
			Object(preact_min["h"])(CreditCards_CreditCards, { spendatures: this.state.spendatures,
				monthlyTransactions: this.state.monthlyTransactions,
				className: Home_style_default.a.creditcards
			})
		);
	};

	return Home;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var app__ref = Object(preact_min["h"])(Header_Header, null);

var app__ref2 = Object(preact_min["h"])(Home_Home, { path: '/' });

var app__ref3 = Object(preact_min["h"])(Disclaimer_Disclaimer, { path: '/disclaimer' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'appContainer' },
			app__ref,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref2,
				app__ref3
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KNFG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"spendature":"spendature__16lpa"};

/***/ }),

/***/ "On8Y":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__13e2A"};

/***/ }),

/***/ "SCQC":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"table":"table__2sNIa","tableBordered":"tableBordered__1K2NC","tableColumnNumber":"tableColumnNumber__1u6Hq"};

/***/ }),

/***/ "UotE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"spendature":"spendature__16e-W"};

/***/ }),

/***/ "a81U":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "aqQ4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "qKn3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "tDJy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"disclaimer":"disclaimer__33h12"};

/***/ }),

/***/ "w/Y3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2_I_V","button":"button__2Hjji","spendatureWrapper":"spendatureWrapper__1ABgz","spendatures":"spendatures__3R3fx"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map