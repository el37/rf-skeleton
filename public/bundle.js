/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 163);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign



function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */



var emptyFunction = __webpack_require__(9);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  warning = function warning(condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactMount
 */



var DOMProperty = __webpack_require__(14);
var ReactBrowserEventEmitter = __webpack_require__(25);
var ReactCurrentOwner = __webpack_require__(11);
var ReactDOMFeatureFlags = __webpack_require__(67);
var ReactElement = __webpack_require__(6);
var ReactEmptyComponentRegistry = __webpack_require__(74);
var ReactInstanceHandles = __webpack_require__(17);
var ReactInstanceMap = __webpack_require__(22);
var ReactMarkupChecksum = __webpack_require__(77);
var ReactPerf = __webpack_require__(7);
var ReactReconciler = __webpack_require__(15);
var ReactUpdateQueue = __webpack_require__(39);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var emptyObject = __webpack_require__(19);
var containsNode = __webpack_require__(54);
var instantiateReactComponent = __webpack_require__(46);
var invariant = __webpack_require__(1);
var setInnerHTML = __webpack_require__(32);
var shouldUpdateReactComponent = __webpack_require__(49);
var validateDOMNesting = __webpack_require__(51);
var warning = __webpack_require__(3);

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var nodeCache = {};

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;
var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

var ownerDocumentContextKey = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);

/** Mapping from reactRootID to React component instance. */
var instancesByReactRootID = {};

/** Mapping from reactRootID to `container` nodes. */
var containersByReactRootID = {};

if (process.env.NODE_ENV !== 'production') {
  /** __DEV__-only mapping from reactRootID to root elements. */
  var rootElementsByReactRootID = {};
}

// Used to store breadth-first search state in findComponentRoot.
var findComponentRootReusableArray = [];

/**
 * Finds the index of the first character
 * that's not common between the two given strings.
 *
 * @return {number} the index of the character where the strings diverge
 */
function firstDifferenceIndex(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

/**
 * @param {DOMElement} container DOM element that may contain a React component.
 * @return {?string} A "reactRoot" ID, if a React component is rendered.
 */
function getReactRootID(container) {
  var rootElement = getReactRootElementInContainer(container);
  return rootElement && ReactMount.getID(rootElement);
}

/**
 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
 * element can return its control whose name or ID equals ATTR_NAME. All
 * DOM nodes support `getAttributeNode` but this can also get called on
 * other objects so just return '' if we're given something other than a
 * DOM node (such as window).
 *
 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
 * @return {string} ID of the supplied `domNode`.
 */
function getID(node) {
  var id = internalGetID(node);
  if (id) {
    if (nodeCache.hasOwnProperty(id)) {
      var cached = nodeCache[id];
      if (cached !== node) {
        !!isValid(cached, id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id) : invariant(false) : undefined;

        nodeCache[id] = node;
      }
    } else {
      nodeCache[id] = node;
    }
  }

  return id;
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
}

/**
 * Sets the React-specific ID of the given node.
 *
 * @param {DOMElement} node The DOM node whose ID will be set.
 * @param {string} id The value of the ID attribute.
 */
function setID(node, id) {
  var oldID = internalGetID(node);
  if (oldID !== id) {
    delete nodeCache[oldID];
  }
  node.setAttribute(ATTR_NAME, id);
  nodeCache[id] = node;
}

/**
 * Finds the node with the supplied React-generated DOM ID.
 *
 * @param {string} id A React-generated DOM ID.
 * @return {DOMElement} DOM node with the suppled `id`.
 * @internal
 */
function getNode(id) {
  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
    nodeCache[id] = ReactMount.findReactNodeByID(id);
  }
  return nodeCache[id];
}

/**
 * Finds the node with the supplied public React instance.
 *
 * @param {*} instance A public React instance.
 * @return {?DOMElement} DOM node with the suppled `id`.
 * @internal
 */
function getNodeFromInstance(instance) {
  var id = ReactInstanceMap.get(instance)._rootNodeID;
  if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
    return null;
  }
  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
    nodeCache[id] = ReactMount.findReactNodeByID(id);
  }
  return nodeCache[id];
}

/**
 * A node is "valid" if it is contained by a currently mounted container.
 *
 * This means that the node does not have to be contained by a document in
 * order to be considered valid.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @param {string} id The expected ID of the node.
 * @return {boolean} Whether the node is contained by a mounted container.
 */
function isValid(node, id) {
  if (node) {
    !(internalGetID(node) === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', ATTR_NAME) : invariant(false) : undefined;

    var container = ReactMount.findReactContainerForID(id);
    if (container && containsNode(container, node)) {
      return true;
    }
  }

  return false;
}

/**
 * Causes the cache to forget about one React-specific ID.
 *
 * @param {string} id The ID to forget.
 */
function purgeID(id) {
  delete nodeCache[id];
}

var deepestNodeSoFar = null;
function findDeepestCachedAncestorImpl(ancestorID) {
  var ancestor = nodeCache[ancestorID];
  if (ancestor && isValid(ancestor, ancestorID)) {
    deepestNodeSoFar = ancestor;
  } else {
    // This node isn't populated in the cache, so presumably none of its
    // descendants are. Break out of the loop.
    return false;
  }
}

/**
 * Return the deepest cached node whose ID is a prefix of `targetID`.
 */
function findDeepestCachedAncestor(targetID) {
  deepestNodeSoFar = null;
  ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);

  var foundNode = deepestNodeSoFar;
  deepestNodeSoFar = null;
  return foundNode;
}

/**
 * Mounts this component and inserts it into the DOM.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {string} rootID DOM ID of the root node.
 * @param {DOMElement} container DOM element to mount into.
 * @param {ReactReconcileTransaction} transaction
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function mountComponentIntoNode(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
  if (ReactDOMFeatureFlags.useCreateElement) {
    context = assign({}, context);
    if (container.nodeType === DOC_NODE_TYPE) {
      context[ownerDocumentContextKey] = container;
    } else {
      context[ownerDocumentContextKey] = container.ownerDocument;
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (context === emptyObject) {
      context = {};
    }
    var tag = container.nodeName.toLowerCase();
    context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(null, tag, null);
  }
  var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
  componentInstance._renderedComponent._topLevelWrapper = componentInstance;
  ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {string} rootID DOM ID of the root node.
 * @param {DOMElement} container DOM element to mount into.
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function batchedMountComponentIntoNode(componentInstance, rootID, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* forceHTML */shouldReuseMarkup);
  transaction.perform(mountComponentIntoNode, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

/**
 * Unmounts a component and removes it from the DOM.
 *
 * @param {ReactComponent} instance React component instance.
 * @param {DOMElement} container DOM element to unmount from.
 * @final
 * @internal
 * @see {ReactMount.unmountComponentAtNode}
 */
function unmountComponentFromNode(instance, container) {
  ReactReconciler.unmountComponent(instance);

  if (container.nodeType === DOC_NODE_TYPE) {
    container = container.documentElement;
  }

  // http://jsperf.com/emptying-a-node
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

/**
 * True if the supplied DOM node has a direct React-rendered child that is
 * not a React root element. Useful for warning in `render`,
 * `unmountComponentAtNode`, etc.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM element contains a direct child that was
 * rendered by React but is not a root element.
 * @internal
 */
function hasNonRootReactChild(node) {
  var reactRootID = getReactRootID(node);
  return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
}

/**
 * Returns the first (deepest) ancestor of a node which is rendered by this copy
 * of React.
 */
function findFirstReactDOMImpl(node) {
  // This node might be from another React instance, so we make sure not to
  // examine the node cache here
  for (; node && node.parentNode !== node; node = node.parentNode) {
    if (node.nodeType !== 1) {
      // Not a DOMElement, therefore not a React component
      continue;
    }
    var nodeID = internalGetID(node);
    if (!nodeID) {
      continue;
    }
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);

    // If containersByReactRootID contains the container we find by crawling up
    // the tree, we know that this instance of React rendered the node.
    // nb. isValid's strategy (with containsNode) does not work because render
    // trees may be nested and we don't want a false positive in that case.
    var current = node;
    var lastID;
    do {
      lastID = internalGetID(current);
      current = current.parentNode;
      if (current == null) {
        // The passed-in node has been detached from the container it was
        // originally rendered into.
        return null;
      }
    } while (lastID !== reactRootID);

    if (current === containersByReactRootID[reactRootID]) {
      return node;
    }
  }
  return null;
}

/**
 * Temporary (?) hack so that we can store all top-level pending updates on
 * composites instead of having to worry about different types of components
 * here.
 */
var TopLevelWrapper = function TopLevelWrapper() {};
TopLevelWrapper.prototype.isReactComponent = {};
if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}
TopLevelWrapper.prototype.render = function () {
  // this.props is actually a ReactElement
  return this.props;
};

/**
 * Mounting is the process of initializing a React component by creating its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.render(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {

  TopLevelWrapper: TopLevelWrapper,

  /** Exposed for debugging purposes **/
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function scrollMonitor(container, renderCallback) {
    renderCallback();
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactElement} nextElement component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function _updateRootComponent(prevComponent, nextElement, container, callback) {
    ReactMount.scrollMonitor(container, function () {
      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
      }
    });

    if (process.env.NODE_ENV !== 'production') {
      // Record the root element in case it later gets transplanted.
      rootElementsByReactRootID[getReactRootID(container)] = getReactRootElementInContainer(container);
    }

    return prevComponent;
  },

  /**
   * Register a component into the instance map and starts scroll value
   * monitoring
   * @param {ReactComponent} nextComponent component instance to render
   * @param {DOMElement} container container to render into
   * @return {string} reactRoot ID prefix
   */
  _registerComponent: function _registerComponent(nextComponent, container) {
    !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;

    ReactBrowserEventEmitter.ensureScrollValueMonitoring();

    var reactRootID = ReactMount.registerContainer(container);
    instancesByReactRootID[reactRootID] = nextComponent;
    return reactRootID;
  },

  /**
   * Render a new component into the DOM.
   * @param {ReactElement} nextElement element to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    var componentInstance = instantiateReactComponent(nextElement, null);
    var reactRootID = ReactMount._registerComponent(componentInstance, container);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, reactRootID, container, shouldReuseMarkup, context);

    if (process.env.NODE_ENV !== 'production') {
      // Record the root element in case it later gets transplanted.
      rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
    }

    return componentInstance;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderSubtreeIntoContainer: function renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    !(parentComponent != null && parentComponent._reactInternalInstance != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    !ReactElement.isValidElement(nextElement) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' :
    // Check if it quacks like an element
    nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;

    process.env.NODE_ENV !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;

    var nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);

    var prevComponent = instancesByReactRootID[getReactRootID(container)];

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
    var containerHasNonRootReactChild = hasNonRootReactChild(container);

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : undefined;

      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
        var rootElementSibling = reactRootElement;
        while (rootElementSibling) {
          if (internalGetID(rootElementSibling)) {
            process.env.NODE_ENV !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : undefined;
            break;
          }
          rootElementSibling = rootElementSibling.nextSibling;
        }
      }
    }

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent != null ? parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context) : emptyObject)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  render: function render(nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  /**
   * Registers a container node into which React components will be rendered.
   * This also creates the "reactRoot" ID that will be assigned to the element
   * rendered within.
   *
   * @param {DOMElement} container DOM element to register as a container.
   * @return {string} The "reactRoot" ID of elements rendered within.
   */
  registerContainer: function registerContainer(container) {
    var reactRootID = getReactRootID(container);
    if (reactRootID) {
      // If one exists, make sure it is a valid "reactRoot" ID.
      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
    }
    if (!reactRootID) {
      // No valid "reactRoot" ID found, create one.
      reactRootID = ReactInstanceHandles.createReactRootID();
    }
    containersByReactRootID[reactRootID] = container;
    return reactRootID;
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function unmountComponentAtNode(container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;

    !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;

    var reactRootID = getReactRootID(container);
    var component = instancesByReactRootID[reactRootID];
    if (!component) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      var containerHasNonRootReactChild = hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      var containerID = internalGetID(container);
      var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : undefined;
      }

      return false;
    }
    ReactUpdates.batchedUpdates(unmountComponentFromNode, component, container);
    delete instancesByReactRootID[reactRootID];
    delete containersByReactRootID[reactRootID];
    if (process.env.NODE_ENV !== 'production') {
      delete rootElementsByReactRootID[reactRootID];
    }
    return true;
  },

  /**
   * Finds the container DOM element that contains React component to which the
   * supplied DOM `id` belongs.
   *
   * @param {string} id The ID of an element rendered by a React component.
   * @return {?DOMElement} DOM element that contains the `id`.
   */
  findReactContainerForID: function findReactContainerForID(id) {
    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
    var container = containersByReactRootID[reactRootID];

    if (process.env.NODE_ENV !== 'production') {
      var rootElement = rootElementsByReactRootID[reactRootID];
      if (rootElement && rootElement.parentNode !== container) {
        process.env.NODE_ENV !== 'production' ? warning(
        // Call internalGetID here because getID calls isValid which calls
        // findReactContainerForID (this function).
        internalGetID(rootElement) === reactRootID, 'ReactMount: Root element ID differed from reactRootID.') : undefined;
        var containerChild = container.firstChild;
        if (containerChild && reactRootID === internalGetID(containerChild)) {
          // If the container has a new child with the same ID as the old
          // root element, then rootElementsByReactRootID[reactRootID] is
          // just stale and needs to be updated. The case that deserves a
          // warning is when the container is empty.
          rootElementsByReactRootID[reactRootID] = containerChild;
        } else {
          process.env.NODE_ENV !== 'production' ? warning(false, 'ReactMount: Root element has been removed from its original ' + 'container. New container: %s', rootElement.parentNode) : undefined;
        }
      }
    }

    return container;
  },

  /**
   * Finds an element rendered by React with the supplied ID.
   *
   * @param {string} id ID of a DOM node in the React component.
   * @return {DOMElement} Root DOM node of the React component.
   */
  findReactNodeByID: function findReactNodeByID(id) {
    var reactRoot = ReactMount.findReactContainerForID(id);
    return ReactMount.findComponentRoot(reactRoot, id);
  },

  /**
   * Traverses up the ancestors of the supplied node to find a node that is a
   * DOM representation of a React component rendered by this copy of React.
   *
   * @param {*} node
   * @return {?DOMEventTarget}
   * @internal
   */
  getFirstReactDOM: function getFirstReactDOM(node) {
    return findFirstReactDOMImpl(node);
  },

  /**
   * Finds a node with the supplied `targetID` inside of the supplied
   * `ancestorNode`.  Exploits the ID naming scheme to perform the search
   * quickly.
   *
   * @param {DOMEventTarget} ancestorNode Search from this root.
   * @pararm {string} targetID ID of the DOM representation of the component.
   * @return {DOMEventTarget} DOM node with the supplied `targetID`.
   * @internal
   */
  findComponentRoot: function findComponentRoot(ancestorNode, targetID) {
    var firstChildren = findComponentRootReusableArray;
    var childIndex = 0;

    var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;

    if (process.env.NODE_ENV !== 'production') {
      // This will throw on the next line; give an early warning
      process.env.NODE_ENV !== 'production' ? warning(deepestAncestor != null, 'React can\'t find the root component node for data-reactid value ' + '`%s`. If you\'re seeing this message, it probably means that ' + 'you\'ve loaded two copies of React on the page. At this time, only ' + 'a single copy of React can be loaded at a time.', targetID) : undefined;
    }

    firstChildren[0] = deepestAncestor.firstChild;
    firstChildren.length = 1;

    while (childIndex < firstChildren.length) {
      var child = firstChildren[childIndex++];
      var targetChild;

      while (child) {
        var childID = ReactMount.getID(child);
        if (childID) {
          // Even if we find the node we're looking for, we finish looping
          // through its siblings to ensure they're cached so that we don't have
          // to revisit this node again. Otherwise, we make n^2 calls to getID
          // when visiting the many children of a single node in order.

          if (targetID === childID) {
            targetChild = child;
          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
            // If we find a child whose ID is an ancestor of the given ID,
            // then we can be sure that we only want to search the subtree
            // rooted at this child, so we can throw out the rest of the
            // search state.
            firstChildren.length = childIndex = 0;
            firstChildren.push(child.firstChild);
          }
        } else {
          // If this child had no ID, then there's a chance that it was
          // injected automatically by the browser, as when a `<table>`
          // element sprouts an extra `<tbody>` child as a side effect of
          // `.innerHTML` parsing. Optimistically continue down this
          // branch, but not before examining the other siblings.
          firstChildren.push(child.firstChild);
        }

        child = child.nextSibling;
      }

      if (targetChild) {
        // Emptying firstChildren/findComponentRootReusableArray is
        // not necessary for correctness, but it helps the GC reclaim
        // any nodes that were left at the end of the search.
        firstChildren.length = 0;

        return targetChild;
      }
    }

    firstChildren.length = 0;

     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false) : undefined;
  },

  _mountImageIntoNode: function _mountImageIntoNode(markup, container, shouldReuseMarkup, transaction) {
    !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;

    if (shouldReuseMarkup) {
      var rootElement = getReactRootElementInContainer(container);
      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;
        if (process.env.NODE_ENV !== 'production') {
          // because rootMarkup is retrieved from the DOM, various normalizations
          // will have occurred which will not be present in `markup`. Here,
          // insert markup into a <div> or <iframe> depending on the container
          // type to perform the same normalizations before comparing.
          var normalizer;
          if (container.nodeType === ELEMENT_NODE_TYPE) {
            normalizer = document.createElement('div');
            normalizer.innerHTML = markup;
            normalizedMarkup = normalizer.innerHTML;
          } else {
            normalizer = document.createElement('iframe');
            document.body.appendChild(normalizer);
            normalizer.contentDocument.write(markup);
            normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
            document.body.removeChild(normalizer);
          }
        }

        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;

        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : undefined;
        }
      }
    }

    !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(markup);
    } else {
      setInnerHTML(container, markup);
    }
  },

  ownerDocumentContextKey: ownerDocumentContextKey,

  /**
   * React ID utilities.
   */

  getReactRootID: getReactRootID,

  getID: getID,

  setID: setID,

  getNode: getNode,

  getNodeFromInstance: getNodeFromInstance,

  isValid: isValid,

  purgeID: purgeID
};

ReactPerf.measureMethods(ReactMount, 'ReactMount', {
  _renderNewRootComponent: '_renderNewRootComponent',
  _mountImageIntoNode: '_mountImageIntoNode'
});

module.exports = ReactMount;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElement
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactCurrentOwner = __webpack_require__(11);

var assign = __webpack_require__(2);
var canDefineProperty = __webpack_require__(30);

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

/**
 * Base constructor for all React elements. This is only used to make this
 * work with a dynamic instanceof check. Nothing should live on this prototype.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    Object.freeze(element.props);
    Object.freeze(element);
  }

  return element;
};

ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    ref = config.ref === undefined ? null : config.ref;
    key = config.key === undefined ? null : '' + config.key;
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (typeof props[propName] === 'undefined') {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

ReactElement.cloneAndReplaceProps = function (oldElement, newProps) {
  var newElement = ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, newProps);

  if (process.env.NODE_ENV !== 'production') {
    // If the key on the original is valid, then the clone is valid
    newElement._store.validated = oldElement._store.validated;
  }

  return newElement;
};

ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (config.ref !== undefined) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (config.key !== undefined) {
      key = '' + config.key;
    }
    // Remaining properties override existing props
    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPerf
 * @typechecks static-only
 */



/**
 * ReactPerf is a general AOP system designed to measure performance. This
 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
 */

var ReactPerf = {
  /**
   * Boolean to enable/disable measurement. Set to false by default to prevent
   * accidental logging and perf loss.
   */
  enableMeasure: false,

  /**
   * Holds onto the measure function in use. By default, don't measure
   * anything, but we'll override this if we inject a measure function.
   */
  storedMeasure: _noMeasure,

  /**
   * @param {object} object
   * @param {string} objectName
   * @param {object<string>} methodNames
   */
  measureMethods: function measureMethods(object, objectName, methodNames) {
    if (process.env.NODE_ENV !== 'production') {
      for (var key in methodNames) {
        if (!methodNames.hasOwnProperty(key)) {
          continue;
        }
        object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
      }
    }
  },

  /**
   * Use this to wrap methods you want to measure. Zero overhead in production.
   *
   * @param {string} objName
   * @param {string} fnName
   * @param {function} func
   * @return {function}
   */
  measure: function measure(objName, fnName, func) {
    if (process.env.NODE_ENV !== 'production') {
      var measuredFunc = null;
      var wrapper = function wrapper() {
        if (ReactPerf.enableMeasure) {
          if (!measuredFunc) {
            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
          }
          return measuredFunc.apply(this, arguments);
        }
        return func.apply(this, arguments);
      };
      wrapper.displayName = objName + '_' + fnName;
      return wrapper;
    }
    return func;
  },

  injection: {
    /**
     * @param {function} measure
     */
    injectMeasure: function injectMeasure(measure) {
      ReactPerf.storedMeasure = measure;
    }
  }
};

/**
 * Simply passes through the measured function, without measuring it.
 *
 * @param {string} objName
 * @param {string} fnName
 * @param {function} func
 * @return {function}
 */
function _noMeasure(objName, fnName, func) {
  return func;
}

module.exports = ReactPerf;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactUpdates
 */



var CallbackQueue = __webpack_require__(33);
var PooledClass = __webpack_require__(13);
var ReactPerf = __webpack_require__(7);
var ReactReconciler = __webpack_require__(15);
var Transaction = __webpack_require__(29);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);

var dirtyComponents = [];
var asapCallbackQueue = CallbackQueue.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

function ensureInjected() {
  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
}

var NESTED_UPDATES = {
  initialize: function initialize() {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function close() {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};

var UPDATE_QUEUEING = {
  initialize: function initialize() {
    this.callbackQueue.reset();
  },
  close: function close() {
    this.callbackQueue.notifyAll();
  }
};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled( /* forceHTML */false);
}

assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS;
  },

  destructor: function destructor() {
    this.dirtyComponentsLength = null;
    CallbackQueue.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function perform(method, scope, a) {
    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
    // with this transaction's wrappers around it.
    return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

/**
 * Array comparator for ReactComponents by mount ordering.
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountOrderComparator(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === dirtyComponents.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(false) : undefined;

  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.
  dirtyComponents.sort(mountOrderComparator);

  for (var i = 0; i < len; i++) {
    // If a component is unmounted before pending changes apply, it will still
    // be here, but we assume that it has cleared its _pendingCallbacks and
    // that performUpdateIfNecessary is a noop.
    var component = dirtyComponents[i];

    // If performUpdateIfNecessary happens to enqueue any new updates, we
    // shouldn't execute the callbacks until the next render happens, so
    // stash the callbacks first
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

var flushBatchedUpdates = function flushBatchedUpdates() {
  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
  // array and perform any updates enqueued by mount-ready handlers (i.e.,
  // componentDidUpdate) but we need to check here too in order to catch
  // updates enqueued by setState callbacks and asap calls.
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};
flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', flushBatchedUpdates);

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  ensureInjected();

  // Various parts of our code (such as ReactCompositeComponent's
  // _renderValidatedComponent) assume that calls to render aren't nested;
  // verify that that's the case. (This is called by each top-level update
  // function, like setProps, setState, forceUpdate, etc.; creation and
  // destruction of top-level components is guarded in ReactMount.)

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}

/**
 * Enqueue a callback to be run at the end of the current batching cycle. Throws
 * if no updates are currently being performed.
 */
function asap(callback, context) {
  !batchingStrategy.isBatchingUpdates ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
  asapCallbackQueue.enqueue(callback, context);
  asapEnqueued = true;
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function injectReconcileTransaction(ReconcileTransaction) {
    !ReconcileTransaction ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function injectBatchingStrategy(_batchingStrategy) {
    !_batchingStrategy ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

module.exports = ReactUpdates;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */



function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventConstants
 */



var keyMirror = __webpack_require__(24);

var PropagationPhases = keyMirror({ bubbled: null, captured: null });

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = keyMirror({
  topAbort: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: topLevelTypes,
  PropagationPhases: PropagationPhases
};

module.exports = EventConstants;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */

var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */


var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PooledClass
 */



var invariant = __webpack_require__(1);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function oneArgumentPooler(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function twoArgumentPooler(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function threeArgumentPooler(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function fourArgumentPooler(a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var fiveArgumentPooler = function fiveArgumentPooler(a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function standardReleaser(instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function addPoolingTo(CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMProperty
 * @typechecks static-only
 */



var invariant = __webpack_require__(1);

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_ATTRIBUTE: 0x1,
  MUST_USE_PROPERTY: 0x2,
  HAS_SIDE_EFFECTS: 0x4,
  HAS_BOOLEAN_VALUE: 0x8,
  HAS_NUMERIC_VALUE: 0x10,
  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function injectDOMPropertyConfig(domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(false) : undefined;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseAttribute: checkMask(propConfig, Injection.MUST_USE_ATTRIBUTE),
        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasSideEffects: checkMask(propConfig, Injection.HAS_SIDE_EFFECTS),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };

      !(!propertyInfo.mustUseAttribute || !propertyInfo.mustUseProperty) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.mustUseProperty || !propertyInfo.hasSideEffects) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(false) : undefined;
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(false) : undefined;

      if (process.env.NODE_ENV !== 'production') {
        DOMProperty.getPossibleStandardName[lowerCased] = propName;
      }

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
        if (process.env.NODE_ENV !== 'production') {
          DOMProperty.getPossibleStandardName[attributeName] = propName;
        }
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};
var defaultValueCache = {};

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {

  ID_ATTRIBUTE_NAME: 'data-reactid',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseAttribute:
   *   Whether the property must be accessed and mutated using `*Attribute()`.
   *   (This includes anything that fails `<propName> in <element>`.)
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasSideEffects:
   *   Whether or not setting a value causes side effects such as triggering
   *   resources to be loaded or text selection changes. If true, we read from
   *   the DOM before updating to ensure that the value is only set if it has
   *   changed.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties. Available only in __DEV__.
   * @type {Object}
   */
  getPossibleStandardName: process.env.NODE_ENV !== 'production' ? {} : null,

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function isCustomAttribute(attributeName) {
    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  /**
   * Returns the default property value for a DOM property (i.e., not an
   * attribute). Most default values are '' or false, but not all. Worse yet,
   * some (in particular, `type`) vary depending on the type of element.
   *
   * TODO: Is it better to grab all the possible properties when creating an
   * element to avoid having to create the same element twice?
   */
  getDefaultValueForProperty: function getDefaultValueForProperty(nodeName, prop) {
    var nodeDefaults = defaultValueCache[nodeName];
    var testElement;
    if (!nodeDefaults) {
      defaultValueCache[nodeName] = nodeDefaults = {};
    }
    if (!(prop in nodeDefaults)) {
      testElement = document.createElement(nodeName);
      nodeDefaults[prop] = testElement[prop];
    }
    return nodeDefaults[prop];
  },

  injection: DOMPropertyInjection
};

module.exports = DOMProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactReconciler
 */



var ReactRef = __webpack_require__(138);

/**
 * Helper to call ReactRef.attachRefs with this composite component, split out
 * to avoid allocations in the transaction mount-ready queue.
 */
function attachRefs() {
  ReactRef.attachRefs(this, this._currentElement);
}

var ReactReconciler = {

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactComponent} internalInstance
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function mountComponent(internalInstance, rootID, transaction, context) {
    var markup = internalInstance.mountComponent(rootID, transaction, context);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }
    return markup;
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function unmountComponent(internalInstance) {
    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
    internalInstance.unmountComponent();
  },

  /**
   * Update a component using a new element.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @internal
   */
  receiveComponent: function receiveComponent(internalInstance, nextElement, transaction, context) {
    var prevElement = internalInstance._currentElement;

    if (nextElement === prevElement && context === internalInstance._context) {
      // Since elements are immutable after the owner is rendered,
      // we can do a cheap identity compare here to determine if this is a
      // superfluous reconcile. It's possible for state to be mutable but such
      // change should trigger an update of the owner which would recreate
      // the element. We explicitly check for the existence of an owner since
      // it's possible for an element created outside a composite to be
      // deeply mutated and reused.

      // TODO: Bailing out early is just a perf optimization right?
      // TODO: Removing the return statement should affect correctness?
      return;
    }

    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);

    if (refsChanged) {
      ReactRef.detachRefs(internalInstance, prevElement);
    }

    internalInstance.receiveComponent(nextElement, transaction, context);

    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }
  },

  /**
   * Flush any dirty changes in a component.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function performUpdateIfNecessary(internalInstance, transaction) {
    internalInstance.performUpdateIfNecessary(transaction);
  }

};

module.exports = ReactReconciler;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */



var PooledClass = __webpack_require__(13);

var assign = __webpack_require__(2);
var emptyFunction = __webpack_require__(9);
var warning = __webpack_require__(3);

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function timeStamp(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */
function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

assign(SyntheticEvent.prototype, {

  preventDefault: function preventDefault() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `preventDefault` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
    }
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function stopPropagation() {
    var event = this.nativeEvent;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `stopPropagation` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
    }
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function persist() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function destructor() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);

module.exports = SyntheticEvent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstanceHandles
 * @typechecks static-only
 */



var ReactRootIndex = __webpack_require__(82);

var invariant = __webpack_require__(1);

var SEPARATOR = '.';
var SEPARATOR_LENGTH = SEPARATOR.length;

/**
 * Maximum depth of traversals before we consider the possibility of a bad ID.
 */
var MAX_TREE_DEPTH = 10000;

/**
 * Creates a DOM ID prefix to use when mounting React components.
 *
 * @param {number} index A unique integer
 * @return {string} React root ID.
 * @internal
 */
function getReactRootIDString(index) {
  return SEPARATOR + index.toString(36);
}

/**
 * Checks if a character in the supplied ID is a separator or the end.
 *
 * @param {string} id A React DOM ID.
 * @param {number} index Index of the character to check.
 * @return {boolean} True if the character is a separator or end of the ID.
 * @private
 */
function isBoundary(id, index) {
  return id.charAt(index) === SEPARATOR || index === id.length;
}

/**
 * Checks if the supplied string is a valid React DOM ID.
 *
 * @param {string} id A React DOM ID, maybe.
 * @return {boolean} True if the string is a valid React DOM ID.
 * @private
 */
function isValidID(id) {
  return id === '' || id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR;
}

/**
 * Checks if the first ID is an ancestor of or equal to the second ID.
 *
 * @param {string} ancestorID
 * @param {string} descendantID
 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
 * @internal
 */
function isAncestorIDOf(ancestorID, descendantID) {
  return descendantID.indexOf(ancestorID) === 0 && isBoundary(descendantID, ancestorID.length);
}

/**
 * Gets the parent ID of the supplied React DOM ID, `id`.
 *
 * @param {string} id ID of a component.
 * @return {string} ID of the parent, or an empty string.
 * @private
 */
function getParentID(id) {
  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
}

/**
 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
 * supplied `destinationID`. If they are equal, the ID is returned.
 *
 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
 * @param {string} destinationID ID of the destination node.
 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
 * @private
 */
function getNextDescendantID(ancestorID, destinationID) {
  !(isValidID(ancestorID) && isValidID(destinationID)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
  !isAncestorIDOf(ancestorID, destinationID) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
  if (ancestorID === destinationID) {
    return ancestorID;
  }
  // Skip over the ancestor and the immediate separator. Traverse until we hit
  // another separator or we reach the end of `destinationID`.
  var start = ancestorID.length + SEPARATOR_LENGTH;
  var i;
  for (i = start; i < destinationID.length; i++) {
    if (isBoundary(destinationID, i)) {
      break;
    }
  }
  return destinationID.substr(0, i);
}

/**
 * Gets the nearest common ancestor ID of two IDs.
 *
 * Using this ID scheme, the nearest common ancestor ID is the longest common
 * prefix of the two IDs that immediately preceded a "marker" in both strings.
 *
 * @param {string} oneID
 * @param {string} twoID
 * @return {string} Nearest common ancestor ID, or the empty string if none.
 * @private
 */
function getFirstCommonAncestorID(oneID, twoID) {
  var minLength = Math.min(oneID.length, twoID.length);
  if (minLength === 0) {
    return '';
  }
  var lastCommonMarkerIndex = 0;
  // Use `<=` to traverse until the "EOL" of the shorter string.
  for (var i = 0; i <= minLength; i++) {
    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
      lastCommonMarkerIndex = i;
    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
      break;
    }
  }
  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
  !isValidID(longestCommonID) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
  return longestCommonID;
}

/**
 * Traverses the parent path between two IDs (either up or down). The IDs must
 * not be the same, and there must exist a parent path between them. If the
 * callback returns `false`, traversal is stopped.
 *
 * @param {?string} start ID at which to start traversal.
 * @param {?string} stop ID at which to end traversal.
 * @param {function} cb Callback to invoke each ID with.
 * @param {*} arg Argument to invoke the callback with.
 * @param {?boolean} skipFirst Whether or not to skip the first node.
 * @param {?boolean} skipLast Whether or not to skip the last node.
 * @private
 */
function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
  start = start || '';
  stop = stop || '';
  !(start !== stop) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
  var traverseUp = isAncestorIDOf(stop, start);
  !(traverseUp || isAncestorIDOf(start, stop)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;
  // Traverse from `start` to `stop` one depth at a time.
  var depth = 0;
  var traverse = traverseUp ? getParentID : getNextDescendantID;
  for (var id = start;; /* until break */id = traverse(id, stop)) {
    var ret;
    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
      ret = cb(id, traverseUp, arg);
    }
    if (ret === false || id === stop) {
      // Only break //after// visiting `stop`.
      break;
    }
    !(depth++ < MAX_TREE_DEPTH) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
  }
}

/**
 * Manages the IDs assigned to DOM representations of React components. This
 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
 * order to simulate events).
 *
 * @internal
 */
var ReactInstanceHandles = {

  /**
   * Constructs a React root ID
   * @return {string} A React root ID.
   */
  createReactRootID: function createReactRootID() {
    return getReactRootIDString(ReactRootIndex.createReactRootIndex());
  },

  /**
   * Constructs a React ID by joining a root ID with a name.
   *
   * @param {string} rootID Root ID of a parent component.
   * @param {string} name A component's name (as flattened children).
   * @return {string} A React ID.
   * @internal
   */
  createReactID: function createReactID(rootID, name) {
    return rootID + name;
  },

  /**
   * Gets the DOM ID of the React component that is the root of the tree that
   * contains the React component with the supplied DOM ID.
   *
   * @param {string} id DOM ID of a React component.
   * @return {?string} DOM ID of the React component that is the root.
   * @internal
   */
  getReactRootIDFromNodeID: function getReactRootIDFromNodeID(id) {
    if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
      var index = id.indexOf(SEPARATOR, 1);
      return index > -1 ? id.substr(0, index) : id;
    }
    return null;
  },

  /**
   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
   * should would receive a `mouseEnter` or `mouseLeave` event.
   *
   * NOTE: Does not invoke the callback on the nearest common ancestor because
   * nothing "entered" or "left" that element.
   *
   * @param {string} leaveID ID being left.
   * @param {string} enterID ID being entered.
   * @param {function} cb Callback to invoke on each entered/left ID.
   * @param {*} upArg Argument to invoke the callback with on left IDs.
   * @param {*} downArg Argument to invoke the callback with on entered IDs.
   * @internal
   */
  traverseEnterLeave: function traverseEnterLeave(leaveID, enterID, cb, upArg, downArg) {
    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
    if (ancestorID !== leaveID) {
      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
    }
    if (ancestorID !== enterID) {
      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
    }
  },

  /**
   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */
  traverseTwoPhase: function traverseTwoPhase(targetID, cb, arg) {
    if (targetID) {
      traverseParentPath('', targetID, cb, arg, true, false);
      traverseParentPath(targetID, '', cb, arg, false, true);
    }
  },

  /**
   * Same as `traverseTwoPhase` but skips the `targetID`.
   */
  traverseTwoPhaseSkipTarget: function traverseTwoPhaseSkipTarget(targetID, cb, arg) {
    if (targetID) {
      traverseParentPath('', targetID, cb, arg, true, true);
      traverseParentPath(targetID, '', cb, arg, true, true);
    }
  },

  /**
   * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
   * example, passing `.0.$row-0.1` would result in `cb` getting called
   * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
   *
   * NOTE: This traversal happens on IDs without touching the DOM.
   *
   * @param {string} targetID ID of the target node.
   * @param {function} cb Callback to invoke.
   * @param {*} arg Argument to invoke the callback with.
   * @internal
   */
  traverseAncestors: function traverseAncestors(targetID, cb, arg) {
    traverseParentPath('', targetID, cb, arg, true, false);
  },

  getFirstCommonAncestorID: getFirstCommonAncestorID,

  /**
   * Exposed for unit testing.
   * @private
   */
  _getNextDescendantID: getNextDescendantID,

  isAncestorIDOf: isAncestorIDOf,

  SEPARATOR: SEPARATOR

};

module.exports = ReactInstanceHandles;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(117);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyObject
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginHub
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var EventPluginRegistry = __webpack_require__(62);
var EventPluginUtils = __webpack_require__(114);
var ReactErrorUtils = __webpack_require__(75);

var accumulateInto = __webpack_require__(84);
var forEachAccumulated = __webpack_require__(85);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function executeDispatchesAndRelease(event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function executeDispatchesAndReleaseSimulated(e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function executeDispatchesAndReleaseTopLevel(e) {
  return executeDispatchesAndRelease(e, false);
};

/**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */
var InstanceHandle = null;

function validateInstanceHandle() {
  var valid = InstanceHandle && InstanceHandle.traverseTwoPhase && InstanceHandle.traverseEnterLeave;
  process.env.NODE_ENV !== 'production' ? warning(valid, 'InstanceHandle not injected before use!') : undefined;
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {object} InjectedMount
     * @public
     */
    injectMount: EventPluginUtils.injection.injectMount,

    /**
     * @param {object} InjectedInstanceHandle
     * @public
     */
    injectInstanceHandle: function injectInstanceHandle(InjectedInstanceHandle) {
      InstanceHandle = InjectedInstanceHandle;
      if (process.env.NODE_ENV !== 'production') {
        validateInstanceHandle();
      }
    },

    getInstanceHandle: function getInstanceHandle() {
      if (process.env.NODE_ENV !== 'production') {
        validateInstanceHandle();
      }
      return InstanceHandle;
    },

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */
  putListener: function putListener(id, registrationName, listener) {
    !(typeof listener === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) : invariant(false) : undefined;

    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[id] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(id, registrationName, listener);
    }
  },

  /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function getListener(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function deleteListener(id, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(id, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */
  deleteAllListeners: function deleteAllListeners(id) {
    for (var registrationName in listenerBank) {
      if (!listenerBank[registrationName][id]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(id, registrationName);
      }

      delete listenerBank[registrationName][id];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function enqueueEvents(events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function processEventQueue(simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function __purge() {
    listenerBank = {};
  },

  __getListenerBank: function __getListenerBank() {
    return listenerBank;
  }

};

module.exports = EventPluginHub;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPropagators
 */



var EventConstants = __webpack_require__(10);
var EventPluginHub = __webpack_require__(20);

var warning = __webpack_require__(3);

var accumulateInto = __webpack_require__(84);
var forEachAccumulated = __webpack_require__(85);

var PropagationPhases = EventConstants.PropagationPhases;
var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(id, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(id, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(domID, upwards, event) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(domID, 'Dispatching id must not be null') : undefined;
  }
  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
  var listener = listenerAtPhase(domID, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(id, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event.dispatchMarker, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstanceMap
 */



/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {

  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function remove(key) {
    key._reactInternalInstance = undefined;
  },

  get: function get(key) {
    return key._reactInternalInstance;
  },

  has: function has(key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function set(key, value) {
    key._reactInternalInstance = value;
  }

};

module.exports = ReactInstanceMap;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */



var SyntheticEvent = __webpack_require__(16);

var getEventTarget = __webpack_require__(44);

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function view(event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target != null && target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function detail(event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */



var invariant = __webpack_require__(1);

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function keyMirror(obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactBrowserEventEmitter
 * @typechecks static-only
 */



var EventConstants = __webpack_require__(10);
var EventPluginHub = __webpack_require__(20);
var EventPluginRegistry = __webpack_require__(62);
var ReactEventEmitterMixin = __webpack_require__(131);
var ReactPerf = __webpack_require__(7);
var ViewportMetrics = __webpack_require__(83);

var assign = __webpack_require__(2);
var isEventSupported = __webpack_require__(47);

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var alreadyListeningTo = {};
var isMonitoringScrollValue = false;
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topAbort: 'abort',
  topBlur: 'blur',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
 * example:
 *
 *   ReactBrowserEventEmitter.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {

  /**
   * Injectable event backend
   */
  ReactEventListener: null,

  injection: {
    /**
     * @param {object} ReactEventListener
     */
    injectReactEventListener: function injectReactEventListener(ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function setEnabled(enabled) {
    if (ReactBrowserEventEmitter.ReactEventListener) {
      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function isEnabled() {
    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */
  listenTo: function listenTo(registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];

    var topLevelTypes = EventConstants.topLevelTypes;
    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === topLevelTypes.topWheel) {
          if (isEventSupported('wheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
          } else if (isEventSupported('mousewheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === topLevelTypes.topScroll) {

          if (isEventSupported('scroll', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
          } else {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
          }
        } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {

          if (isEventSupported('focus', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
          } else if (isEventSupported('focusin')) {
            // IE has `focusin` and `focusout` events which bubble.
            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
          }

          // to make sure blur and focus event listeners are only attached once
          isListening[topLevelTypes.topBlur] = true;
          isListening[topLevelTypes.topFocus] = true;
        } else if (topEventMapping.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  trapBubbledEvent: function trapBubbledEvent(topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function trapCapturedEvent(topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  },

  /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
  ensureScrollValueMonitoring: function ensureScrollValueMonitoring() {
    if (!isMonitoringScrollValue) {
      var refresh = ViewportMetrics.refreshScrollValues;
      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
      isMonitoringScrollValue = true;
    }
  },

  eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,

  registrationNameModules: EventPluginHub.registrationNameModules,

  putListener: EventPluginHub.putListener,

  getListener: EventPluginHub.getListener,

  deleteListener: EventPluginHub.deleteListener,

  deleteAllListeners: EventPluginHub.deleteAllListeners

});

ReactPerf.measureMethods(ReactBrowserEventEmitter, 'ReactBrowserEventEmitter', {
  putListener: 'putListener',
  deleteListener: 'deleteListener'
});

module.exports = ReactBrowserEventEmitter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocationNames
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocations
 */



var keyMirror = __webpack_require__(24);

var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});

module.exports = ReactPropTypeLocations;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticMouseEvent
 * @typechecks static-only
 */



var SyntheticUIEvent = __webpack_require__(23);
var ViewportMetrics = __webpack_require__(83);

var getEventModifierState = __webpack_require__(43);

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: function button(event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function relatedTarget(event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  },
  // "Proprietary" Interface.
  pageX: function pageX(event) {
    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
  },
  pageY: function pageY(event) {
    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

module.exports = SyntheticMouseEvent;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Transaction
 */



var invariant = __webpack_require__(1);

/**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be run while it is already being run. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM updates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var Mixin = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function reinitializeTransaction() {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function isInTransaction() {
    return !!this._isInTransaction;
  },

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked. The optional arguments helps prevent the need
   * to bind in many cases.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  perform: function perform(method, scope, a, b, c, d, e, f) {
    !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(false) : undefined;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function initializeAll(startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
          // The initializer for wrapper i threw an error; initialize the
          // remaining wrappers but silence any exceptions from them to ensure
          // that the first error is the one to bubble up.
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function closeAll(startIndex) {
    !this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(false) : undefined;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;
        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = {

  Mixin: Mixin,

  /**
   * Token to look for to determine if an error occurred.
   */
  OBSERVED_ERROR: {}

};

module.exports = Transaction;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule canDefineProperty
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    Object.defineProperty({}, 'x', { get: function get() {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule escapeTextContentForBrowser
 */



var ESCAPE_LOOKUP = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;'
};

var ESCAPE_REGEX = /[&><"']/g;

function escaper(match) {
  return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  return ('' + text).replace(ESCAPE_REGEX, escaper);
}

module.exports = escapeTextContentForBrowser;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule setInnerHTML
 */

/* globals MSApp */



var ExecutionEnvironment = __webpack_require__(4);

var WHITESPACE_TEST = /^[ \r\n\t\f]/;
var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

/**
 * Set the innerHTML property of a node, ensuring that whitespace is preserved
 * even in IE8.
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = function setInnerHTML(node, html) {
  node.innerHTML = html;
};

// Win8 apps: Allow all html to be inserted
if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
  setInnerHTML = function setInnerHTML(node, html) {
    MSApp.execUnsafeLocalFunction(function () {
      node.innerHTML = html;
    });
  };
}

if (ExecutionEnvironment.canUseDOM) {
  // IE8: When updating a just created node with innerHTML only leading
  // whitespace is removed. When updating an existing node with innerHTML
  // whitespace in root TextNodes is also collapsed.
  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

  // Feature detection; only IE8 is known to behave improperly like this.
  var testElement = document.createElement('div');
  testElement.innerHTML = ' ';
  if (testElement.innerHTML === '') {
    setInnerHTML = function setInnerHTML(node, html) {
      // Magic theory: IE8 supposedly differentiates between added and updated
      // nodes when processing innerHTML, innerHTML on updated nodes suffers
      // from worse whitespace behavior. Re-adding a node like this triggers
      // the initial and more favorable whitespace behavior.
      // TODO: What to do on a detached node?
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      // We also implement a workaround for non-visible tags disappearing into
      // thin air on IE8, this only happens if there is no visible text
      // in-front of the non-visible tags. Piggyback on the whitespace fix
      // and simply check if any non-visible tags appear in the source.
      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
        // Recover leading whitespace by temporarily prepending any character.
        // \uFEFF has the potential advantage of being zero-width/invisible.
        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
        // in hopes that this is preserved even if "\uFEFF" is transformed to
        // the actual Unicode character (by Babel, for example).
        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
        node.innerHTML = String.fromCharCode(0xFEFF) + html;

        // deleteData leaves an empty `TextNode` which offsets the index of all
        // children. Definitely want to avoid this.
        var textNode = node.firstChild;
        if (textNode.data.length === 1) {
          node.removeChild(textNode);
        } else {
          textNode.deleteData(0, 1);
        }
      } else {
        node.innerHTML = html;
      }
    };
  }
}

module.exports = setInnerHTML;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CallbackQueue
 */



var PooledClass = __webpack_require__(13);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);

/**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `CallbackQueue.getPooled()`.
 *
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */
function CallbackQueue() {
  this._callbacks = null;
  this._contexts = null;
}

assign(CallbackQueue.prototype, {

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked.
   *
   * @param {function} callback Invoked when `notifyAll` is invoked.
   * @param {?object} context Context to call `callback` with.
   * @internal
   */
  enqueue: function enqueue(callback, context) {
    this._callbacks = this._callbacks || [];
    this._contexts = this._contexts || [];
    this._callbacks.push(callback);
    this._contexts.push(context);
  },

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */
  notifyAll: function notifyAll() {
    var callbacks = this._callbacks;
    var contexts = this._contexts;
    if (callbacks) {
      !(callbacks.length === contexts.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : invariant(false) : undefined;
      this._callbacks = null;
      this._contexts = null;
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i]);
      }
      callbacks.length = 0;
      contexts.length = 0;
    }
  },

  /**
   * Resets the internal queue.
   *
   * @internal
   */
  reset: function reset() {
    this._callbacks = null;
    this._contexts = null;
  },

  /**
   * `PooledClass` looks for this.
   */
  destructor: function destructor() {
    this.reset();
  }

});

PooledClass.addPoolingTo(CallbackQueue);

module.exports = CallbackQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMPropertyOperations
 * @typechecks static-only
 */



var DOMProperty = __webpack_require__(14);
var ReactPerf = __webpack_require__(7);

var quoteAttributeValueForBrowser = __webpack_require__(161);
var warning = __webpack_require__(3);

// Simplified subset
var VALID_ATTRIBUTE_NAME_REGEX = /^[a-zA-Z_][\w\.\-]*$/;
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};

function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
  return false;
}

function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

if (process.env.NODE_ENV !== 'production') {
  var reactProps = {
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true
  };
  var warnedProperties = {};

  var warnUnknownProperty = function warnUnknownProperty(name) {
    if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
      return;
    }

    warnedProperties[name] = true;
    var lowerCasedName = name.toLowerCase();

    // data-* attributes should be lowercase; suggest the lowercase version
    var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;

    // For now, only warn when we have a suggested correction. This prevents
    // logging too much when using transferPropsTo.
    process.env.NODE_ENV !== 'production' ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?', name, standardName) : undefined;
  };
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations = {

  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function createMarkupForID(id) {
    return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
  },

  setAttributeForID: function setAttributeForID(node, id) {
    node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function createMarkupForProperty(name, value) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      if (shouldIgnoreValue(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      }
      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    } else if (DOMProperty.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser(value);
    } else if (process.env.NODE_ENV !== 'production') {
      warnUnknownProperty(name);
    }
    return null;
  },

  /**
   * Creates markup for a custom property.
   *
   * @param {string} name
   * @param {*} value
   * @return {string} Markup string, or empty string if the property was invalid.
   */
  createMarkupForCustomAttribute: function createMarkupForCustomAttribute(name, value) {
    if (!isAttributeNameSafe(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser(value);
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function setValueForProperty(node, name, value) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(propertyInfo, value)) {
        this.deleteValueForProperty(node, name);
      } else if (propertyInfo.mustUseAttribute) {
        var attributeName = propertyInfo.attributeName;
        var namespace = propertyInfo.attributeNamespace;
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        if (namespace) {
          node.setAttributeNS(namespace, attributeName, '' + value);
        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
          node.setAttribute(attributeName, '');
        } else {
          node.setAttribute(attributeName, '' + value);
        }
      } else {
        var propName = propertyInfo.propertyName;
        // Must explicitly cast values for HAS_SIDE_EFFECTS-properties to the
        // property type before comparing; only `value` does and is string.
        if (!propertyInfo.hasSideEffects || '' + node[propName] !== '' + value) {
          // Contrary to `setAttribute`, object properties are properly
          // `toString`ed by IE8/9.
          node[propName] = value;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      DOMPropertyOperations.setValueForAttribute(node, name, value);
    } else if (process.env.NODE_ENV !== 'production') {
      warnUnknownProperty(name);
    }
  },

  setValueForAttribute: function setValueForAttribute(node, name, value) {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (value == null) {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, '' + value);
    }
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function deleteValueForProperty(node, name) {
    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (propertyInfo.mustUseAttribute) {
        node.removeAttribute(propertyInfo.attributeName);
      } else {
        var propName = propertyInfo.propertyName;
        var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
        if (!propertyInfo.hasSideEffects || '' + node[propName] !== defaultValue) {
          node[propName] = defaultValue;
        }
      }
    } else if (DOMProperty.isCustomAttribute(name)) {
      node.removeAttribute(name);
    } else if (process.env.NODE_ENV !== 'production') {
      warnUnknownProperty(name);
    }
  }

};

ReactPerf.measureMethods(DOMPropertyOperations, 'DOMPropertyOperations', {
  setValueForProperty: 'setValueForProperty',
  setValueForAttribute: 'setValueForAttribute',
  deleteValueForProperty: 'deleteValueForProperty'
});

module.exports = DOMPropertyOperations;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule LinkedValueUtils
 * @typechecks static-only
 */



var ReactPropTypes = __webpack_require__(81);
var ReactPropTypeLocations = __webpack_require__(27);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var hasReadOnlyValue = {
  'button': true,
  'checkbox': true,
  'image': true,
  'hidden': true,
  'radio': true,
  'reset': true,
  'submit': true
};

function _assertSingleLink(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
}
function _assertValueLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
}

function _assertCheckedLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
}

var propTypes = {
  value: function value(props, propName, componentName) {
    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  checked: function checked(props, propName, componentName) {
    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  onChange: ReactPropTypes.func
};

var loggedTypeFailures = {};
function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var LinkedValueUtils = {
  checkPropTypes: function checkPropTypes(tagName, props, owner) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error = propTypes[propName](props, propName, tagName, ReactPropTypeLocations.prop);
      }
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var addendum = getDeclarationErrorAddendum(owner);
        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
      }
    }
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current value of the input either from value prop or link.
   */
  getValue: function getValue(inputProps) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.value;
    }
    return inputProps.value;
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current checked status of the input either from checked prop
   *             or link.
   */
  getChecked: function getChecked(inputProps) {
    if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.value;
    }
    return inputProps.checked;
  },

  /**
   * @param {object} inputProps Props for form component
   * @param {SyntheticEvent} event change event to handle
   */
  executeOnChange: function executeOnChange(inputProps, event) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.requestChange(event.target.value);
    } else if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.requestChange(event.target.checked);
    } else if (inputProps.onChange) {
      return inputProps.onChange.call(undefined, event);
    }
  }
};

module.exports = LinkedValueUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentBrowserEnvironment
 */



var ReactDOMIDOperations = __webpack_require__(38);
var ReactMount = __webpack_require__(5);

/**
 * Abstracts away all functionality of the reconciler that requires knowledge of
 * the browser context. TODO: These callers should be refactored to avoid the
 * need for this injection.
 */
var ReactComponentBrowserEnvironment = {

  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

  /**
   * If a particular environment requires that some resources be cleaned up,
   * specify this in the injected Mixin. In the DOM, we would likely want to
   * purge any cached node ID lookups.
   *
   * @private
   */
  unmountIDFromEnvironment: function unmountIDFromEnvironment(rootNodeID) {
    ReactMount.purgeID(rootNodeID);
  }

};

module.exports = ReactComponentBrowserEnvironment;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentEnvironment
 */



var invariant = __webpack_require__(1);

var injected = false;

var ReactComponentEnvironment = {

  /**
   * Optionally injectable environment dependent cleanup hook. (server vs.
   * browser etc). Example: A browser system caches DOM nodes based on component
   * ID and must remove that cache entry when this instance is unmounted.
   */
  unmountIDFromEnvironment: null,

  /**
   * Optionally injectable hook for swapping out mount images in the middle of
   * the tree.
   */
  replaceNodeWithMarkupByID: null,

  /**
   * Optionally injectable hook for processing a queue of child updates. Will
   * later move into MultiChildComponents.
   */
  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function injectEnvironment(environment) {
      !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
      ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
      ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      injected = true;
    }
  }

};

module.exports = ReactComponentEnvironment;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMIDOperations
 * @typechecks static-only
 */



var DOMChildrenOperations = __webpack_require__(61);
var DOMPropertyOperations = __webpack_require__(34);
var ReactMount = __webpack_require__(5);
var ReactPerf = __webpack_require__(7);

var invariant = __webpack_require__(1);

/**
 * Errors for properties that should not be updated with `updatePropertyByID()`.
 *
 * @type {object}
 * @private
 */
var INVALID_PROPERTY_ERRORS = {
  dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
  style: '`style` must be set using `updateStylesByID()`.'
};

/**
 * Operations used to process updates to DOM nodes.
 */
var ReactDOMIDOperations = {

  /**
   * Updates a DOM node with new property values. This should only be used to
   * update DOM properties in `DOMProperty`.
   *
   * @param {string} id ID of the node to update.
   * @param {string} name A valid property name, see `DOMProperty`.
   * @param {*} value New value of the property.
   * @internal
   */
  updatePropertyByID: function updatePropertyByID(id, name, value) {
    var node = ReactMount.getNode(id);
    !!INVALID_PROPERTY_ERRORS.hasOwnProperty(name) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(false) : undefined;

    // If we're updating to null or undefined, we should remove the property
    // from the DOM node instead of inadvertantly setting to a string. This
    // brings us in line with the same behavior we have on initial render.
    if (value != null) {
      DOMPropertyOperations.setValueForProperty(node, name, value);
    } else {
      DOMPropertyOperations.deleteValueForProperty(node, name);
    }
  },

  /**
   * Replaces a DOM node that exists in the document with markup.
   *
   * @param {string} id ID of child to be replaced.
   * @param {string} markup Dangerous markup to inject in place of child.
   * @internal
   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
   */
  dangerouslyReplaceNodeWithMarkupByID: function dangerouslyReplaceNodeWithMarkupByID(id, markup) {
    var node = ReactMount.getNode(id);
    DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
  },

  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markup List of markup strings.
   * @internal
   */
  dangerouslyProcessChildrenUpdates: function dangerouslyProcessChildrenUpdates(updates, markup) {
    for (var i = 0; i < updates.length; i++) {
      updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
    }
    DOMChildrenOperations.processUpdates(updates, markup);
  }
};

ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
  dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
  dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
});

module.exports = ReactDOMIDOperations;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactUpdateQueue
 */



var ReactCurrentOwner = __webpack_require__(11);
var ReactElement = __webpack_require__(6);
var ReactInstanceMap = __webpack_require__(22);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap.get(publicInstance);
  if (!internalInstance) {
    if (process.env.NODE_ENV !== 'production') {
      // Only warn when we have a callerName. Otherwise we should be silent.
      // We're probably calling from enqueueCallback. We don't want to warn
      // there because we already warned for the corresponding lifecycle method.
      process.env.NODE_ENV !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor.displayName) : undefined;
    }
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition ' + '(such as within `render`). Render methods should be a pure function ' + 'of props and state.', callerName) : undefined;
  }

  return internalInstance;
}

/**
 * ReactUpdateQueue allows for state updates to be scheduled into a later
 * reconciliation step.
 */
var ReactUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function isMounted(publicInstance) {
    if (process.env.NODE_ENV !== 'production') {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
        owner._warnedAboutRefsInRender = true;
      }
    }
    var internalInstance = ReactInstanceMap.get(publicInstance);
    if (internalInstance) {
      // During componentWillMount and render this will still be null but after
      // that will always render to something. At least for now. So we can use
      // this hack.
      return !!internalInstance._renderedComponent;
    } else {
      return false;
    }
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function enqueueCallback(publicInstance, callback) {
    !(typeof callback === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

    // Previously we would throw an error if we didn't have an internal
    // instance. Since we want to make it a no-op instead, we mirror the same
    // behavior we have in other enqueue* methods.
    // We also need to ignore callbacks in componentWillMount. See
    // enqueueUpdates.
    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    // TODO: The callback here is ignored when setState is called from
    // componentWillMount. Either fix it or disallow doing so completely in
    // favor of getInitialState. Alternatively, we can disallow
    // componentWillMount during server-side rendering.
    enqueueUpdate(internalInstance);
  },

  enqueueCallbackInternal: function enqueueCallbackInternal(internalInstance, callback) {
    !(typeof callback === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    enqueueUpdate(internalInstance);
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function enqueueForceUpdate(publicInstance) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    enqueueUpdate(internalInstance);
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    enqueueUpdate(internalInstance);
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function enqueueSetState(publicInstance, partialState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
  },

  /**
   * Sets a subset of the props.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialProps Subset of the next props.
   * @internal
   */
  enqueueSetProps: function enqueueSetProps(publicInstance, partialProps) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setProps');
    if (!internalInstance) {
      return;
    }
    ReactUpdateQueue.enqueueSetPropsInternal(internalInstance, partialProps);
  },

  enqueueSetPropsInternal: function enqueueSetPropsInternal(internalInstance, partialProps) {
    var topLevelWrapper = internalInstance._topLevelWrapper;
    !topLevelWrapper ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

    // Merge with the pending element if it exists, otherwise with existing
    // element props.
    var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
    var element = wrapElement.props;
    var props = assign({}, element.props, partialProps);
    topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

    enqueueUpdate(topLevelWrapper);
  },

  /**
   * Replaces all of the props.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} props New props.
   * @internal
   */
  enqueueReplaceProps: function enqueueReplaceProps(publicInstance, props) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceProps');
    if (!internalInstance) {
      return;
    }
    ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance, props);
  },

  enqueueReplacePropsInternal: function enqueueReplacePropsInternal(internalInstance, props) {
    var topLevelWrapper = internalInstance._topLevelWrapper;
    !topLevelWrapper ? process.env.NODE_ENV !== 'production' ? invariant(false, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;

    // Merge with the pending element if it exists, otherwise with existing
    // element props.
    var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
    var element = wrapElement.props;
    topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));

    enqueueUpdate(topLevelWrapper);
  },

  enqueueElementInternal: function enqueueElementInternal(internalInstance, newElement) {
    internalInstance._pendingElement = newElement;
    enqueueUpdate(internalInstance);
  }

};

module.exports = ReactUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */



module.exports = '0.14.8';

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findDOMNode
 * @typechecks static-only
 */



var ReactCurrentOwner = __webpack_require__(11);
var ReactInstanceMap = __webpack_require__(22);
var ReactMount = __webpack_require__(5);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

/**
 * Returns the DOM node rendered by this element.
 *
 * @param {ReactComponent|DOMElement} componentOrElement
 * @return {?DOMElement} The root node of this element.
 */
function findDOMNode(componentOrElement) {
  if (process.env.NODE_ENV !== 'production') {
    var owner = ReactCurrentOwner.current;
    if (owner !== null) {
      process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing getDOMNode or findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
      owner._warnedAboutRefsInRender = true;
    }
  }
  if (componentOrElement == null) {
    return null;
  }
  if (componentOrElement.nodeType === 1) {
    return componentOrElement;
  }
  if (ReactInstanceMap.has(componentOrElement)) {
    return ReactMount.getNodeFromInstance(componentOrElement);
  }
  !(componentOrElement.render == null || typeof componentOrElement.render !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : invariant(false) : undefined;
   true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false) : undefined;
}

module.exports = findDOMNode;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventCharCode
 * @typechecks static-only
 */



/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */

function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

module.exports = getEventCharCode;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventModifierState
 * @typechecks static-only
 */



/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */

var modifierKeyToProp = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Meta': 'metaKey',
  'Shift': 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}

module.exports = getEventModifierState;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */



/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * @typechecks static-only
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule instantiateReactComponent
 * @typechecks static-only
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactCompositeComponent = __webpack_require__(120);
var ReactEmptyComponent = __webpack_require__(73);
var ReactNativeComponent = __webpack_require__(79);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function ReactCompositeComponentWrapper() {};
assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
  _instantiateReactComponent: instantiateReactComponent
});

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
function instantiateReactComponent(node) {
  var instance;

  if (node === null || node === false) {
    instance = new ReactEmptyComponent(instantiateReactComponent);
  } else if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
    var element = node;
    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : _typeof(element.type), getDeclarationErrorAddendum(element._owner)) : invariant(false) : undefined;

    // Special case string values
    if (typeof element.type === 'string') {
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // This is temporarily available for custom components that are not string
      // representations. I.e. ART. Once those are updated to use the string
      // representation, we can drop this code path.
      instance = new element.type(element);
    } else {
      instance = new ReactCompositeComponentWrapper();
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactNativeComponent.createInstanceForText(node);
  } else {
     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node === 'undefined' ? 'undefined' : _typeof(node)) : invariant(false) : undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : undefined;
  }

  // Sets up the instance. This can probably just move into the constructor now.
  instance.construct(node);

  // These two fields are used by the DOM and ART diffing algorithms
  // respectively. Instead of using expandos on components, we should be
  // storing the state needed by the diffing algorithms elsewhere.
  instance._mountIndex = 0;
  instance._mountImage = null;

  if (process.env.NODE_ENV !== 'production') {
    instance._isOwnerNecessary = false;
    instance._warnedAboutRefsInRender = false;
  }

  // Internal instances should fully constructed at this point, so they should
  // not get any new fields added to them at this point.
  if (process.env.NODE_ENV !== 'production') {
    if (Object.preventExtensions) {
      Object.preventExtensions(instance);
    }
  }

  return instance;
}

module.exports = instantiateReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */



var ExecutionEnvironment = __webpack_require__(4);

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule setTextContent
 */



var ExecutionEnvironment = __webpack_require__(4);
var escapeTextContentForBrowser = __webpack_require__(31);
var setInnerHTML = __webpack_require__(32);

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent = function setTextContent(node, text) {
  node.textContent = text;
};

if (ExecutionEnvironment.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function setTextContent(node, text) {
      setInnerHTML(node, escapeTextContentForBrowser(text));
    };
  }
}

module.exports = setTextContent;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shouldUpdateReactComponent
 * @typechecks static-only
 */



/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement === 'undefined' ? 'undefined' : _typeof(prevElement);
  var nextType = typeof nextElement === 'undefined' ? 'undefined' : _typeof(nextElement);
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
  }
  return false;
}

module.exports = shouldUpdateReactComponent;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule traverseAllChildren
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactCurrentOwner = __webpack_require__(11);
var ReactElement = __webpack_require__(6);
var ReactInstanceHandles = __webpack_require__(17);

var getIteratorFn = __webpack_require__(45);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var SEPARATOR = ReactInstanceHandles.SEPARATOR;
var SUBSEPARATOR = ':';

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var userProvidedKeyEscaperLookup = {
  '=': '=0',
  '.': '=1',
  ':': '=2'
};

var userProvidedKeyEscapeRegex = /[=.:]/g;

var didWarnAboutMaps = false;

function userProvidedKeyEscaper(match) {
  return userProvidedKeyEscaperLookup[match];
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  if (component && component.key != null) {
    // Explicit key
    return wrapUserProvidedKey(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * Escape a component key so that it is safe to use in a reactid.
 *
 * @param {*} text Component key to be escaped.
 * @return {string} An escaped string.
 */
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
}

/**
 * Wrap a `key` value explicitly provided by the user to distinguish it from
 * implicitly-generated keys generated by a component's index in its parent.
 *
 * @param {string} key Value of a user-provided `key` attribute
 * @return {string}
 */
function wrapUserProvidedKey(key) {
  return '$' + escapeUserProvidedKey(key);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : undefined;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : undefined;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule validateDOMNesting
 */



var assign = __webpack_require__(2);
var emptyFunction = __webpack_require__(9);
var warning = __webpack_require__(3);

var validateDOMNesting = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  // This validation code was written based on the HTML5 parsing spec:
  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  //
  // Note: this does not catch all invalid nesting, nor does it try to (as it's
  // not clear what practical benefit doing so provides); instead, we warn only
  // for cases where the parser will give a parse tree differing from what React
  // intended. For example, <b><div></div></b> is invalid but we don't warn
  // because it still parses correctly; we do warn for other cases like nested
  // <p> tags where the beginning of the second element implicitly closes the
  // first, causing a confusing mess.

  // https://html.spec.whatwg.org/multipage/syntax.html#special
  var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

  // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
  // TODO: Distinguish by namespace here -- for <title>, including it here
  // errs on the side of fewer warnings
  'foreignObject', 'desc', 'title'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
  var buttonScopeTags = inScopeTags.concat(['button']);

  // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
  var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

  var emptyAncestorInfo = {
    parentTag: null,

    formTag: null,
    aTagInScope: null,
    buttonTagInScope: null,
    nobrTagInScope: null,
    pTagInButtonScope: null,

    listItemTagAutoclosing: null,
    dlItemTagAutoclosing: null
  };

  var updatedAncestorInfo = function updatedAncestorInfo(oldInfo, tag, instance) {
    var ancestorInfo = assign({}, oldInfo || emptyAncestorInfo);
    var info = { tag: tag, instance: instance };

    if (inScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.aTagInScope = null;
      ancestorInfo.buttonTagInScope = null;
      ancestorInfo.nobrTagInScope = null;
    }
    if (buttonScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.pTagInButtonScope = null;
    }

    // See rules for 'li', 'dd', 'dt' start tags in
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
      ancestorInfo.listItemTagAutoclosing = null;
      ancestorInfo.dlItemTagAutoclosing = null;
    }

    ancestorInfo.parentTag = info;

    if (tag === 'form') {
      ancestorInfo.formTag = info;
    }
    if (tag === 'a') {
      ancestorInfo.aTagInScope = info;
    }
    if (tag === 'button') {
      ancestorInfo.buttonTagInScope = info;
    }
    if (tag === 'nobr') {
      ancestorInfo.nobrTagInScope = info;
    }
    if (tag === 'p') {
      ancestorInfo.pTagInButtonScope = info;
    }
    if (tag === 'li') {
      ancestorInfo.listItemTagAutoclosing = info;
    }
    if (tag === 'dd' || tag === 'dt') {
      ancestorInfo.dlItemTagAutoclosing = info;
    }

    return ancestorInfo;
  };

  /**
   * Returns whether
   */
  var isTagValidWithParent = function isTagValidWithParent(tag, parentTag) {
    // First, let's check if we're in an unusual parsing mode...
    switch (parentTag) {
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
      case 'select':
        return tag === 'option' || tag === 'optgroup' || tag === '#text';
      case 'optgroup':
        return tag === 'option' || tag === '#text';
      // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
      // but
      case 'option':
        return tag === '#text';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
      // No special behavior since these rules fall back to "in body" mode for
      // all except special table nodes which cause bad parsing behavior anyway.

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
      case 'tr':
        return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
      case 'tbody':
      case 'thead':
      case 'tfoot':
        return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
      case 'colgroup':
        return tag === 'col' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
      case 'table':
        return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
      case 'head':
        return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
      case 'html':
        return tag === 'head' || tag === 'body';
    }

    // Probably in the "in body" parsing mode, so we outlaw only tag combos
    // where the parsing rules cause implicit opens or closes to be added.
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

      case 'rp':
      case 'rt':
        return impliedEndTags.indexOf(parentTag) === -1;

      case 'caption':
      case 'col':
      case 'colgroup':
      case 'frame':
      case 'head':
      case 'tbody':
      case 'td':
      case 'tfoot':
      case 'th':
      case 'thead':
      case 'tr':
        // These tags are only valid with a few parents that have special child
        // parsing rules -- if we're down here, then none of those matched and
        // so we allow it only if we don't know what the parent is, as all other
        // cases are invalid.
        return parentTag == null;
    }

    return true;
  };

  /**
   * Returns whether
   */
  var findInvalidAncestorForTag = function findInvalidAncestorForTag(tag, ancestorInfo) {
    switch (tag) {
      case 'address':
      case 'article':
      case 'aside':
      case 'blockquote':
      case 'center':
      case 'details':
      case 'dialog':
      case 'dir':
      case 'div':
      case 'dl':
      case 'fieldset':
      case 'figcaption':
      case 'figure':
      case 'footer':
      case 'header':
      case 'hgroup':
      case 'main':
      case 'menu':
      case 'nav':
      case 'ol':
      case 'p':
      case 'section':
      case 'summary':
      case 'ul':

      case 'pre':
      case 'listing':

      case 'table':

      case 'hr':

      case 'xmp':

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return ancestorInfo.pTagInButtonScope;

      case 'form':
        return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

      case 'li':
        return ancestorInfo.listItemTagAutoclosing;

      case 'dd':
      case 'dt':
        return ancestorInfo.dlItemTagAutoclosing;

      case 'button':
        return ancestorInfo.buttonTagInScope;

      case 'a':
        // Spec says something about storing a list of markers, but it sounds
        // equivalent to this check.
        return ancestorInfo.aTagInScope;

      case 'nobr':
        return ancestorInfo.nobrTagInScope;
    }

    return null;
  };

  /**
   * Given a ReactCompositeComponent instance, return a list of its recursive
   * owners, starting at the root and ending with the instance itself.
   */
  var findOwnerStack = function findOwnerStack(instance) {
    if (!instance) {
      return [];
    }

    var stack = [];
    /*eslint-disable space-after-keywords */
    do {
      /*eslint-enable space-after-keywords */
      stack.push(instance);
    } while (instance = instance._currentElement._owner);
    stack.reverse();
    return stack;
  };

  var didWarn = {};

  validateDOMNesting = function validateDOMNesting(childTag, childInstance, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.parentTag;
    var parentTag = parentInfo && parentInfo.tag;

    var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
    var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
    var problematic = invalidParent || invalidAncestor;

    if (problematic) {
      var ancestorTag = problematic.tag;
      var ancestorInstance = problematic.instance;

      var childOwner = childInstance && childInstance._currentElement._owner;
      var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;

      var childOwners = findOwnerStack(childOwner);
      var ancestorOwners = findOwnerStack(ancestorOwner);

      var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
      var i;

      var deepestCommon = -1;
      for (i = 0; i < minStackLen; i++) {
        if (childOwners[i] === ancestorOwners[i]) {
          deepestCommon = i;
        } else {
          break;
        }
      }

      var UNKNOWN = '(unknown)';
      var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function (inst) {
        return inst.getName() || UNKNOWN;
      });
      var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function (inst) {
        return inst.getName() || UNKNOWN;
      });
      var ownerInfo = [].concat(
      // If the parent and child instances have a common owner ancestor, start
      // with that -- otherwise we just start with the parent's owners.
      deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag,
      // If we're warning about an invalid (non-parent) ancestry, add '...'
      invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');

      var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
      if (didWarn[warnKey]) {
        return;
      }
      didWarn[warnKey] = true;

      if (invalidParent) {
        var info = '';
        if (ancestorTag === 'table' && childTag === 'tr') {
          info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
        }
        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a child of <%s>. ' + 'See %s.%s', childTag, ancestorTag, ownerInfo, info) : undefined;
      } else {
        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a descendant of ' + '<%s>. See %s.', childTag, ancestorTag, ownerInfo) : undefined;
      }
    }
  };

  validateDOMNesting.ancestorInfoContextKey = '__validateDOMNesting_ancestorInfo$' + Math.random().toString(36).slice(2);

  validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;

  // For testing
  validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.parentTag;
    var parentTag = parentInfo && parentInfo.tag;
    return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
  };
}

module.exports = validateDOMNesting;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

var _reactHighcharts = __webpack_require__(105);

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = _react2.default.createClass({
  displayName: 'Chart',

  getInitialState: function getInitialState() {
    return {
      config: {
        title: {
          text: ""
        },
        xAxis: {
          categories: ['jan', 'feb', 'mar', 'apr']
        },
        series: [{
          name: 'Stock Price',
          data: [19.8, 12.2, 32.3, 8.09]
        }, {
          name: 'VWAP',
          data: [12, 15, 30, 10]
        }]
      }
    };
  },
  render: function render() {
    this.state.config.title.text = this.props.title;
    this.state.config.series[0].data = this.props.data;
    this.state.config.series[1].data = this.props.vwap;
    return _react2.default.createElement(_reactHighcharts2.default, { config: this.state.config, ref: 'chart' });
  }
});

module.exports = Chart;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule EventListener
 * @typechecks
 */



var emptyFunction = __webpack_require__(9);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule containsNode
 * @typechecks
 */



var isTextNode = __webpack_require__(99);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 *
 * @param {?DOMNode} outerNode Outer DOM node.
 * @param {?DOMNode} innerNode Inner DOM node.
 * @return {boolean} True if `outerNode` contains or is `innerNode`.
 */
function containsNode(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var outerNode = _x,
        innerNode = _x2;
    _again = false;

    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      _x = outerNode;
      _x2 = innerNode.parentNode;
      _again = true;
      continue _function;
    } else if (outerNode.contains) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
}

module.exports = containsNode;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule focusNode
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getActiveElement
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 */


function getActiveElement() /*?DOMElement*/{
  if (typeof document === 'undefined') {
    return null;
  }
  try {
    return document.activeElement || document.body;
  } catch (e) {
    return document.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getMarkupWrap
 */

/*eslint-disable fb-www/unsafe-html */



var ExecutionEnvironment = __webpack_require__(4);

var invariant = __webpack_require__(1);

/**
 * Dummy container used to detect which wraps are necessary.
 */
var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */

var shouldWrap = {};

var selectWrap = [1, '<select multiple="true">', '</select>'];
var tableWrap = [1, '<table>', '</table>'];
var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var markupWrap = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': selectWrap,
  'option': selectWrap,

  'caption': tableWrap,
  'colgroup': tableWrap,
  'tbody': tableWrap,
  'tfoot': tableWrap,
  'thead': tableWrap,

  'td': trWrap,
  'th': trWrap
};

// Initialize the SVG elements since we know they'll always need to be wrapped
// consistently. If they are created inside a <div> they will be initialized in
// the wrong namespace (and will not display).
var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
svgElements.forEach(function (nodeName) {
  markupWrap[nodeName] = svgWrap;
  shouldWrap[nodeName] = true;
});

/**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */
function getMarkupWrap(nodeName) {
  !!!dummyNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
  if (!markupWrap.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!shouldWrap.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      dummyNode.innerHTML = '<link />';
    } else {
      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    shouldWrap[nodeName] = !dummyNode.firstChild;
  }
  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
}

module.exports = getMarkupWrap;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 Highcharts JS v5.0.7 (2017-01-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (L, a) {
  "object" === ( false ? "undefined" : _typeof(module)) && module.exports ? module.exports = L.document ? a(L) : a : L.Highcharts = a(L);
})("undefined" !== typeof window ? window : undefined, function (L) {
  L = function () {
    var a = window,
        B = a.document,
        A = a.navigator && a.navigator.userAgent || "",
        H = B && B.createElementNS && !!B.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
        G = /(edge|msie|trident)/i.test(A) && !window.opera,
        r = !H,
        g = /Firefox/.test(A),
        f = g && 4 > parseInt(A.split("Firefox/")[1], 10);return a.Highcharts ? a.Highcharts.error(16, !0) : { product: "Highcharts",
      version: "5.0.7", deg2rad: 2 * Math.PI / 360, doc: B, hasBidiBug: f, hasTouch: B && void 0 !== B.documentElement.ontouchstart, isMS: G, isWebKit: /AppleWebKit/.test(A), isFirefox: g, isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: H, vml: r, win: a, charts: [], marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function noop() {} };
  }();(function (a) {
    var B = [],
        A = a.charts,
        H = a.doc,
        G = a.win;a.error = function (r, g) {
      r = a.isNumber(r) ? "Highcharts error #" + r + ": www.highcharts.com/errors/" + r : r;if (g) throw Error(r);G.console && console.log(r);
    };a.Fx = function (a, g, f) {
      this.options = g;this.elem = a;this.prop = f;
    };a.Fx.prototype = { dSetter: function dSetter() {
        var a = this.paths[0],
            g = this.paths[1],
            f = [],
            u = this.now,
            l = a.length,
            q;if (1 === u) f = this.toD;else if (l === g.length && 1 > u) for (; l--;) {
          q = parseFloat(a[l]), f[l] = isNaN(q) ? a[l] : u * parseFloat(g[l] - q) + q;
        } else f = g;this.elem.attr("d", f, null, !0);
      }, update: function update() {
        var a = this.elem,
            g = this.prop,
            f = this.now,
            u = this.options.step;if (this[g + "Setter"]) this[g + "Setter"]();else a.attr ? a.element && a.attr(g, f, null, !0) : a.style[g] = f + this.unit;u && u.call(a, f, this);
      }, run: function run(a, g, f) {
        var r = this,
            l = function l(a) {
          return l.stopped ? !1 : r.step(a);
        },
            q;this.startTime = +new Date();this.start = a;this.end = g;this.unit = f;this.now = this.start;this.pos = 0;l.elem = this.elem;l.prop = this.prop;l() && 1 === B.push(l) && (l.timerId = setInterval(function () {
          for (q = 0; q < B.length; q++) {
            B[q]() || B.splice(q--, 1);
          }B.length || clearInterval(l.timerId);
        }, 13));
      }, step: function step(a) {
        var r = +new Date(),
            f,
            u = this.options;f = this.elem;
        var l = u.complete,
            q = u.duration,
            d = u.curAnim,
            b;if (f.attr && !f.element) f = !1;else if (a || r >= q + this.startTime) {
          this.now = this.end;this.pos = 1;this.update();a = d[this.prop] = !0;for (b in d) {
            !0 !== d[b] && (a = !1);
          }a && l && l.call(f);f = !1;
        } else this.pos = u.easing((r - this.startTime) / q), this.now = this.start + (this.end - this.start) * this.pos, this.update(), f = !0;return f;
      }, initPath: function initPath(r, g, f) {
        function u(a) {
          var e, b;for (n = a.length; n--;) {
            e = "M" === a[n] || "L" === a[n], b = /[a-zA-Z]/.test(a[n + 3]), e && b && a.splice(n + 1, 0, a[n + 1], a[n + 2], a[n + 1], a[n + 2]);
          }
        }function l(a, e) {
          for (; a.length < m;) {
            a[0] = e[m - a.length];var b = a.slice(0, t);[].splice.apply(a, [0, 0].concat(b));E && (b = a.slice(a.length - t), [].splice.apply(a, [a.length, 0].concat(b)), n--);
          }a[0] = "M";
        }function q(a, e) {
          for (var b = (m - a.length) / t; 0 < b && b--;) {
            c = a.slice().splice(a.length / z - t, t * z), c[0] = e[m - t - b * t], C && (c[t - 6] = c[t - 2], c[t - 5] = c[t - 1]), [].splice.apply(a, [a.length / z, 0].concat(c)), E && b--;
          }
        }g = g || "";var d,
            b = r.startX,
            p = r.endX,
            C = -1 < g.indexOf("C"),
            t = C ? 7 : 3,
            m,
            c,
            n;g = g.split(" ");f = f.slice();var E = r.isArea,
            z = E ? 2 : 1,
            e;
        C && (u(g), u(f));if (b && p) {
          for (n = 0; n < b.length; n++) {
            if (b[n] === p[0]) {
              d = n;break;
            } else if (b[0] === p[p.length - b.length + n]) {
              d = n;e = !0;break;
            }
          }void 0 === d && (g = []);
        }g.length && a.isNumber(d) && (m = f.length + d * z * t, e ? (l(g, f), q(f, g)) : (l(f, g), q(g, f)));return [g, f];
      } };a.extend = function (a, g) {
      var f;a || (a = {});for (f in g) {
        a[f] = g[f];
      }return a;
    };a.merge = function () {
      var r,
          g = arguments,
          f,
          u = {},
          l = function l(q, d) {
        var b, p;"object" !== (typeof q === "undefined" ? "undefined" : _typeof(q)) && (q = {});for (p in d) {
          d.hasOwnProperty(p) && (b = d[p], a.isObject(b, !0) && "renderTo" !== p && "number" !== typeof b.nodeType ? q[p] = l(q[p] || {}, b) : q[p] = d[p]);
        }return q;
      };!0 === g[0] && (u = g[1], g = Array.prototype.slice.call(g, 2));f = g.length;for (r = 0; r < f; r++) {
        u = l(u, g[r]);
      }return u;
    };a.pInt = function (a, g) {
      return parseInt(a, g || 10);
    };a.isString = function (a) {
      return "string" === typeof a;
    };a.isArray = function (a) {
      a = Object.prototype.toString.call(a);return "[object Array]" === a || "[object Array Iterator]" === a;
    };a.isObject = function (r, g) {
      return r && "object" === (typeof r === "undefined" ? "undefined" : _typeof(r)) && (!g || !a.isArray(r));
    };a.isNumber = function (a) {
      return "number" === typeof a && !isNaN(a);
    };a.erase = function (a, g) {
      for (var f = a.length; f--;) {
        if (a[f] === g) {
          a.splice(f, 1);break;
        }
      }
    };a.defined = function (a) {
      return void 0 !== a && null !== a;
    };a.attr = function (r, g, f) {
      var u, l;if (a.isString(g)) a.defined(f) ? r.setAttribute(g, f) : r && r.getAttribute && (l = r.getAttribute(g));else if (a.defined(g) && a.isObject(g)) for (u in g) {
        r.setAttribute(u, g[u]);
      }return l;
    };a.splat = function (r) {
      return a.isArray(r) ? r : [r];
    };a.syncTimeout = function (a, g, f) {
      if (g) return setTimeout(a, g, f);a.call(0, f);
    };a.pick = function () {
      var a = arguments,
          g,
          f,
          u = a.length;for (g = 0; g < u; g++) {
        if (f = a[g], void 0 !== f && null !== f) return f;
      }
    };a.css = function (r, g) {
      a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");a.extend(r.style, g);
    };a.createElement = function (r, g, f, u, l) {
      r = H.createElement(r);var q = a.css;g && a.extend(r, g);l && q(r, { padding: 0, border: "none", margin: 0 });f && q(r, f);u && u.appendChild(r);return r;
    };a.extendClass = function (r, g) {
      var f = function f() {};f.prototype = new r();a.extend(f.prototype, g);return f;
    };a.pad = function (a, g, f) {
      return Array((g || 2) + 1 - String(a).length).join(f || 0) + a;
    };a.relativeLength = function (a, g) {
      return (/%$/.test(a) ? g * parseFloat(a) / 100 : parseFloat(a)
      );
    };a.wrap = function (a, g, f) {
      var r = a[g];a[g] = function () {
        var a = Array.prototype.slice.call(arguments),
            q = arguments,
            d = this;d.proceed = function () {
          r.apply(d, arguments.length ? arguments : q);
        };a.unshift(r);a = f.apply(this, a);d.proceed = null;return a;
      };
    };a.getTZOffset = function (r) {
      var g = a.Date;return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(r) || g.hcTimezoneOffset || 0);
    };a.dateFormat = function (r, g, f) {
      if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";r = a.pick(r, "%Y-%m-%d %H:%M:%S");var u = a.Date,
          l = new u(g - a.getTZOffset(g)),
          q,
          d = l[u.hcGetHours](),
          b = l[u.hcGetDay](),
          p = l[u.hcGetDate](),
          C = l[u.hcGetMonth](),
          t = l[u.hcGetFullYear](),
          m = a.defaultOptions.lang,
          c = m.weekdays,
          n = m.shortWeekdays,
          E = a.pad,
          u = a.extend({ a: n ? n[b] : c[b].substr(0, 3), A: c[b], d: E(p), e: E(p, 2, " "), w: b, b: m.shortMonths[C], B: m.months[C], m: E(C + 1), y: t.toString().substr(2, 2), Y: t, H: E(d), k: d, I: E(d % 12 || 12), l: d % 12 || 12, M: E(l[u.hcGetMinutes]()), p: 12 > d ? "AM" : "PM", P: 12 > d ? "am" : "pm", S: E(l.getSeconds()), L: E(Math.round(g % 1E3), 3) }, a.dateFormats);for (q in u) {
        for (; -1 !== r.indexOf("%" + q);) {
          r = r.replace("%" + q, "function" === typeof u[q] ? u[q](g) : u[q]);
        }
      }return f ? r.substr(0, 1).toUpperCase() + r.substr(1) : r;
    };a.formatSingle = function (r, g) {
      var f = /\.([0-9])/,
          u = a.defaultOptions.lang;/f$/.test(r) ? (f = (f = r.match(f)) ? f[1] : -1, null !== g && (g = a.numberFormat(g, f, u.decimalPoint, -1 < r.indexOf(",") ? u.thousandsSep : ""))) : g = a.dateFormat(r, g);return g;
    };a.format = function (r, g) {
      for (var f = "{", u = !1, l, q, d, b, p = [], C; r;) {
        f = r.indexOf(f);if (-1 === f) break;l = r.slice(0, f);if (u) {
          l = l.split(":");q = l.shift().split(".");b = q.length;C = g;for (d = 0; d < b; d++) {
            C = C[q[d]];
          }l.length && (C = a.formatSingle(l.join(":"), C));p.push(C);
        } else p.push(l);r = r.slice(f + 1);f = (u = !u) ? "}" : "{";
      }p.push(r);return p.join("");
    };a.getMagnitude = function (a) {
      return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
    };a.normalizeTickInterval = function (r, g, f, u, l) {
      var q,
          d = r;f = a.pick(f, 1);q = r / f;g || (g = l ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === u && (1 === f ? g = a.grep(g, function (a) {
        return 0 === a % 1;
      }) : .1 >= f && (g = [1 / f])));
      for (u = 0; u < g.length && !(d = g[u], l && d * f >= r || !l && q <= (g[u] + (g[u + 1] || g[u])) / 2); u++) {}return d = a.correctFloat(d * f, -Math.round(Math.log(.001) / Math.LN10));
    };a.stableSort = function (a, g) {
      var f = a.length,
          r,
          l;for (l = 0; l < f; l++) {
        a[l].safeI = l;
      }a.sort(function (a, d) {
        r = g(a, d);return 0 === r ? a.safeI - d.safeI : r;
      });for (l = 0; l < f; l++) {
        delete a[l].safeI;
      }
    };a.arrayMin = function (a) {
      for (var g = a.length, f = a[0]; g--;) {
        a[g] < f && (f = a[g]);
      }return f;
    };a.arrayMax = function (a) {
      for (var g = a.length, f = a[0]; g--;) {
        a[g] > f && (f = a[g]);
      }return f;
    };a.destroyObjectProperties = function (a, g) {
      for (var f in a) {
        a[f] && a[f] !== g && a[f].destroy && a[f].destroy(), delete a[f];
      }
    };a.discardElement = function (r) {
      var g = a.garbageBin;g || (g = a.createElement("div"));r && g.appendChild(r);g.innerHTML = "";
    };a.correctFloat = function (a, g) {
      return parseFloat(a.toPrecision(g || 14));
    };a.setAnimation = function (r, g) {
      g.renderer.globalAnimation = a.pick(r, g.options.chart.animation, !0);
    };a.animObject = function (r) {
      return a.isObject(r) ? a.merge(r) : { duration: r ? 500 : 0 };
    };a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5,
      day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };a.numberFormat = function (r, g, f, u) {
      r = +r || 0;g = +g;var l = a.defaultOptions.lang,
          q = (r.toString().split(".")[1] || "").length,
          d,
          b;-1 === g ? g = Math.min(q, 20) : a.isNumber(g) || (g = 2);b = (Math.abs(r) + Math.pow(10, -Math.max(g, q) - 1)).toFixed(g);q = String(a.pInt(b));d = 3 < q.length ? q.length % 3 : 0;f = a.pick(f, l.decimalPoint);u = a.pick(u, l.thousandsSep);r = (0 > r ? "-" : "") + (d ? q.substr(0, d) + u : "");r += q.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + u);g && (r += f + b.slice(-g));return r;
    };Math.easeInOutSine = function (a) {
      return -.5 * (Math.cos(Math.PI * a) - 1);
    };a.getStyle = function (r, g) {
      return "width" === g ? Math.min(r.offsetWidth, r.scrollWidth) - a.getStyle(r, "padding-left") - a.getStyle(r, "padding-right") : "height" === g ? Math.min(r.offsetHeight, r.scrollHeight) - a.getStyle(r, "padding-top") - a.getStyle(r, "padding-bottom") : (r = G.getComputedStyle(r, void 0)) && a.pInt(r.getPropertyValue(g));
    };a.inArray = function (a, g) {
      return g.indexOf ? g.indexOf(a) : [].indexOf.call(g, a);
    };a.grep = function (a, g) {
      return [].filter.call(a, g);
    };a.find = function (a, g) {
      return [].find.call(a, g);
    };a.map = function (a, g) {
      for (var f = [], u = 0, l = a.length; u < l; u++) {
        f[u] = g.call(a[u], a[u], u, a);
      }return f;
    };a.offset = function (a) {
      var g = H.documentElement;a = a.getBoundingClientRect();return { top: a.top + (G.pageYOffset || g.scrollTop) - (g.clientTop || 0), left: a.left + (G.pageXOffset || g.scrollLeft) - (g.clientLeft || 0) };
    };a.stop = function (a, g) {
      for (var f = B.length; f--;) {
        B[f].elem !== a || g && g !== B[f].prop || (B[f].stopped = !0);
      }
    };a.each = function (a, g, f) {
      return Array.prototype.forEach.call(a, g, f);
    };a.addEvent = function (r, g, f) {
      function u(a) {
        a.target = a.srcElement || G;f.call(r, a);
      }var l = r.hcEvents = r.hcEvents || {};r.addEventListener ? r.addEventListener(g, f, !1) : r.attachEvent && (r.hcEventsIE || (r.hcEventsIE = {}), r.hcEventsIE[f.toString()] = u, r.attachEvent("on" + g, u));l[g] || (l[g] = []);l[g].push(f);return function () {
        a.removeEvent(r, g, f);
      };
    };a.removeEvent = function (r, g, f) {
      function u(a, b) {
        r.removeEventListener ? r.removeEventListener(a, b, !1) : r.attachEvent && (b = r.hcEventsIE[b.toString()], r.detachEvent("on" + a, b));
      }function l() {
        var a, b;if (r.nodeName) for (b in g ? (a = {}, a[g] = !0) : a = d, a) {
          if (d[b]) for (a = d[b].length; a--;) {
            u(b, d[b][a]);
          }
        }
      }var q,
          d = r.hcEvents,
          b;d && (g ? (q = d[g] || [], f ? (b = a.inArray(f, q), -1 < b && (q.splice(b, 1), d[g] = q), u(g, f)) : (l(), d[g] = [])) : (l(), r.hcEvents = {}));
    };a.fireEvent = function (r, g, f, u) {
      var l;l = r.hcEvents;var q, d;f = f || {};if (H.createEvent && (r.dispatchEvent || r.fireEvent)) l = H.createEvent("Events"), l.initEvent(g, !0, !0), a.extend(l, f), r.dispatchEvent ? r.dispatchEvent(l) : r.fireEvent(g, l);else if (l) for (l = l[g] || [], q = l.length, f.target || a.extend(f, { preventDefault: function preventDefault() {
          f.defaultPrevented = !0;
        }, target: r, type: g }), g = 0; g < q; g++) {
        (d = l[g]) && !1 === d.call(r, f) && f.preventDefault();
      }u && !f.defaultPrevented && u(f);
    };a.animate = function (r, g, f) {
      var u,
          l = "",
          q,
          d,
          b;a.isObject(f) || (u = arguments, f = { duration: u[2], easing: u[3], complete: u[4] });a.isNumber(f.duration) || (f.duration = 400);f.easing = "function" === typeof f.easing ? f.easing : Math[f.easing] || Math.easeInOutSine;f.curAnim = a.merge(g);for (b in g) {
        a.stop(r, b), d = new a.Fx(r, f, b), q = null, "d" === b ? (d.paths = d.initPath(r, r.d, g.d), d.toD = g.d, u = 0, q = 1) : r.attr ? u = r.attr(b) : (u = parseFloat(a.getStyle(r, b)) || 0, "opacity" !== b && (l = "px")), q || (q = g[b]), q.match && q.match("px") && (q = q.replace(/px/g, "")), d.run(u, q, l);
      }
    };a.seriesType = function (r, g, f, u, l) {
      var q = a.getOptions(),
          d = a.seriesTypes;q.plotOptions[r] = a.merge(q.plotOptions[g], f);d[r] = a.extendClass(d[g] || function () {}, u);d[r].prototype.type = r;l && (d[r].prototype.pointClass = a.extendClass(a.Point, l));return d[r];
    };a.uniqueKey = function () {
      var a = Math.random().toString(36).substring(2, 9),
          g = 0;return function () {
        return "highcharts-" + a + "-" + g++;
      };
    }();G.jQuery && (G.jQuery.fn.highcharts = function () {
      var r = [].slice.call(arguments);if (this[0]) return r[0] ? (new a[a.isString(r[0]) ? r.shift() : "Chart"](this[0], r[0], r[1]), this) : A[a.attr(this[0], "data-highcharts-chart")];
    });H && !H.defaultView && (a.getStyle = function (r, g) {
      var f = { width: "clientWidth", height: "clientHeight" }[g];if (r.style[g]) return a.pInt(r.style[g]);"opacity" === g && (g = "filter");if (f) return r.style.zoom = 1, Math.max(r[f] - 2 * a.getStyle(r, "padding"), 0);r = r.currentStyle[g.replace(/\-(\w)/g, function (a, l) {
        return l.toUpperCase();
      })];"filter" === g && (r = r.replace(/alpha\(opacity=([0-9]+)\)/, function (a, l) {
        return l / 100;
      }));return "" === r ? 1 : a.pInt(r);
    });Array.prototype.forEach || (a.each = function (a, g, f) {
      for (var u = 0, l = a.length; u < l; u++) {
        if (!1 === g.call(f, a[u], u, a)) return u;
      }
    });Array.prototype.indexOf || (a.inArray = function (a, g) {
      var f,
          u = 0;if (g) for (f = g.length; u < f; u++) {
        if (g[u] === a) return u;
      }return -1;
    });Array.prototype.filter || (a.grep = function (a, g) {
      for (var f = [], u = 0, l = a.length; u < l; u++) {
        g(a[u], u) && f.push(a[u]);
      }return f;
    });Array.prototype.find || (a.find = function (a, g) {
      var f,
          u = a.length;for (f = 0; f < u; f++) {
        if (g(a[f], f)) return a[f];
      }
    });
  })(L);(function (a) {
    var B = a.each,
        A = a.isNumber,
        H = a.map,
        G = a.merge,
        r = a.pInt;a.Color = function (g) {
      if (!(this instanceof a.Color)) return new a.Color(g);this.init(g);
    };a.Color.prototype = { parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function parse(a) {
          return [r(a[1]), r(a[2]), r(a[3]), parseFloat(a[4], 10)];
        } }, { regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function parse(a) {
          return [r(a[1], 16), r(a[2], 16), r(a[3], 16), 1];
        } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function parse(a) {
          return [r(a[1]), r(a[2]), r(a[3]), 1];
        } }], names: { white: "#ffffff", black: "#000000" }, init: function init(g) {
        var f, u, l, q;if ((this.input = g = this.names[g] || g) && g.stops) this.stops = H(g.stops, function (d) {
          return new a.Color(d[1]);
        });else for (l = this.parsers.length; l-- && !u;) {
          q = this.parsers[l], (f = q.regex.exec(g)) && (u = q.parse(f));
        }this.rgba = u || [];
      }, get: function get(a) {
        var f = this.input,
            g = this.rgba,
            l;this.stops ? (l = G(f), l.stops = [].concat(l.stops), B(this.stops, function (f, d) {
          l.stops[d] = [l.stops[d][0], f.get(a)];
        })) : l = g && A(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : f;return l;
      }, brighten: function brighten(a) {
        var f,
            g = this.rgba;if (this.stops) B(this.stops, function (l) {
          l.brighten(a);
        });else if (A(a) && 0 !== a) for (f = 0; 3 > f; f++) {
          g[f] += r(255 * a), 0 > g[f] && (g[f] = 0), 255 < g[f] && (g[f] = 255);
        }return this;
      }, setOpacity: function setOpacity(a) {
        this.rgba[3] = a;return this;
      } };a.color = function (g) {
      return new a.Color(g);
    };
  })(L);
  (function (a) {
    var B,
        A,
        H = a.addEvent,
        G = a.animate,
        r = a.attr,
        g = a.charts,
        f = a.color,
        u = a.css,
        l = a.createElement,
        q = a.defined,
        d = a.deg2rad,
        b = a.destroyObjectProperties,
        p = a.doc,
        C = a.each,
        t = a.extend,
        m = a.erase,
        c = a.grep,
        n = a.hasTouch,
        E = a.inArray,
        z = a.isArray,
        e = a.isFirefox,
        x = a.isMS,
        F = a.isObject,
        w = a.isString,
        h = a.isWebKit,
        y = a.merge,
        J = a.noop,
        K = a.pick,
        I = a.pInt,
        k = a.removeEvent,
        D = a.stop,
        P = a.svg,
        N = a.SVG_NS,
        S = a.symbolSizes,
        O = a.win;B = a.SVGElement = function () {
      return this;
    };B.prototype = { opacity: 1, SVG_NS: N, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
      init: function init(a, k) {
        this.element = "span" === k ? l(k) : p.createElementNS(this.SVG_NS, k);this.renderer = a;
      }, animate: function animate(v, k, e) {
        k = a.animObject(K(k, this.renderer.globalAnimation, !0));0 !== k.duration ? (e && (k.complete = e), G(this, v, k)) : this.attr(v, null, e);return this;
      }, colorGradient: function colorGradient(v, k, e) {
        var b = this.renderer,
            h,
            D,
            c,
            x,
            M,
            m,
            n,
            d,
            F,
            t,
            p,
            w = [],
            l;v.linearGradient ? D = "linearGradient" : v.radialGradient && (D = "radialGradient");if (D) {
          c = v[D];M = b.gradients;n = v.stops;t = e.radialReference;z(c) && (v[D] = c = { x1: c[0], y1: c[1], x2: c[2],
            y2: c[3], gradientUnits: "userSpaceOnUse" });"radialGradient" === D && t && !q(c.gradientUnits) && (x = c, c = y(c, b.getRadialAttr(t, x), { gradientUnits: "userSpaceOnUse" }));for (p in c) {
            "id" !== p && w.push(p, c[p]);
          }for (p in n) {
            w.push(n[p]);
          }w = w.join(",");M[w] ? t = M[w].attr("id") : (c.id = t = a.uniqueKey(), M[w] = m = b.createElement(D).attr(c).add(b.defs), m.radAttr = x, m.stops = [], C(n, function (v) {
            0 === v[1].indexOf("rgba") ? (h = a.color(v[1]), d = h.get("rgb"), F = h.get("a")) : (d = v[1], F = 1);v = b.createElement("stop").attr({ offset: v[0], "stop-color": d,
              "stop-opacity": F }).add(m);m.stops.push(v);
          }));l = "url(" + b.url + "#" + t + ")";e.setAttribute(k, l);e.gradient = w;v.toString = function () {
            return l;
          };
        }
      }, applyTextOutline: function applyTextOutline(a) {
        var v = this.element,
            k,
            e,
            b,
            c;-1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(v.style.fill)));this.fakeTS = !0;this.ySetter = this.xSetter;k = [].slice.call(v.getElementsByTagName("tspan"));a = a.split(" ");e = a[a.length - 1];(b = a[0]) && "none" !== b && (b = b.replace(/(^[\d\.]+)(.*?)$/g, function (a, v, k) {
          return 2 * v + k;
        }), C(k, function (a) {
          "highcharts-text-outline" === a.getAttribute("class") && m(k, v.removeChild(a));
        }), c = v.firstChild, C(k, function (a, k) {
          0 === k && (a.setAttribute("x", v.getAttribute("x")), k = v.getAttribute("y"), a.setAttribute("y", k || 0), null === k && v.setAttribute("y", 0));a = a.cloneNode(1);r(a, { "class": "highcharts-text-outline", fill: e, stroke: e, "stroke-width": b, "stroke-linejoin": "round" });v.insertBefore(a, c);
        }));
      }, attr: function attr(a, k, e, b) {
        var v,
            c = this.element,
            h,
            x = this,
            M;"string" === typeof a && void 0 !== k && (v = a, a = {}, a[v] = k);if ("string" === typeof a) x = (this[a + "Getter"] || this._defaultGetter).call(this, a, c);else {
          for (v in a) {
            k = a[v], M = !1, b || D(this, v), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(v) && (h || (this.symbolAttr(a), h = !0), M = !0), !this.rotation || "x" !== v && "y" !== v || (this.doTransform = !0), M || (M = this[v + "Setter"] || this._defaultSetter, M.call(this, k, v, c), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(v) && this.updateShadows(v, k, M));
          }this.doTransform && (this.updateTransform(), this.doTransform = !1);
        }e && e();return x;
      }, updateShadows: function updateShadows(a, k, e) {
        for (var v = this.shadows, b = v.length; b--;) {
          e.call(v[b], "height" === a ? Math.max(k - (v[b].cutHeight || 0), 0) : "d" === a ? this.d : k, a, v[b]);
        }
      }, addClass: function addClass(a, k) {
        var v = this.attr("class") || "";-1 === v.indexOf(a) && (k || (a = (v + (v ? " " : "") + a).replace("  ", " ")), this.attr("class", a));return this;
      }, hasClass: function hasClass(a) {
        return -1 !== r(this.element, "class").indexOf(a);
      }, removeClass: function removeClass(a) {
        r(this.element, "class", (r(this.element, "class") || "").replace(a, ""));return this;
      }, symbolAttr: function symbolAttr(a) {
        var v = this;C("x y r start end width height innerR anchorX anchorY".split(" "), function (k) {
          v[k] = K(a[k], v[k]);
        });v.attr({ d: v.renderer.symbols[v.symbolName](v.x, v.y, v.width, v.height, v) });
      }, clip: function clip(a) {
        return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
      }, crisp: function crisp(a, k) {
        var v,
            e = {},
            b;k = k || a.strokeWidth || 0;b = Math.round(k) % 2 / 2;a.x = Math.floor(a.x || this.x || 0) + b;a.y = Math.floor(a.y || this.y || 0) + b;a.width = Math.floor((a.width || this.width || 0) - 2 * b);a.height = Math.floor((a.height || this.height || 0) - 2 * b);q(a.strokeWidth) && (a.strokeWidth = k);for (v in a) {
          this[v] !== a[v] && (this[v] = e[v] = a[v]);
        }return e;
      }, css: function css(a) {
        var v = this.styles,
            k = {},
            e = this.element,
            b,
            c,
            h = "";b = !v;var D = ["textOverflow", "width"];a && a.color && (a.fill = a.color);if (v) for (c in a) {
          a[c] !== v[c] && (k[c] = a[c], b = !0);
        }if (b) {
          b = this.textWidth = a && a.width && "text" === e.nodeName.toLowerCase() && I(a.width) || this.textWidth;v && (a = t(v, k));this.styles = a;b && !P && this.renderer.forExport && delete a.width;if (x && !P) u(this.element, a);else {
            v = function v(a, _v) {
              return "-" + _v.toLowerCase();
            };for (c in a) {
              -1 === E(c, D) && (h += c.replace(/([A-Z])/g, v) + ":" + a[c] + ";");
            }h && r(e, "style", h);
          }this.added && (b && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline));
        }return this;
      }, strokeWidth: function strokeWidth() {
        return this["stroke-width"] || 0;
      }, on: function on(a, k) {
        var v = this,
            e = v.element;n && "click" === a ? (e.ontouchstart = function (a) {
          v.touchEventFired = Date.now();a.preventDefault();k.call(e, a);
        }, e.onclick = function (a) {
          (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (v.touchEventFired || 0)) && k.call(e, a);
        }) : e["on" + a] = k;return this;
      }, setRadialReference: function setRadialReference(a) {
        var v = this.renderer.gradients[this.element.gradient];this.element.radialReference = a;v && v.radAttr && v.animate(this.renderer.getRadialAttr(a, v.radAttr));return this;
      }, translate: function translate(a, k) {
        return this.attr({ translateX: a, translateY: k });
      }, invert: function invert(a) {
        this.inverted = a;this.updateTransform();return this;
      }, updateTransform: function updateTransform() {
        var a = this.translateX || 0,
            k = this.translateY || 0,
            e = this.scaleX,
            b = this.scaleY,
            c = this.inverted,
            h = this.rotation,
            D = this.element;c && (a += this.width, k += this.height);a = ["translate(" + a + "," + k + ")"];c ? a.push("rotate(90) scale(-1,1)") : h && a.push("rotate(" + h + " " + (D.getAttribute("x") || 0) + " " + (D.getAttribute("y") || 0) + ")");(q(e) || q(b)) && a.push("scale(" + K(e, 1) + " " + K(b, 1) + ")");a.length && D.setAttribute("transform", a.join(" "));
      }, toFront: function toFront() {
        var a = this.element;a.parentNode.appendChild(a);return this;
      }, align: function align(a, k, e) {
        var v,
            b,
            c,
            h,
            D = {};b = this.renderer;c = b.alignedObjects;var x, y;if (a) {
          if (this.alignOptions = a, this.alignByTranslate = k, !e || w(e)) this.alignTo = v = e || "renderer", m(c, this), c.push(this), e = null;
        } else a = this.alignOptions, k = this.alignByTranslate, v = this.alignTo;e = K(e, b[v], b);v = a.align;b = a.verticalAlign;c = (e.x || 0) + (a.x || 0);h = (e.y || 0) + (a.y || 0);"right" === v ? x = 1 : "center" === v && (x = 2);x && (c += (e.width - (a.width || 0)) / x);D[k ? "translateX" : "x"] = Math.round(c);"bottom" === b ? y = 1 : "middle" === b && (y = 2);y && (h += (e.height - (a.height || 0)) / y);D[k ? "translateY" : "y"] = Math.round(h);this[this.placed ? "animate" : "attr"](D);this.placed = !0;this.alignAttr = D;return this;
      }, getBBox: function getBBox(a, k) {
        var v,
            e = this.renderer,
            b,
            c = this.element,
            h = this.styles,
            D,
            x = this.textStr,
            m,
            y = e.cache,
            n = e.cacheKeys,
            F;k = K(k, this.rotation);b = k * d;D = h && h.fontSize;void 0 !== x && (F = x.toString(), -1 === F.indexOf("\x3c") && (F = F.replace(/[0-9]/g, "0")), F += ["", k || 0, D, h && h.width, h && h.textOverflow].join());F && !a && (v = y[F]);if (!v) {
          if (c.namespaceURI === this.SVG_NS || e.forExport) {
            try {
              (m = this.fakeTS && function (a) {
                C(c.querySelectorAll(".highcharts-text-outline"), function (v) {
                  v.style.display = a;
                });
              }) && m("none"), v = c.getBBox ? t({}, c.getBBox()) : { width: c.offsetWidth, height: c.offsetHeight }, m && m("");
            } catch (W) {}if (!v || 0 > v.width) v = { width: 0, height: 0 };
          } else v = this.htmlGetBBox();e.isSVG && (a = v.width, e = v.height, h && "11px" === h.fontSize && 17 === Math.round(e) && (v.height = e = 14), k && (v.width = Math.abs(e * Math.sin(b)) + Math.abs(a * Math.cos(b)), v.height = Math.abs(e * Math.cos(b)) + Math.abs(a * Math.sin(b))));if (F && 0 < v.height) {
            for (; 250 < n.length;) {
              delete y[n.shift()];
            }y[F] || n.push(F);y[F] = v;
          }
        }return v;
      }, show: function show(a) {
        return this.attr({ visibility: a ? "inherit" : "visible" });
      }, hide: function hide() {
        return this.attr({ visibility: "hidden" });
      },
      fadeOut: function fadeOut(a) {
        var v = this;v.animate({ opacity: 0 }, { duration: a || 150, complete: function complete() {
            v.attr({ y: -9999 });
          } });
      }, add: function add(a) {
        var v = this.renderer,
            k = this.element,
            e;a && (this.parentGroup = a);this.parentInverted = a && a.inverted;void 0 !== this.textStr && v.buildText(this);this.added = !0;if (!a || a.handleZ || this.zIndex) e = this.zIndexSetter();e || (a ? a.element : v.box).appendChild(k);if (this.onAdd) this.onAdd();return this;
      }, safeRemoveChild: function safeRemoveChild(a) {
        var v = a.parentNode;v && v.removeChild(a);
      }, destroy: function destroy() {
        var a = this.element || {},
            k = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
            e,
            b;a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;D(this);this.clipPath && (this.clipPath = this.clipPath.destroy());if (this.stops) {
          for (b = 0; b < this.stops.length; b++) {
            this.stops[b] = this.stops[b].destroy();
          }this.stops = null;
        }this.safeRemoveChild(a);for (this.destroyShadows(); k && k.div && 0 === k.div.childNodes.length;) {
          a = k.parentGroup, this.safeRemoveChild(k.div), delete k.div, k = a;
        }this.alignTo && m(this.renderer.alignedObjects, this);for (e in this) {
          delete this[e];
        }return null;
      }, shadow: function shadow(a, k, e) {
        var v = [],
            b,
            c,
            h = this.element,
            D,
            x,
            m,
            y;if (!a) this.destroyShadows();else if (!this.shadows) {
          x = K(a.width, 3);m = (a.opacity || .15) / x;y = this.parentInverted ? "(-1,-1)" : "(" + K(a.offsetX, 1) + ", " + K(a.offsetY, 1) + ")";for (b = 1; b <= x; b++) {
            c = h.cloneNode(0), D = 2 * x + 1 - 2 * b, r(c, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": m * b, "stroke-width": D, transform: "translate" + y, fill: "none" }), e && (r(c, "height", Math.max(r(c, "height") - D, 0)), c.cutHeight = D), k ? k.element.appendChild(c) : h.parentNode.insertBefore(c, h), v.push(c);
          }this.shadows = v;
        }return this;
      }, destroyShadows: function destroyShadows() {
        C(this.shadows || [], function (a) {
          this.safeRemoveChild(a);
        }, this);this.shadows = void 0;
      }, xGetter: function xGetter(a) {
        "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));return this._defaultGetter(a);
      }, _defaultGetter: function _defaultGetter(a) {
        a = K(this[a], this.element ? this.element.getAttribute(a) : null, 0);/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));return a;
      }, dSetter: function dSetter(a, k, e) {
        a && a.join && (a = a.join(" "));/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");e.setAttribute(k, a);this[k] = a;
      }, dashstyleSetter: function dashstyleSetter(a) {
        var v,
            k = this["stroke-width"];"inherit" === k && (k = 1);if (a = a && a.toLowerCase()) {
          a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");for (v = a.length; v--;) {
            a[v] = I(a[v]) * k;
          }a = a.join(",").replace(/NaN/g, "none");this.element.setAttribute("stroke-dasharray", a);
        }
      }, alignSetter: function alignSetter(a) {
        this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[a]);
      }, opacitySetter: function opacitySetter(a, k, e) {
        this[k] = a;e.setAttribute(k, a);
      }, titleSetter: function titleSetter(a) {
        var v = this.element.getElementsByTagName("title")[0];v || (v = p.createElementNS(this.SVG_NS, "title"), this.element.appendChild(v));v.firstChild && v.removeChild(v.firstChild);v.appendChild(p.createTextNode(String(K(a), "").replace(/<[^>]*>/g, "")));
      }, textSetter: function textSetter(a) {
        a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
      }, fillSetter: function fillSetter(a, k, e) {
        "string" === typeof a ? e.setAttribute(k, a) : a && this.colorGradient(a, k, e);
      }, visibilitySetter: function visibilitySetter(a, k, e) {
        "inherit" === a ? e.removeAttribute(k) : e.setAttribute(k, a);
      }, zIndexSetter: function zIndexSetter(a, k) {
        var v = this.renderer,
            e = this.parentGroup,
            b = (e || v).element || v.box,
            c,
            h = this.element,
            D;c = this.added;var x;q(a) && (h.zIndex = a, a = +a, this[k] === a && (c = !1), this[k] = a);if (c) {
          (a = this.zIndex) && e && (e.handleZ = !0);k = b.childNodes;for (x = 0; x < k.length && !D; x++) {
            e = k[x], c = e.zIndex, e !== h && (I(c) > a || !q(a) && q(c) || 0 > a && !q(c) && b !== v.box) && (b.insertBefore(h, e), D = !0);
          }D || b.appendChild(h);
        }return D;
      }, _defaultSetter: function _defaultSetter(a, k, e) {
        e.setAttribute(k, a);
      } };B.prototype.yGetter = B.prototype.xGetter;B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter = B.prototype.scaleXSetter = B.prototype.scaleYSetter = function (a, k) {
      this[k] = a;this.doTransform = !0;
    };B.prototype["stroke-widthSetter"] = B.prototype.strokeSetter = function (a, k, e) {
      this[k] = a;this.stroke && this["stroke-width"] ? (B.prototype.fillSetter.call(this, this.stroke, "stroke", e), e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === k && 0 === a && this.hasStroke && (e.removeAttribute("stroke"), this.hasStroke = !1);
    };A = a.SVGRenderer = function () {
      this.init.apply(this, arguments);
    };A.prototype = { Element: B, SVG_NS: N, init: function init(a, k, b, c, D, x) {
        var v;c = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(c));v = c.element;
        a.appendChild(v);-1 === a.innerHTML.indexOf("xmlns") && r(v, "xmlns", this.SVG_NS);this.isSVG = !0;this.box = v;this.boxWrapper = c;this.alignedObjects = [];this.url = (e || h) && p.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 5.0.7"));this.defs = this.createElement("defs").add();this.allowHTML = x;this.forExport = D;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(k, b, !1);var m;e && a.getBoundingClientRect && (k = function k() {
          u(a, { left: 0, top: 0 });m = a.getBoundingClientRect();u(a, { left: Math.ceil(m.left) - m.left + "px", top: Math.ceil(m.top) - m.top + "px" });
        }, k(), this.unSubPixelFix = H(O, "resize", k));
      }, getStyle: function getStyle(a) {
        return this.style = t({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a);
      }, setStyle: function setStyle(a) {
        this.boxWrapper.css(this.getStyle(a));
      }, isHidden: function isHidden() {
        return !this.boxWrapper.getBBox().width;
      },
      destroy: function destroy() {
        var a = this.defs;this.box = null;this.boxWrapper = this.boxWrapper.destroy();b(this.gradients || {});this.gradients = null;a && (this.defs = a.destroy());this.unSubPixelFix && this.unSubPixelFix();return this.alignedObjects = null;
      }, createElement: function createElement(a) {
        var k = new this.Element();k.init(this, a);return k;
      }, draw: J, getRadialAttr: function getRadialAttr(a, k) {
        return { cx: a[0] - a[2] / 2 + k.cx * a[2], cy: a[1] - a[2] / 2 + k.cy * a[2], r: k.r * a[2] };
      }, buildText: function buildText(a) {
        var k = a.element,
            v = this,
            e = v.forExport,
            b = K(a.textStr, "").toString(),
            h = -1 !== b.indexOf("\x3c"),
            D = k.childNodes,
            x,
            m,
            y,
            n,
            F = r(k, "x"),
            d = a.styles,
            t = a.textWidth,
            w = d && d.lineHeight,
            l = d && d.textOutline,
            z = d && "ellipsis" === d.textOverflow,
            f = d && "nowrap" === d.whiteSpace,
            E = d && d.fontSize,
            q,
            g = D.length,
            d = t && !a.added && this.box,
            J = function J(a) {
          var e;e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : E || v.style.fontSize || 12;return w ? I(w) : v.fontMetrics(e, a.getAttribute("style") ? a : k).h;
        };q = [b, z, f, w, l, E, t].join();if (q !== a.textCache) {
          for (a.textCache = q; g--;) {
            k.removeChild(D[g]);
          }h || l || z || t || -1 !== b.indexOf(" ") ? (x = /<.*class="([^"]+)".*>/, m = /<.*style="([^"]+)".*>/, y = /<.*href="(http[^"]+)".*>/, d && d.appendChild(k), b = h ? b.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [b], b = c(b, function (a) {
            return "" !== a;
          }), C(b, function (b, c) {
            var h,
                D = 0;b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
            h = b.split("|||");C(h, function (b) {
              if ("" !== b || 1 === h.length) {
                var d = {},
                    w = p.createElementNS(v.SVG_NS, "tspan"),
                    l,
                    E;x.test(b) && (l = b.match(x)[1], r(w, "class", l));m.test(b) && (E = b.match(m)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), r(w, "style", E));y.test(b) && !e && (r(w, "onclick", 'location.href\x3d"' + b.match(y)[1] + '"'), u(w, { cursor: "pointer" }));b = (b.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");if (" " !== b) {
                  w.appendChild(p.createTextNode(b));D ? d.dx = 0 : c && null !== F && (d.x = F);r(w, d);
                  k.appendChild(w);!D && c && (!P && e && u(w, { display: "block" }), r(w, "dy", J(w)));if (t) {
                    d = b.replace(/([^\^])-/g, "$1- ").split(" ");l = 1 < h.length || c || 1 < d.length && !f;for (var q, g, M = [], C = J(w), K = a.rotation, I = b, Q = I.length; (l || z) && (d.length || M.length);) {
                      a.rotation = 0, q = a.getBBox(!0), g = q.width, !P && v.forExport && (g = v.measureSpanWidth(w.firstChild.data, a.styles)), q = g > t, void 0 === n && (n = q), z && n ? (Q /= 2, "" === I || !q && .5 > Q ? d = [] : (I = b.substring(0, I.length + (q ? -1 : 1) * Math.ceil(Q)), d = [I + (3 < t ? "\u2026" : "")], w.removeChild(w.firstChild))) : q && 1 !== d.length ? (w.removeChild(w.firstChild), M.unshift(d.pop())) : (d = M, M = [], d.length && !f && (w = p.createElementNS(N, "tspan"), r(w, { dy: C, x: F }), E && r(w, "style", E), k.appendChild(w)), g > t && (t = g)), d.length && w.appendChild(p.createTextNode(d.join(" ").replace(/- /g, "-")));
                    }a.rotation = K;
                  }D++;
                }
              }
            });
          }), n && a.attr("title", a.textStr), d && d.removeChild(k), l && a.applyTextOutline && a.applyTextOutline(l)) : k.appendChild(p.createTextNode(b.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")));
        }
      }, getContrast: function getContrast(a) {
        a = f(a).rgba;return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
      }, button: function button(a, k, e, b, c, h, D, m, d) {
        var v = this.label(a, k, e, d, null, null, null, null, "button"),
            n = 0;v.attr(y({ padding: 8, r: 2 }, c));var F, w, p, l;c = y({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, c);F = c.style;delete c.style;h = y(c, { fill: "#e6e6e6" }, h);w = h.style;delete h.style;D = y(c, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, D);p = D.style;delete D.style;m = y(c, { style: { color: "#cccccc" } }, m);l = m.style;
        delete m.style;H(v.element, x ? "mouseover" : "mouseenter", function () {
          3 !== n && v.setState(1);
        });H(v.element, x ? "mouseout" : "mouseleave", function () {
          3 !== n && v.setState(n);
        });v.setState = function (a) {
          1 !== a && (v.state = n = a);v.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);v.attr([c, h, D, m][a || 0]).css([F, w, p, l][a || 0]);
        };v.attr(c).css(t({ cursor: "default" }, F));return v.on("click", function (a) {
          3 !== n && b.call(v, a);
        });
      }, crispLine: function crispLine(a, k) {
        a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - k % 2 / 2);a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + k % 2 / 2);return a;
      }, path: function path(a) {
        var k = { fill: "none" };z(a) ? k.d = a : F(a) && t(k, a);return this.createElement("path").attr(k);
      }, circle: function circle(a, k, e) {
        a = F(a) ? a : { x: a, y: k, r: e };k = this.createElement("circle");k.xSetter = k.ySetter = function (a, k, e) {
          e.setAttribute("c" + k, a);
        };return k.attr(a);
      }, arc: function arc(a, k, e, b, c, h) {
        F(a) && (k = a.y, e = a.r, b = a.innerR, c = a.start, h = a.end, a = a.x);a = this.symbol("arc", a || 0, k || 0, e || 0, e || 0, { innerR: b || 0, start: c || 0, end: h || 0 });a.r = e;return a;
      }, rect: function rect(a, k, e, b, c, h) {
        c = F(a) ? a.r : c;var v = this.createElement("rect");a = F(a) ? a : void 0 === a ? {} : { x: a, y: k, width: Math.max(e, 0), height: Math.max(b, 0) };void 0 !== h && (a.strokeWidth = h, a = v.crisp(a));a.fill = "none";c && (a.r = c);v.rSetter = function (a, k, e) {
          r(e, { rx: a, ry: a });
        };return v.attr(a);
      }, setSize: function setSize(a, k, e) {
        var b = this.alignedObjects,
            v = b.length;this.width = a;this.height = k;for (this.boxWrapper.animate({ width: a, height: k }, { step: function step() {
            this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
          }, duration: K(e, !0) ? void 0 : 0 }); v--;) {
          b[v].align();
        }
      }, g: function g(a) {
        var k = this.createElement("g");return a ? k.attr({ "class": "highcharts-" + a }) : k;
      }, image: function image(a, k, e, b, c) {
        var v = { preserveAspectRatio: "none" };1 < arguments.length && t(v, { x: k, y: e, width: b, height: c });v = this.createElement("image").attr(v);v.element.setAttributeNS ? v.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : v.element.setAttribute("hc-svg-href", a);return v;
      }, symbol: function symbol(a, k, e, b, c, h) {
        var v = this,
            D,
            x = this.symbols[a],
            m = q(k) && x && this.symbols[a](Math.round(k), Math.round(e), b, c, h),
            y = /^url\((.*?)\)$/,
            d,
            n;x ? (D = this.path(m), D.attr("fill", "none"), t(D, { symbolName: a, x: k, y: e, width: b, height: c }), h && t(D, h)) : y.test(a) && (d = a.match(y)[1], D = this.image(d), D.imgwidth = K(S[d] && S[d].width, h && h.width), D.imgheight = K(S[d] && S[d].height, h && h.height), n = function n() {
          D.attr({ width: D.width, height: D.height });
        }, C(["width", "height"], function (a) {
          D[a + "Setter"] = function (a, k) {
            var e = {},
                b = this["img" + k],
                v = "width" === k ? "translateX" : "translateY";this[k] = a;
            q(b) && (this.element && this.element.setAttribute(k, b), this.alignByTranslate || (e[v] = ((this[k] || 0) - b) / 2, this.attr(e)));
          };
        }), q(k) && D.attr({ x: k, y: e }), D.isImg = !0, q(D.imgwidth) && q(D.imgheight) ? n() : (D.attr({ width: 0, height: 0 }), l("img", { onload: function onload() {
            var a = g[v.chartIndex];0 === this.width && (u(this, { position: "absolute", top: "-999em" }), p.body.appendChild(this));S[d] = { width: this.width, height: this.height };D.imgwidth = this.width;D.imgheight = this.height;D.element && n();this.parentNode && this.parentNode.removeChild(this);
            v.imgCount--;if (!v.imgCount && a && a.onload) a.onload();
          }, src: d }), this.imgCount++));return D;
      }, symbols: { circle: function circle(a, k, e, b) {
          return this.arc(a + e / 2, k + b / 2, e / 2, b / 2, { start: 0, end: 2 * Math.PI, open: !1 });
        }, square: function square(a, k, e, b) {
          return ["M", a, k, "L", a + e, k, a + e, k + b, a, k + b, "Z"];
        }, triangle: function triangle(a, k, e, b) {
          return ["M", a + e / 2, k, "L", a + e, k + b, a, k + b, "Z"];
        }, "triangle-down": function triangleDown(a, k, e, b) {
          return ["M", a, k, "L", a + e, k, a + e / 2, k + b, "Z"];
        }, diamond: function diamond(a, k, e, b) {
          return ["M", a + e / 2, k, "L", a + e, k + b / 2, a + e / 2, k + b, a, k + b / 2, "Z"];
        }, arc: function arc(a, k, e, b, c) {
          var v = c.start,
              h = c.r || e,
              D = c.r || b || e,
              x = c.end - .001;e = c.innerR;b = c.open;var m = Math.cos(v),
              d = Math.sin(v),
              y = Math.cos(x),
              x = Math.sin(x);c = c.end - v < Math.PI ? 0 : 1;h = ["M", a + h * m, k + D * d, "A", h, D, 0, c, 1, a + h * y, k + D * x];q(e) && h.push(b ? "M" : "L", a + e * y, k + e * x, "A", e, e, 0, c, 0, a + e * m, k + e * d);h.push(b ? "" : "Z");return h;
        }, callout: function callout(a, k, e, b, c) {
          var h = Math.min(c && c.r || 0, e, b),
              D = h + 6,
              v = c && c.anchorX;c = c && c.anchorY;var x;x = ["M", a + h, k, "L", a + e - h, k, "C", a + e, k, a + e, k, a + e, k + h, "L", a + e, k + b - h, "C", a + e, k + b, a + e, k + b, a + e - h, k + b, "L", a + h, k + b, "C", a, k + b, a, k + b, a, k + b - h, "L", a, k + h, "C", a, k, a, k, a + h, k];v && v > e ? c > k + D && c < k + b - D ? x.splice(13, 3, "L", a + e, c - 6, a + e + 6, c, a + e, c + 6, a + e, k + b - h) : x.splice(13, 3, "L", a + e, b / 2, v, c, a + e, b / 2, a + e, k + b - h) : v && 0 > v ? c > k + D && c < k + b - D ? x.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, k + h) : x.splice(33, 3, "L", a, b / 2, v, c, a, b / 2, a, k + h) : c && c > b && v > a + D && v < a + e - D ? x.splice(23, 3, "L", v + 6, k + b, v, k + b + 6, v - 6, k + b, a + h, k + b) : c && 0 > c && v > a + D && v < a + e - D && x.splice(3, 3, "L", v - 6, k, v, k - 6, v + 6, k, e - h, k);return x;
        } }, clipRect: function clipRect(k, e, b, c) {
        var h = a.uniqueKey(),
            D = this.createElement("clipPath").attr({ id: h }).add(this.defs);
        k = this.rect(k, e, b, c, 0).add(D);k.id = h;k.clipPath = D;k.count = 0;return k;
      }, text: function text(a, k, e, b) {
        var c = !P && this.forExport,
            h = {};if (b && (this.allowHTML || !this.forExport)) return this.html(a, k, e);h.x = Math.round(k || 0);e && (h.y = Math.round(e));if (a || 0 === a) h.text = a;a = this.createElement("text").attr(h);c && a.css({ position: "absolute" });b || (a.xSetter = function (a, k, e) {
          var b = e.getElementsByTagName("tspan"),
              c,
              h = e.getAttribute(k),
              D;for (D = 0; D < b.length; D++) {
            c = b[D], c.getAttribute(k) === h && c.setAttribute(k, a);
          }e.setAttribute(k, a);
        });return a;
      }, fontMetrics: function fontMetrics(a, k) {
        a = a || k && k.style && k.style.fontSize || this.style && this.style.fontSize;a = /px/.test(a) ? I(a) : /em/.test(a) ? parseFloat(a) * (k ? this.fontMetrics(null, k.parentNode).f : 16) : 12;k = 24 > a ? a + 3 : Math.round(1.2 * a);return { h: k, b: Math.round(.8 * k), f: a };
      }, rotCorr: function rotCorr(a, k, e) {
        var b = a;k && e && (b = Math.max(b * Math.cos(k * d), 4));return { x: -a / 3 * Math.sin(k * d), y: b };
      }, label: function label(a, e, b, c, h, D, x, m, d) {
        var v = this,
            n = v.g("button" !== d && "label"),
            F = n.text = v.text("", 0, 0, x).attr({ zIndex: 1 }),
            w,
            p,
            l = 0,
            z = 3,
            E = 0,
            f,
            g,
            J,
            K,
            P,
            N = {},
            I,
            u,
            r = /^url\((.*?)\)$/.test(c),
            M = r,
            S,
            Q,
            R,
            O;d && n.addClass("highcharts-" + d);M = r;S = function S() {
          return (I || 0) % 2 / 2;
        };Q = function Q() {
          var a = F.element.style,
              k = {};p = (void 0 === f || void 0 === g || P) && q(F.textStr) && F.getBBox();n.width = (f || p.width || 0) + 2 * z + E;n.height = (g || p.height || 0) + 2 * z;u = z + v.fontMetrics(a && a.fontSize, F).b;M && (w || (n.box = w = v.symbols[c] || r ? v.symbol(c) : v.rect(), w.addClass(("button" === d ? "" : "highcharts-label-box") + (d ? " highcharts-" + d + "-box" : "")), w.add(n), a = S(), k.x = a, k.y = (m ? -u : 0) + a), k.width = Math.round(n.width), k.height = Math.round(n.height), w.attr(t(k, N)), N = {});
        };R = function R() {
          var a = E + z,
              k;k = m ? 0 : u;q(f) && p && ("center" === P || "right" === P) && (a += { center: .5, right: 1 }[P] * (f - p.width));if (a !== F.x || k !== F.y) F.attr("x", a), void 0 !== k && F.attr("y", k);F.x = a;F.y = k;
        };O = function O(a, k) {
          w ? w.attr(a, k) : N[a] = k;
        };n.onAdd = function () {
          F.add(n);n.attr({ text: a || 0 === a ? a : "", x: e, y: b });w && q(h) && n.attr({ anchorX: h, anchorY: D });
        };n.widthSetter = function (a) {
          f = a;
        };n.heightSetter = function (a) {
          g = a;
        };n["text-alignSetter"] = function (a) {
          P = a;
        };
        n.paddingSetter = function (a) {
          q(a) && a !== z && (z = n.padding = a, R());
        };n.paddingLeftSetter = function (a) {
          q(a) && a !== E && (E = a, R());
        };n.alignSetter = function (a) {
          a = { left: 0, center: .5, right: 1 }[a];a !== l && (l = a, p && n.attr({ x: J }));
        };n.textSetter = function (a) {
          void 0 !== a && F.textSetter(a);Q();R();
        };n["stroke-widthSetter"] = function (a, k) {
          a && (M = !0);I = this["stroke-width"] = a;O(k, a);
        };n.strokeSetter = n.fillSetter = n.rSetter = function (a, k) {
          "fill" === k && a && (M = !0);O(k, a);
        };n.anchorXSetter = function (a, k) {
          h = a;O(k, Math.round(a) - S() - J);
        };n.anchorYSetter = function (a, k) {
          D = a;O(k, a - K);
        };n.xSetter = function (a) {
          n.x = a;l && (a -= l * ((f || p.width) + 2 * z));J = Math.round(a);n.attr("translateX", J);
        };n.ySetter = function (a) {
          K = n.y = Math.round(a);n.attr("translateY", K);
        };var V = n.css;return t(n, { css: function css(a) {
            if (a) {
              var k = {};a = y(a);C(n.textProps, function (e) {
                void 0 !== a[e] && (k[e] = a[e], delete a[e]);
              });F.css(k);
            }return V.call(n, a);
          }, getBBox: function getBBox() {
            return { width: p.width + 2 * z, height: p.height + 2 * z, x: p.x - z, y: p.y - z };
          }, shadow: function shadow(a) {
            a && (Q(), w && w.shadow(a));return n;
          }, destroy: function destroy() {
            k(n.element, "mouseenter");k(n.element, "mouseleave");F && (F = F.destroy());w && (w = w.destroy());B.prototype.destroy.call(n);n = v = Q = R = O = null;
          } });
      } };a.Renderer = A;
  })(L);(function (a) {
    var B = a.attr,
        A = a.createElement,
        H = a.css,
        G = a.defined,
        r = a.each,
        g = a.extend,
        f = a.isFirefox,
        u = a.isMS,
        l = a.isWebKit,
        q = a.pInt,
        d = a.SVGRenderer,
        b = a.win,
        p = a.wrap;g(a.SVGElement.prototype, { htmlCss: function htmlCss(a) {
        var b = this.element;if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");this.styles = g(this.styles, a);H(this.element, a);return this;
      }, htmlGetBBox: function htmlGetBBox() {
        var a = this.element;"text" === a.nodeName && (a.style.position = "absolute");return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight };
      }, htmlUpdateTransform: function htmlUpdateTransform() {
        if (this.added) {
          var a = this.renderer,
              b = this.element,
              m = this.translateX || 0,
              c = this.translateY || 0,
              n = this.x || 0,
              d = this.y || 0,
              p = this.textAlign || "left",
              e = { left: 0, center: .5, right: 1 }[p],
              x = this.styles;H(b, { marginLeft: m, marginTop: c });
          this.shadows && r(this.shadows, function (a) {
            H(a, { marginLeft: m + 1, marginTop: c + 1 });
          });this.inverted && r(b.childNodes, function (e) {
            a.invertChild(e, b);
          });if ("SPAN" === b.tagName) {
            var F = this.rotation,
                w = q(this.textWidth),
                h = x && x.whiteSpace,
                y = [F, p, b.innerHTML, this.textWidth, this.textAlign].join();y !== this.cTT && (x = a.fontMetrics(b.style.fontSize).b, G(F) && this.setSpanRotation(F, e, x), H(b, { width: "", whiteSpace: h || "nowrap" }), b.offsetWidth > w && /[ \-]/.test(b.textContent || b.innerText) && H(b, { width: w + "px", display: "block", whiteSpace: h || "normal" }), this.getSpanCorrection(b.offsetWidth, x, e, F, p));H(b, { left: n + (this.xCorr || 0) + "px", top: d + (this.yCorr || 0) + "px" });l && (x = b.offsetHeight);this.cTT = y;
          }
        } else this.alignOnAdd = !0;
      }, setSpanRotation: function setSpanRotation(a, d, m) {
        var c = {},
            n = u ? "-ms-transform" : l ? "-webkit-transform" : f ? "MozTransform" : b.opera ? "-o-transform" : "";c[n] = c.transform = "rotate(" + a + "deg)";c[n + (f ? "Origin" : "-origin")] = c.transformOrigin = 100 * d + "% " + m + "px";H(this.element, c);
      }, getSpanCorrection: function getSpanCorrection(a, b, m) {
        this.xCorr = -a * m;this.yCorr = -b;
      } });g(d.prototype, { html: function html(a, b, m) {
        var c = this.createElement("span"),
            n = c.element,
            d = c.renderer,
            l = d.isSVG,
            e = function e(a, _e) {
          r(["opacity", "visibility"], function (b) {
            p(a, b + "Setter", function (a, b, c, x) {
              a.call(this, b, c, x);_e[c] = b;
            });
          });
        };c.textSetter = function (a) {
          a !== n.innerHTML && delete this.bBox;n.innerHTML = this.textStr = a;c.htmlUpdateTransform();
        };l && e(c, c.element.style);c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, e) {
          "align" === e && (e = "textAlign");c[e] = a;c.htmlUpdateTransform();
        };c.attr({ text: a, x: Math.round(b),
          y: Math.round(m) }).css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute" });n.style.whiteSpace = "nowrap";c.css = c.htmlCss;l && (c.add = function (a) {
          var b,
              x = d.box.parentNode,
              h = [];if (this.parentGroup = a) {
            if (b = a.div, !b) {
              for (; a;) {
                h.push(a), a = a.parentGroup;
              }r(h.reverse(), function (a) {
                var n,
                    m = B(a.element, "class");m && (m = { className: m });b = a.div = a.div || A("div", m, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, b || x);n = b.style;g(a, { on: function on() {
                    c.on.apply({ element: h[0].div }, arguments);return a;
                  }, translateXSetter: function translateXSetter(e, k) {
                    n.left = e + "px";a[k] = e;a.doTransform = !0;
                  }, translateYSetter: function translateYSetter(e, k) {
                    n.top = e + "px";a[k] = e;a.doTransform = !0;
                  } });e(a, n);
              });
            }
          } else b = x;b.appendChild(n);c.added = !0;c.alignOnAdd && c.htmlUpdateTransform();return c;
        });return c;
      } });
  })(L);(function (a) {
    var B,
        A,
        H = a.createElement,
        G = a.css,
        r = a.defined,
        g = a.deg2rad,
        f = a.discardElement,
        u = a.doc,
        l = a.each,
        q = a.erase,
        d = a.extend;B = a.extendClass;
    var b = a.isArray,
        p = a.isNumber,
        C = a.isObject,
        t = a.merge;A = a.noop;var m = a.pick,
        c = a.pInt,
        n = a.SVGElement,
        E = a.SVGRenderer,
        z = a.win;a.svg || (A = { docMode8: u && 8 === u.documentMode, init: function init(a, b) {
        var e = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
            c = ["position: ", "absolute", ";"],
            h = "div" === b;("shape" === b || h) && c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ", h ? "hidden" : "visible");e.push(' style\x3d"', c.join(""), '"/\x3e');b && (e = h || "span" === b || "img" === b ? e.join("") : a.prepVML(e), this.element = H(e));this.renderer = a;
      }, add: function add(a) {
        var e = this.renderer,
            b = this.element,
            c = e.box,
            h = a && a.inverted,
            c = a ? a.element || a : c;a && (this.parentGroup = a);h && e.invertChild(b, c);c.appendChild(b);this.added = !0;this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();if (this.onAdd) this.onAdd();this.className && this.attr("class", this.className);return this;
      }, updateTransform: n.prototype.htmlUpdateTransform, setSpanRotation: function setSpanRotation() {
        var a = this.rotation,
            b = Math.cos(a * g),
            c = Math.sin(a * g);G(this.element, { filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none" });
      }, getSpanCorrection: function getSpanCorrection(a, b, c, n, h) {
        var e = n ? Math.cos(n * g) : 1,
            x = n ? Math.sin(n * g) : 0,
            d = m(this.elemHeight, this.element.offsetHeight),
            F;this.xCorr = 0 > e && -a;this.yCorr = 0 > x && -d;F = 0 > e * x;this.xCorr += x * b * (F ? 1 - c : c);this.yCorr -= e * b * (n ? F ? c : 1 - c : 1);h && "left" !== h && (this.xCorr -= a * c * (0 > e ? -1 : 1), n && (this.yCorr -= d * c * (0 > x ? -1 : 1)), G(this.element, { textAlign: h }));
      }, pathToVML: function pathToVML(a) {
        for (var b = a.length, e = []; b--;) {
          p(a[b]) ? e[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? e[b] = "x" : (e[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (e[b + 5] === e[b + 7] && (e[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), e[b + 6] === e[b + 8] && (e[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
        }return e.join(" ") || "x";
      }, clip: function clip(a) {
        var b = this,
            e;a ? (e = a.members, q(e, b), e.push(b), b.destroyClip = function () {
          q(e, b);
        }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = { clip: b.docMode8 ? "inherit" : "rect(auto)" });return b.css(a);
      }, css: n.prototype.htmlCss, safeRemoveChild: function safeRemoveChild(a) {
        a.parentNode && f(a);
      }, destroy: function destroy() {
        this.destroyClip && this.destroyClip();return n.prototype.destroy.apply(this);
      }, on: function on(a, b) {
        this.element["on" + a] = function () {
          var a = z.event;a.target = a.srcElement;b(a);
        };return this;
      }, cutOffPath: function cutOffPath(a, b) {
        var e;a = a.split(/[ ,]/);e = a.length;if (9 === e || 11 === e) a[e - 4] = a[e - 2] = c(a[e - 2]) - 10 * b;return a.join(" ");
      }, shadow: function shadow(a, b, n) {
        var e = [],
            h,
            d = this.element,
            x = this.renderer,
            p,
            F = d.style,
            k,
            D = d.path,
            l,
            t,
            z,
            f;D && "string" !== typeof D.value && (D = "x");t = D;if (a) {
          z = m(a.width, 3);f = (a.opacity || .15) / z;for (h = 1; 3 >= h; h++) {
            l = 2 * z + 1 - 2 * h, n && (t = this.cutOffPath(D.value, l + .5)), k = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', l, '" filled\x3d"false" path\x3d"', t, '" coordsize\x3d"10 10" style\x3d"', d.style.cssText, '" /\x3e'], p = H(x.prepVML(k), null, { left: c(F.left) + m(a.offsetX, 1), top: c(F.top) + m(a.offsetY, 1) }), n && (p.cutOff = l + 1), k = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', f * h, '"/\x3e'], H(x.prepVML(k), null, null, p), b ? b.element.appendChild(p) : d.parentNode.insertBefore(p, d), e.push(p);
          }this.shadows = e;
        }return this;
      }, updateShadows: A,
      setAttr: function setAttr(a, b) {
        this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b);
      }, classSetter: function classSetter(a) {
        (this.added ? this.element : this).className = a;
      }, dashstyleSetter: function dashstyleSetter(a, b, c) {
        (c.getElementsByTagName("stroke")[0] || H(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";this[b] = a;
      }, dSetter: function dSetter(a, b, c) {
        var e = this.shadows;a = a || [];this.d = a.join && a.join(" ");c.path = a = this.pathToVML(a);if (e) for (c = e.length; c--;) {
          e[c].path = e[c].cutOff ? this.cutOffPath(a, e[c].cutOff) : a;
        }this.setAttr(b, a);
      }, fillSetter: function fillSetter(a, b, c) {
        var e = c.nodeName;"SPAN" === e ? c.style.color = a : "IMG" !== e && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
      }, "fill-opacitySetter": function fillOpacitySetter(a, b, c) {
        H(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c);
      }, opacitySetter: A, rotationSetter: function rotationSetter(a, b, c) {
        c = c.style;this[b] = c[b] = a;c.left = -Math.round(Math.sin(a * g) + 1) + "px";c.top = Math.round(Math.cos(a * g)) + "px";
      }, strokeSetter: function strokeSetter(a, b, c) {
        this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
      }, "stroke-widthSetter": function strokeWidthSetter(a, b, c) {
        c.stroked = !!a;this[b] = a;p(a) && (a += "px");this.setAttr("strokeweight", a);
      }, titleSetter: function titleSetter(a, b) {
        this.setAttr(b, a);
      }, visibilitySetter: function visibilitySetter(a, b, c) {
        "inherit" === a && (a = "visible");this.shadows && l(this.shadows, function (c) {
          c.style[b] = a;
        });"DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");c.style[b] = a;
      }, xSetter: function xSetter(a, b, c) {
        this[b] = a;"x" === b ? b = "left" : "y" === b && (b = "top");this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a;
      }, zIndexSetter: function zIndexSetter(a, b, c) {
        c.style[b] = a;
      } }, A["stroke-opacitySetter"] = A["fill-opacitySetter"], a.VMLElement = A = B(n, A), A.prototype.ySetter = A.prototype.widthSetter = A.prototype.heightSetter = A.prototype.xSetter, A = { Element: A, isIE8: -1 < z.navigator.userAgent.indexOf("MSIE 8.0"), init: function init(a, b, c) {
        var e, h;this.alignedObjects = [];e = this.createElement("div").css({ position: "relative" });h = e.element;a.appendChild(e.element);this.isVML = !0;this.box = h;this.boxWrapper = e;this.gradients = {};this.cache = {};this.cacheKeys = [];this.imgCount = 0;this.setSize(b, c, !1);if (!u.namespaces.hcv) {
          u.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");try {
            u.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
          } catch (y) {
            u.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
          }
        }
      }, isHidden: function isHidden() {
        return !this.box.offsetWidth;
      },
      clipRect: function clipRect(a, b, c, n) {
        var e = this.createElement(),
            m = C(a);return d(e, { members: [], count: 0, left: (m ? a.x : a) + 1, top: (m ? a.y : b) + 1, width: (m ? a.width : c) - 1, height: (m ? a.height : n) - 1, getCSS: function getCSS(a) {
            var b = a.element,
                c = b.nodeName,
                k = a.inverted,
                e = this.top - ("shape" === c ? b.offsetTop : 0),
                h = this.left,
                b = h + this.width,
                n = e + this.height,
                e = { clip: "rect(" + Math.round(k ? h : e) + "px," + Math.round(k ? n : b) + "px," + Math.round(k ? b : n) + "px," + Math.round(k ? e : h) + "px)" };!k && a.docMode8 && "DIV" === c && d(e, { width: b + "px", height: n + "px" });return e;
          }, updateClipping: function updateClipping() {
            l(e.members, function (a) {
              a.element && a.css(e.getCSS(a));
            });
          } });
      }, color: function color(b, c, n, m) {
        var e = this,
            d,
            x = /^rgba/,
            p,
            t,
            k = "none";b && b.linearGradient ? t = "gradient" : b && b.radialGradient && (t = "pattern");if (t) {
          var D,
              w,
              z = b.linearGradient || b.radialGradient,
              f,
              E,
              v,
              q,
              g,
              F = "";b = b.stops;var C,
              u = [],
              r = function r() {
            p = ['\x3cfill colors\x3d"' + u.join(",") + '" opacity\x3d"', v, '" o:opacity2\x3d"', E, '" type\x3d"', t, '" ', F, 'focus\x3d"100%" method\x3d"any" /\x3e'];H(e.prepVML(p), null, null, c);
          };f = b[0];C = b[b.length - 1];0 < f[0] && b.unshift([0, f[1]]);1 > C[0] && b.push([1, C[1]]);l(b, function (k, b) {
            x.test(k[1]) ? (d = a.color(k[1]), D = d.get("rgb"), w = d.get("a")) : (D = k[1], w = 1);u.push(100 * k[0] + "% " + D);b ? (v = w, q = D) : (E = w, g = D);
          });if ("fill" === n) {
            if ("gradient" === t) n = z.x1 || z[0] || 0, b = z.y1 || z[1] || 0, f = z.x2 || z[2] || 0, z = z.y2 || z[3] || 0, F = 'angle\x3d"' + (90 - 180 * Math.atan((z - b) / (f - n)) / Math.PI) + '"', r();else {
              var k = z.r,
                  A = 2 * k,
                  B = 2 * k,
                  G = z.cx,
                  U = z.cy,
                  L = c.radialReference,
                  T,
                  k = function k() {
                L && (T = m.getBBox(), G += (L[0] - T.x) / T.width - .5, U += (L[1] - T.y) / T.height - .5, A *= L[2] / T.width, B *= L[2] / T.height);F = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + A + "," + B + '" origin\x3d"0.5,0.5" position\x3d"' + G + "," + U + '" color2\x3d"' + g + '" ';r();
              };m.added ? k() : m.onAdd = k;k = q;
            }
          } else k = D;
        } else x.test(b) && "IMG" !== c.tagName ? (d = a.color(b), m[n + "-opacitySetter"](d.get("a"), n, c), k = d.get("rgb")) : (k = c.getElementsByTagName(n), k.length && (k[0].opacity = 1, k[0].type = "solid"), k = b);return k;
      }, prepVML: function prepVML(a) {
        var b = this.isIE8;a = a.join("");b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");return a;
      }, text: E.prototype.html, path: function path(a) {
        var c = { coordsize: "10 10" };b(a) ? c.d = a : C(a) && d(c, a);return this.createElement("shape").attr(c);
      }, circle: function circle(a, b, c) {
        var e = this.symbol("circle");C(a) && (c = a.r, b = a.y, a = a.x);e.isCircle = !0;e.r = c;return e.attr({ x: a, y: b });
      }, g: function g(a) {
        var b;
        a && (b = { className: "highcharts-" + a, "class": "highcharts-" + a });return this.createElement("div").attr(b);
      }, image: function image(a, b, c, n, h) {
        var e = this.createElement("img").attr({ src: a });1 < arguments.length && e.attr({ x: b, y: c, width: n, height: h });return e;
      }, createElement: function createElement(a) {
        return "rect" === a ? this.symbol(a) : E.prototype.createElement.call(this, a);
      }, invertChild: function invertChild(a, b) {
        var e = this;b = b.style;var n = "IMG" === a.tagName && a.style;G(a, { flip: "x", left: c(b.width) - (n ? c(n.top) : 1), top: c(b.height) - (n ? c(n.left) : 1), rotation: -90 });
        l(a.childNodes, function (b) {
          e.invertChild(b, a);
        });
      }, symbols: { arc: function arc(a, b, c, n, h) {
          var e = h.start,
              m = h.end,
              d = h.r || c || n;c = h.innerR;n = Math.cos(e);var p = Math.sin(e),
              k = Math.cos(m),
              D = Math.sin(m);if (0 === m - e) return ["x"];e = ["wa", a - d, b - d, a + d, b + d, a + d * n, b + d * p, a + d * k, b + d * D];h.open && !c && e.push("e", "M", a, b);e.push("at", a - c, b - c, a + c, b + c, a + c * k, b + c * D, a + c * n, b + c * p, "x", "e");e.isArc = !0;return e;
        }, circle: function circle(a, b, c, n, h) {
          h && r(h.r) && (c = n = 2 * h.r);h && h.isCircle && (a -= c / 2, b -= n / 2);return ["wa", a, b, a + c, b + n, a + c, b + n / 2, a + c, b + n / 2, "e"];
        },
        rect: function rect(a, b, c, n, h) {
          return E.prototype.symbols[r(h) && h.r ? "callout" : "square"].call(0, a, b, c, n, h);
        } } }, a.VMLRenderer = B = function B() {
      this.init.apply(this, arguments);
    }, B.prototype = t(E.prototype, A), a.Renderer = B);E.prototype.measureSpanWidth = function (a, b) {
      var c = u.createElement("span");a = u.createTextNode(a);c.appendChild(a);G(c, b);this.box.appendChild(c);b = c.offsetWidth;f(c);return b;
    };
  })(L);(function (a) {
    function B() {
      var l = a.defaultOptions.global,
          f = u.moment;if (l.timezone) {
        if (f) return function (a) {
          return -f.tz(a, l.timezone).utcOffset();
        };a.error(25);
      }return l.useUTC && l.getTimezoneOffset;
    }function A() {
      var l = a.defaultOptions.global,
          q,
          d = l.useUTC,
          b = d ? "getUTC" : "get",
          p = d ? "setUTC" : "set";a.Date = q = l.Date || u.Date;q.hcTimezoneOffset = d && l.timezoneOffset;q.hcGetTimezoneOffset = B();q.hcMakeTime = function (a, b, m, c, n, p) {
        var l;d ? (l = q.UTC.apply(0, arguments), l += r(l)) : l = new q(a, b, f(m, 1), f(c, 0), f(n, 0), f(p, 0)).getTime();return l;
      };G("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
        q["hcGet" + a] = b + a;
      });G("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
        q["hcSet" + a] = p + a;
      });
    }var H = a.color,
        G = a.each,
        r = a.getTZOffset,
        g = a.merge,
        f = a.pick,
        u = a.win;a.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: { useUTC: !0, VMLRadialGradientURL: "http://code.highcharts.com/5.0.7/gfx/vml-radial-gradient.png" }, chart: { borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 20 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title",
        align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: { enabled: !0, align: "center", layout: "horizontal", labelFormatter: function labelFormatter() {
          return this.name;
        }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", fontSize: "12px", fontWeight: "bold" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute",
          width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: { enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y",
          month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: H("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {series.name}: <b>{point.y}</b><br/>", shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" } }, credits: { enabled: !0, href: "http://www.highcharts.com",
        position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };a.setOptions = function (l) {
      a.defaultOptions = g(!0, a.defaultOptions, l);A();return a.defaultOptions;
    };a.getOptions = function () {
      return a.defaultOptions;
    };a.defaultPlotOptions = a.defaultOptions.plotOptions;A();
  })(L);(function (a) {
    var B = a.arrayMax,
        A = a.arrayMin,
        H = a.defined,
        G = a.destroyObjectProperties,
        r = a.each,
        g = a.erase,
        f = a.merge,
        u = a.pick;a.PlotLineOrBand = function (a, f) {
      this.axis = a;f && (this.options = f, this.id = f.id);
    };a.PlotLineOrBand.prototype = { render: function render() {
        var a = this,
            q = a.axis,
            d = q.horiz,
            b = a.options,
            p = b.label,
            g = a.label,
            t = b.to,
            m = b.from,
            c = b.value,
            n = H(m) && H(t),
            E = H(c),
            z = a.svgElem,
            e = !z,
            x = [],
            F,
            w = b.color,
            h = u(b.zIndex, 0),
            y = b.events,
            x = { "class": "highcharts-plot-" + (n ? "band " : "line ") + (b.className || "") },
            J = {},
            K = q.chart.renderer,
            I = n ? "bands" : "lines",
            k = q.log2lin;q.isLog && (m = k(m), t = k(t), c = k(c));E ? (x = { stroke: w, "stroke-width": b.width }, b.dashStyle && (x.dashstyle = b.dashStyle)) : n && (w && (x.fill = w), b.borderWidth && (x.stroke = b.borderColor, x["stroke-width"] = b.borderWidth));J.zIndex = h;I += "-" + h;(w = q[I]) || (q[I] = w = K.g("plot-" + I).attr(J).add());e && (a.svgElem = z = K.path().attr(x).add(w));if (E) x = q.getPlotLinePath(c, z.strokeWidth());else if (n) x = q.getPlotBandPath(m, t, b);else return;if (e && x && x.length) {
          if (z.attr({ d: x }), y) for (F in b = function b(_b) {
            z.on(_b, function (k) {
              y[_b].apply(a, [k]);
            });
          }, y) {
            b(F);
          }
        } else z && (x ? (z.show(), z.animate({ d: x })) : (z.hide(), g && (a.label = g = g.destroy())));p && H(p.text) && x && x.length && 0 < q.width && 0 < q.height && !x.flat ? (p = f({ align: d && n && "center", x: d ? !n && 4 : 10, verticalAlign: !d && n && "middle", y: d ? n ? 16 : 10 : n ? 6 : -4, rotation: d && !n && 90 }, p), this.renderLabel(p, x, n, h)) : g && g.hide();return a;
      }, renderLabel: function renderLabel(a, f, d, b) {
        var p = this.label,
            l = this.axis.chart.renderer;p || (p = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "") }, p.zIndex = b, this.label = p = l.text(a.text, 0, 0, a.useHTML).attr(p).add(), p.css(a.style));b = [f[1], f[4], d ? f[6] : f[1]];f = [f[2], f[5], d ? f[7] : f[2]];d = A(b);l = A(f);p.align(a, !1, { x: d, y: l, width: B(b) - d, height: B(f) - l });p.show();
      }, destroy: function destroy() {
        g(this.axis.plotLinesAndBands, this);delete this.axis;G(this);
      } };a.AxisPlotLineOrBandExtension = { getPlotBandPath: function getPlotBandPath(a, f) {
        f = this.getPlotLinePath(f, null, null, !0);(a = this.getPlotLinePath(a, null, null, !0)) && f ? (a.flat = a.toString() === f.toString(), a.push(f[4], f[5], f[1], f[2], "z")) : a = null;return a;
      }, addPlotBand: function addPlotBand(a) {
        return this.addPlotBandOrLine(a, "plotBands");
      }, addPlotLine: function addPlotLine(a) {
        return this.addPlotBandOrLine(a, "plotLines");
      }, addPlotBandOrLine: function addPlotBandOrLine(f, g) {
        var d = new a.PlotLineOrBand(this, f).render(),
            b = this.userOptions;d && (g && (b[g] = b[g] || [], b[g].push(f)), this.plotLinesAndBands.push(d));return d;
      }, removePlotBandOrLine: function removePlotBandOrLine(a) {
        for (var f = this.plotLinesAndBands, d = this.options, b = this.userOptions, p = f.length; p--;) {
          f[p].id === a && f[p].destroy();
        }r([d.plotLines || [], b.plotLines || [], d.plotBands || [], b.plotBands || []], function (b) {
          for (p = b.length; p--;) {
            b[p].id === a && g(b, b[p]);
          }
        });
      } };
  })(L);(function (a) {
    var B = a.correctFloat,
        A = a.defined,
        H = a.destroyObjectProperties,
        G = a.isNumber,
        r = a.merge,
        g = a.pick,
        f = a.deg2rad;a.Tick = function (a, f, g, d) {
      this.axis = a;this.pos = f;this.type = g || "";this.isNew = !0;g || d || this.addLabel();
    };a.Tick.prototype = { addLabel: function addLabel() {
        var a = this.axis,
            f = a.options,
            q = a.chart,
            d = a.categories,
            b = a.names,
            p = this.pos,
            C = f.labels,
            t = a.tickPositions,
            m = p === t[0],
            c = p === t[t.length - 1],
            b = d ? g(d[p], b[p], p) : p,
            d = this.label,
            t = t.info,
            n;a.isDatetimeAxis && t && (n = f.dateTimeLabelFormats[t.higherRanks[p] || t.unitName]);this.isFirst = m;this.isLast = c;f = a.labelFormatter.call({ axis: a, chart: q, isFirst: m, isLast: c, dateTimeLabelFormat: n, value: a.isLog ? B(a.lin2log(b)) : b });A(d) ? d && d.attr({ text: f }) : (this.labelLength = (this.label = d = A(f) && C.enabled ? q.renderer.text(f, 0, 0, C.useHTML).css(r(C.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0);
      }, getLabelSize: function getLabelSize() {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
      }, handleOverflow: function handleOverflow(a) {
        var l = this.axis,
            q = a.x,
            d = l.chart.chartWidth,
            b = l.chart.spacing,
            p = g(l.labelLeft, Math.min(l.pos, b[3])),
            b = g(l.labelRight, Math.max(l.pos + l.len, d - b[1])),
            C = this.label,
            t = this.rotation,
            m = { left: 0, center: .5, right: 1 }[l.labelAlign],
            c = C.getBBox().width,
            n = l.getSlotWidth(),
            E = n,
            z = 1,
            e,
            x = {};if (t) 0 > t && q - m * c < p ? e = Math.round(q / Math.cos(t * f) - p) : 0 < t && q + m * c > b && (e = Math.round((d - q) / Math.cos(t * f)));else if (d = q + (1 - m) * c, q - m * c < p ? E = a.x + E * (1 - m) - p : d > b && (E = b - a.x + E * m, z = -1), E = Math.min(n, E), E < n && "center" === l.labelAlign && (a.x += z * (n - E - m * (n - Math.min(c, E)))), c > E || l.autoRotation && (C.styles || {}).width) e = E;e && (x.width = e, (l.options.labels.style || {}).textOverflow || (x.textOverflow = "ellipsis"), C.css(x));
      }, getPosition: function getPosition(a, f, g, d) {
        var b = this.axis,
            p = b.chart,
            l = d && p.oldChartHeight || p.chartHeight;return { x: a ? b.translate(f + g, null, null, d) + b.transB : b.left + b.offset + (b.opposite ? (d && p.oldChartWidth || p.chartWidth) - b.right - b.left : 0), y: a ? l - b.bottom + b.offset - (b.opposite ? b.height : 0) : l - b.translate(f + g, null, null, d) - b.transB };
      }, getLabelPosition: function getLabelPosition(a, g, q, d, b, p, C, t) {
        var m = this.axis,
            c = m.transA,
            n = m.reversed,
            E = m.staggerLines,
            z = m.tickRotCorr || { x: 0, y: 0 },
            e = b.y;A(e) || (e = 0 === m.side ? q.rotation ? -8 : -q.getBBox().height : 2 === m.side ? z.y + 8 : Math.cos(q.rotation * f) * (z.y - q.getBBox(!1, 0).height / 2));a = a + b.x + z.x - (p && d ? p * c * (n ? -1 : 1) : 0);g = g + e - (p && !d ? p * c * (n ? 1 : -1) : 0);E && (q = C / (t || 1) % E, m.opposite && (q = E - q - 1), g += m.labelOffset / E * q);return { x: a, y: Math.round(g) };
      }, getMarkPath: function getMarkPath(a, f, g, d, b, p) {
        return p.crispLine(["M", a, f, "L", a + (b ? 0 : -g), f + (b ? g : 0)], d);
      }, render: function render(a, f, q) {
        var d = this.axis,
            b = d.options,
            p = d.chart.renderer,
            l = d.horiz,
            t = this.type,
            m = this.label,
            c = this.pos,
            n = b.labels,
            E = this.gridLine,
            z = t ? t + "Tick" : "tick",
            e = d.tickSize(z),
            x = this.mark,
            F = !x,
            w = n.step,
            h = {},
            y = !0,
            J = d.tickmarkOffset,
            K = this.getPosition(l, c, J, f),
            I = K.x,
            K = K.y,
            k = l && I === d.pos + d.len || !l && K === d.pos ? -1 : 1,
            D = t ? t + "Grid" : "grid",
            P = b[D + "LineWidth"],
            N = b[D + "LineColor"],
            r = b[D + "LineDashStyle"],
            D = g(b[z + "Width"], !t && d.isXAxis ? 1 : 0),
            z = b[z + "Color"];q = g(q, 1);this.isActive = !0;E || (h.stroke = N, h["stroke-width"] = P, r && (h.dashstyle = r), t || (h.zIndex = 1), f && (h.opacity = 0), this.gridLine = E = p.path().attr(h).addClass("highcharts-" + (t ? t + "-" : "") + "grid-line").add(d.gridGroup));if (!f && E && (c = d.getPlotLinePath(c + J, E.strokeWidth() * k, f, !0))) E[this.isNew ? "attr" : "animate"]({ d: c, opacity: q });e && (d.opposite && (e[0] = -e[0]), F && (this.mark = x = p.path().addClass("highcharts-" + (t ? t + "-" : "") + "tick").add(d.axisGroup), x.attr({ stroke: z, "stroke-width": D })), x[F ? "attr" : "animate"]({ d: this.getMarkPath(I, K, e[0], x.strokeWidth() * k, l, p), opacity: q }));m && G(I) && (m.xy = K = this.getLabelPosition(I, K, m, l, n, J, a, w), this.isFirst && !this.isLast && !g(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(b.showLastLabel, 1) ? y = !1 : !l || d.isRadial || n.step || n.rotation || f || 0 === q || this.handleOverflow(K), w && a % w && (y = !1), y && G(K.y) ? (K.opacity = q, m[this.isNew ? "attr" : "animate"](K)) : m.attr("y", -9999), this.isNew = !1);
      }, destroy: function destroy() {
        H(this, this.axis);
      } };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.animObject,
        H = a.arrayMax,
        G = a.arrayMin,
        r = a.AxisPlotLineOrBandExtension,
        g = a.color,
        f = a.correctFloat,
        u = a.defaultOptions,
        l = a.defined,
        q = a.deg2rad,
        d = a.destroyObjectProperties,
        b = a.each,
        p = a.extend,
        C = a.fireEvent,
        t = a.format,
        m = a.getMagnitude,
        c = a.grep,
        n = a.inArray,
        E = a.isArray,
        z = a.isNumber,
        e = a.isString,
        x = a.merge,
        F = a.normalizeTickInterval,
        w = a.pick,
        h = a.PlotLineOrBand,
        y = a.removeEvent,
        J = a.splat,
        K = a.syncTimeout,
        I = a.Tick;a.Axis = function () {
      this.init.apply(this, arguments);
    };a.Axis.prototype = { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" },
          x: 0 }, minPadding: .01, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", startOfWeek: 1, startOnTick: !1, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb" }, defaultYAxisOptions: { endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, maxPadding: .05,
        minPadding: .05, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { enabled: !1, formatter: function formatter() {
            return a.numberFormat(this.total, -1);
          }, style: { fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45],
          x: 0 }, title: { rotation: 0 } }, init: function init(a, b) {
        var k = b.isX;this.chart = a;this.horiz = a.inverted ? !k : k;this.isXAxis = k;this.coll = this.coll || (k ? "xAxis" : "yAxis");this.opposite = b.opposite;this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);this.setOptions(b);var c = this.options,
            e = c.type;this.labelFormatter = c.labels.formatter || this.defaultLabelFormatter;this.userOptions = b;this.minPixelPadding = 0;this.reversed = c.reversed;this.visible = !1 !== c.visible;this.zoomEnabled = !1 !== c.zoomEnabled;this.hasNames = "category" === e || !0 === c.categories;this.categories = c.categories || this.hasNames;this.names = this.names || [];this.isLog = "logarithmic" === e;this.isDatetimeAxis = "datetime" === e;this.isLinked = l(c.linkedTo);this.ticks = {};this.labelEdge = [];this.minorTicks = {};this.plotLinesAndBands = [];this.alternateBands = {};this.len = 0;this.minRange = this.userMinRange = c.minRange || c.maxZoom;this.range = c.range;this.offset = c.offset || 0;this.stacks = {};this.oldStacks = {};this.stacksTouched = 0;this.min = this.max = null;this.crosshair = w(c.crosshair, J(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);var h;b = this.options.events;-1 === n(this, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));this.series = this.series || [];a.inverted && k && void 0 === this.reversed && (this.reversed = !0);this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;for (h in b) {
          B(this, h, b[h]);
        }this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log);
      }, setOptions: function setOptions(a) {
        this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(u[this.coll], a));
      }, defaultLabelFormatter: function defaultLabelFormatter() {
        var b = this.axis,
            c = this.value,
            e = b.categories,
            h = this.dateTimeLabelFormat,
            n = u.lang,
            d = n.numericSymbols,
            n = n.numericSymbolMagnitude || 1E3,
            v = d && d.length,
            m,
            f = b.options.labels.format,
            b = b.isLog ? c : b.tickInterval;if (f) m = t(f, this);else if (e) m = c;else if (h) m = a.dateFormat(h, c);else if (v && 1E3 <= b) for (; v-- && void 0 === m;) {
          e = Math.pow(n, v + 1), b >= e && 0 === 10 * c % e && null !== d[v] && 0 !== c && (m = a.numberFormat(c / e, -1) + d[v]);
        }void 0 === m && (m = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));return m;
      }, getSeriesExtremes: function getSeriesExtremes() {
        var a = this,
            e = a.chart;a.hasVisibleSeries = !1;a.dataMin = a.dataMax = a.threshold = null;a.softThreshold = !a.isXAxis;a.buildStacks && a.buildStacks();b(a.series, function (b) {
          if (b.visible || !e.options.chart.ignoreHiddenSeries) {
            var k = b.options,
                h = k.threshold,
                D;a.hasVisibleSeries = !0;a.isLog && 0 >= h && (h = null);if (a.isXAxis) k = b.xData, k.length && (b = G(k), z(b) || b instanceof Date || (k = c(k, function (a) {
              return z(a);
            }), b = G(k)), a.dataMin = Math.min(w(a.dataMin, k[0]), b), a.dataMax = Math.max(w(a.dataMax, k[0]), H(k)));else if (b.getExtremes(), D = b.dataMax, b = b.dataMin, l(b) && l(D) && (a.dataMin = Math.min(w(a.dataMin, b), b), a.dataMax = Math.max(w(a.dataMax, D), D)), l(h) && (a.threshold = h), !k.softThreshold || a.isLog) a.softThreshold = !1;
          }
        });
      }, translate: function translate(a, b, c, e, h, n) {
        var k = this.linkedParent || this,
            D = 1,
            m = 0,
            d = e ? k.oldTransA : k.transA;e = e ? k.oldMin : k.min;var f = k.minPixelPadding;
        h = (k.isOrdinal || k.isBroken || k.isLog && h) && k.lin2val;d || (d = k.transA);c && (D *= -1, m = k.len);k.reversed && (D *= -1, m -= D * (k.sector || k.len));b ? (a = (a * D + m - f) / d + e, h && (a = k.lin2val(a))) : (h && (a = k.val2lin(a)), a = D * (a - e) * d + m + D * f + (z(n) ? d * n : 0));return a;
      }, toPixels: function toPixels(a, b) {
        return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
      }, toValue: function toValue(a, b) {
        return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
      }, getPlotLinePath: function getPlotLinePath(a, b, c, e, h) {
        var k = this.chart,
            D = this.left,
            n = this.top,
            m,
            d,
            f = c && k.oldChartHeight || k.chartHeight,
            p = c && k.oldChartWidth || k.chartWidth,
            y;m = this.transB;var t = function t(a, b, k) {
          if (a < b || a > k) e ? a = Math.min(Math.max(b, a), k) : y = !0;return a;
        };h = w(h, this.translate(a, null, null, c));a = c = Math.round(h + m);m = d = Math.round(f - h - m);z(h) ? this.horiz ? (m = n, d = f - this.bottom, a = c = t(a, D, D + this.width)) : (a = D, c = p - this.right, m = d = t(m, n, n + this.height)) : y = !0;return y && !e ? null : k.renderer.crispLine(["M", a, m, "L", c, d], b || 1);
      }, getLinearTickPositions: function getLinearTickPositions(a, b, c) {
        var k,
            e = f(Math.floor(b / a) * a),
            h = f(Math.ceil(c / a) * a),
            D = [];if (b === c && z(b)) return [b];for (b = e; b <= h;) {
          D.push(b);b = f(b + a);if (b === k) break;k = b;
        }return D;
      }, getMinorTickPositions: function getMinorTickPositions() {
        var a = this.options,
            b = this.tickPositions,
            c = this.minorTickInterval,
            e = [],
            h,
            n = this.pointRangePadding || 0;h = this.min - n;var n = this.max + n,
            m = n - h;if (m && m / c < this.len / 3) if (this.isLog) for (n = b.length, h = 1; h < n; h++) {
          e = e.concat(this.getLogTickPositions(c, b[h - 1], b[h], !0));
        } else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), h, n, a.startOfWeek));else for (b = h + (b[0] - h) % c; b <= n && b !== e[0]; b += c) {
          e.push(b);
        }0 !== e.length && this.trimTicks(e, a.startOnTick, a.endOnTick);return e;
      }, adjustForMinRange: function adjustForMinRange() {
        var a = this.options,
            c = this.min,
            e = this.max,
            h,
            n = this.dataMax - this.dataMin >= this.minRange,
            m,
            v,
            d,
            f,
            p,
            y;this.isXAxis && void 0 === this.minRange && !this.isLog && (l(a.min) || l(a.max) ? this.minRange = null : (b(this.series, function (a) {
          f = a.xData;for (v = p = a.xIncrement ? 1 : f.length - 1; 0 < v; v--) {
            if (d = f[v] - f[v - 1], void 0 === m || d < m) m = d;
          }
        }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
        e - c < this.minRange && (y = this.minRange, h = (y - e + c) / 2, h = [c - h, w(a.min, c - h)], n && (h[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), c = H(h), e = [c + y, w(a.max, c + y)], n && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), e = G(e), e - c < y && (h[0] = e - y, h[1] = w(a.min, e - y), c = H(h)));this.min = c;this.max = e;
      }, getClosest: function getClosest() {
        var a;this.categories ? a = 1 : b(this.series, function (b) {
          var k = b.closestPointRange,
              c = b.visible || !b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip && l(k) && c && (a = l(a) ? Math.min(a, k) : k);
        });
        return a;
      }, nameToX: function nameToX(a) {
        var b = E(this.categories),
            k = b ? this.categories : this.names,
            c = a.options.x,
            e;a.series.requireSorting = !1;l(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : n(a.name, k));-1 === c ? b || (e = k.length) : e = c;this.names[e] = a.name;return e;
      }, updateNames: function updateNames() {
        var a = this;0 < this.names.length && (this.names.length = 0, this.minRange = void 0, b(this.series || [], function (k) {
          k.xIncrement = null;if (!k.points || k.isDirtyData) k.processData(), k.generatePoints();b(k.points, function (b, c) {
            var e;
            b.options && (e = a.nameToX(b), e !== b.x && (b.x = e, k.xData[c] = e));
          });
        }));
      }, setAxisTranslation: function setAxisTranslation(a) {
        var k = this,
            c = k.max - k.min,
            h = k.axisPointRange || 0,
            n,
            m = 0,
            d = 0,
            f = k.linkedParent,
            y = !!k.categories,
            p = k.transA,
            t = k.isXAxis;if (t || y || h) n = k.getClosest(), f ? (m = f.minPointOffset, d = f.pointRangePadding) : b(k.series, function (a) {
          var b = y ? 1 : t ? w(a.options.pointRange, n, 0) : k.axisPointRange || 0;a = a.options.pointPlacement;h = Math.max(h, b);k.single || (m = Math.max(m, e(a) ? 0 : b / 2), d = Math.max(d, "on" === a ? 0 : b));
        }), f = k.ordinalSlope && n ? k.ordinalSlope / n : 1, k.minPointOffset = m *= f, k.pointRangePadding = d *= f, k.pointRange = Math.min(h, c), t && (k.closestPointRange = n);a && (k.oldTransA = p);k.translationSlope = k.transA = p = k.len / (c + d || 1);k.transB = k.horiz ? k.left : k.bottom;k.minPixelPadding = p * m;
      }, minFromRange: function minFromRange() {
        return this.max - this.range;
      }, setTickInterval: function setTickInterval(k) {
        var c = this,
            e = c.chart,
            h = c.options,
            n = c.isLog,
            d = c.log2lin,
            v = c.isDatetimeAxis,
            y = c.isXAxis,
            p = c.isLinked,
            t = h.maxPadding,
            x = h.minPadding,
            g = h.tickInterval,
            E = h.tickPixelInterval,
            q = c.categories,
            J = c.threshold,
            K = c.softThreshold,
            I,
            r,
            u,
            A;v || q || p || this.getTickAmount();u = w(c.userMin, h.min);A = w(c.userMax, h.max);p ? (c.linkedParent = e[c.coll][h.linkedTo], e = c.linkedParent.getExtremes(), c.min = w(e.min, e.dataMin), c.max = w(e.max, e.dataMax), h.type !== c.linkedParent.options.type && a.error(11, 1)) : (!K && l(J) && (c.dataMin >= J ? (I = J, x = 0) : c.dataMax <= J && (r = J, t = 0)), c.min = w(u, I, c.dataMin), c.max = w(A, r, c.dataMax));n && (!k && 0 >= Math.min(c.min, w(c.dataMin, c.min)) && a.error(10, 1), c.min = f(d(c.min), 15), c.max = f(d(c.max), 15));c.range && l(c.max) && (c.userMin = c.min = u = Math.max(c.min, c.minFromRange()), c.userMax = A = c.max, c.range = null);C(c, "foundExtremes");c.beforePadding && c.beforePadding();c.adjustForMinRange();!(q || c.axisPointRange || c.usePercentage || p) && l(c.min) && l(c.max) && (d = c.max - c.min) && (!l(u) && x && (c.min -= d * x), !l(A) && t && (c.max += d * t));z(h.floor) ? c.min = Math.max(c.min, h.floor) : z(h.softMin) && (c.min = Math.min(c.min, h.softMin));z(h.ceiling) ? c.max = Math.min(c.max, h.ceiling) : z(h.softMax) && (c.max = Math.max(c.max, h.softMax));K && l(c.dataMin) && (J = J || 0, !l(u) && c.min < J && c.dataMin >= J ? c.min = J : !l(A) && c.max > J && c.dataMax <= J && (c.max = J));c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : p && !g && E === c.linkedParent.options.tickPixelInterval ? g = c.linkedParent.tickInterval : w(g, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, q ? 1 : (c.max - c.min) * E / Math.max(c.len, E));y && !k && b(c.series, function (a) {
          a.processData(c.min !== c.oldMin || c.max !== c.oldMax);
        });c.setAxisTranslation(!0);c.beforeSetTickPositions && c.beforeSetTickPositions();c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));c.pointRange && !g && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));k = w(h.minTickInterval, c.isDatetimeAxis && c.closestPointRange);!g && c.tickInterval < k && (c.tickInterval = k);v || n || g || (c.tickInterval = F(c.tickInterval, null, m(c.tickInterval), w(h.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));this.tickAmount || (c.tickInterval = c.unsquish());this.setTickPositions();
      }, setTickPositions: function setTickPositions() {
        var a = this.options,
            b,
            c = a.tickPositions,
            e = a.tickPositioner,
            h = a.startOnTick,
            n = a.endOnTick,
            m;this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;this.tickPositions = b = c && c.slice();!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);this.trimTicks(b, h, n);this.isLinked || (this.min === this.max && l(this.min) && !this.tickAmount && (m = !0, this.min -= .5, this.max += .5), this.single = m, c || e || this.adjustTickAmount());
      }, trimTicks: function trimTicks(a, b, c) {
        var k = a[0],
            e = a[a.length - 1],
            h = this.minPointOffset || 0;if (!this.isLinked) {
          if (b) this.min = k;else for (; this.min - h > a[0];) {
            a.shift();
          }if (c) this.max = e;else for (; this.max + h < a[a.length - 1];) {
            a.pop();
          }0 === a.length && l(k) && a.push((e + k) / 2);
        }
      }, alignToOthers: function alignToOthers() {
        var a = {},
            c,
            e = this.options;!1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || this.isLog || b(this.chart[this.coll], function (b) {
          var k = b.options,
              k = [b.horiz ? k.left : k.top, k.width, k.height, k.pane].join();b.series.length && (a[k] ? c = !0 : a[k] = 1);
        });return c;
      }, getTickAmount: function getTickAmount() {
        var a = this.options,
            b = a.tickAmount,
            c = a.tickPixelInterval;!l(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);4 > b && (this.finalTickAmt = b, b = 5);this.tickAmount = b;
      }, adjustTickAmount: function adjustTickAmount() {
        var a = this.tickInterval,
            b = this.tickPositions,
            c = this.tickAmount,
            e = this.finalTickAmt,
            h = b && b.length;if (h < c) {
          for (; b.length < c;) {
            b.push(f(b[b.length - 1] + a));
          }this.transA *= (h - 1) / (c - 1);this.max = b[b.length - 1];
        } else h > c && (this.tickInterval *= 2, this.setTickPositions());
        if (l(e)) {
          for (a = c = b.length; a--;) {
            (3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
          }this.finalTickAmt = void 0;
        }
      }, setScale: function setScale() {
        var a, c;this.oldMin = this.min;this.oldMax = this.max;this.oldAxisLength = this.len;this.setAxisSize();c = this.len !== this.oldAxisLength;b(this.series, function (b) {
          if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0;
        });c || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
      }, setExtremes: function setExtremes(a, c, e, h, n) {
        var k = this,
            m = k.chart;e = w(e, !0);b(k.series, function (a) {
          delete a.kdTree;
        });n = p(n, { min: a, max: c });C(k, "setExtremes", n, function () {
          k.userMin = a;k.userMax = c;k.eventArgs = n;e && m.redraw(h);
        });
      }, zoom: function zoom(a, b) {
        var c = this.dataMin,
            k = this.dataMax,
            e = this.options,
            h = Math.min(c, w(e.min, c)),
            e = Math.max(k, w(e.max, k));if (a !== this.min || b !== this.max) this.allowZoomOutside || (l(c) && (a < h && (a = h), a > e && (a = e)), l(k) && (b < h && (b = h), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" });return !0;
      }, setAxisSize: function setAxisSize() {
        var a = this.chart,
            b = this.options,
            c = b.offsets || [0, 0, 0, 0],
            e = this.horiz,
            h = w(b.width, a.plotWidth - c[3] + c[1]),
            n = w(b.height, a.plotHeight - c[0] + c[2]),
            m = w(b.top, a.plotTop + c[0]),
            b = w(b.left, a.plotLeft + c[3]),
            c = /%$/;c.test(n) && (n = Math.round(parseFloat(n) / 100 * a.plotHeight));c.test(m) && (m = Math.round(parseFloat(m) / 100 * a.plotHeight + a.plotTop));this.left = b;this.top = m;this.width = h;this.height = n;this.bottom = a.chartHeight - n - m;this.right = a.chartWidth - h - b;this.len = Math.max(e ? h : n, 0);this.pos = e ? b : m;
      }, getExtremes: function getExtremes() {
        var a = this.isLog,
            b = this.lin2log;return { min: a ? f(b(this.min)) : this.min, max: a ? f(b(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
      }, getThreshold: function getThreshold(a) {
        var b = this.isLog,
            c = this.lin2log,
            k = b ? c(this.min) : this.min,
            b = b ? c(this.max) : this.max;null === a ? a = k : k > a ? a = k : b < a && (a = b);return this.translate(a, 0, 1, 0, 1);
      }, autoLabelAlign: function autoLabelAlign(a) {
        a = (w(a, 0) - 90 * this.side + 720) % 360;return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center";
      }, tickSize: function tickSize(a) {
        var b = this.options,
            c = b[a + "Length"],
            k = w(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);if (k && c) return "inside" === b[a + "Position"] && (c = -c), [c, k];
      }, labelMetrics: function labelMetrics() {
        return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label);
      }, unsquish: function unsquish() {
        var a = this.options.labels,
            c = this.horiz,
            e = this.tickInterval,
            h = e,
            n = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
            m,
            d = a.rotation,
            f = this.labelMetrics(),
            p,
            y = Number.MAX_VALUE,
            t,
            x = function x(a) {
          a /= n || 1;a = 1 < a ? Math.ceil(a) : 1;return a * e;
        };c ? (t = !a.staggerLines && !a.step && (l(d) ? [d] : n < w(a.autoRotationLimit, 80) && a.autoRotation)) && b(t, function (a) {
          var b;if (a === d || a && -90 <= a && 90 >= a) p = x(Math.abs(f.h / Math.sin(q * a))), b = p + Math.abs(a / 360), b < y && (y = b, m = a, h = p);
        }) : a.step || (h = x(f.h));this.autoRotation = t;this.labelRotation = w(m, d);return h;
      }, getSlotWidth: function getSlotWidth() {
        var a = this.chart,
            b = this.horiz,
            c = this.options.labels,
            e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
            h = a.margin[3];return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (h && h - a.spacing[3] || .33 * a.chartWidth);
      }, renderUnsquish: function renderUnsquish() {
        var a = this.chart,
            c = a.renderer,
            h = this.tickPositions,
            n = this.ticks,
            m = this.options.labels,
            d = this.horiz,
            v = this.getSlotWidth(),
            f = Math.max(1, Math.round(v - 2 * (m.padding || 5))),
            p = {},
            y = this.labelMetrics(),
            t = m.style && m.style.textOverflow,
            g,
            z = 0,
            E,
            w;e(m.rotation) || (p.rotation = m.rotation || 0);b(h, function (a) {
          (a = n[a]) && a.labelLength > z && (z = a.labelLength);
        });this.maxLabelLength = z;if (this.autoRotation) z > f && z > y.h ? p.rotation = this.labelRotation : this.labelRotation = 0;else if (v && (g = { width: f + "px" }, !t)) for (g.textOverflow = "clip", E = h.length; !d && E--;) {
          if (w = h[E], f = n[w].label) f.styles && "ellipsis" === f.styles.textOverflow ? f.css({ textOverflow: "clip" }) : n[w].labelLength > v && f.css({ width: v + "px" }), f.getBBox().height > this.len / h.length - (y.h - y.f) && (f.specCss = { textOverflow: "ellipsis" });
        }p.rotation && (g = { width: (z > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px" }, t || (g.textOverflow = "ellipsis"));if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) p.align = this.labelAlign;b(h, function (a) {
          var b = (a = n[a]) && a.label;b && (b.attr(p), g && b.css(x(g, b.specCss)), delete b.specCss, a.rotation = p.rotation);
        });this.tickRotCorr = c.rotCorr(y.b, this.labelRotation || 0, 0 !== this.side);
      }, hasData: function hasData() {
        return this.hasVisibleSeries || l(this.min) && l(this.max) && !!this.tickPositions;
      }, addTitle: function addTitle(a) {
        var b = this.chart.renderer,
            c = this.horiz,
            k = this.opposite,
            e = this.options.title,
            h;this.axisTitle || ((h = e.textAlign) || (h = (c ? { low: "left", middle: "center", high: "right" } : { low: k ? "right" : "left", middle: "center", high: k ? "left" : "right" })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({ zIndex: 7, rotation: e.rotation || 0, align: h }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup), this.axisTitle.isNew = !0);this.axisTitle[a ? "show" : "hide"](!0);
      }, generateTick: function generateTick(a) {
        var b = this.ticks;b[a] ? b[a].addLabel() : b[a] = new I(this, a);
      }, getOffset: function getOffset() {
        var a = this,
            c = a.chart,
            e = c.renderer,
            h = a.options,
            n = a.tickPositions,
            m = a.ticks,
            d = a.horiz,
            f = a.side,
            p = c.inverted ? [1, 0, 3, 2][f] : f,
            y,
            t,
            x = 0,
            g,
            z = 0,
            E = h.title,
            q = h.labels,
            F = 0,
            J = c.axisOffset,
            c = c.clipOffset,
            K = [-1, 1, 1, -1][f],
            C,
            I = h.className,
            r = a.axisParent,
            u = this.tickSize("tick");y = a.hasData();a.showAxis = t = y || w(h.showEmpty, !0);a.staggerLines = a.horiz && q.staggerLines;
        a.axisGroup || (a.gridGroup = e.g("grid").attr({ zIndex: h.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(r), a.axisGroup = e.g("axis").attr({ zIndex: h.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(r), a.labelGroup = e.g("axis-labels").attr({ zIndex: q.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (I || "")).add(r));if (y || a.isLinked) b(n, function (b, c) {
          a.generateTick(b, c);
        }), a.renderUnsquish(), !1 === q.reserveSpace || 0 !== f && 2 !== f && { 1: "left", 3: "right" }[f] !== a.labelAlign && "center" !== a.labelAlign || b(n, function (a) {
          F = Math.max(m[a].getLabelSize(), F);
        }), a.staggerLines && (F *= a.staggerLines, a.labelOffset = F * (a.opposite ? -1 : 1));else for (C in m) {
          m[C].destroy(), delete m[C];
        }E && E.text && !1 !== E.enabled && (a.addTitle(t), t && (x = a.axisTitle.getBBox()[d ? "height" : "width"], g = E.offset, z = l(g) ? 0 : w(E.margin, d ? 5 : 10)));a.renderLine();a.offset = K * w(h.offset, J[f]);a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };e = 0 === f ? -a.labelMetrics().h : 2 === f ? a.tickRotCorr.y : 0;z = Math.abs(F) + z;F && (z = z - e + K * (d ? w(q.y, a.tickRotCorr.y + 8 * K) : q.x));a.axisTitleMargin = w(g, z);J[f] = Math.max(J[f], a.axisTitleMargin + x + K * a.offset, z, y && n.length && u ? u[0] : 0);h = h.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);c[p] = Math.max(c[p], h);
      }, getLinePath: function getLinePath(a) {
        var b = this.chart,
            c = this.opposite,
            k = this.offset,
            e = this.horiz,
            h = this.left + (c ? this.width : 0) + k,
            k = b.chartHeight - this.bottom - (c ? this.height : 0) + k;c && (a *= -1);return b.renderer.crispLine(["M", e ? this.left : h, e ? k : this.top, "L", e ? b.chartWidth - this.right : h, e ? k : b.chartHeight - this.bottom], a);
      }, renderLine: function renderLine() {
        this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
      }, getTitlePosition: function getTitlePosition() {
        var a = this.horiz,
            b = this.left,
            c = this.top,
            e = this.len,
            h = this.options.title,
            n = a ? b : c,
            m = this.opposite,
            d = this.offset,
            f = h.x || 0,
            p = h.y || 0,
            y = this.chart.renderer.fontMetrics(h.style && h.style.fontSize, this.axisTitle).f,
            e = { low: n + (a ? 0 : e),
          middle: n + e / 2, high: n + (a ? e : 0) }[h.align],
            b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? y : 0);return { x: a ? e + f : b + (m ? this.width : 0) + d + f, y: a ? b + p - (m ? this.height : 0) + d : e + p };
      }, renderMinorTick: function renderMinorTick(a) {
        var b = this.chart.hasRendered && z(this.oldMin),
            c = this.minorTicks;c[a] || (c[a] = new I(this, a, "minor"));b && c[a].isNew && c[a].render(null, !0);c[a].render(null, !1, 1);
      }, renderTick: function renderTick(a, b) {
        var c = this.isLinked,
            e = this.ticks,
            k = this.chart.hasRendered && z(this.oldMin);if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new I(this, a)), k && e[a].isNew && e[a].render(b, !0, .1), e[a].render(b);
      }, render: function render() {
        var a = this,
            c = a.chart,
            e = a.options,
            n = a.isLog,
            m = a.lin2log,
            d = a.isLinked,
            v = a.tickPositions,
            f = a.axisTitle,
            p = a.ticks,
            y = a.minorTicks,
            t = a.alternateBands,
            x = e.stackLabels,
            z = e.alternateGridColor,
            g = a.tickmarkOffset,
            E = a.axisLine,
            w = a.showAxis,
            l = A(c.renderer.globalAnimation),
            q,
            F;a.labelEdge.length = 0;a.overlap = !1;b([p, y, t], function (a) {
          for (var b in a) {
            a[b].isActive = !1;
          }
        });if (a.hasData() || d) a.minorTickInterval && !a.categories && b(a.getMinorTickPositions(), function (b) {
          a.renderMinorTick(b);
        }), v.length && (b(v, function (b, c) {
          a.renderTick(b, c);
        }), g && (0 === a.min || a.single) && (p[-1] || (p[-1] = new I(a, -1, null, !0)), p[-1].render(-1))), z && b(v, function (b, e) {
          F = void 0 !== v[e + 1] ? v[e + 1] + g : a.max - g;0 === e % 2 && b < a.max && F <= a.max + (c.polar ? -g : g) && (t[b] || (t[b] = new h(a)), q = b + g, t[b].options = { from: n ? m(q) : q, to: n ? m(F) : F, color: z }, t[b].render(), t[b].isActive = !0);
        }), a._addedPlotLB || (b((e.plotLines || []).concat(e.plotBands || []), function (b) {
          a.addPlotBandOrLine(b);
        }), a._addedPlotLB = !0);b([p, y, t], function (a) {
          var b,
              e,
              h = [],
              k = l.duration;for (b in a) {
            a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, h.push(b));
          }K(function () {
            for (e = h.length; e--;) {
              a[h[e]] && !a[h[e]].isActive && (a[h[e]].destroy(), delete a[h[e]]);
            }
          }, a !== t && c.hasRendered && k ? k : 0);
        });E && (E[E.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(E.strokeWidth()) }), E.isPlaced = !0, E[w ? "show" : "hide"](!0));f && w && (f[f.isNew ? "attr" : "animate"](a.getTitlePosition()), f.isNew = !1);x && x.enabled && a.renderStackTotals();a.isDirty = !1;
      }, redraw: function redraw() {
        this.visible && (this.render(), b(this.plotLinesAndBands, function (a) {
          a.render();
        }));b(this.series, function (a) {
          a.isDirty = !0;
        });
      }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function destroy(a) {
        var c = this,
            e = c.stacks,
            h,
            k = c.plotLinesAndBands,
            m;a || y(c);for (h in e) {
          d(e[h]), e[h] = null;
        }b([c.ticks, c.minorTicks, c.alternateBands], function (a) {
          d(a);
        });if (k) for (a = k.length; a--;) {
          k[a].destroy();
        }b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
          c[a] && (c[a] = c[a].destroy());
        });
        for (m in c) {
          c.hasOwnProperty(m) && -1 === n(m, c.keepProps) && delete c[m];
        }
      }, drawCrosshair: function drawCrosshair(a, b) {
        var c,
            e = this.crosshair,
            h = w(e.snap, !0),
            k,
            n = this.cross;a || (a = this.cross && this.cross.e);this.crosshair && !1 !== (l(b) || !h) ? (h ? l(b) && (k = this.isXAxis ? b.plotX : this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), l(k) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : w(b.stackY, b.y)), null, null, null, k) || null), l(c) ? (b = this.categories && !this.isRadial, n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({ zIndex: w(e.zIndex, 2) }).add(), n.attr({ stroke: e.color || (b ? g("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": w(e.width, 1) }), e.dashStyle && n.attr({ dashstyle: e.dashStyle })), n.show().attr({ d: c }), b && !e.width && n.attr({ "stroke-width": this.transA }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair();
      }, hideCrosshair: function hideCrosshair() {
        this.cross && this.cross.hide();
      } };p(a.Axis.prototype, r);
  })(L);(function (a) {
    var B = a.Axis,
        A = a.Date,
        H = a.dateFormat,
        G = a.defaultOptions,
        r = a.defined,
        g = a.each,
        f = a.extend,
        u = a.getMagnitude,
        l = a.getTZOffset,
        q = a.normalizeTickInterval,
        d = a.pick,
        b = a.timeUnits;B.prototype.getTimeTicks = function (a, q, t, m) {
      var c = [],
          n = {},
          p = G.global.useUTC,
          z,
          e = new A(q - l(q)),
          x = A.hcMakeTime,
          F = a.unitRange,
          w = a.count,
          h;if (r(q)) {
        e[A.hcSetMilliseconds](F >= b.second ? 0 : w * Math.floor(e.getMilliseconds() / w));if (F >= b.second) e[A.hcSetSeconds](F >= b.minute ? 0 : w * Math.floor(e.getSeconds() / w));if (F >= b.minute) e[A.hcSetMinutes](F >= b.hour ? 0 : w * Math.floor(e[A.hcGetMinutes]() / w));if (F >= b.hour) e[A.hcSetHours](F >= b.day ? 0 : w * Math.floor(e[A.hcGetHours]() / w));if (F >= b.day) e[A.hcSetDate](F >= b.month ? 1 : w * Math.floor(e[A.hcGetDate]() / w));F >= b.month && (e[A.hcSetMonth](F >= b.year ? 0 : w * Math.floor(e[A.hcGetMonth]() / w)), z = e[A.hcGetFullYear]());if (F >= b.year) e[A.hcSetFullYear](z - z % w);if (F === b.week) e[A.hcSetDate](e[A.hcGetDate]() - e[A.hcGetDay]() + d(m, 1));z = e[A.hcGetFullYear]();m = e[A.hcGetMonth]();var y = e[A.hcGetDate](),
            J = e[A.hcGetHours]();if (A.hcTimezoneOffset || A.hcGetTimezoneOffset) h = (!p || !!A.hcGetTimezoneOffset) && (t - q > 4 * b.month || l(q) !== l(t)), e = e.getTime(), e = new A(e + l(e));p = e.getTime();for (q = 1; p < t;) {
          c.push(p), p = F === b.year ? x(z + q * w, 0) : F === b.month ? x(z, m + q * w) : !h || F !== b.day && F !== b.week ? h && F === b.hour ? x(z, m, y, J + q * w) : p + F * w : x(z, m, y + q * w * (F === b.day ? 1 : 7)), q++;
        }c.push(p);F <= b.hour && 1E4 > c.length && g(c, function (a) {
          0 === a % 18E5 && "000000000" === H("%H%M%S%L", a) && (n[a] = "day");
        });
      }c.info = f(a, { higherRanks: n, totalRange: F * w });return c;
    };B.prototype.normalizeTimeTickInterval = function (a, d) {
      var f = d || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];d = f[f.length - 1];var m = b[d[0]],
          c = d[1],
          n;for (n = 0; n < f.length && !(d = f[n], m = b[d[0]], c = d[1], f[n + 1] && a <= (m * c[c.length - 1] + b[f[n + 1][0]]) / 2); n++) {}m === b.year && a < 5 * m && (c = [1, 2, 5]);a = q(a / m, c, "year" === d[0] ? Math.max(u(a / m), 1) : 1);return { unitRange: m, count: a, unitName: d[0] };
    };
  })(L);(function (a) {
    var B = a.Axis,
        A = a.getMagnitude,
        H = a.map,
        G = a.normalizeTickInterval,
        r = a.pick;B.prototype.getLogTickPositions = function (a, f, u, l) {
      var g = this.options,
          d = this.len,
          b = this.lin2log,
          p = this.log2lin,
          C = [];l || (this._minorAutoInterval = null);if (.5 <= a) a = Math.round(a), C = this.getLinearTickPositions(a, f, u);else if (.08 <= a) for (var d = Math.floor(f), t, m, c, n, E, g = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; d < u + 1 && !E; d++) {
        for (m = g.length, t = 0; t < m && !E; t++) {
          c = p(b(d) * g[t]), c > f && (!l || n <= u) && void 0 !== n && C.push(n), n > u && (E = !0), n = c;
        }
      } else f = b(f), u = b(u), a = g[l ? "minorTickInterval" : "tickInterval"], a = r("auto" === a ? null : a, this._minorAutoInterval, g.tickPixelInterval / (l ? 5 : 1) * (u - f) / ((l ? d / this.tickPositions.length : d) || 1)), a = G(a, null, A(a)), C = H(this.getLinearTickPositions(a, f, u), p), l || (this._minorAutoInterval = a / 5);l || (this.tickInterval = a);return C;
    };B.prototype.log2lin = function (a) {
      return Math.log(a) / Math.LN10;
    };B.prototype.lin2log = function (a) {
      return Math.pow(10, a);
    };
  })(L);(function (a) {
    var B = a.dateFormat,
        A = a.each,
        H = a.extend,
        G = a.format,
        r = a.isNumber,
        g = a.map,
        f = a.merge,
        u = a.pick,
        l = a.splat,
        q = a.syncTimeout,
        d = a.timeUnits;a.Tooltip = function () {
      this.init.apply(this, arguments);
    };a.Tooltip.prototype = { init: function init(a, d) {
        this.chart = a;this.options = d;this.crosshairs = [];this.now = { x: 0, y: 0 };this.isHidden = !0;this.split = d.split && !a.inverted;this.shared = d.shared || this.split;
      }, cleanSplit: function cleanSplit(a) {
        A(this.chart.series, function (b) {
          var d = b && b.tt;d && (!d.isActive || a ? b.tt = d.destroy() : d.isActive = !1);
        });
      }, getLabel: function getLabel() {
        var a = this.chart.renderer,
            d = this.options;this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({ padding: d.padding, r: d.borderRadius }), this.label.attr({ fill: d.backgroundColor, "stroke-width": d.borderWidth }).css(d.style).shadow(d.shadow)), this.label.attr({ zIndex: 8 }).add());return this.label;
      }, update: function update(a) {
        this.destroy();this.init(this.chart, f(!0, this.options, a));
      }, destroy: function destroy() {
        this.label && (this.label = this.label.destroy());this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout);
      },
      move: function move(a, d, f, t) {
        var b = this,
            c = b.now,
            n = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)),
            p = b.followPointer || 1 < b.len;H(c, { x: n ? (2 * c.x + a) / 3 : a, y: n ? (c.y + d) / 2 : d, anchorX: p ? void 0 : n ? (2 * c.anchorX + f) / 3 : f, anchorY: p ? void 0 : n ? (c.anchorY + t) / 2 : t });b.getLabel().attr(c);n && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
          b && b.move(a, d, f, t);
        }, 32));
      }, hide: function hide(a) {
        var b = this;clearTimeout(this.hideTimer);a = u(a, this.options.hideDelay, 500);this.isHidden || (this.hideTimer = q(function () {
          b.getLabel()[a ? "fadeOut" : "hide"]();b.isHidden = !0;
        }, a));
      }, getAnchor: function getAnchor(a, d) {
        var b,
            f = this.chart,
            m = f.inverted,
            c = f.plotTop,
            n = f.plotLeft,
            p = 0,
            z = 0,
            e,
            x;a = l(a);b = a[0].tooltipPos;this.followPointer && d && (void 0 === d.chartX && (d = f.pointer.normalize(d)), b = [d.chartX - f.plotLeft, d.chartY - c]);b || (A(a, function (a) {
          e = a.series.yAxis;x = a.series.xAxis;p += a.plotX + (!m && x ? x.left - n : 0);z += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!m && e ? e.top - c : 0);
        }), p /= a.length, z /= a.length, b = [m ? f.plotWidth - z : p, this.shared && !m && 1 < a.length && d ? d.chartY - c : m ? f.plotHeight - p : z]);return g(b, Math.round);
      }, getPosition: function getPosition(a, d, f) {
        var b = this.chart,
            m = this.distance,
            c = {},
            n = f.h || 0,
            p,
            z = ["y", b.chartHeight, d, f.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
            e = ["x", b.chartWidth, a, f.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
            x = !this.followPointer && u(f.ttBelow, !b.inverted === !!f.negative),
            g = function g(a, b, e, h, d, f) {
          var k = e < h - m,
              y = h + m + e < b,
              p = h - m - e;h += m;if (x && y) c[a] = h;else if (!x && k) c[a] = p;else if (k) c[a] = Math.min(f - e, 0 > p - n ? p : p - n);else if (y) c[a] = Math.max(d, h + n + e > b ? h : h + n);else return !1;
        },
            w = function w(a, b, e, h) {
          var k;h < m || h > b - m ? k = !1 : c[a] = h < e / 2 ? 1 : h > b - e / 2 ? b - e - 2 : h - e / 2;return k;
        },
            h = function h(a) {
          var b = z;z = e;e = b;p = a;
        },
            y = function y() {
          !1 !== g.apply(0, z) ? !1 !== w.apply(0, e) || p || (h(!0), y()) : p ? c.x = c.y = 0 : (h(!0), y());
        };(b.inverted || 1 < this.len) && h();y();return c;
      }, defaultFormatter: function defaultFormatter(a) {
        var b = this.points || l(this),
            d;d = [a.tooltipFooterHeaderFormatter(b[0])];d = d.concat(a.bodyFormatter(b));d.push(a.tooltipFooterHeaderFormatter(b[0], !0));return d;
      }, refresh: function refresh(a, d) {
        var b = this.chart,
            f,
            m = this.options,
            c,
            n,
            p = {},
            z = [];f = m.formatter || this.defaultFormatter;var p = b.hoverPoints,
            e = this.shared;clearTimeout(this.hideTimer);this.followPointer = l(a)[0].series.tooltipOptions.followPointer;n = this.getAnchor(a, d);d = n[0];c = n[1];!e || a.series && a.series.noSharedTooltip ? p = a.getLabelConfig() : (b.hoverPoints = a, p && A(p, function (a) {
          a.setState();
        }), A(a, function (a) {
          a.setState("hover");z.push(a.getLabelConfig());
        }), p = { x: a[0].category, y: a[0].y }, p.points = z, a = a[0]);this.len = z.length;p = f.call(p, this);e = a.series;this.distance = u(e.tooltipOptions.distance, 16);!1 === p ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(p, b.hoverPoints) : (f.attr({ text: p && p.join ? p.join("") : p }), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + u(a.colorIndex, e.colorIndex)), f.attr({ stroke: m.borderColor || a.color || e.color || "#666666" }), this.updatePosition({ plotX: d, plotY: c, negative: a.negative, ttBelow: a.ttBelow, h: n[2] || 0 })), this.isHidden = !1);
      }, renderSplit: function renderSplit(b, d) {
        var f = this,
            p = [],
            m = this.chart,
            c = m.renderer,
            n = !0,
            g = this.options,
            z,
            e = this.getLabel();A(b.slice(0, d.length + 1), function (a, b) {
          b = d[b - 1] || { isHeader: !0, plotX: d[0].plotX };var x = b.series || f,
              h = x.tt,
              y = b.series || {},
              t = "highcharts-color-" + u(b.colorIndex, y.colorIndex, "none");h || (x.tt = h = c.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + t).attr({ padding: g.padding, r: g.borderRadius, fill: g.backgroundColor, stroke: b.color || y.color || "#333333", "stroke-width": g.borderWidth }).add(e));h.isActive = !0;h.attr({ text: a });
          h.css(g.style);a = h.getBBox();y = a.width + h.strokeWidth();b.isHeader ? (z = a.height, y = Math.max(0, Math.min(b.plotX + m.plotLeft - y / 2, m.chartWidth - y))) : y = b.plotX + m.plotLeft - u(g.distance, 16) - y;0 > y && (n = !1);a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0);a -= m.plotTop;p.push({ target: b.isHeader ? m.plotHeight + z : a, rank: b.isHeader ? 1 : 0, size: x.tt.getBBox().height + 1, point: b, x: y, tt: h });
        });this.cleanSplit();a.distribute(p, m.plotHeight + z);A(p, function (a) {
          var b = a.point,
              c = b.series;a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: n || b.isHeader ? a.x : b.plotX + m.plotLeft + u(g.distance, 16), y: a.pos + m.plotTop, anchorX: b.isHeader ? b.plotX + m.plotLeft : b.plotX + c.xAxis.pos, anchorY: b.isHeader ? a.pos + m.plotTop - 15 : b.plotY + c.yAxis.pos });
        });
      }, updatePosition: function updatePosition(a) {
        var b = this.chart,
            d = this.getLabel(),
            d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop);
      }, getDateFormat: function getDateFormat(a, f, g, t) {
        var b = B("%m-%d %H:%M:%S.%L", f),
            c,
            n,
            p = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            z = "millisecond";for (n in d) {
          if (a === d.week && +B("%w", f) === g && "00:00:00.000" === b.substr(6)) {
            n = "week";break;
          }if (d[n] > a) {
            n = z;break;
          }if (p[n] && b.substr(p[n]) !== "01-01 00:00:00.000".substr(p[n])) break;"week" !== n && (z = n);
        }n && (c = t[n]);return c;
      }, getXDateFormat: function getXDateFormat(a, d, f) {
        d = d.dateTimeLabelFormats;var b = f && f.closestPointRange;return (b ? this.getDateFormat(b, a.x, f.options.startOfWeek, d) : d.day) || d.year;
      }, tooltipFooterHeaderFormatter: function tooltipFooterHeaderFormatter(a, d) {
        var b = d ? "footer" : "header";d = a.series;var f = d.tooltipOptions,
            m = f.xDateFormat,
            c = d.xAxis,
            n = c && "datetime" === c.options.type && r(a.key),
            b = f[b + "Format"];n && !m && (m = this.getXDateFormat(a, f, c));n && m && (b = b.replace("{point.key}", "{point.key:" + m + "}"));return G(b, { point: a, series: d });
      }, bodyFormatter: function bodyFormatter(a) {
        return g(a, function (a) {
          var b = a.series.tooltipOptions;return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat);
        });
      } };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.attr,
        H = a.charts,
        G = a.color,
        r = a.css,
        g = a.defined,
        f = a.doc,
        u = a.each,
        l = a.extend,
        q = a.fireEvent,
        d = a.offset,
        b = a.pick,
        p = a.removeEvent,
        C = a.splat,
        t = a.Tooltip,
        m = a.win;a.Pointer = function (a, b) {
      this.init(a, b);
    };a.Pointer.prototype = { init: function init(a, d) {
        this.options = d;this.chart = a;this.runChartClick = d.chart.events && !!d.chart.events.click;this.pinchDown = [];this.lastValidTouch = {};t && d.tooltip.enabled && (a.tooltip = new t(a, d.tooltip), this.followTouchMove = b(d.tooltip.followTouchMove, !0));this.setDOMEvents();
      }, zoomOption: function zoomOption(a) {
        var c = this.chart,
            d = c.options.chart,
            m = d.zoomType || "",
            c = c.inverted;/touch/.test(a.type) && (m = b(d.pinchType, m));this.zoomX = a = /x/.test(m);this.zoomY = m = /y/.test(m);this.zoomHor = a && !c || m && c;this.zoomVert = m && !c || a && c;this.hasZoom = a || m;
      }, normalize: function normalize(a, b) {
        var c, n;a = a || m.event;a.target || (a.target = a.srcElement);n = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;b || (this.chartPosition = b = d(this.chart.container));void 0 === n.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = n.pageX - b.left, b = n.pageY - b.top);return l(a, { chartX: Math.round(c),
          chartY: Math.round(b) });
      }, getCoordinates: function getCoordinates(a) {
        var b = { xAxis: [], yAxis: [] };u(this.chart.axes, function (c) {
          b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) });
        });return b;
      }, runPointActions: function runPointActions(c) {
        var d = this.chart,
            m = d.series,
            p = d.tooltip,
            e = p ? p.shared : !1,
            g = !0,
            t = d.hoverPoint,
            w = d.hoverSeries,
            h,
            y,
            l,
            q = [],
            r;if (!e && !w) for (h = 0; h < m.length; h++) {
          if (m[h].directTouch || !m[h].options.stickyTracking) m = [];
        }w && (e ? w.noSharedTooltip : w.directTouch) && t ? q = [t] : (e || !w || w.options.stickyTracking || (m = [w]), u(m, function (a) {
          y = a.noSharedTooltip && e;l = !e && a.directTouch;a.visible && !y && !l && b(a.options.enableMouseTracking, !0) && (r = a.searchPoint(c, !y && 1 === a.kdDimensions)) && r.series && q.push(r);
        }), q.sort(function (a, b) {
          var c = a.distX - b.distX,
              h = a.dist - b.dist,
              k = (b.series.group && b.series.group.zIndex) - (a.series.group && a.series.group.zIndex);return 0 !== c && e ? c : 0 !== h ? h : 0 !== k ? k : a.series.index > b.series.index ? -1 : 1;
        }));if (e) for (h = q.length; h--;) {
          (q[h].x !== q[0].x || q[h].series.noSharedTooltip) && q.splice(h, 1);
        }if (q[0] && (q[0] !== this.prevKDPoint || p && p.isHidden)) {
          if (e && !q[0].series.noSharedTooltip) {
            for (h = 0; h < q.length; h++) {
              q[h].onMouseOver(c, q[h] !== (w && w.directTouch && t || q[0]));
            }q.length && p && p.refresh(q.sort(function (a, b) {
              return a.series.index - b.series.index;
            }), c);
          } else if (p && p.refresh(q[0], c), !w || !w.directTouch) q[0].onMouseOver(c);this.prevKDPoint = q[0];g = !1;
        }g && (m = w && w.tooltipOptions.followPointer, p && m && !p.isHidden && (m = p.getAnchor([{}], c), p.updatePosition({ plotX: m[0], plotY: m[1] })));this.unDocMouseMove || (this.unDocMouseMove = B(f, "mousemove", function (b) {
          if (H[a.hoverChartIndex]) H[a.hoverChartIndex].pointer.onDocumentMouseMove(b);
        }));u(e ? q : [b(t, q[0])], function (a) {
          u(d.axes, function (b) {
            (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a);
          });
        });
      }, reset: function reset(a, b) {
        var c = this.chart,
            d = c.hoverSeries,
            e = c.hoverPoint,
            n = c.hoverPoints,
            m = c.tooltip,
            f = m && m.shared ? n : e;a && f && u(C(f), function (b) {
          b.series.isCartesian && void 0 === b.plotX && (a = !1);
        });if (a) m && f && (m.refresh(f), e && (e.setState(e.state, !0), u(c.axes, function (a) {
          a.crosshair && a.drawCrosshair(null, e);
        })));else {
          if (e) e.onMouseOut();n && u(n, function (a) {
            a.setState();
          });if (d) d.onMouseOut();m && m.hide(b);this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());u(c.axes, function (a) {
            a.hideCrosshair();
          });this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null;
        }
      }, scaleGroups: function scaleGroups(a, b) {
        var c = this.chart,
            d;u(c.series, function (e) {
          d = a || e.getPlotBox();e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
        });c.clipRect.attr(b || c.clipBox);
      }, dragStart: function dragStart(a) {
        var b = this.chart;b.mouseIsDown = a.type;b.cancelClick = !1;b.mouseDownX = this.mouseDownX = a.chartX;b.mouseDownY = this.mouseDownY = a.chartY;
      }, drag: function drag(a) {
        var b = this.chart,
            c = b.options.chart,
            d = a.chartX,
            e = a.chartY,
            m = this.zoomHor,
            f = this.zoomVert,
            p = b.plotLeft,
            h = b.plotTop,
            y = b.plotWidth,
            g = b.plotHeight,
            t,
            q = this.selectionMarker,
            k = this.mouseDownX,
            l = this.mouseDownY,
            r = c.panKey && a[c.panKey + "Key"];q && q.touch || (d < p ? d = p : d > p + y && (d = p + y), e < h ? e = h : e > h + g && (e = h + g), this.hasDragged = Math.sqrt(Math.pow(k - d, 2) + Math.pow(l - e, 2)), 10 < this.hasDragged && (t = b.isInsidePlot(k - p, l - h), b.hasCartesianSeries && (this.zoomX || this.zoomY) && t && !r && !q && (this.selectionMarker = q = b.renderer.rect(p, h, m ? 1 : y, f ? 1 : g, 0).attr({ fill: c.selectionMarkerFill || G("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7 }).add()), q && m && (d -= k, q.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + k })), q && f && (d = e - l, q.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + l })), t && !q && c.panning && b.pan(a, c.panning)));
      }, drop: function drop(a) {
        var b = this,
            c = this.chart,
            d = this.hasPinched;if (this.selectionMarker) {
          var e = { originalEvent: a, xAxis: [], yAxis: [] },
              m = this.selectionMarker,
              f = m.attr ? m.attr("x") : m.x,
              p = m.attr ? m.attr("y") : m.y,
              h = m.attr ? m.attr("width") : m.width,
              y = m.attr ? m.attr("height") : m.height,
              t;if (this.hasDragged || d) u(c.axes, function (c) {
            if (c.zoomEnabled && g(c.min) && (d || b[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]])) {
              var m = c.horiz,
                  k = "touchend" === a.type ? c.minPixelPadding : 0,
                  n = c.toValue((m ? f : p) + k),
                  m = c.toValue((m ? f + h : p + y) - k);e[c.coll].push({ axis: c, min: Math.min(n, m), max: Math.max(n, m) });t = !0;
            }
          }), t && q(c, "selection", e, function (a) {
            c.zoom(l(a, d ? { animation: !1 } : null));
          });this.selectionMarker = this.selectionMarker.destroy();d && this.scaleGroups();
        }c && (r(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []);
      }, onContainerMouseDown: function onContainerMouseDown(a) {
        a = this.normalize(a);this.zoomOption(a);a.preventDefault && a.preventDefault();this.dragStart(a);
      }, onDocumentMouseUp: function onDocumentMouseUp(b) {
        H[a.hoverChartIndex] && H[a.hoverChartIndex].pointer.drop(b);
      }, onDocumentMouseMove: function onDocumentMouseMove(a) {
        var b = this.chart,
            c = this.chartPosition;a = this.normalize(a, c);!c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset();
      }, onContainerMouseLeave: function onContainerMouseLeave(b) {
        var c = H[a.hoverChartIndex];c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null);
      }, onContainerMouseMove: function onContainerMouseMove(b) {
        var c = this.chart;g(a.hoverChartIndex) && H[a.hoverChartIndex] && H[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);b = this.normalize(b);b.returnValue = !1;"mousedown" === c.mouseIsDown && this.drag(b);!this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b);
      }, inClass: function inClass(a, b) {
        for (var c; a;) {
          if (c = A(a, "class")) {
            if (-1 !== c.indexOf(b)) return !0;if (-1 !== c.indexOf("highcharts-container")) return !1;
          }a = a.parentNode;
        }
      }, onTrackerMouseOut: function onTrackerMouseOut(a) {
        var b = this.chart.hoverSeries;a = a.relatedTarget || a.toElement;if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut();
      }, onContainerClick: function onContainerClick(a) {
        var b = this.chart,
            c = b.hoverPoint,
            d = b.plotLeft,
            e = b.plotTop;a = this.normalize(a);b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (q(c.series, "click", l(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (l(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && q(b, "click", a)));
      }, setDOMEvents: function setDOMEvents() {
        var b = this,
            d = b.chart.container;d.onmousedown = function (a) {
          b.onContainerMouseDown(a);
        };d.onmousemove = function (a) {
          b.onContainerMouseMove(a);
        };d.onclick = function (a) {
          b.onContainerClick(a);
        };B(d, "mouseleave", b.onContainerMouseLeave);1 === a.chartCount && B(f, "mouseup", b.onDocumentMouseUp);a.hasTouch && (d.ontouchstart = function (a) {
          b.onContainerTouchStart(a);
        }, d.ontouchmove = function (a) {
          b.onContainerTouchMove(a);
        }, 1 === a.chartCount && B(f, "touchend", b.onDocumentTouchEnd));
      }, destroy: function destroy() {
        var b;p(this.chart.container, "mouseleave", this.onContainerMouseLeave);a.chartCount || (p(f, "mouseup", this.onDocumentMouseUp), p(f, "touchend", this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for (b in this) {
          this[b] = null;
        }
      } };
  })(L);(function (a) {
    var B = a.charts,
        A = a.each,
        H = a.extend,
        G = a.map,
        r = a.noop,
        g = a.pick;H(a.Pointer.prototype, { pinchTranslate: function pinchTranslate(a, g, l, q, d, b) {
        this.zoomHor && this.pinchTranslateDirection(!0, a, g, l, q, d, b);this.zoomVert && this.pinchTranslateDirection(!1, a, g, l, q, d, b);
      }, pinchTranslateDirection: function pinchTranslateDirection(a, g, l, q, d, b, p, r) {
        var f = this.chart,
            m = a ? "x" : "y",
            c = a ? "X" : "Y",
            n = "chart" + c,
            E = a ? "width" : "height",
            z = f["plot" + (a ? "Left" : "Top")],
            e,
            x,
            F = r || 1,
            w = f.inverted,
            h = f.bounds[a ? "h" : "v"],
            y = 1 === g.length,
            J = g[0][n],
            u = l[0][n],
            I = !y && g[1][n],
            k = !y && l[1][n],
            D;l = function l() {
          !y && 20 < Math.abs(J - I) && (F = r || Math.abs(u - k) / Math.abs(J - I));x = (z - u) / F + J;e = f["plot" + (a ? "Width" : "Height")] / F;
        };l();g = x;g < h.min ? (g = h.min, D = !0) : g + e > h.max && (g = h.max - e, D = !0);D ? (u -= .8 * (u - p[m][0]), y || (k -= .8 * (k - p[m][1])), l()) : p[m] = [u, k];w || (b[m] = x - z, b[E] = e);b = w ? 1 / F : F;d[E] = e;d[m] = g;q[w ? a ? "scaleY" : "scaleX" : "scale" + c] = F;q["translate" + c] = b * z + (u - b * J);
      }, pinch: function pinch(a) {
        var f = this,
            l = f.chart,
            q = f.pinchDown,
            d = a.touches,
            b = d.length,
            p = f.lastValidTouch,
            C = f.hasZoom,
            t = f.selectionMarker,
            m = {},
            c = 1 === b && (f.inClass(a.target, "highcharts-tracker") && l.runTrackerClick || f.runChartClick),
            n = {};1 < b && (f.initiated = !0);C && f.initiated && !c && a.preventDefault();G(d, function (a) {
          return f.normalize(a);
        });"touchstart" === a.type ? (A(d, function (a, b) {
          q[b] = { chartX: a.chartX, chartY: a.chartY };
        }), p.x = [q[0].chartX, q[1] && q[1].chartX], p.y = [q[0].chartY, q[1] && q[1].chartY], A(l.axes, function (a) {
          if (a.zoomEnabled) {
            var b = l.bounds[a.horiz ? "h" : "v"],
                c = a.minPixelPadding,
                d = a.toPixels(g(a.options.min, a.dataMin)),
                m = a.toPixels(g(a.options.max, a.dataMax)),
                f = Math.max(d, m);b.min = Math.min(a.pos, Math.min(d, m) - c);b.max = Math.max(a.pos + a.len, f + c);
          }
        }), f.res = !0) : f.followTouchMove && 1 === b ? this.runPointActions(f.normalize(a)) : q.length && (t || (f.selectionMarker = t = H({ destroy: r, touch: !0 }, l.plotBox)), f.pinchTranslate(q, d, m, t, n, p), f.hasPinched = C, f.scaleGroups(m, n), f.res && (f.res = !1, this.reset(!1, 0)));
      }, touch: function touch(f, r) {
        var l = this.chart,
            q,
            d;if (l.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });a.hoverChartIndex = l.index;1 === f.touches.length ? (f = this.normalize(f), (d = l.isInsidePlot(f.chartX - l.plotLeft, f.chartY - l.plotTop)) && !l.openMenu ? (r && this.runPointActions(f), "touchmove" === f.type && (r = this.pinchDown, q = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - f.chartX, 2) + Math.pow(r[0].chartY - f.chartY, 2)) : !1), g(q, !0) && this.pinch(f)) : r && this.reset()) : 2 === f.touches.length && this.pinch(f);
      }, onContainerTouchStart: function onContainerTouchStart(a) {
        this.zoomOption(a);this.touch(a, !0);
      }, onContainerTouchMove: function onContainerTouchMove(a) {
        this.touch(a);
      }, onDocumentTouchEnd: function onDocumentTouchEnd(f) {
        B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(f);
      } });
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.charts,
        H = a.css,
        G = a.doc,
        r = a.extend,
        g = a.noop,
        f = a.Pointer,
        u = a.removeEvent,
        l = a.win,
        q = a.wrap;if (l.PointerEvent || l.MSPointerEvent) {
      var d = {},
          b = !!l.PointerEvent,
          p = function p() {
        var a,
            b = [];b.item = function (a) {
          return this[a];
        };for (a in d) {
          d.hasOwnProperty(a) && b.push({ pageX: d[a].pageX, pageY: d[a].pageY, target: d[a].target });
        }return b;
      },
          C = function C(b, d, c, f) {
        "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] || (f(b), f = A[a.hoverChartIndex].pointer, f[d]({ type: c, target: b.currentTarget, preventDefault: g, touches: p() }));
      };r(f.prototype, { onContainerPointerDown: function onContainerPointerDown(a) {
          C(a, "onContainerTouchStart", "touchstart", function (a) {
            d[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget };
          });
        }, onContainerPointerMove: function onContainerPointerMove(a) {
          C(a, "onContainerTouchMove", "touchmove", function (a) {
            d[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };d[a.pointerId].target || (d[a.pointerId].target = a.currentTarget);
          });
        }, onDocumentPointerUp: function onDocumentPointerUp(a) {
          C(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete d[a.pointerId];
          });
        }, batchMSEvents: function batchMSEvents(a) {
          a(this.chart.container, b ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);a(this.chart.container, b ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);a(G, b ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        } });q(f.prototype, "init", function (a, b, c) {
        a.call(this, b, c);this.hasZoom && H(b.container, { "-ms-touch-action": "none", "touch-action": "none" });
      });q(f.prototype, "setDOMEvents", function (a) {
        a.apply(this);(this.hasZoom || this.followTouchMove) && this.batchMSEvents(B);
      });q(f.prototype, "destroy", function (a) {
        this.batchMSEvents(u);a.call(this);
      });
    }
  })(L);(function (a) {
    var B,
        A = a.addEvent,
        H = a.css,
        G = a.discardElement,
        r = a.defined,
        g = a.each,
        f = a.extend,
        u = a.isFirefox,
        l = a.marginNames,
        q = a.merge,
        d = a.pick,
        b = a.setAnimation,
        p = a.stableSort,
        C = a.win,
        t = a.wrap;
    B = a.Legend = function (a, b) {
      this.init(a, b);
    };B.prototype = { init: function init(a, b) {
        this.chart = a;this.setOptions(b);b.enabled && (this.render(), A(this.chart, "endResize", function () {
          this.legend.positionCheckboxes();
        }));
      }, setOptions: function setOptions(a) {
        var b = d(a.padding, 8);this.options = a;this.itemStyle = a.itemStyle;this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);this.itemMarginTop = a.itemMarginTop || 0;this.initialItemX = this.padding = b;this.initialItemY = b - 5;this.itemHeight = this.maxItemWidth = 0;this.symbolWidth = d(a.symbolWidth, 16);this.pages = [];
      }, update: function update(a, b) {
        var c = this.chart;this.setOptions(q(!0, this.options, a));this.destroy();c.isDirtyLegend = c.isDirtyBox = !0;d(b, !0) && c.redraw();
      }, colorizeItem: function colorizeItem(a, b) {
        a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");var c = this.options,
            d = a.legendItem,
            m = a.legendLine,
            e = a.legendSymbol,
            f = this.itemHiddenStyle.color,
            c = b ? c.itemStyle.color : f,
            p = b ? a.color || f : f,
            g = a.options && a.options.marker,
            h = { fill: p },
            y;d && d.css({ fill: c, color: c });m && m.attr({ stroke: p });if (e) {
          if (g && e.isMarker && (h = a.pointAttribs(), !b)) for (y in h) {
            h[y] = f;
          }e.attr(h);
        }
      }, positionItem: function positionItem(a) {
        var b = this.options,
            d = b.symbolPadding,
            b = !b.rtl,
            m = a._legendItemPos,
            f = m[0],
            m = m[1],
            e = a.checkbox;(a = a.legendGroup) && a.element && a.translate(b ? f : this.legendWidth - f - 2 * d - 4, m);e && (e.x = f, e.y = m);
      }, destroyItem: function destroyItem(a) {
        var b = a.checkbox;g(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
          a[b] && (a[b] = a[b].destroy());
        });b && G(a.checkbox);
      }, destroy: function destroy() {
        function a(a) {
          this[a] && (this[a] = this[a].destroy());
        }
        g(this.getAllItems(), function (b) {
          g(["legendItem", "legendGroup"], a, b);
        });g(["box", "title", "group"], a, this);this.display = null;
      }, positionCheckboxes: function positionCheckboxes(a) {
        var b = this.group && this.group.alignAttr,
            d,
            m = this.clipHeight || this.legendHeight,
            f = this.titleHeight;b && (d = b.translateY, g(this.allItems, function (c) {
          var e = c.checkbox,
              n;e && (n = d + f + e.y + (a || 0) + 3, H(e, { left: b.translateX + c.checkboxOffset + e.x - 20 + "px", top: n + "px", display: n > d - 6 && n < d + m - 6 ? "" : "none" }));
        }));
      }, renderTitle: function renderTitle() {
        var a = this.padding,
            b = this.options.title,
            d = 0;b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({ zIndex: 1 }).css(b.style).add(this.group)), a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: d }));this.titleHeight = d;
      }, setText: function setText(b) {
        var c = this.options;b.legendItem.attr({ text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b) });
      }, renderItem: function renderItem(a) {
        var b = this.chart,
            f = b.renderer,
            m = this.options,
            p = "horizontal" === m.layout,
            e = this.symbolWidth,
            g = m.symbolPadding,
            l = this.itemStyle,
            t = this.itemHiddenStyle,
            h = this.padding,
            y = p ? d(m.itemDistance, 20) : 0,
            J = !m.rtl,
            r = m.width,
            I = m.itemMarginBottom || 0,
            k = this.itemMarginTop,
            u = this.initialItemX,
            C = a.legendItem,
            N = !a.series,
            A = !N && a.series.drawLegendSymbol ? a.series : a,
            B = A.options,
            B = this.createCheckboxForItem && B && B.showCheckbox,
            v = m.useHTML;C || (a.legendGroup = f.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ? " " + a.options.className : "") + (N ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = C = f.text("", J ? e + g : -g, this.baseline || 0, v).css(q(a.visible ? l : t)).attr({ align: J ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (l = l.fontSize, this.fontMetrics = f.fontMetrics(l, C), this.baseline = this.fontMetrics.f + 3 + k, C.attr("y", this.baseline)), this.symbolHeight = m.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, C, v), B && this.createCheckboxForItem(a));
        this.colorizeItem(a, a.visible);this.setText(a);f = C.getBBox();e = a.checkboxOffset = m.itemWidth || a.legendItemWidth || e + g + f.width + y + (B ? 20 : 0);this.itemHeight = g = Math.round(a.legendItemHeight || f.height);p && this.itemX - u + e > (r || b.chartWidth - 2 * h - u - m.x) && (this.itemX = u, this.itemY += k + this.lastLineHeight + I, this.lastLineHeight = 0);this.maxItemWidth = Math.max(this.maxItemWidth, e);this.lastItemY = k + this.itemY + I;this.lastLineHeight = Math.max(g, this.lastLineHeight);a._legendItemPos = [this.itemX, this.itemY];p ? this.itemX += e : (this.itemY += k + g + I, this.lastLineHeight = g);this.offsetWidth = r || Math.max((p ? this.itemX - u - y : e) + h, this.offsetWidth);
      }, getAllItems: function getAllItems() {
        var a = [];g(this.chart.series, function (b) {
          var c = b && b.options;b && d(c.showInLegend, r(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)));
        });return a;
      }, adjustMargins: function adjustMargins(a, b) {
        var c = this.chart,
            f = this.options,
            m = f.align.charAt(0) + f.verticalAlign.charAt(0) + f.layout.charAt(0);f.floating || g([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, n) {
          e.test(m) && !r(a[n]) && (c[l[n]] = Math.max(c[l[n]], c.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * f[n % 2 ? "x" : "y"] + d(f.margin, 12) + b[n]));
        });
      }, render: function render() {
        var a = this,
            b = a.chart,
            d = b.renderer,
            q = a.group,
            l,
            e,
            t,
            r,
            w = a.box,
            h = a.options,
            y = a.padding;a.itemX = a.initialItemX;a.itemY = a.initialItemY;a.offsetWidth = 0;a.lastItemY = 0;q || (a.group = q = d.g("legend").attr({ zIndex: 7 }).add(), a.contentGroup = d.g().attr({ zIndex: 1 }).add(q), a.scrollGroup = d.g().add(a.contentGroup));a.renderTitle();
        l = a.getAllItems();p(l, function (a, b) {
          return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
        });h.reversed && l.reverse();a.allItems = l;a.display = e = !!l.length;a.lastLineHeight = 0;g(l, function (b) {
          a.renderItem(b);
        });t = (h.width || a.offsetWidth) + y;r = a.lastItemY + a.lastLineHeight + a.titleHeight;r = a.handleOverflow(r);r += y;w || (a.box = w = d.rect().addClass("highcharts-legend-box").attr({ r: h.borderRadius }).add(q), w.isNew = !0);w.attr({ stroke: h.borderColor, "stroke-width": h.borderWidth || 0, fill: h.backgroundColor || "none" }).shadow(h.shadow);0 < t && 0 < r && (w[w.isNew ? "attr" : "animate"](w.crisp({ x: 0, y: 0, width: t, height: r }, w.strokeWidth())), w.isNew = !1);w[e ? "show" : "hide"]();a.legendWidth = t;a.legendHeight = r;g(l, function (b) {
          a.positionItem(b);
        });e && q.align(f({ width: t, height: r }, h), !0, "spacingBox");b.isResizing || this.positionCheckboxes();
      }, handleOverflow: function handleOverflow(a) {
        var b = this,
            f = this.chart,
            m = f.renderer,
            p = this.options,
            e = p.y,
            f = f.spacingBox.height + ("top" === p.verticalAlign ? -e : e) - this.padding,
            e = p.maxHeight,
            q,
            l = this.clipRect,
            t = p.navigation,
            h = d(t.animation, !0),
            y = t.arrowSize || 12,
            r = this.nav,
            u = this.pages,
            I = this.padding,
            k,
            D = this.allItems,
            C = function C(a) {
          a ? l.attr({ height: a }) : l && (b.clipRect = l.destroy(), b.contentGroup.clip());b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + I + "px,9999px," + (I + a) + "px,0)" : "auto");
        };"horizontal" !== p.layout || "middle" === p.verticalAlign || p.floating || (f /= 2);e && (f = Math.min(f, e));u.length = 0;a > f && !1 !== t.enabled ? (this.clipHeight = q = Math.max(f - 20 - this.titleHeight - I, 0), this.currentPage = d(this.currentPage, 1), this.fullHeight = a, g(D, function (a, b) {
          var c = a._legendItemPos[1];a = Math.round(a.legendItem.getBBox().height);var e = u.length;if (!e || c - u[e - 1] > q && (k || c) !== u[e - 1]) u.push(k || c), e++;b === D.length - 1 && c + a - u[e - 1] > q && u.push(c);c !== k && (k = c);
        }), l || (l = b.clipRect = m.clipRect(0, I, 9999, 0), b.contentGroup.clip(l)), C(q), r || (this.nav = r = m.g().attr({ zIndex: 1 }).add(this.group), this.up = m.symbol("triangle", 0, 0, y, y).on("click", function () {
          b.scroll(-1, h);
        }).add(r), this.pager = m.text("", 15, 10).addClass("highcharts-legend-navigation").css(t.style).add(r), this.down = m.symbol("triangle-down", 0, 0, y, y).on("click", function () {
          b.scroll(1, h);
        }).add(r)), b.scroll(0), a = f) : r && (C(), r.hide(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);return a;
      }, scroll: function scroll(a, c) {
        var d = this.pages,
            f = d.length;a = this.currentPage + a;var m = this.clipHeight,
            e = this.options.navigation,
            p = this.pager,
            g = this.padding;a > f && (a = f);0 < a && (void 0 !== c && b(c, this.chart), this.nav.attr({ translateX: g, translateY: m + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), p.attr({ text: a + "/" + f }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? e.inactiveColor : e.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === f ? e.inactiveColor : e.activeColor }).css({ cursor: a === f ? "default" : "pointer" }), c = -d[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: c }), this.currentPage = a, this.positionCheckboxes(c));
      } };a.LegendSymbolMixin = { drawRectangle: function drawRectangle(a, b) {
        var c = a.symbolHeight,
            f = a.options.squareSymbol;b.legendSymbol = this.chart.renderer.rect(f ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, f ? c : a.symbolWidth, c, d(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(b.legendGroup);
      }, drawLineMarker: function drawLineMarker(a) {
        var b = this.options,
            f = b.marker,
            m = a.symbolWidth,
            p = a.symbolHeight,
            e = p / 2,
            g = this.chart.renderer,
            l = this.legendGroup;a = a.baseline - Math.round(.3 * a.fontMetrics.b);
        var t;t = { "stroke-width": b.lineWidth || 0 };b.dashStyle && (t.dashstyle = b.dashStyle);this.legendLine = g.path(["M", 0, a, "L", m, a]).addClass("highcharts-graph").attr(t).add(l);f && !1 !== f.enabled && (b = Math.min(d(f.radius, e), e), 0 === this.symbol.indexOf("url") && (f = q(f, { width: p, height: p }), b = 0), this.legendSymbol = f = g.symbol(this.symbol, m / 2 - b, a - b, 2 * b, 2 * b, f).addClass("highcharts-point").add(l), f.isMarker = !0);
      } };(/Trident\/7\.0/.test(C.navigator.userAgent) || u) && t(B.prototype, "positionItem", function (a, b) {
      var c = this,
          d = function d() {
        b._legendItemPos && a.call(c, b);
      };d();setTimeout(d);
    });
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.animate,
        H = a.animObject,
        G = a.attr,
        r = a.doc,
        g = a.Axis,
        f = a.createElement,
        u = a.defaultOptions,
        l = a.discardElement,
        q = a.charts,
        d = a.css,
        b = a.defined,
        p = a.each,
        C = a.extend,
        t = a.find,
        m = a.fireEvent,
        c = a.getStyle,
        n = a.grep,
        E = a.isNumber,
        z = a.isObject,
        e = a.isString,
        x = a.Legend,
        F = a.marginNames,
        w = a.merge,
        h = a.Pointer,
        y = a.pick,
        J = a.pInt,
        K = a.removeEvent,
        I = a.seriesTypes,
        k = a.splat,
        D = a.svg,
        P = a.syncTimeout,
        N = a.win,
        S = a.Renderer,
        O = a.Chart = function () {
      this.getArgs.apply(this, arguments);
    };a.chart = function (a, b, c) {
      return new O(a, b, c);
    };O.prototype = { callbacks: [], getArgs: function getArgs() {
        var a = [].slice.call(arguments);if (e(a[0]) || a[0].nodeName) this.renderTo = a.shift();this.init(a[0], a[1]);
      }, init: function init(b, c) {
        var e,
            h = b.series;b.series = null;e = w(u, b);e.series = b.series = h;this.userOptions = b;this.respRules = [];b = e.chart;h = b.events;this.margin = [];this.spacing = [];this.bounds = { h: {}, v: {} };this.callback = c;this.isResizing = 0;this.options = e;this.axes = [];this.series = [];this.hasCartesianSeries = b.showAxes;
        var d;this.index = q.length;q.push(this);a.chartCount++;if (h) for (d in h) {
          B(this, d, h[d]);
        }this.xAxis = [];this.yAxis = [];this.pointCount = this.colorCounter = this.symbolCounter = 0;this.firstRender();
      }, initSeries: function initSeries(b) {
        var c = this.options.chart;(c = I[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);c = new c();c.init(this, b);return c;
      }, orderSeries: function orderSeries(a) {
        var b = this.series;for (a = a || 0; a < b.length; a++) {
          b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1));
        }
      }, isInsidePlot: function isInsidePlot(a, b, c) {
        var e = c ? b : a;a = c ? a : b;return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight;
      }, redraw: function redraw(b) {
        var c = this.axes,
            e = this.series,
            h = this.pointer,
            d = this.legend,
            k = this.isDirtyLegend,
            f,
            n,
            y = this.hasCartesianSeries,
            g = this.isDirtyBox,
            v = e.length,
            l = v,
            q = this.renderer,
            t = q.isHidden(),
            w = [];this.setResponsive && this.setResponsive(!1);a.setAnimation(b, this);t && this.cloneRenderTo();for (this.layOutTitles(); l--;) {
          if (b = e[l], b.options.stacking && (f = !0, b.isDirty)) {
            n = !0;break;
          }
        }if (n) for (l = v; l--;) {
          b = e[l], b.options.stacking && (b.isDirty = !0);
        }p(e, function (a) {
          a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), k = !0);a.isDirtyData && m(a, "updatedData");
        });k && d.options.enabled && (d.render(), this.isDirtyLegend = !1);f && this.getStacks();y && p(c, function (a) {
          a.updateNames();a.setScale();
        });this.getMargins();y && (p(c, function (a) {
          a.isDirty && (g = !0);
        }), p(c, function (a) {
          var b = a.min + "," + a.max;a.extKey !== b && (a.extKey = b, w.push(function () {
            m(a, "afterSetExtremes", C(a.eventArgs, a.getExtremes()));delete a.eventArgs;
          }));(g || f) && a.redraw();
        }));
        g && this.drawChartBox();m(this, "predraw");p(e, function (a) {
          (g || a.isDirty) && a.visible && a.redraw();a.isDirtyData = !1;
        });h && h.reset(!0);q.draw();m(this, "redraw");m(this, "render");t && this.cloneRenderTo(!0);p(w, function (a) {
          a.call();
        });
      }, get: function get(a) {
        function b(b) {
          return b.id === a || b.options && b.options.id === a;
        }var c,
            e = this.series,
            h;c = t(this.axes, b) || t(this.series, b);for (h = 0; !c && h < e.length; h++) {
          c = t(e[h].points || [], b);
        }return c;
      }, getAxes: function getAxes() {
        var a = this,
            b = this.options,
            c = b.xAxis = k(b.xAxis || {}),
            b = b.yAxis = k(b.yAxis || {});p(c, function (a, b) {
          a.index = b;a.isX = !0;
        });p(b, function (a, b) {
          a.index = b;
        });c = c.concat(b);p(c, function (b) {
          new g(a, b);
        });
      }, getSelectedPoints: function getSelectedPoints() {
        var a = [];p(this.series, function (b) {
          a = a.concat(n(b.points || [], function (a) {
            return a.selected;
          }));
        });return a;
      }, getSelectedSeries: function getSelectedSeries() {
        return n(this.series, function (a) {
          return a.selected;
        });
      }, setTitle: function setTitle(a, b, c) {
        var e = this,
            h = e.options,
            d;d = h.title = w({ style: { color: "#333333", fontSize: h.isStock ? "16px" : "18px" } }, h.title, a);h = h.subtitle = w({ style: { color: "#666666" } }, h.subtitle, b);p([["title", a, d], ["subtitle", b, h]], function (a, b) {
          var c = a[0],
              h = e[c],
              d = a[1];a = a[2];h && d && (e[c] = h = h.destroy());a && a.text && !h && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), e[c].update = function (a) {
            e.setTitle(!b && a, b && a);
          }, e[c].css(a.style));
        });e.layOutTitles(c);
      }, layOutTitles: function layOutTitles(a) {
        var b = 0,
            c,
            e = this.renderer,
            h = this.spacingBox;p(["title", "subtitle"], function (a) {
          var c = this[a],
              d = this.options[a],
              k;c && (k = d.style.fontSize, k = e.fontMetrics(k, c).b, c.css({ width: (d.width || h.width + d.widthAdjust) + "px" }).align(C({ y: b + k + ("title" === a ? -3 : 2) }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox().height)));
        }, this);c = this.titleOffset !== b;this.titleOffset = b;!this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && y(a, !0) && this.isDirtyBox && this.redraw());
      }, getChartSize: function getChartSize() {
        var a = this.options.chart,
            e = a.width,
            a = a.height,
            h = this.renderToClone || this.renderTo;b(e) || (this.containerWidth = c(h, "width"));b(a) || (this.containerHeight = c(h, "height"));this.chartWidth = Math.max(0, e || this.containerWidth || 600);this.chartHeight = Math.max(0, a || this.containerHeight || 400);
      }, cloneRenderTo: function cloneRenderTo(a) {
        var b = this.renderToClone,
            c = this.container;if (a) {
          if (b) {
            for (; b.childNodes.length;) {
              this.renderTo.appendChild(b.firstChild);
            }l(b);delete this.renderToClone;
          }
        } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), d(b, { position: "absolute", top: "-9999px", display: "block" }), b.style.setProperty && b.style.setProperty("display", "block", "important"), r.body.appendChild(b), c && b.appendChild(c);
      }, setClassName: function setClassName(a) {
        this.container.className = "highcharts-container " + (a || "");
      }, getContainer: function getContainer() {
        var b,
            c = this.options,
            h = c.chart,
            d,
            k;b = this.renderTo;var m = a.uniqueKey(),
            n;b || (this.renderTo = b = h.renderTo);e(b) && (this.renderTo = b = r.getElementById(b));b || a.error(13, !0);d = J(G(b, "data-highcharts-chart"));E(d) && q[d] && q[d].hasRendered && q[d].destroy();G(b, "data-highcharts-chart", this.index);b.innerHTML = "";
        h.skipClone || b.offsetWidth || this.cloneRenderTo();this.getChartSize();d = this.chartWidth;k = this.chartHeight;n = C({ position: "relative", overflow: "hidden", width: d + "px", height: k + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, h.style);this.container = b = f("div", { id: m }, n, this.renderToClone || b);this._cursor = b.style.cursor;this.renderer = new (a[h.renderer] || S)(b, d, k, null, h.forExport, c.exporting && c.exporting.allowHTML);this.setClassName(h.className);this.renderer.setStyle(h.style);
        this.renderer.chartIndex = this.index;
      }, getMargins: function getMargins(a) {
        var c = this.spacing,
            e = this.margin,
            h = this.titleOffset;this.resetMargins();h && !b(e[0]) && (this.plotTop = Math.max(this.plotTop, h + this.options.title.margin + c[0]));this.legend.display && this.legend.adjustMargins(e, c);this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);this.extraTopMargin && (this.plotTop += this.extraTopMargin);a || this.getAxisMargins();
      }, getAxisMargins: function getAxisMargins() {
        var a = this,
            c = a.axisOffset = [0, 0, 0, 0],
            e = a.margin;a.hasCartesianSeries && p(a.axes, function (a) {
          a.visible && a.getOffset();
        });p(F, function (h, d) {
          b(e[d]) || (a[h] += c[d]);
        });a.setChartSize();
      }, reflow: function reflow(a) {
        var e = this,
            h = e.options.chart,
            d = e.renderTo,
            k = b(h.width),
            f = h.width || c(d, "width"),
            h = h.height || c(d, "height"),
            d = a ? a.target : N;if (!k && !e.isPrinting && f && h && (d === N || d === r)) {
          if (f !== e.containerWidth || h !== e.containerHeight) clearTimeout(e.reflowTimeout), e.reflowTimeout = P(function () {
            e.container && e.setSize(void 0, void 0, !1);
          }, a ? 100 : 0);e.containerWidth = f;e.containerHeight = h;
        }
      }, initReflow: function initReflow() {
        var a = this,
            b;b = B(N, "resize", function (b) {
          a.reflow(b);
        });B(a, "destroy", b);
      }, setSize: function setSize(b, c, e) {
        var h = this,
            k = h.renderer;h.isResizing += 1;a.setAnimation(e, h);h.oldChartHeight = h.chartHeight;h.oldChartWidth = h.chartWidth;void 0 !== b && (h.options.chart.width = b);void 0 !== c && (h.options.chart.height = c);h.getChartSize();b = k.globalAnimation;(b ? A : d)(h.container, { width: h.chartWidth + "px", height: h.chartHeight + "px" }, b);h.setChartSize(!0);k.setSize(h.chartWidth, h.chartHeight, e);p(h.axes, function (a) {
          a.isDirty = !0;a.setScale();
        });h.isDirtyLegend = !0;h.isDirtyBox = !0;h.layOutTitles();h.getMargins();h.redraw(e);h.oldChartHeight = null;m(h, "resize");P(function () {
          h && m(h, "endResize", null, function () {
            --h.isResizing;
          });
        }, H(b).duration);
      }, setChartSize: function setChartSize(a) {
        var b = this.inverted,
            c = this.renderer,
            e = this.chartWidth,
            h = this.chartHeight,
            d = this.options.chart,
            k = this.spacing,
            f = this.clipOffset,
            m,
            n,
            y,
            g;this.plotLeft = m = Math.round(this.plotLeft);this.plotTop = n = Math.round(this.plotTop);this.plotWidth = y = Math.max(0, Math.round(e - m - this.marginRight));this.plotHeight = g = Math.max(0, Math.round(h - n - this.marginBottom));this.plotSizeX = b ? g : y;this.plotSizeY = b ? y : g;this.plotBorderWidth = d.plotBorderWidth || 0;this.spacingBox = c.spacingBox = { x: k[3], y: k[0], width: e - k[3] - k[1], height: h - k[0] - k[2] };this.plotBox = c.plotBox = { x: m, y: n, width: y, height: g };e = 2 * Math.floor(this.plotBorderWidth / 2);b = Math.ceil(Math.max(e, f[3]) / 2);c = Math.ceil(Math.max(e, f[0]) / 2);this.clipBox = { x: b, y: c, width: Math.floor(this.plotSizeX - Math.max(e, f[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, f[2]) / 2 - c)) };a || p(this.axes, function (a) {
          a.setAxisSize();a.setAxisTranslation();
        });
      }, resetMargins: function resetMargins() {
        var a = this,
            b = a.options.chart;p(["margin", "spacing"], function (c) {
          var e = b[c],
              h = z(e) ? e : [e, e, e, e];p(["Top", "Right", "Bottom", "Left"], function (e, d) {
            a[c][d] = y(b[c + e], h[d]);
          });
        });p(F, function (b, c) {
          a[b] = y(a.margin[c], a.spacing[c]);
        });a.axisOffset = [0, 0, 0, 0];a.clipOffset = [0, 0, 0, 0];
      }, drawChartBox: function drawChartBox() {
        var a = this.options.chart,
            b = this.renderer,
            c = this.chartWidth,
            e = this.chartHeight,
            h = this.chartBackground,
            d = this.plotBackground,
            k = this.plotBorder,
            f,
            m = this.plotBGImage,
            n = a.backgroundColor,
            p = a.plotBackgroundColor,
            y = a.plotBackgroundImage,
            g,
            l = this.plotLeft,
            q = this.plotTop,
            t = this.plotWidth,
            w = this.plotHeight,
            x = this.plotBox,
            r = this.clipRect,
            z = this.clipBox,
            J = "animate";h || (this.chartBackground = h = b.rect().addClass("highcharts-background").add(), J = "attr");f = a.borderWidth || 0;g = f + (a.shadow ? 8 : 0);n = { fill: n || "none" };if (f || h["stroke-width"]) n.stroke = a.borderColor, n["stroke-width"] = f;h.attr(n).shadow(a.shadow);h[J]({ x: g / 2, y: g / 2, width: c - g - f % 2, height: e - g - f % 2, r: a.borderRadius });J = "animate";d || (J = "attr", this.plotBackground = d = b.rect().addClass("highcharts-plot-background").add());d[J](x);d.attr({ fill: p || "none" }).shadow(a.plotShadow);y && (m ? m.animate(x) : this.plotBGImage = b.image(y, l, q, t, w).add());r ? r.animate({ width: z.width, height: z.height }) : this.clipRect = b.clipRect(z);J = "animate";k || (J = "attr", this.plotBorder = k = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
        k.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });k[J](k.crisp({ x: l, y: q, width: t, height: w }, -k.strokeWidth()));this.isDirtyBox = !1;
      }, propFromSeries: function propFromSeries() {
        var a = this,
            b = a.options.chart,
            c,
            e = a.options.series,
            h,
            d;p(["inverted", "angular", "polar"], function (k) {
          c = I[b.type || b.defaultSeriesType];d = b[k] || c && c.prototype[k];for (h = e && e.length; !d && h--;) {
            (c = I[e[h].type]) && c.prototype[k] && (d = !0);
          }a[k] = d;
        });
      }, linkSeries: function linkSeries() {
        var a = this,
            b = a.series;p(b, function (a) {
          a.linkedSeries.length = 0;
        });p(b, function (b) {
          var c = b.options.linkedTo;e(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = y(b.options.visible, c.options.visible, b.visible));
        });
      }, renderSeries: function renderSeries() {
        p(this.series, function (a) {
          a.translate();a.render();
        });
      }, renderLabels: function renderLabels() {
        var a = this,
            b = a.options.labels;b.items && p(b.items, function (c) {
          var e = C(b.style, c.style),
              h = J(e.left) + a.plotLeft,
              d = J(e.top) + a.plotTop + 12;delete e.left;delete e.top;a.renderer.text(c.html, h, d).attr({ zIndex: 2 }).css(e).add();
        });
      }, render: function render() {
        var a = this.axes,
            b = this.renderer,
            c = this.options,
            e,
            h,
            d;this.setTitle();this.legend = new x(this, c.legend);this.getStacks && this.getStacks();this.getMargins(!0);this.setChartSize();c = this.plotWidth;e = this.plotHeight -= 21;p(a, function (a) {
          a.setScale();
        });this.getAxisMargins();h = 1.1 < c / this.plotWidth;d = 1.05 < e / this.plotHeight;if (h || d) p(a, function (a) {
          (a.horiz && h || !a.horiz && d) && a.setTickInterval(!0);
        }), this.getMargins();this.drawChartBox();this.hasCartesianSeries && p(a, function (a) {
          a.visible && a.render();
        });this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive && this.setResponsive();this.hasRendered = !0;
      }, addCredits: function addCredits(a) {
        var b = this;a = w(!0, this.options.credits, a);a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
          a.href && (N.location.href = a.href);
        }).attr({ align: a.position.align,
          zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function (a) {
          b.credits = b.credits.destroy();b.addCredits(a);
        });
      }, destroy: function destroy() {
        var b = this,
            c = b.axes,
            e = b.series,
            h = b.container,
            d,
            k = h && h.parentNode;m(b, "destroy");q[b.index] = void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");K(b);for (d = c.length; d--;) {
          c[d] = c[d].destroy();
        }this.scroller && this.scroller.destroy && this.scroller.destroy();for (d = e.length; d--;) {
          e[d] = e[d].destroy();
        }p("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
          var c = b[a];c && c.destroy && (b[a] = c.destroy());
        });h && (h.innerHTML = "", K(h), k && l(h));for (d in b) {
          delete b[d];
        }
      }, isReadyToRender: function isReadyToRender() {
        var a = this;return D || N != N.top || "complete" === r.readyState ? !0 : (r.attachEvent("onreadystatechange", function () {
          r.detachEvent("onreadystatechange", a.firstRender);"complete" === r.readyState && a.firstRender();
        }), !1);
      }, firstRender: function firstRender() {
        var a = this,
            b = a.options;if (a.isReadyToRender()) {
          a.getContainer();m(a, "init");a.resetMargins();a.setChartSize();a.propFromSeries();
          a.getAxes();p(b.series || [], function (b) {
            a.initSeries(b);
          });a.linkSeries();m(a, "beforeRender");h && (a.pointer = new h(a, b));a.render();if (!a.renderer.imgCount && a.onload) a.onload();a.cloneRenderTo(!0);
        }
      }, onload: function onload() {
        p([this.callback].concat(this.callbacks), function (a) {
          a && void 0 !== this.index && a.apply(this, [this]);
        }, this);m(this, "load");m(this, "render");b(this.index) && !1 !== this.options.chart.reflow && this.initReflow();this.onload = null;
      } };
  })(L);(function (a) {
    var B,
        A = a.each,
        H = a.extend,
        G = a.erase,
        r = a.fireEvent,
        g = a.format,
        f = a.isArray,
        u = a.isNumber,
        l = a.pick,
        q = a.removeEvent;B = a.Point = function () {};B.prototype = { init: function init(a, b, f) {
        this.series = a;this.color = a.color;this.applyOptions(b, f);a.options.colorByPoint ? (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter], b = b.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === b && (a.colorCounter = 0)) : f = a.colorIndex;this.colorIndex = l(this.colorIndex, f);a.chart.pointCount++;return this;
      }, applyOptions: function applyOptions(a, b) {
        var d = this.series,
            f = d.options.pointValKey || d.pointValKey;a = B.prototype.optionsToObject.call(this, a);H(this, a);this.options = this.options ? H(this.options, a) : a;a.group && delete this.group;f && (this.y = this[f]);this.isNull = l(this.isValid && !this.isValid(), null === this.x || !u(this.y, !0));this.selected && (this.state = "select");"name" in this && void 0 === b && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));void 0 === this.x && d && (this.x = void 0 === b ? d.autoIncrement(this) : b);return this;
      }, optionsToObject: function optionsToObject(a) {
        var b = {},
            d = this.series,
            g = d.options.keys,
            l = g || d.pointArrayMap || ["y"],
            m = l.length,
            c = 0,
            n = 0;if (u(a) || null === a) b[l[0]] = a;else if (f(a)) for (!g && a.length > m && (d = _typeof(a[0]), "string" === d ? b.name = a[0] : "number" === d && (b.x = a[0]), c++); n < m;) {
          g && void 0 === a[c] || (b[l[n]] = a[c]), c++, n++;
        } else "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && (b = a, a.dataLabels && (d._hasPointLabels = !0), a.marker && (d._hasPointMarkers = !0));return b;
      }, getClassName: function getClassName() {
        return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
      }, getZone: function getZone() {
        var a = this.series,
            b = a.zones,
            a = a.zoneAxis || "y",
            f = 0,
            g;for (g = b[f]; this[a] >= g.value;) {
          g = b[++f];
        }g && g.color && !this.options.color && (this.color = g.color);return g;
      }, destroy: function destroy() {
        var a = this.series.chart,
            b = a.hoverPoints,
            f;a.pointCount--;b && (this.setState(), G(b, this), b.length || (a.hoverPoints = null));if (this === a.hoverPoint) this.onMouseOut();if (this.graphic || this.dataLabel) q(this), this.destroyElements();this.legendItem && a.legend.destroyItem(this);for (f in this) {
          this[f] = null;
        }
      }, destroyElements: function destroyElements() {
        for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], b, f = 6; f--;) {
          b = a[f], this[b] && (this[b] = this[b].destroy());
        }
      }, getLabelConfig: function getLabelConfig() {
        return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series,
          point: this, percentage: this.percentage, total: this.total || this.stackTotal };
      }, tooltipFormatter: function tooltipFormatter(a) {
        var b = this.series,
            d = b.tooltipOptions,
            f = l(d.valueDecimals, ""),
            q = d.valuePrefix || "",
            m = d.valueSuffix || "";A(b.pointArrayMap || ["y"], function (b) {
          b = "{point." + b;if (q || m) a = a.replace(b + "}", q + b + "}" + m);a = a.replace(b + "}", b + ":,." + f + "f}");
        });return g(a, { point: this, series: this.series });
      }, firePointEvent: function firePointEvent(a, b, f) {
        var d = this,
            g = this.series.options;(g.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();"click" === a && g.allowPointSelect && (f = function f(a) {
          d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
        });r(this, a, b, f);
      }, visible: !0 };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.animObject,
        H = a.arrayMax,
        G = a.arrayMin,
        r = a.correctFloat,
        g = a.Date,
        f = a.defaultOptions,
        u = a.defaultPlotOptions,
        l = a.defined,
        q = a.each,
        d = a.erase,
        b = a.extend,
        p = a.fireEvent,
        C = a.grep,
        t = a.isArray,
        m = a.isNumber,
        c = a.isString,
        n = a.merge,
        E = a.pick,
        z = a.removeEvent,
        e = a.splat,
        x = a.SVGElement,
        F = a.syncTimeout,
        w = a.win;a.Series = a.seriesType("line", null, { lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", radius: 4, states: { hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { align: "center", formatter: function formatter() {
          return null === this.y ? "" : a.numberFormat(this.y, -1);
        }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom",
        x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { hover: { lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { marker: {} } }, stickyTracking: !0, turboThreshold: 1E3 }, { isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function init(a, c) {
        var e = this,
            h,
            d,
            k = a.series,
            f;e.chart = a;e.options = c = e.setOptions(c);e.linkedSeries = [];e.bindAxes();b(e, { name: c.name, state: "", visible: !1 !== c.visible, selected: !0 === c.selected });d = c.events;for (h in d) {
          B(e, h, d[h]);
        }if (d && d.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) a.runTrackerClick = !0;e.getColor();e.getSymbol();q(e.parallelArrays, function (a) {
          e[a + "Data"] = [];
        });e.setData(c.data, !1);e.isCartesian && (a.hasCartesianSeries = !0);k.length && (f = k[k.length - 1]);e._i = E(f && f._i, -1) + 1;a.orderSeries(this.insert(k));
      }, insert: function insert(a) {
        var b = this.options.index,
            c;if (m(b)) {
          for (c = a.length; c--;) {
            if (b >= E(a[c].options.index, a[c]._i)) {
              a.splice(c + 1, 0, this);break;
            }
          }-1 === c && a.unshift(this);c += 1;
        } else a.push(this);return E(c, a.length - 1);
      }, bindAxes: function bindAxes() {
        var b = this,
            c = b.options,
            e = b.chart,
            d;q(b.axisTypes || [], function (h) {
          q(e[h], function (a) {
            d = a.options;if (c[h] === d.index || void 0 !== c[h] && c[h] === d.id || void 0 === c[h] && 0 === d.index) b.insert(a.series), b[h] = a, a.isDirty = !0;
          });b[h] || b.optionalAxis === h || a.error(18, !0);
        });
      }, updateParallelArrays: function updateParallelArrays(a, b) {
        var c = a.series,
            e = arguments,
            h = m(b) ? function (e) {
          var h = "y" === e && c.toYData ? c.toYData(a) : a[e];c[e + "Data"][b] = h;
        } : function (a) {
          Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2));
        };q(c.parallelArrays, h);
      }, autoIncrement: function autoIncrement() {
        var a = this.options,
            b = this.xIncrement,
            c,
            e = a.pointIntervalUnit,
            b = E(b, a.pointStart, 0);this.pointInterval = c = E(this.pointInterval, a.pointInterval, 1);e && (a = new g(b), "day" === e ? a = +a[g.hcSetDate](a[g.hcGetDate]() + c) : "month" === e ? a = +a[g.hcSetMonth](a[g.hcGetMonth]() + c) : "year" === e && (a = +a[g.hcSetFullYear](a[g.hcGetFullYear]() + c)), c = a - b);this.xIncrement = b + c;return b;
      }, setOptions: function setOptions(a) {
        var b = this.chart,
            c = b.options.plotOptions,
            b = b.userOptions || {},
            e = b.plotOptions || {},
            h = c[this.type];this.userOptions = a;c = n(h, c.series, a);this.tooltipOptions = n(f.tooltip, f.plotOptions[this.type].tooltip, b.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip);null === h.marker && delete c.marker;this.zoneAxis = c.zoneAxis;a = this.zones = (c.zones || []).slice();!c.negativeColor && !c.negativeFillColor || c.zones || a.push({ value: c[this.zoneAxis + "Threshold"] || c.threshold || 0, className: "highcharts-negative",
          color: c.negativeColor, fillColor: c.negativeFillColor });a.length && l(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor });return c;
      }, getCyclic: function getCyclic(a, b, c) {
        var e,
            h = this.chart,
            d = this.userOptions,
            f = a + "Index",
            n = a + "Counter",
            m = c ? c.length : E(h.options.chart[a + "Count"], h[a + "Count"]);b || (e = E(d[f], d["_" + f]), l(e) || (h.series.length || (h[n] = 0), d["_" + f] = e = h[n] % m, h[n] += 1), c && (b = c[e]));void 0 !== e && (this[f] = e);this[a] = b;
      }, getColor: function getColor() {
        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || u[this.type].color, this.chart.options.colors);
      }, getSymbol: function getSymbol() {
        this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
      }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, setData: function setData(b, e, d, f) {
        var h = this,
            k = h.points,
            n = k && k.length || 0,
            g,
            p = h.options,
            y = h.chart,
            l = null,
            w = h.xAxis,
            x = p.turboThreshold,
            r = this.xData,
            z = this.yData,
            F = (g = h.pointArrayMap) && g.length;b = b || [];g = b.length;e = E(e, !0);if (!1 !== f && g && n === g && !h.cropped && !h.hasGroupedData && h.visible) q(b, function (a, b) {
          k[b].update && a !== p.data[b] && k[b].update(a, !1, null, !1);
        });else {
          h.xIncrement = null;h.colorCounter = 0;q(this.parallelArrays, function (a) {
            h[a + "Data"].length = 0;
          });if (x && g > x) {
            for (d = 0; null === l && d < g;) {
              l = b[d], d++;
            }if (m(l)) for (d = 0; d < g; d++) {
              r[d] = this.autoIncrement(), z[d] = b[d];
            } else if (t(l)) {
              if (F) for (d = 0; d < g; d++) {
                l = b[d], r[d] = l[0], z[d] = l.slice(1, F + 1);
              } else for (d = 0; d < g; d++) {
                l = b[d], r[d] = l[0], z[d] = l[1];
              }
            } else a.error(12);
          } else for (d = 0; d < g; d++) {
            void 0 !== b[d] && (l = { series: h }, h.pointClass.prototype.applyOptions.apply(l, [b[d]]), h.updateParallelArrays(l, d));
          }c(z[0]) && a.error(14, !0);h.data = [];h.options.data = h.userOptions.data = b;for (d = n; d--;) {
            k[d] && k[d].destroy && k[d].destroy();
          }w && (w.minRange = w.userMinRange);h.isDirty = y.isDirtyBox = !0;h.isDirtyData = !!k;d = !1;
        }"point" === p.legendType && (this.processData(), this.generatePoints());e && y.redraw(d);
      }, processData: function processData(b) {
        var c = this.xData,
            e = this.yData,
            h = c.length,
            d;d = 0;var k,
            f,
            n = this.xAxis,
            m,
            g = this.options;m = g.cropThreshold;var p = this.getExtremesFromAll || g.getExtremesFromAll,
            l = this.isCartesian,
            g = n && n.val2lin,
            q = n && n.isLog,
            t,
            w;if (l && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !b) return !1;n && (b = n.getExtremes(), t = b.min, w = b.max);if (l && this.sorted && !p && (!m || h > m || this.forceCrop)) if (c[h - 1] < t || c[0] > w) c = [], e = [];else if (c[0] < t || c[h - 1] > w) d = this.cropData(this.xData, this.yData, t, w), c = d.xData, e = d.yData, d = d.start, k = !0;for (m = c.length || 1; --m;) {
          h = q ? g(c[m]) - g(c[m - 1]) : c[m] - c[m - 1], 0 < h && (void 0 === f || h < f) ? f = h : 0 > h && this.requireSorting && a.error(15);
        }this.cropped = k;this.cropStart = d;this.processedXData = c;this.processedYData = e;this.closestPointRange = f;
      }, cropData: function cropData(a, b, c, e) {
        var h = a.length,
            d = 0,
            f = h,
            n = E(this.cropShoulder, 1),
            m;for (m = 0; m < h; m++) {
          if (a[m] >= c) {
            d = Math.max(0, m - n);break;
          }
        }for (c = m; c < h; c++) {
          if (a[c] > e) {
            f = c + n;break;
          }
        }return { xData: a.slice(d, f), yData: b.slice(d, f), start: d, end: f };
      }, generatePoints: function generatePoints() {
        var a = this.options.data,
            b = this.data,
            c,
            d = this.processedXData,
            f = this.processedYData,
            k = this.pointClass,
            n = d.length,
            m = this.cropStart || 0,
            g,
            p = this.hasGroupedData,
            l,
            q = [],
            t;b || p || (b = [], b.length = a.length, b = this.data = b);for (t = 0; t < n; t++) {
          g = m + t, p ? (l = new k().init(this, [d[t]].concat(e(f[t]))), l.dataGroup = this.groupMap[t]) : (l = b[g]) || void 0 === a[g] || (b[g] = l = new k().init(this, a[g], d[t])), l.index = g, q[t] = l;
        }if (b && (n !== (c = b.length) || p)) for (t = 0; t < c; t++) {
          t !== m || p || (t += n), b[t] && (b[t].destroyElements(), b[t].plotX = void 0);
        }this.data = b;this.points = q;
      }, getExtremes: function getExtremes(a) {
        var b = this.yAxis,
            c = this.processedXData,
            e,
            h = [],
            d = 0;e = this.xAxis.getExtremes();var f = e.min,
            n = e.max,
            g,
            p,
            l,
            q;a = a || this.stackedYData || this.processedYData || [];e = a.length;for (q = 0; q < e; q++) {
          if (p = c[q], l = a[q], g = (m(l, !0) || t(l)) && (!b.isLog || l.length || 0 < l), p = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[q + 1] || p) >= f && (c[q - 1] || p) <= n, g && p) if (g = l.length) for (; g--;) {
            null !== l[g] && (h[d++] = l[g]);
          } else h[d++] = l;
        }this.dataMin = G(h);this.dataMax = H(h);
      }, translate: function translate() {
        this.processedXData || this.processData();this.generatePoints();var a = this.options,
            b = a.stacking,
            c = this.xAxis,
            e = c.categories,
            d = this.yAxis,
            k = this.points,
            f = k.length,
            n = !!this.modifyValue,
            g = a.pointPlacement,
            p = "between" === g || m(g),
            q = a.threshold,
            t = a.startFromThreshold ? q : 0,
            w,
            x,
            z,
            F,
            u = Number.MAX_VALUE;"between" === g && (g = .5);m(g) && (g *= E(a.pointRange || c.pointRange));for (a = 0; a < f; a++) {
          var C = k[a],
              A = C.x,
              B = C.y;x = C.low;var H = b && d.stacks[(this.negStacks && B < (t ? 0 : q) ? "-" : "") + this.stackKey],
              G;d.isLog && null !== B && 0 >= B && (C.isNull = !0);C.plotX = w = r(Math.min(Math.max(-1E5, c.translate(A, 0, 0, 0, 1, g, "flags" === this.type)), 1E5));b && this.visible && !C.isNull && H && H[A] && (F = this.getStackIndicator(F, A, this.index), G = H[A], B = G.points[F.key], x = B[0], B = B[1], x === t && F.key === H[A].base && (x = E(q, d.min)), d.isLog && 0 >= x && (x = null), C.total = C.stackTotal = G.total, C.percentage = G.total && C.y / G.total * 100, C.stackY = B, G.setOffset(this.pointXOffset || 0, this.barW || 0));C.yBottom = l(x) ? d.translate(x, 0, 1, 0, 1) : null;n && (B = this.modifyValue(B, C));C.plotY = x = "number" === typeof B && Infinity !== B ? Math.min(Math.max(-1E5, d.translate(B, 0, 1, 0, 1)), 1E5) : void 0;C.isInside = void 0 !== x && 0 <= x && x <= d.len && 0 <= w && w <= c.len;C.clientX = p ? r(c.translate(A, 0, 0, 0, 1, g)) : w;C.negative = C.y < (q || 0);C.category = e && void 0 !== e[C.x] ? e[C.x] : C.x;C.isNull || (void 0 !== z && (u = Math.min(u, Math.abs(w - z))), z = w);C.zone = this.zones.length && C.getZone();
        }this.closestPointRangePx = u;
      }, getValidPoints: function getValidPoints(a, b) {
        var c = this.chart;return C(a || this.points || [], function (a) {
          return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull;
        });
      }, setClip: function setClip(a) {
        var b = this.chart,
            c = this.options,
            e = b.renderer,
            d = b.inverted,
            h = this.clipBox,
            f = h || b.clipBox,
            n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(),
            m = b[n],
            g = b[n + "m"];m || (a && (f.width = 0, b[n + "m"] = g = e.clipRect(-99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[n] = m = e.clipRect(f), m.count = { length: 0 });a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);!1 !== c.clip && (this.group.clip(a || h ? m : b.clipRect), this.markerGroup.clip(g), this.sharedClipKey = n);a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && n && b[n] && (h || (b[n] = b[n].destroy()), b[n + "m"] && (this.markerGroup.clip(), b[n + "m"] = b[n + "m"].destroy())));
      }, animate: function animate(a) {
        var b = this.chart,
            c = A(this.options.animation),
            e;a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({ width: b.plotSizeX }, c), b[e + "m"] && b[e + "m"].animate({ width: b.plotSizeX + 99 }, c), this.animate = null);
      }, afterAnimate: function afterAnimate() {
        this.setClip();p(this, "afterAnimate");
      }, drawPoints: function drawPoints() {
        var a = this.points,
            b = this.chart,
            c,
            e,
            d,
            k,
            f = this.options.marker,
            n,
            g,
            p,
            l,
            q = this.markerGroup,
            t = E(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * f.radius);if (!1 !== f.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++) {
          d = a[e], c = d.plotY, k = d.graphic, n = d.marker || {}, g = !!d.marker, p = t && void 0 === n.enabled || n.enabled, l = d.isInside, p && m(c) && null !== d.y ? (c = E(n.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), p = this.markerAttribs(d, d.selected && "select"), k ? k[l ? "show" : "hide"](!0).animate(p) : l && (0 < p.width || d.hasImage) && (d.graphic = k = b.renderer.symbol(c, p.x, p.y, p.width, p.height, g ? n : f).add(q)), k && k.attr(this.pointAttribs(d, d.selected && "select")), k && k.addClass(d.getClassName(), !0)) : k && (d.graphic = k.destroy());
        }
      }, markerAttribs: function markerAttribs(a, b) {
        var c = this.options.marker,
            e = a.marker || {},
            d = E(e.radius, c.radius);b && (c = c.states[b], b = e.states && e.states[b], d = E(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));a.hasImage && (d = 0);a = { x: Math.floor(a.plotX) - d, y: a.plotY - d };d && (a.width = a.height = 2 * d);return a;
      }, pointAttribs: function pointAttribs(a, b) {
        var c = this.options.marker,
            e = a && a.options,
            d = e && e.marker || {},
            h = this.color,
            f = e && e.color,
            n = a && a.color,
            e = E(d.lineWidth, c.lineWidth);a = a && a.zone && a.zone.color;h = f || a || n || h;a = d.fillColor || c.fillColor || h;h = d.lineColor || c.lineColor || h;b && (c = c.states[b], b = d.states && d.states[b] || {}, e = E(b.lineWidth, c.lineWidth, e + E(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, h = b.lineColor || c.lineColor || h);return { stroke: h, "stroke-width": e, fill: a };
      }, destroy: function destroy() {
        var a = this,
            b = a.chart,
            c = /AppleWebKit\/533/.test(w.navigator.userAgent),
            e,
            f = a.data || [],
            k,
            n,
            m;p(a, "destroy");z(a);q(a.axisTypes || [], function (b) {
          (m = a[b]) && m.series && (d(m.series, a), m.isDirty = m.forceRedraw = !0);
        });a.legendItem && a.chart.legend.destroyItem(a);for (e = f.length; e--;) {
          (k = f[e]) && k.destroy && k.destroy();
        }a.points = null;clearTimeout(a.animationTimeout);for (n in a) {
          a[n] instanceof x && !a[n].survive && (e = c && "group" === n ? "hide" : "destroy", a[n][e]());
        }b.hoverSeries === a && (b.hoverSeries = null);d(b.series, a);b.orderSeries();for (n in a) {
          delete a[n];
        }
      }, getGraphPath: function getGraphPath(a, b, c) {
        var e = this,
            d = e.options,
            h = d.step,
            f,
            n = [],
            m = [],
            g;a = a || e.points;(f = a.reversed) && a.reverse();(h = { right: 1, center: 2 }[h] || h && 3) && f && (h = 4 - h);!d.connectNulls || b || c || (a = this.getValidPoints(a));q(a, function (f, k) {
          var p = f.plotX,
              q = f.plotY,
              t = a[k - 1];(f.leftCliff || t && t.rightCliff) && !c && (g = !0);f.isNull && !l(b) && 0 < k ? g = !d.connectNulls : f.isNull && !b ? g = !0 : (0 === k || g ? k = ["M", f.plotX, f.plotY] : e.getPointSpline ? k = e.getPointSpline(a, f, k) : h ? (k = 1 === h ? ["L", t.plotX, q] : 2 === h ? ["L", (t.plotX + p) / 2, t.plotY, "L", (t.plotX + p) / 2, q] : ["L", p, t.plotY], k.push("L", p, q)) : k = ["L", p, q], m.push(f.x), h && m.push(f.x), n.push.apply(n, k), g = !1);
        });n.xMap = m;return e.graphPath = n;
      }, drawGraph: function drawGraph() {
        var a = this,
            b = this.options,
            c = (this.gappedPath || this.getGraphPath).call(this),
            e = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];q(this.zones, function (c, d) {
          e.push(["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle]);
        });q(e, function (e, d) {
          var h = e[0],
              f = a[h];f ? (f.endX = c.xMap, f.animate({ d: c })) : c.length && (a[h] = a.chart.renderer.path(c).addClass(e[1]).attr({ zIndex: 1 }).add(a.group), f = { stroke: e[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[h].attr(f).shadow(2 > d && b.shadow));f && (f.startX = c.xMap, f.isArea = c.isArea);
        });
      }, applyZones: function applyZones() {
        var a = this,
            b = this.chart,
            c = b.renderer,
            e = this.zones,
            d,
            f,
            n = this.clips || [],
            m,
            g = this.graph,
            p = this.area,
            l = Math.max(b.chartWidth, b.chartHeight),
            t = this[(this.zoneAxis || "y") + "Axis"],
            w,
            x,
            r = b.inverted,
            z,
            F,
            u,
            C,
            A = !1;e.length && (g || p) && t && void 0 !== t.min && (x = t.reversed, z = t.horiz, g && g.hide(), p && p.hide(), w = t.getExtremes(), q(e, function (e, h) {
          d = x ? z ? b.plotWidth : 0 : z ? 0 : t.toPixels(w.min);d = Math.min(Math.max(E(f, d), 0), l);f = Math.min(Math.max(Math.round(t.toPixels(E(e.value, w.max), !0)), 0), l);A && (d = f = t.toPixels(w.max));F = Math.abs(d - f);u = Math.min(d, f);C = Math.max(d, f);t.isXAxis ? (m = { x: r ? C : u, y: 0, width: F, height: l }, z || (m.x = b.plotHeight - m.x)) : (m = { x: 0, y: r ? C : u, width: l, height: F }, z && (m.y = b.plotWidth - m.y));r && c.isVML && (m = t.isXAxis ? { x: 0, y: x ? u : C, height: m.width, width: b.chartWidth } : { x: m.y - b.plotLeft - b.spacingBox.x, y: 0, width: m.height, height: b.chartHeight });n[h] ? n[h].animate(m) : (n[h] = c.clipRect(m), g && a["zone-graph-" + h].clip(n[h]), p && a["zone-area-" + h].clip(n[h]));A = e.value > w.max;
        }), this.clips = n);
      }, invertGroups: function invertGroups(a) {
        function b() {
          q(["group", "markerGroup"], function (b) {
            c[b] && (c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a));
          });
        }var c = this,
            e;c.xAxis && (e = B(c.chart, "resize", b), B(c, "destroy", e), b(a), c.invertGroups = b);
      }, plotGroup: function plotGroup(a, b, c, e, d) {
        var h = this[a],
            f = !h;f && (this[a] = h = this.chart.renderer.g(b).attr({ zIndex: e || .1 }).add(d), h.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));h.attr({ visibility: c })[f ? "attr" : "animate"](this.getPlotBox());return h;
      }, getPlotBox: function getPlotBox() {
        var a = this.chart,
            b = this.xAxis,
            c = this.yAxis;a.inverted && (b = c, c = this.xAxis);return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 };
      }, render: function render() {
        var a = this,
            b = a.chart,
            c,
            e = a.options,
            d = !!a.animate && b.renderer.isSVG && A(e.animation).duration,
            f = a.visible ? "inherit" : "hidden",
            n = e.zIndex,
            m = a.hasRendered,
            g = b.seriesGroup,
            p = b.inverted;c = a.plotGroup("group", "series", f, n, g);a.markerGroup = a.plotGroup("markerGroup", "markers", f, n, g);d && a.animate(!0);c.inverted = a.isCartesian ? p : !1;a.drawGraph && (a.drawGraph(), a.applyZones());a.drawDataLabels && a.drawDataLabels();a.visible && a.drawPoints();a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();a.invertGroups(p);!1 === e.clip || a.sharedClipKey || m || c.clip(b.clipRect);d && a.animate();m || (a.animationTimeout = F(function () {
          a.afterAnimate();
        }, d));a.isDirty = !1;a.hasRendered = !0;
      }, redraw: function redraw() {
        var a = this.chart,
            b = this.isDirty || this.isDirtyData,
            c = this.group,
            e = this.xAxis,
            d = this.yAxis;c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: E(e && e.left, a.plotLeft), translateY: E(d && d.top, a.plotTop) }));this.translate();this.render();b && delete this.kdTree;
      }, kdDimensions: 1, kdAxisArray: ["clientX", "plotY"], searchPoint: function searchPoint(a, b) {
        var c = this.xAxis,
            e = this.yAxis,
            d = this.chart.inverted;return this.searchKDTree({ clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos }, b);
      }, buildKDTree: function buildKDTree() {
        function a(c, e, d) {
          var h, f;if (f = c && c.length) return h = b.kdAxisArray[e % d], c.sort(function (a, b) {
            return a[h] - b[h];
          }), f = Math.floor(f / 2), { point: c[f], left: a(c.slice(0, f), e + 1, d), right: a(c.slice(f + 1), e + 1, d) };
        }this.buildingKdTree = !0;var b = this,
            c = b.kdDimensions;delete b.kdTree;F(function () {
          b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);b.buildingKdTree = !1;
        }, b.options.kdNow ? 0 : 1);
      }, searchKDTree: function searchKDTree(a, b) {
        function c(a, b, k, n) {
          var m = b.point,
              g = e.kdAxisArray[k % n],
              p,
              t,
              q = m;t = l(a[d]) && l(m[d]) ? Math.pow(a[d] - m[d], 2) : null;p = l(a[h]) && l(m[h]) ? Math.pow(a[h] - m[h], 2) : null;p = (t || 0) + (p || 0);m.dist = l(p) ? Math.sqrt(p) : Number.MAX_VALUE;m.distX = l(t) ? Math.sqrt(t) : Number.MAX_VALUE;g = a[g] - m[g];p = 0 > g ? "left" : "right";t = 0 > g ? "right" : "left";b[p] && (p = c(a, b[p], k + 1, n), q = p[f] < q[f] ? p : m);b[t] && Math.sqrt(g * g) < q[f] && (a = c(a, b[t], k + 1, n), q = a[f] < q[f] ? a : q);return q;
        }var e = this,
            d = this.kdAxisArray[0],
            h = this.kdAxisArray[1],
            f = b ? "distX" : "dist";
        this.kdTree || this.buildingKdTree || this.buildKDTree();if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions);
      } });
  })(L);(function (a) {
    function B(a, d, b, f, g) {
      var p = a.chart.inverted;this.axis = a;this.isNegative = b;this.options = d;this.x = f;this.total = null;this.points = {};this.stack = g;this.rightCliff = this.leftCliff = 0;this.alignOptions = { align: d.align || (p ? b ? "left" : "right" : "center"), verticalAlign: d.verticalAlign || (p ? "middle" : b ? "bottom" : "top"), y: l(d.y, p ? 4 : b ? 14 : -6), x: l(d.x, p ? b ? -6 : 6 : 0) };this.textAlign = d.textAlign || (p ? b ? "right" : "left" : "center");
    }var A = a.Axis,
        H = a.Chart,
        G = a.correctFloat,
        r = a.defined,
        g = a.destroyObjectProperties,
        f = a.each,
        u = a.format,
        l = a.pick;a = a.Series;B.prototype = { destroy: function destroy() {
        g(this, this.axis);
      }, render: function render(a) {
        var d = this.options,
            b = d.format,
            b = b ? u(b, this) : d.formatter.call(this);this.label ? this.label.attr({ text: b, visibility: "hidden" }) : this.label = this.axis.chart.renderer.text(b, null, null, d.useHTML).css(d.style).attr({ align: this.textAlign, rotation: d.rotation, visibility: "hidden" }).add(a);
      },
      setOffset: function setOffset(a, d) {
        var b = this.axis,
            f = b.chart,
            g = f.inverted,
            l = b.reversed,
            l = this.isNegative && !l || !this.isNegative && l,
            m = b.translate(b.usePercentage ? 100 : this.total, 0, 0, 0, 1),
            b = b.translate(0),
            b = Math.abs(m - b);a = f.xAxis[0].translate(this.x) + a;var c = f.plotHeight,
            g = { x: g ? l ? m : m - b : a, y: g ? c - a - d : l ? c - m - b : c - m, width: g ? b : d, height: g ? d : b };if (d = this.label) d.align(this.alignOptions, null, g), g = d.alignAttr, d[!1 === this.options.crop || f.isInsidePlot(g.x, g.y) ? "show" : "hide"](!0);
      } };H.prototype.getStacks = function () {
      var a = this;
      f(a.yAxis, function (a) {
        a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
      });f(a.series, function (d) {
        !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries || (d.stackKey = d.type + l(d.options.stack, ""));
      });
    };A.prototype.buildStacks = function () {
      var a = this.series,
          d,
          b = l(this.options.reversedStacks, !0),
          f = a.length,
          g;if (!this.isXAxis) {
        this.usePercentage = !1;for (g = f; g--;) {
          a[b ? g : f - g - 1].setStackedPoints();
        }for (g = f; g--;) {
          d = a[b ? g : f - g - 1], d.setStackCliffs && d.setStackCliffs();
        }if (this.usePercentage) for (g = 0; g < f; g++) {
          a[g].setPercentStacks();
        }
      }
    };A.prototype.renderStackTotals = function () {
      var a = this.chart,
          d = a.renderer,
          b = this.stacks,
          f,
          g,
          l = this.stackTotalGroup;l || (this.stackTotalGroup = l = d.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add());l.translate(a.plotLeft, a.plotTop);for (f in b) {
        for (g in a = b[f], a) {
          a[g].render(l);
        }
      }
    };A.prototype.resetStacks = function () {
      var a = this.stacks,
          d,
          b;if (!this.isXAxis) for (d in a) {
        for (b in a[d]) {
          a[d][b].touched < this.stacksTouched ? (a[d][b].destroy(), delete a[d][b]) : (a[d][b].total = null, a[d][b].cum = null);
        }
      }
    };A.prototype.cleanStacks = function () {
      var a, d, b;if (!this.isXAxis) for (d in this.oldStacks && (a = this.stacks = this.oldStacks), a) {
        for (b in a[d]) {
          a[d][b].cum = a[d][b].total;
        }
      }
    };a.prototype.setStackedPoints = function () {
      if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
        var a = this.processedXData,
            d = this.processedYData,
            b = [],
            f = d.length,
            g = this.options,
            t = g.threshold,
            m = g.startFromThreshold ? t : 0,
            c = g.stack,
            g = g.stacking,
            n = this.stackKey,
            u = "-" + n,
            z = this.negStacks,
            e = this.yAxis,
            x = e.stacks,
            F = e.oldStacks,
            w,
            h,
            y,
            A,
            K,
            I,
            k;e.stacksTouched += 1;for (K = 0; K < f; K++) {
          I = a[K], k = d[K], w = this.getStackIndicator(w, I, this.index), A = w.key, y = (h = z && k < (m ? 0 : t)) ? u : n, x[y] || (x[y] = {}), x[y][I] || (F[y] && F[y][I] ? (x[y][I] = F[y][I], x[y][I].total = null) : x[y][I] = new B(e, e.options.stackLabels, h, I, c)), y = x[y][I], null !== k && (y.points[A] = y.points[this.index] = [l(y.cum, m)], r(y.cum) || (y.base = A), y.touched = e.stacksTouched, 0 < w.index && !1 === this.singleStacks && (y.points[A][0] = y.points[this.index + "," + I + ",0"][0])), "percent" === g ? (h = h ? n : u, z && x[h] && x[h][I] ? (h = x[h][I], y.total = h.total = Math.max(h.total, y.total) + Math.abs(k) || 0) : y.total = G(y.total + (Math.abs(k) || 0))) : y.total = G(y.total + (k || 0)), y.cum = l(y.cum, m) + (k || 0), null !== k && (y.points[A].push(y.cum), b[K] = y.cum);
        }"percent" === g && (e.usePercentage = !0);this.stackedYData = b;e.oldStacks = {};
      }
    };a.prototype.setPercentStacks = function () {
      var a = this,
          d = a.stackKey,
          b = a.yAxis.stacks,
          g = a.processedXData,
          l;f([d, "-" + d], function (d) {
        for (var f = g.length, c, n; f--;) {
          if (c = g[f], l = a.getStackIndicator(l, c, a.index, d), c = (n = b[d] && b[d][c]) && n.points[l.key]) n = n.total ? 100 / n.total : 0, c[0] = G(c[0] * n), c[1] = G(c[1] * n), a.stackedYData[f] = c[1];
        }
      });
    };a.prototype.getStackIndicator = function (a, d, b, f) {
      !r(a) || a.x !== d || f && a.key !== f ? a = { x: d, index: 0, key: f } : a.index++;a.key = [b, d, a.index].join();return a;
    };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.animate,
        H = a.Axis,
        G = a.createElement,
        r = a.css,
        g = a.defined,
        f = a.each,
        u = a.erase,
        l = a.extend,
        q = a.fireEvent,
        d = a.inArray,
        b = a.isNumber,
        p = a.isObject,
        C = a.merge,
        t = a.pick,
        m = a.Point,
        c = a.Series,
        n = a.seriesTypes,
        E = a.setAnimation,
        z = a.splat;l(a.Chart.prototype, { addSeries: function addSeries(a, b, c) {
        var e,
            d = this;a && (b = t(b, !0), q(d, "addSeries", { options: a }, function () {
          e = d.initSeries(a);d.isDirtyLegend = !0;d.linkSeries();b && d.redraw(c);
        }));return e;
      }, addAxis: function addAxis(a, b, c, d) {
        var e = b ? "xAxis" : "yAxis",
            f = this.options;a = C(a, { index: this[e].length, isX: b });new H(this, a);f[e] = z(f[e] || {});f[e].push(a);t(c, !0) && this.redraw(d);
      }, showLoading: function showLoading(a) {
        var b = this,
            c = b.options,
            e = b.loadingDiv,
            d = c.loading,
            f = function f() {
          e && r(e, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" });
        };e || (b.loadingDiv = e = G("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = G("span", { className: "highcharts-loading-inner" }, null, e), B(b, "redraw", f));e.className = "highcharts-loading";b.loadingSpan.innerHTML = a || c.lang.loading;r(e, l(d.style, { zIndex: 10 }));r(b.loadingSpan, d.labelStyle);b.loadingShown || (r(e, { opacity: 0, display: "" }), A(e, { opacity: d.style.opacity || .5 }, { duration: d.showDuration || 0 }));b.loadingShown = !0;f();
      }, hideLoading: function hideLoading() {
        var a = this.options,
            b = this.loadingDiv;b && (b.className = "highcharts-loading highcharts-loading-hidden", A(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function complete() {
            r(b, { display: "none" });
          } }));this.loadingShown = !1;
      }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
      propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "), update: function update(a, c) {
        var e,
            n = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
            h = a.chart,
            m,
            p;if (h) {
          C(!0, this.options.chart, h);"className" in h && this.setClassName(h.className);if ("inverted" in h || "polar" in h) this.propFromSeries(), m = !0;for (e in h) {
            h.hasOwnProperty(e) && (-1 !== d("chart." + e, this.propsRequireUpdateSeries) && (p = !0), -1 !== d(e, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
          }"style" in h && this.renderer.setStyle(h.style);
        }for (e in a) {
          if (this[e] && "function" === typeof this[e].update) this[e].update(a[e], !1);else if ("function" === typeof this[n[e]]) this[n[e]](a[e]);"chart" !== e && -1 !== d(e, this.propsRequireUpdateSeries) && (p = !0);
        }a.colors && (this.options.colors = a.colors);a.plotOptions && C(!0, this.options.plotOptions, a.plotOptions);f(["xAxis", "yAxis", "series"], function (b) {
          a[b] && f(z(a[b]), function (a, c) {
            (c = g(a.id) && this.get(a.id) || this[b][c]) && c.coll === b && c.update(a, !1);
          }, this);
        }, this);
        m && f(this.axes, function (a) {
          a.update({}, !1);
        });p && f(this.series, function (a) {
          a.update({}, !1);
        });a.loading && C(!0, this.options.loading, a.loading);e = h && h.width;h = h && h.height;b(e) && e !== this.chartWidth || b(h) && h !== this.chartHeight ? this.setSize(e, h) : t(c, !0) && this.redraw();
      }, setSubtitle: function setSubtitle(a) {
        this.setTitle(void 0, a);
      } });l(m.prototype, { update: function update(a, b, c, d) {
        function e() {
          f.applyOptions(a);null === f.y && n && (f.graphic = n.destroy());p(a, !0) && (n && n.element && a && a.marker && a.marker.symbol && (f.graphic = n.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));m = f.index;g.updateParallelArrays(f, m);l.data[m] = p(l.data[m], !0) ? f.options : a;g.isDirty = g.isDirtyData = !0;!g.fixedBox && g.hasCartesianSeries && (k.isDirtyBox = !0);"point" === l.legendType && (k.isDirtyLegend = !0);b && k.redraw(c);
        }var f = this,
            g = f.series,
            n = f.graphic,
            m,
            k = g.chart,
            l = g.options;b = t(b, !0);!1 === d ? e() : f.firePointEvent("update", { options: a }, e);
      }, remove: function remove(a, b) {
        this.series.removePoint(d(this, this.series.data), a, b);
      } });l(c.prototype, { addPoint: function addPoint(a, b, c, d) {
        var e = this.options,
            f = this.data,
            g = this.chart,
            n = this.xAxis,
            n = n && n.hasNames && n.names,
            m = e.data,
            k,
            p,
            l = this.xData,
            q,
            w;b = t(b, !0);k = { series: this };this.pointClass.prototype.applyOptions.apply(k, [a]);w = k.x;q = l.length;if (this.requireSorting && w < l[q - 1]) for (p = !0; q && l[q - 1] > w;) {
          q--;
        }this.updateParallelArrays(k, "splice", q, 0, 0);this.updateParallelArrays(k, q);n && k.name && (n[w] = k.name);m.splice(q, 0, a);p && (this.data.splice(q, 0, null), this.processData());"point" === e.legendType && this.generatePoints();c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), m.shift()));this.isDirtyData = this.isDirty = !0;b && g.redraw(d);
      }, removePoint: function removePoint(a, b, c) {
        var e = this,
            d = e.data,
            f = d[a],
            g = e.points,
            n = e.chart,
            m = function m() {
          g && g.length === d.length && g.splice(a, 1);d.splice(a, 1);e.options.data.splice(a, 1);e.updateParallelArrays(f || { series: e }, "splice", a, 1);f && f.destroy();e.isDirty = !0;e.isDirtyData = !0;b && n.redraw();
        };E(c, n);b = t(b, !0);f ? f.firePointEvent("remove", null, m) : m();
      }, remove: function remove(a, b, c) {
        function e() {
          d.destroy();
          f.isDirtyLegend = f.isDirtyBox = !0;f.linkSeries();t(a, !0) && f.redraw(b);
        }var d = this,
            f = d.chart;!1 !== c ? q(d, "remove", null, e) : e();
      }, update: function update(a, b) {
        var c = this,
            e = this.chart,
            d = this.userOptions,
            g = this.type,
            m = a.type || d.type || e.options.chart.type,
            p = n[g].prototype,
            q = ["group", "markerGroup", "dataLabelsGroup"],
            k;if (m && m !== g || void 0 !== a.zIndex) q.length = 0;f(q, function (a) {
          q[a] = c[a];delete c[a];
        });a = C(d, { animation: !1, index: this.index, pointStart: this.xData[0] }, { data: this.options.data }, a);this.remove(!1, null, !1);for (k in p) {
          this[k] = void 0;
        }l(this, n[m || g].prototype);f(q, function (a) {
          c[a] = q[a];
        });this.init(e, a);e.linkSeries();t(b, !0) && e.redraw(!1);
      } });l(H.prototype, { update: function update(a, b) {
        var c = this.chart;a = c.options[this.coll][this.options.index] = C(this.userOptions, a);this.destroy(!0);this.init(c, l(a, { events: void 0 }));c.isDirtyBox = !0;t(b, !0) && c.redraw();
      }, remove: function remove(a) {
        for (var b = this.chart, c = this.coll, e = this.series, d = e.length; d--;) {
          e[d] && e[d].remove(!1);
        }u(b.axes, this);u(b[c], this);b.options[c].splice(this.options.index, 1);f(b[c], function (a, b) {
          a.options.index = b;
        });this.destroy();b.isDirtyBox = !0;t(a, !0) && b.redraw();
      }, setTitle: function setTitle(a, b) {
        this.update({ title: a }, b);
      }, setCategories: function setCategories(a, b) {
        this.update({ categories: a }, b);
      } });
  })(L);(function (a) {
    var B = a.color,
        A = a.each,
        H = a.map,
        G = a.pick,
        r = a.Series,
        g = a.seriesType;g("area", "line", { softThreshold: !1, threshold: 0 }, { singleStacks: !1, getStackPoints: function getStackPoints() {
        var a = [],
            g = [],
            l = this.xAxis,
            q = this.yAxis,
            d = q.stacks[this.stackKey],
            b = {},
            p = this.points,
            r = this.index,
            t = q.series,
            m = t.length,
            c,
            n = G(q.options.reversedStacks, !0) ? 1 : -1,
            E,
            z;if (this.options.stacking) {
          for (E = 0; E < p.length; E++) {
            b[p[E].x] = p[E];
          }for (z in d) {
            null !== d[z].total && g.push(z);
          }g.sort(function (a, b) {
            return a - b;
          });c = H(t, function () {
            return this.visible;
          });A(g, function (e, f) {
            var p = 0,
                t,
                h;if (b[e] && !b[e].isNull) a.push(b[e]), A([-1, 1], function (a) {
              var p = 1 === a ? "rightNull" : "leftNull",
                  l = 0,
                  q = d[g[f + a]];if (q) for (E = r; 0 <= E && E < m;) {
                t = q.points[E], t || (E === r ? b[e][p] = !0 : c[E] && (h = d[e].points[E]) && (l -= h[1] - h[0])), E += n;
              }b[e][1 === a ? "rightCliff" : "leftCliff"] = l;
            });else {
              for (E = r; 0 <= E && E < m;) {
                if (t = d[e].points[E]) {
                  p = t[1];break;
                }E += n;
              }p = q.toPixels(p, !0);a.push({ isNull: !0, plotX: l.toPixels(e, !0), plotY: p, yBottom: p });
            }
          });
        }return a;
      }, getGraphPath: function getGraphPath(a) {
        var f = r.prototype.getGraphPath,
            g = this.options,
            q = g.stacking,
            d = this.yAxis,
            b,
            p,
            C = [],
            t = [],
            m = this.index,
            c,
            n = d.stacks[this.stackKey],
            E = g.threshold,
            z = d.getThreshold(g.threshold),
            e,
            g = g.connectNulls || "percent" === q,
            x = function x(b, e, f) {
          var h = a[b];b = q && n[h.x].points[m];var g = h[f + "Null"] || 0;f = h[f + "Cliff"] || 0;var p,
              l,
              h = !0;f || g ? (p = (g ? b[0] : b[1]) + f, l = b[0] + f, h = !!g) : !q && a[e] && a[e].isNull && (p = l = E);void 0 !== p && (t.push({ plotX: c, plotY: null === p ? z : d.getThreshold(p), isNull: h }), C.push({ plotX: c, plotY: null === l ? z : d.getThreshold(l), doCurve: !1 }));
        };a = a || this.points;q && (a = this.getStackPoints());for (b = 0; b < a.length; b++) {
          if (p = a[b].isNull, c = G(a[b].rectPlotX, a[b].plotX), e = G(a[b].yBottom, z), !p || g) g || x(b, b - 1, "left"), p && !q && g || (t.push(a[b]), C.push({ x: b, plotX: c, plotY: e })), g || x(b, b + 1, "right");
        }b = f.call(this, t, !0, !0);C.reversed = !0;p = f.call(this, C, !0, !0);p.length && (p[0] = "L");p = b.concat(p);f = f.call(this, t, !1, g);p.xMap = b.xMap;this.areaPath = p;return f;
      }, drawGraph: function drawGraph() {
        this.areaPath = [];r.prototype.drawGraph.apply(this);var a = this,
            g = this.areaPath,
            l = this.options,
            q = [["area", "highcharts-area", this.color, l.fillColor]];A(this.zones, function (d, b) {
          q.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + d.className, d.color || a.color, d.fillColor || l.fillColor]);
        });A(q, function (d) {
          var b = d[0],
              f = a[b];f ? (f.endX = g.xMap, f.animate({ d: g })) : (f = a[b] = a.chart.renderer.path(g).addClass(d[1]).attr({ fill: G(d[3], B(d[2]).setOpacity(G(l.fillOpacity, .75)).get()), zIndex: 0 }).add(a.group), f.isArea = !0);f.startX = g.xMap;f.shiftUnit = l.step ? 2 : 1;
        });
      }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
  })(L);(function (a) {
    var B = a.pick;a = a.seriesType;a("spline", "line", {}, { getPointSpline: function getPointSpline(a, H, G) {
        var r = H.plotX,
            g = H.plotY,
            f = a[G - 1];G = a[G + 1];var u, l, q, d;if (f && !f.isNull && !1 !== f.doCurve && G && !G.isNull && !1 !== G.doCurve) {
          a = f.plotY;q = G.plotX;G = G.plotY;var b = 0;u = (1.5 * r + f.plotX) / 2.5;l = (1.5 * g + a) / 2.5;q = (1.5 * r + q) / 2.5;d = (1.5 * g + G) / 2.5;
          q !== u && (b = (d - l) * (q - r) / (q - u) + g - d);l += b;d += b;l > a && l > g ? (l = Math.max(a, g), d = 2 * g - l) : l < a && l < g && (l = Math.min(a, g), d = 2 * g - l);d > G && d > g ? (d = Math.max(G, g), l = 2 * g - d) : d < G && d < g && (d = Math.min(G, g), l = 2 * g - d);H.rightContX = q;H.rightContY = d;
        }H = ["C", B(f.rightContX, f.plotX), B(f.rightContY, f.plotY), B(u, r), B(l, g), r, g];f.rightContX = f.rightContY = null;return H;
      } });
  })(L);(function (a) {
    var B = a.seriesTypes.area.prototype,
        A = a.seriesType;A("areaspline", "spline", a.defaultPlotOptions.area, { getStackPoints: B.getStackPoints, getGraphPath: B.getGraphPath,
      setStackCliffs: B.setStackCliffs, drawGraph: B.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
  })(L);(function (a) {
    var B = a.animObject,
        A = a.color,
        H = a.each,
        G = a.extend,
        r = a.isNumber,
        g = a.merge,
        f = a.pick,
        u = a.Series,
        l = a.seriesType,
        q = a.svg;l("column", "line", { borderRadius: 0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1, shadow: !1 }, select: { color: "#cccccc", borderColor: "#000000", shadow: !1 } }, dataLabels: { align: null, verticalAlign: null,
        y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, { cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function init() {
        u.prototype.init.apply(this, arguments);var a = this,
            b = a.chart;b.hasRendered && H(b.series, function (b) {
          b.type === a.type && (b.isDirty = !0);
        });
      }, getColumnMetrics: function getColumnMetrics() {
        var a = this,
            b = a.options,
            g = a.xAxis,
            l = a.yAxis,
            t = g.reversed,
            m,
            c = {},
            n = 0;!1 === b.grouping ? n = 1 : H(a.chart.series, function (b) {
          var e = b.options,
              d = b.yAxis,
              f;b.type === a.type && b.visible && l.len === d.len && l.pos === d.pos && (e.stacking ? (m = b.stackKey, void 0 === c[m] && (c[m] = n++), f = c[m]) : !1 !== e.grouping && (f = n++), b.columnIndex = f);
        });var q = Math.min(Math.abs(g.transA) * (g.ordinalSlope || b.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
            r = q * b.groupPadding,
            e = (q - 2 * r) / (n || 1),
            b = Math.min(b.maxPointWidth || g.len, f(b.pointWidth, e * (1 - 2 * b.pointPadding)));a.columnMetrics = { width: b, offset: (e - b) / 2 + (r + ((a.columnIndex || 0) + (t ? 1 : 0)) * e - q / 2) * (t ? -1 : 1) };return a.columnMetrics;
      },
      crispCol: function crispCol(a, b, f, g) {
        var d = this.chart,
            m = this.borderWidth,
            c = -(m % 2 ? .5 : 0),
            m = m % 2 ? .5 : 1;d.inverted && d.renderer.isVML && (m += 1);f = Math.round(a + f) + c;a = Math.round(a) + c;g = Math.round(b + g) + m;c = .5 >= Math.abs(b) && .5 < g;b = Math.round(b) + m;g -= b;c && g && (--b, g += 1);return { x: a, y: b, width: f - a, height: g };
      }, translate: function translate() {
        var a = this,
            b = a.chart,
            g = a.options,
            l = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
            l = a.borderWidth = f(g.borderWidth, l ? 0 : 1),
            t = a.yAxis,
            m = a.translatedThreshold = t.getThreshold(g.threshold),
            c = f(g.minPointLength, 5),
            n = a.getColumnMetrics(),
            q = n.width,
            r = a.barW = Math.max(q, 1 + 2 * l),
            e = a.pointXOffset = n.offset;b.inverted && (m -= .5);g.pointPadding && (r = Math.ceil(r));u.prototype.translate.apply(a);H(a.points, function (d) {
          var g = f(d.yBottom, m),
              n = 999 + Math.abs(g),
              n = Math.min(Math.max(-n, d.plotY), t.len + n),
              h = d.plotX + e,
              l = r,
              p = Math.min(n, g),
              z,
              x = Math.max(n, g) - p;Math.abs(x) < c && c && (x = c, z = !t.reversed && !d.negative || t.reversed && d.negative, p = Math.abs(p - m) > c ? g - c : m - (z ? c : 0));d.barX = h;d.pointWidth = q;d.tooltipPos = b.inverted ? [t.len + t.pos - b.plotLeft - n, a.xAxis.len - h - l / 2, x] : [h + l / 2, n + t.pos - b.plotTop, x];d.shapeType = "rect";d.shapeArgs = a.crispCol.apply(a, d.isNull ? [d.plotX, t.len / 2, 0, 0] : [h, p, l, x]);
        });
      }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function drawGraph() {
        this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
      }, pointAttribs: function pointAttribs(a, b) {
        var d = this.options,
            f,
            g = this.pointAttrToOptions || {};f = g.stroke || "borderColor";var m = g["stroke-width"] || "borderWidth",
            c = a && a.color || this.color,
            n = a[f] || d[f] || this.color || c,
            l = a[m] || d[m] || this[m] || 0,
            g = d.dashStyle;a && this.zones.length && (c = (c = a.getZone()) && c.color || a.options.color || this.color);b && (a = d.states[b], b = a.brightness, c = a.color || void 0 !== b && A(c).brighten(a.brightness).get() || c, n = a[f] || n, l = a[m] || l, g = a.dashStyle || g);f = { fill: c, stroke: n, "stroke-width": l };d.borderRadius && (f.r = d.borderRadius);g && (f.dashstyle = g);return f;
      }, drawPoints: function drawPoints() {
        var a = this,
            b = this.chart,
            f = a.options,
            l = b.renderer,
            t = f.animationLimit || 250,
            m;H(a.points, function (c) {
          var d = c.graphic;if (r(c.plotY) && null !== c.y) {
            m = c.shapeArgs;if (d) d[b.pointCount < t ? "animate" : "attr"](g(m));else c.graphic = d = l[c.shapeType](m).attr({ "class": c.getClassName() }).add(c.group || a.group);d.attr(a.pointAttribs(c, c.selected && "select")).shadow(f.shadow, null, f.stacking && !f.borderRadius);
          } else d && (c.graphic = d.destroy());
        });
      }, animate: function animate(a) {
        var b = this,
            d = this.yAxis,
            f = b.options,
            g = this.chart.inverted,
            m = {};q && (a ? (m.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(f.threshold))), g ? m.translateX = a - d.len : m.translateY = a, b.group.attr(m)) : (m[g ? "translateX" : "translateY"] = d.pos, b.group.animate(m, G(B(b.options.animation), { step: function step(a, d) {
            b.group.attr({ scaleY: Math.max(.001, d.pos) });
          } })), b.animate = null));
      }, remove: function remove() {
        var a = this,
            b = a.chart;b.hasRendered && H(b.series, function (b) {
          b.type === a.type && (b.isDirty = !0);
        });u.prototype.remove.apply(a, arguments);
      } });
  })(L);(function (a) {
    a = a.seriesType;a("bar", "column", null, { inverted: !0 });
  })(L);(function (a) {
    var B = a.Series;a = a.seriesType;a("scatter", "line", { lineWidth: 0, marker: { enabled: !0 }, tooltip: { headerFormat: "<span style=\"color:{point.color}\">\u25CF</span> <span style=\"font-size: 0.85em\"> {series.name}</span><br/>",
        pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e" } }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, kdDimensions: 2, drawGraph: function drawGraph() {
        this.options.lineWidth && B.prototype.drawGraph.call(this);
      } });
  })(L);(function (a) {
    var B = a.pick,
        A = a.relativeLength;a.CenteredSeriesMixin = { getCenter: function getCenter() {
        var a = this.options,
            G = this.chart,
            r = 2 * (a.slicedOffset || 0),
            g = G.plotWidth - 2 * r,
            G = G.plotHeight - 2 * r,
            f = a.center,
            f = [B(f[0], "50%"), B(f[1], "50%"), a.size || "100%", a.innerSize || 0],
            u = Math.min(g, G),
            l,
            q;for (l = 0; 4 > l; ++l) {
          q = f[l], a = 2 > l || 2 === l && /%$/.test(q), f[l] = A(q, [g, G, u, f[2]][l]) + (a ? r : 0);
        }f[3] > f[2] && (f[3] = f[2]);return f;
      } };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.defined,
        H = a.each,
        G = a.extend,
        r = a.inArray,
        g = a.noop,
        f = a.pick,
        u = a.Point,
        l = a.Series,
        q = a.seriesType,
        d = a.setAnimation;q("pie", "line", { center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { distance: 30, enabled: !0, formatter: function formatter() {
          return null === this.y ? void 0 : this.point.name;
        }, x: 0 }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, states: { hover: { brightness: .1, shadow: !1 } } }, { isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function animate(a) {
        var b = this,
            d = b.points,
            f = b.startAngleRad;a || (H(d, function (a) {
          var c = a.graphic,
              d = a.shapeArgs;c && (c.attr({ r: a.startR || b.center[3] / 2, start: f, end: f }), c.animate({ r: d.r, start: d.start, end: d.end }, b.options.animation));
        }), b.animate = null);
      }, updateTotals: function updateTotals() {
        var a,
            d = 0,
            f = this.points,
            g = f.length,
            m,
            c = this.options.ignoreHiddenPoint;for (a = 0; a < g; a++) {
          m = f[a], 0 > m.y && (m.y = null), d += c && !m.visible ? 0 : m.y;
        }this.total = d;for (a = 0; a < g; a++) {
          m = f[a], m.percentage = 0 < d && (m.visible || !c) ? m.y / d * 100 : 0, m.total = d;
        }
      }, generatePoints: function generatePoints() {
        l.prototype.generatePoints.call(this);this.updateTotals();
      }, translate: function translate(a) {
        this.generatePoints();
        var b = 0,
            d = this.options,
            g = d.slicedOffset,
            m = g + (d.borderWidth || 0),
            c,
            n,
            l,
            q = d.startAngle || 0,
            e = this.startAngleRad = Math.PI / 180 * (q - 90),
            q = (this.endAngleRad = Math.PI / 180 * (f(d.endAngle, q + 360) - 90)) - e,
            r = this.points,
            u = d.dataLabels.distance,
            d = d.ignoreHiddenPoint,
            w,
            h = r.length,
            y;a || (this.center = a = this.getCenter());this.getX = function (b, c) {
          l = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + u), 1));return a[0] + (c ? -1 : 1) * Math.cos(l) * (a[2] / 2 + u);
        };for (w = 0; w < h; w++) {
          y = r[w];c = e + b * q;if (!d || y.visible) b += y.percentage / 100;n = e + b * q;y.shapeType = "arc";y.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * c) / 1E3, end: Math.round(1E3 * n) / 1E3 };l = (n + c) / 2;l > 1.5 * Math.PI ? l -= 2 * Math.PI : l < -Math.PI / 2 && (l += 2 * Math.PI);y.slicedTranslation = { translateX: Math.round(Math.cos(l) * g), translateY: Math.round(Math.sin(l) * g) };c = Math.cos(l) * a[2] / 2;n = Math.sin(l) * a[2] / 2;y.tooltipPos = [a[0] + .7 * c, a[1] + .7 * n];y.half = l < -Math.PI / 2 || l > Math.PI / 2 ? 1 : 0;y.angle = l;m = Math.min(m, u / 5);y.labelPos = [a[0] + c + Math.cos(l) * u, a[1] + n + Math.sin(l) * u, a[0] + c + Math.cos(l) * m, a[1] + n + Math.sin(l) * m, a[0] + c, a[1] + n, 0 > u ? "center" : y.half ? "right" : "left", l];
        }
      }, drawGraph: null, drawPoints: function drawPoints() {
        var a = this,
            d = a.chart.renderer,
            f,
            g,
            m,
            c,
            n = a.options.shadow;n && !a.shadowGroup && (a.shadowGroup = d.g("shadow").add(a.group));H(a.points, function (b) {
          if (null !== b.y) {
            g = b.graphic;c = b.shapeArgs;f = b.sliced ? b.slicedTranslation : {};var l = b.shadowGroup;n && !l && (l = b.shadowGroup = d.g("shadow").add(a.shadowGroup));l && l.attr(f);m = a.pointAttribs(b, b.selected && "select");g ? g.setRadialReference(a.center).attr(m).animate(G(c, f)) : (b.graphic = g = d[b.shapeType](c).addClass(b.getClassName()).setRadialReference(a.center).attr(f).add(a.group), b.visible || g.attr({ visibility: "hidden" }), g.attr(m).attr({ "stroke-linejoin": "round" }).shadow(n, l));
          }
        });
      }, searchPoint: g, sortByAngle: function sortByAngle(a, d) {
        a.sort(function (a, b) {
          return void 0 !== a.angle && (b.angle - a.angle) * d;
        });
      }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: a.CenteredSeriesMixin.getCenter, getSymbol: g }, { init: function init() {
        u.prototype.init.apply(this, arguments);var a = this,
            d;a.name = f(a.name, "Slice");
        d = function d(b) {
          a.slice("select" === b.type);
        };B(a, "select", d);B(a, "unselect", d);return a;
      }, setVisible: function setVisible(a, d) {
        var b = this,
            g = b.series,
            m = g.chart,
            c = g.options.ignoreHiddenPoint;d = f(d, c);a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, g.options.data[r(b, g.data)] = b.options, H(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
          if (b[c]) b[c][a ? "show" : "hide"](!0);
        }), b.legendItem && m.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), c && (g.isDirty = !0), d && m.redraw());
      },
      slice: function slice(a, g, l) {
        var b = this.series;d(l, b.chart);f(g, !0);this.sliced = this.options.sliced = a = A(a) ? a : !this.sliced;b.options.data[r(this, b.data)] = this.options;a = a ? this.slicedTranslation : { translateX: 0, translateY: 0 };this.graphic.animate(a);this.shadowGroup && this.shadowGroup.animate(a);
      }, haloPath: function haloPath(a) {
        var b = this.shapeArgs;return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, { innerR: this.shapeArgs.r, start: b.start, end: b.end });
      } });
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.arrayMax,
        H = a.defined,
        G = a.each,
        r = a.extend,
        g = a.format,
        f = a.map,
        u = a.merge,
        l = a.noop,
        q = a.pick,
        d = a.relativeLength,
        b = a.Series,
        p = a.seriesTypes,
        C = a.stableSort;a.distribute = function (a, b) {
      function c(a, b) {
        return a.target - b.target;
      }var d,
          g = !0,
          m = a,
          e = [],
          l;l = 0;for (d = a.length; d--;) {
        l += a[d].size;
      }if (l > b) {
        C(a, function (a, b) {
          return (b.rank || 0) - (a.rank || 0);
        });for (l = d = 0; l <= b;) {
          l += a[d].size, d++;
        }e = a.splice(d - 1, a.length);
      }C(a, c);for (a = f(a, function (a) {
        return { size: a.size, targets: [a.target] };
      }); g;) {
        for (d = a.length; d--;) {
          g = a[d], l = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, l - g.size / 2), b - g.size);
        }d = a.length;for (g = !1; d--;) {
          0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size, a[d - 1].targets = a[d - 1].targets.concat(a[d].targets), a[d - 1].pos + a[d - 1].size > b && (a[d - 1].pos = b - a[d - 1].size), a.splice(d, 1), g = !0);
        }
      }d = 0;G(a, function (a) {
        var b = 0;G(a.targets, function () {
          m[d].pos = a.pos + b;b += m[d].size;d++;
        });
      });m.push.apply(m, e);C(m, c);
    };b.prototype.drawDataLabels = function () {
      var a = this,
          b = a.options,
          c = b.dataLabels,
          d = a.points,
          f,
          l,
          e = a.hasRendered || 0,
          p,
          r,
          w = q(c.defer, !0),
          h = a.chart.renderer;if (c.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(c), r = a.plotGroup("dataLabelsGroup", "data-labels", w && !e ? "hidden" : "visible", c.zIndex || 6), w && (r.attr({ opacity: +e }), e || B(a, "afterAnimate", function () {
        a.visible && r.show(!0);r[b.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 });
      })), l = c, G(d, function (e) {
        var d,
            m = e.dataLabel,
            n,
            k,
            t,
            z = e.connector,
            w = !m,
            x;f = e.dlOptions || e.options && e.options.dataLabels;
        if (d = q(f && f.enabled, l.enabled) && null !== e.y) for (k in c = u(l, f), n = e.getLabelConfig(), p = c.format ? g(c.format, n) : c.formatter.call(n, c), x = c.style, t = c.rotation, x.color = q(c.color, x.color, a.color, "#000000"), "contrast" === x.color && (x.color = c.inside || 0 > c.distance || b.stacking ? h.getContrast(e.color || a.color) : "#000000"), b.cursor && (x.cursor = b.cursor), n = { fill: c.backgroundColor, stroke: c.borderColor, "stroke-width": c.borderWidth, r: c.borderRadius || 0, rotation: t, padding: c.padding, zIndex: 1 }, n) {
          void 0 === n[k] && delete n[k];
        }!m || d && H(p) ? d && H(p) && (m ? n.text = p : (m = e.dataLabel = h[t ? "text" : "label"](p, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), m.addClass("highcharts-data-label-color-" + e.colorIndex + " " + (c.className || "") + (c.useHTML ? "highcharts-tracker" : ""))), m.attr(n), m.css(x).shadow(c.shadow), m.added || m.add(r), a.alignDataLabel(e, m, c, null, w)) : (e.dataLabel = m.destroy(), z && (e.connector = z.destroy()));
      });
    };b.prototype.alignDataLabel = function (a, b, c, d, f) {
      var g = this.chart,
          e = g.inverted,
          m = q(a.plotX, -9999),
          n = q(a.plotY, -9999),
          l = b.getBBox(),
          h,
          p = c.rotation,
          t = c.align,
          u = this.visible && (a.series.forceDL || g.isInsidePlot(m, Math.round(n), e) || d && g.isInsidePlot(m, e ? d.x + 1 : d.y + d.height - 1, e)),
          E = "justify" === q(c.overflow, "justify");u && (h = c.style.fontSize, h = g.renderer.fontMetrics(h, b).b, d = r({ x: e ? g.plotWidth - n : m, y: Math.round(e ? g.plotHeight - m : n), width: 0, height: 0 }, d), r(c, { width: l.width, height: l.height }), p ? (E = !1, e = g.renderer.rotCorr(h, p), e = { x: d.x + c.x + d.width / 2 + e.x, y: d.y + c.y + { top: 0, middle: .5, bottom: 1 }[c.verticalAlign] * d.height }, b[f ? "attr" : "animate"](e).attr({ align: t }), m = (p + 720) % 360, m = 180 < m && 360 > m, "left" === t ? e.y -= m ? l.height : 0 : "center" === t ? (e.x -= l.width / 2, e.y -= l.height / 2) : "right" === t && (e.x -= l.width, e.y -= m ? 0 : l.height)) : (b.align(c, null, d), e = b.alignAttr), E ? this.justifyDataLabel(b, c, e, l, d, f) : q(c.crop, !0) && (u = g.isInsidePlot(e.x, e.y) && g.isInsidePlot(e.x + l.width, e.y + l.height)), c.shape && !p && b.attr({ anchorX: a.plotX, anchorY: a.plotY }));u || (b.attr({ y: -9999 }), b.placed = !1);
    };b.prototype.justifyDataLabel = function (a, b, c, d, f, g) {
      var e = this.chart,
          m = b.align,
          n = b.verticalAlign,
          l,
          h,
          p = a.box ? 0 : a.padding || 0;l = c.x + p;0 > l && ("right" === m ? b.align = "left" : b.x = -l, h = !0);l = c.x + d.width - p;l > e.plotWidth && ("left" === m ? b.align = "right" : b.x = e.plotWidth - l, h = !0);l = c.y + p;0 > l && ("bottom" === n ? b.verticalAlign = "top" : b.y = -l, h = !0);l = c.y + d.height - p;l > e.plotHeight && ("top" === n ? b.verticalAlign = "bottom" : b.y = e.plotHeight - l, h = !0);h && (a.placed = !g, a.align(b, null, f));
    };p.pie && (p.pie.prototype.drawDataLabels = function () {
      var d = this,
          g = d.data,
          c,
          l = d.chart,
          p = d.options.dataLabels,
          r = q(p.connectorPadding, 10),
          e = q(p.connectorWidth, 1),
          u = l.plotWidth,
          F = l.plotHeight,
          w,
          h = p.distance,
          y = d.center,
          C = y[2] / 2,
          B = y[1],
          H = 0 < h,
          k,
          D,
          L,
          N,
          S = [[], []],
          O,
          v,
          M,
          Q,
          R = [0, 0, 0, 0];d.visible && (p.enabled || d._hasPointLabels) && (b.prototype.drawDataLabels.apply(d), G(g, function (a) {
        a.dataLabel && a.visible && (S[a.half].push(a), a.dataLabel._pos = null);
      }), G(S, function (b, e) {
        var g,
            m,
            n = b.length,
            q,
            t,
            z;if (n) for (d.sortByAngle(b, e - .5), 0 < h && (g = Math.max(0, B - C - h), m = Math.min(B + C + h, l.plotHeight), q = f(b, function (a) {
          if (a.dataLabel) return z = a.dataLabel.getBBox().height || 21, { target: a.labelPos[1] - g + z / 2, size: z, rank: a.y };
        }), a.distribute(q, m + z - g)), Q = 0; Q < n; Q++) {
          c = b[Q], L = c.labelPos, k = c.dataLabel, M = !1 === c.visible ? "hidden" : "inherit", t = L[1], q ? void 0 === q[Q].pos ? M = "hidden" : (N = q[Q].size, v = g + q[Q].pos) : v = t, O = p.justify ? y[0] + (e ? -1 : 1) * (C + h) : d.getX(v < g + 2 || v > m - 2 ? t : v, e), k._attr = { visibility: M, align: L[6] }, k._pos = { x: O + p.x + ({ left: r, right: -r }[L[6]] || 0), y: v + p.y - 10 }, L.x = O, L.y = v, null === d.options.size && (D = k.width, O - D < r ? R[3] = Math.max(Math.round(D - O + r), R[3]) : O + D > u - r && (R[1] = Math.max(Math.round(O + D - u + r), R[1])), 0 > v - N / 2 ? R[0] = Math.max(Math.round(-v + N / 2), R[0]) : v + N / 2 > F && (R[2] = Math.max(Math.round(v + N / 2 - F), R[2])));
        }
      }), 0 === A(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), H && e && G(this.points, function (a) {
        var b;w = a.connector;if ((k = a.dataLabel) && k._pos && a.visible) {
          M = k._attr.visibility;if (b = !w) a.connector = w = l.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(d.dataLabelsGroup), w.attr({ "stroke-width": e, stroke: p.connectorColor || a.color || "#666666" });w[b ? "attr" : "animate"]({ d: d.connectorPath(a.labelPos) });
          w.attr("visibility", M);
        } else w && (a.connector = w.destroy());
      }));
    }, p.pie.prototype.connectorPath = function (a) {
      var b = a.x,
          c = a.y;return q(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]];
    }, p.pie.prototype.placeDataLabels = function () {
      G(this.points, function (a) {
        var b = a.dataLabel;b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({ y: -9999 }));
      });
    }, p.pie.prototype.alignDataLabel = l, p.pie.prototype.verifyDataLabelOverflow = function (a) {
      var b = this.center,
          c = this.options,
          f = c.center,
          g = c.minSize || 80,
          l,
          e;null !== f[0] ? l = Math.max(b[2] - Math.max(a[1], a[3]), g) : (l = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2);null !== f[1] ? l = Math.max(Math.min(l, b[2] - Math.max(a[0], a[2])), g) : (l = Math.max(Math.min(l, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2);l < b[2] ? (b[2] = l, b[3] = Math.min(d(c.innerSize || 0, l), l), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : e = !0;return e;
    });
    p.column && (p.column.prototype.alignDataLabel = function (a, d, c, f, g) {
      var l = this.chart.inverted,
          e = a.series,
          m = a.dlBox || a.shapeArgs,
          n = q(a.below, a.plotY > q(this.translatedThreshold, e.yAxis.len)),
          p = q(c.inside, !!this.options.stacking);m && (f = u(m), 0 > f.y && (f.height += f.y, f.y = 0), m = f.y + f.height - e.yAxis.len, 0 < m && (f.height -= m), l && (f = { x: e.yAxis.len - f.y - f.height, y: e.xAxis.len - f.x - f.width, width: f.height, height: f.width }), p || (l ? (f.x += n ? 0 : f.width, f.width = 0) : (f.y += n ? f.height : 0, f.height = 0)));c.align = q(c.align, !l || p ? "center" : n ? "right" : "left");c.verticalAlign = q(c.verticalAlign, l || p ? "middle" : n ? "top" : "bottom");b.prototype.alignDataLabel.call(this, a, d, c, f, g);
    });
  })(L);(function (a) {
    var B = a.Chart,
        A = a.each,
        H = a.pick,
        G = a.addEvent;B.prototype.callbacks.push(function (a) {
      function g() {
        var f = [];A(a.series, function (a) {
          var g = a.options.dataLabels,
              q = a.dataLabelCollections || ["dataLabel"];(g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && A(q, function (d) {
            A(a.points, function (a) {
              a[d] && (a[d].labelrank = H(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[d]));
            });
          });
        });a.hideOverlappingLabels(f);
      }g();G(a, "redraw", g);
    });B.prototype.hideOverlappingLabels = function (a) {
      var g = a.length,
          f,
          r,
          l,
          q,
          d,
          b,
          p,
          C,
          t,
          m = function m(a, b, d, f, e, g, l, _m) {
        return !(e > a + d || e + l < a || g > b + f || g + _m < b);
      };for (r = 0; r < g; r++) {
        if (f = a[r]) f.oldOpacity = f.opacity, f.newOpacity = 1;
      }a.sort(function (a, b) {
        return (b.labelrank || 0) - (a.labelrank || 0);
      });for (r = 0; r < g; r++) {
        for (l = a[r], f = r + 1; f < g; ++f) {
          if (q = a[f], l && q && l.placed && q.placed && 0 !== l.newOpacity && 0 !== q.newOpacity && (d = l.alignAttr, b = q.alignAttr, p = l.parentGroup, C = q.parentGroup, t = 2 * (l.box ? 0 : l.padding), d = m(d.x + p.translateX, d.y + p.translateY, l.width - t, l.height - t, b.x + C.translateX, b.y + C.translateY, q.width - t, q.height - t))) (l.labelrank < q.labelrank ? l : q).newOpacity = 0;
        }
      }A(a, function (a) {
        var b, c;a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function b() {
          a.hide();
        }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0);
      });
    };
  })(L);(function (a) {
    var B = a.addEvent,
        A = a.Chart,
        H = a.createElement,
        G = a.css,
        r = a.defaultOptions,
        g = a.defaultPlotOptions,
        f = a.each,
        u = a.extend,
        l = a.fireEvent,
        q = a.hasTouch,
        d = a.inArray,
        b = a.isObject,
        p = a.Legend,
        C = a.merge,
        t = a.pick,
        m = a.Point,
        c = a.Series,
        n = a.seriesTypes,
        E = a.svg;a = a.TrackerMixin = { drawTrackerPoint: function drawTrackerPoint() {
        var a = this,
            b = a.chart,
            c = b.pointer,
            d = function d(a) {
          for (var c = a.target, e; c && !e;) {
            e = c.point, c = c.parentNode;
          }if (void 0 !== e && e !== b.hoverPoint) e.onMouseOver(a);
        };f(a.points, function (a) {
          a.graphic && (a.graphic.element.point = a);a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a);
        });a._hasTracking || (f(a.trackerGroups, function (b) {
          if (a[b]) {
            a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
              c.onTrackerMouseOut(a);
            });if (q) a[b].on("touchstart", d);a.options.cursor && a[b].css(G).css({ cursor: a.options.cursor });
          }
        }), a._hasTracking = !0);
      }, drawTrackerGraph: function drawTrackerGraph() {
        var a = this,
            b = a.options,
            c = b.trackByArea,
            d = [].concat(c ? a.areaPath : a.graphPath),
            g = d.length,
            h = a.chart,
            l = h.pointer,
            m = h.renderer,
            n = h.options.tooltip.snap,
            p = a.tracker,
            k,
            r = function r() {
          if (h.hoverSeries !== a) a.onMouseOver();
        },
            t = "rgba(192,192,192," + (E ? .0001 : .002) + ")";if (g && !c) for (k = g + 1; k--;) {
          "M" === d[k] && d.splice(k + 1, 0, d[k + 1] - n, d[k + 2], "L"), (k && "M" === d[k] || k === g) && d.splice(k, 0, "L", d[k - 2] + n, d[k - 1]);
        }p ? p.attr({ d: d }) : a.graph && (a.tracker = m.path(d).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: t, fill: c ? t : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n), zIndex: 2 }).add(a.group), f([a.tracker, a.markerGroup], function (a) {
          a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
            l.onTrackerMouseOut(a);
          });
          b.cursor && a.css({ cursor: b.cursor });if (q) a.on("touchstart", r);
        }));
      } };n.column && (n.column.prototype.drawTracker = a.drawTrackerPoint);n.pie && (n.pie.prototype.drawTracker = a.drawTrackerPoint);n.scatter && (n.scatter.prototype.drawTracker = a.drawTrackerPoint);u(p.prototype, { setItemEvents: function setItemEvents(a, b, c) {
        var e = this,
            d = e.chart,
            f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";(c ? b : a.legendGroup).on("mouseover", function () {
          a.setState("hover");d.seriesGroup.addClass(f);b.css(e.options.itemHoverStyle);
        }).on("mouseout", function () {
          b.css(a.visible ? e.itemStyle : e.itemHiddenStyle);d.seriesGroup.removeClass(f);a.setState();
        }).on("click", function (b) {
          var c = function c() {
            a.setVisible && a.setVisible();
          };b = { browserEvent: b };a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : l(a, "legendItemClick", b, c);
        });
      }, createCheckboxForItem: function createCheckboxForItem(a) {
        a.checkbox = H("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);B(a.checkbox, "click", function (b) {
          l(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () {
            a.select();
          });
        });
      } });r.legend.itemStyle.cursor = "pointer";u(A.prototype, { showResetZoom: function showResetZoom() {
        var a = this,
            b = r.lang,
            c = a.options.chart.resetZoomButton,
            d = c.theme,
            f = d.states,
            g = "chart" === c.relativeTo ? null : "plotBox";this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
          a.zoomOut();
        }, d, f && f.hover).attr({ align: c.position.align, title: b.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g);
      }, zoomOut: function zoomOut() {
        var a = this;
        l(a, "selection", { resetSelection: !0 }, function () {
          a.zoom();
        });
      }, zoom: function zoom(a) {
        var c,
            d = this.pointer,
            g = !1,
            l;!a || a.resetSelection ? f(this.axes, function (a) {
          c = a.zoom();
        }) : f(a.xAxis.concat(a.yAxis), function (a) {
          var b = a.axis;d[b.isXAxis ? "zoomX" : "zoomY"] && (c = b.zoom(a.min, a.max), b.displayBtn && (g = !0));
        });l = this.resetZoomButton;g && !l ? this.showResetZoom() : !g && b(l) && (this.resetZoomButton = l.destroy());c && this.redraw(t(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
      }, pan: function pan(a, b) {
        var c = this,
            d = c.hoverPoints,
            e;d && f(d, function (a) {
          a.setState();
        });f("xy" === b ? [1, 0] : [1], function (b) {
          b = c[b ? "xAxis" : "yAxis"][0];var d = b.horiz,
              f = a[d ? "chartX" : "chartY"],
              d = d ? "mouseDownX" : "mouseDownY",
              g = c[d],
              h = (b.pointRange || 0) / 2,
              k = b.getExtremes(),
              l = b.toValue(g - f, !0) + h,
              h = b.toValue(g + b.len - f, !0) - h,
              m = h < l,
              g = m ? h : l,
              l = m ? l : h,
              h = Math.min(k.dataMin, k.min) - g,
              k = l - Math.max(k.dataMax, k.max);b.series.length && 0 > h && 0 > k && (b.setExtremes(g, l, !1, !1, { trigger: "pan" }), e = !0);c[d] = f;
        });e && c.redraw(!1);G(c.container, { cursor: "move" });
      } });u(m.prototype, { select: function select(a, b) {
        var c = this,
            e = c.series,
            g = e.chart;a = t(a, !c.selected);c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () {
          c.selected = c.options.selected = a;e.options.data[d(c, e.data)] = c.options;c.setState(a && "select");b || f(g.getSelectedPoints(), function (a) {
            a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[d(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"));
          });
        });
      }, onMouseOver: function onMouseOver(a, b) {
        var c = this.series,
            d = c.chart,
            e = d.tooltip,
            f = d.hoverPoint;if (this.series) {
          if (!b) {
            if (f && f !== this) f.onMouseOut();if (d.hoverSeries !== c) c.onMouseOver();d.hoverPoint = this;
          }!e || e.shared && !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));this.firePointEvent("mouseOver");
        }
      }, onMouseOut: function onMouseOut() {
        var a = this.series.chart,
            b = a.hoverPoints;this.firePointEvent("mouseOut");b && -1 !== d(this, b) || (this.setState(), a.hoverPoint = null);
      }, importEvents: function importEvents() {
        if (!this.hasImportedEvents) {
          var a = C(this.series.options.point, this.options).events,
              b;this.events = a;for (b in a) {
            B(this, b, a[b]);
          }this.hasImportedEvents = !0;
        }
      }, setState: function setState(a, b) {
        var c = Math.floor(this.plotX),
            d = this.plotY,
            e = this.series,
            f = e.options.states[a] || {},
            l = g[e.type].marker && e.options.marker,
            m = l && !1 === l.enabled,
            n = l && l.states && l.states[a] || {},
            p = !1 === n.enabled,
            k = e.stateMarkerGraphic,
            q = this.marker || {},
            r = e.chart,
            z = e.halo,
            C,
            A = l && e.markerAttribs;a = a || "";if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (p || m && !1 === n.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
          A && (C = e.markerAttribs(this, a));if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(e.pointAttribs(this, a)), C && this.graphic.animate(C, t(r.options.chart.animation, n.animation, l.animation)), k && k.hide();else {
            if (a && n) {
              l = q.symbol || e.symbol;k && k.currentSymbol !== l && (k = k.destroy());if (k) k[b ? "animate" : "attr"]({ x: C.x, y: C.y });else l && (e.stateMarkerGraphic = k = r.renderer.symbol(l, C.x, C.y, C.width, C.height).add(e.markerGroup), k.currentSymbol = l);k && k.attr(e.pointAttribs(this, a));
            }k && (k[a && r.isInsidePlot(c, d, r.inverted) ? "show" : "hide"](), k.element.point = this);
          }(c = f.halo) && c.size ? (z || (e.halo = z = r.renderer.path().add(A ? e.markerGroup : e.group)), z[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }), z.attr({ "class": "highcharts-halo highcharts-color-" + t(this.colorIndex, e.colorIndex) }), z.point = this, z.attr(u({ fill: this.color || e.color, "fill-opacity": c.opacity, zIndex: -1 }, c.attributes))) : z && z.point && z.point.haloPath && z.animate({ d: z.point.haloPath(0) });this.state = a;
        }
      }, haloPath: function haloPath(a) {
        return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
      } });u(c.prototype, { onMouseOver: function onMouseOver() {
        var a = this.chart,
            b = a.hoverSeries;if (b && b !== this) b.onMouseOut();this.options.events.mouseOver && l(this, "mouseOver");this.setState("hover");a.hoverSeries = this;
      }, onMouseOut: function onMouseOut() {
        var a = this.options,
            b = this.chart,
            c = b.tooltip,
            d = b.hoverPoint;b.hoverSeries = null;if (d) d.onMouseOut();this && a.events.mouseOut && l(this, "mouseOut");!c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();this.setState();
      }, setState: function setState(a) {
        var b = this,
            c = b.options,
            d = b.graph,
            g = c.states,
            h = c.lineWidth,
            c = 0;a = a || "";if (b.state !== a && (f([b.group, b.markerGroup], function (c) {
          c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a));
        }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (h = g[a].lineWidth || h + (g[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (g = { "stroke-width": h }, d.attr(g); b["zone-graph-" + c];) {
          b["zone-graph-" + c].attr(g), c += 1;
        }
      }, setVisible: function setVisible(a, b) {
        var c = this,
            d = c.chart,
            e = c.legendItem,
            g,
            m = d.options.chart.ignoreHiddenSeries,
            n = c.visible;g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !n : a) ? "show" : "hide";f(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
          if (c[a]) c[a][g]();
        });if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();e && d.legend.colorizeItem(c, a);c.isDirty = !0;c.options.stacking && f(d.series, function (a) {
          a.options.stacking && a.visible && (a.isDirty = !0);
        });f(c.linkedSeries, function (b) {
          b.setVisible(a, !1);
        });m && (d.isDirtyBox = !0);!1 !== b && d.redraw();l(c, g);
      }, show: function show() {
        this.setVisible(!0);
      }, hide: function hide() {
        this.setVisible(!1);
      }, select: function select(a) {
        this.selected = a = void 0 === a ? !this.selected : a;this.checkbox && (this.checkbox.checked = a);l(this, a ? "select" : "unselect");
      }, drawTracker: a.drawTrackerGraph });
  })(L);(function (a) {
    var B = a.Chart,
        A = a.each,
        H = a.inArray,
        G = a.isObject,
        r = a.pick,
        g = a.splat;B.prototype.setResponsive = function (a) {
      var f = this.options.responsive;f && f.rules && A(f.rules, function (f) {
        this.matchResponsiveRule(f, a);
      }, this);
    };B.prototype.matchResponsiveRule = function (f, g) {
      var l = this.respRules,
          q = f.condition,
          d;d = q.callback || function () {
        return this.chartWidth <= r(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= r(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= r(q.minWidth, 0) && this.chartHeight >= r(q.minHeight, 0);
      };void 0 === f._id && (f._id = a.uniqueKey());d = d.call(this);!l[f._id] && d ? f.chartOptions && (l[f._id] = this.currentOptions(f.chartOptions), this.update(f.chartOptions, g)) : l[f._id] && !d && (this.update(l[f._id], g), delete l[f._id]);
    };
    B.prototype.currentOptions = function (a) {
      function f(a, d, b, l) {
        var p, q;for (p in a) {
          if (!l && -1 < H(p, ["series", "xAxis", "yAxis"])) for (a[p] = g(a[p]), b[p] = [], q = 0; q < a[p].length; q++) {
            b[p][q] = {}, f(a[p][q], d[p][q], b[p][q], l + 1);
          } else G(a[p]) ? (b[p] = {}, f(a[p], d[p] || {}, b[p], l + 1)) : b[p] = d[p] || null;
        }
      }var l = {};f(a, this.options, l, 0);return l;
    };
  })(L);return L;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88)(module)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */



/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

module.exports = CSSProperty;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMChildrenOperations
 * @typechecks static-only
 */



var Danger = __webpack_require__(111);
var ReactMultiChildUpdateTypes = __webpack_require__(78);
var ReactPerf = __webpack_require__(7);

var setInnerHTML = __webpack_require__(32);
var setTextContent = __webpack_require__(48);
var invariant = __webpack_require__(1);

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
function insertChildAt(parentNode, childNode, index) {
  // By exploiting arrays returning `undefined` for an undefined index, we can
  // rely exclusively on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`. However, using `undefined` is not allowed by all
  // browsers so we must replace it with `null`.

  // fix render order error in safari
  // IE8 will throw error when index out of list size.
  var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);

  parentNode.insertBefore(childNode, beforeChild);
}

/**
 * Operations for updating with DOM children.
 */
var DOMChildrenOperations = {

  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

  updateTextContent: setTextContent,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @param {array<string>} markupList List of markup strings.
   * @internal
   */
  processUpdates: function processUpdates(updates, markupList) {
    var update;
    // Mapping from parent IDs to initial child orderings.
    var initialChildren = null;
    // List of children that will be moved or removed.
    var updatedChildren = null;

    for (var i = 0; i < updates.length; i++) {
      update = updates[i];
      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
        var updatedIndex = update.fromIndex;
        var updatedChild = update.parentNode.childNodes[updatedIndex];
        var parentID = update.parentID;

        !updatedChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(false) : undefined;

        initialChildren = initialChildren || {};
        initialChildren[parentID] = initialChildren[parentID] || [];
        initialChildren[parentID][updatedIndex] = updatedChild;

        updatedChildren = updatedChildren || [];
        updatedChildren.push(updatedChild);
      }
    }

    var renderedMarkup;
    // markupList is either a list of markup or just a list of elements
    if (markupList.length && typeof markupList[0] === 'string') {
      renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
    } else {
      renderedMarkup = markupList;
    }

    // Remove updated children first so that `toIndex` is consistent.
    if (updatedChildren) {
      for (var j = 0; j < updatedChildren.length; j++) {
        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
      }
    }

    for (var k = 0; k < updates.length; k++) {
      update = updates[k];
      switch (update.type) {
        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
          insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
          break;
        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
          insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
          break;
        case ReactMultiChildUpdateTypes.SET_MARKUP:
          setInnerHTML(update.parentNode, update.content);
          break;
        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
          setTextContent(update.parentNode, update.content);
          break;
        case ReactMultiChildUpdateTypes.REMOVE_NODE:
          // Already removed by the for-loop above.
          break;
      }
    }
  }

};

ReactPerf.measureMethods(DOMChildrenOperations, 'DOMChildrenOperations', {
  updateTextContent: 'updateTextContent'
});

module.exports = DOMChildrenOperations;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */



var invariant = __webpack_require__(1);

/**
 * Injectable ordering of event plugins.
 */
var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !PluginModule.extractEvents ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(false) : undefined;
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function injectEventPluginOrder(InjectedEventPluginOrder) {
    !!EventPluginOrder ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function injectEventPluginsByName(injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
        !!namesToPlugins[pluginName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function getPluginModuleForEvent(event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function _resetEventPlugins() {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }
  }

};

module.exports = EventPluginRegistry;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactChildren
 */



var PooledClass = __webpack_require__(13);
var ReactElement = __webpack_require__(6);

var emptyFunction = __webpack_require__(9);
var traverseAllChildren = __webpack_require__(50);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild !== child ? escapeUserProvidedKey(mappedChild.key || '') + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactClass
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactComponent = __webpack_require__(65);
var ReactElement = __webpack_require__(6);
var ReactPropTypeLocations = __webpack_require__(27);
var ReactPropTypeLocationNames = __webpack_require__(26);
var ReactNoopUpdateQueue = __webpack_require__(80);

var assign = __webpack_require__(2);
var emptyObject = __webpack_require__(19);
var invariant = __webpack_require__(1);
var keyMirror = __webpack_require__(24);
var keyOf = __webpack_require__(12);
var warning = __webpack_require__(3);

var MIXINS_KEY = keyOf({ mixins: null });

/**
 * Policies that describe methods in `ReactClassInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

var injectedMixins = [];

var warnedSetProps = false;
function warnSetProps() {
  if (!warnedSetProps) {
    warnedSetProps = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'setProps(...) and replaceProps(...) are deprecated. ' + 'Instead, call render again at the top level.') : undefined;
  }
}

/**
 * Composite components are higher-level components that compose other composite
 * or native components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function displayName(Constructor, _displayName) {
    Constructor.displayName = _displayName;
  },
  mixins: function mixins(Constructor, _mixins) {
    if (_mixins) {
      for (var i = 0; i < _mixins.length; i++) {
        mixSpecIntoComponent(Constructor, _mixins[i]);
      }
    }
  },
  childContextTypes: function childContextTypes(Constructor, _childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, _childContextTypes, ReactPropTypeLocations.childContext);
    }
    Constructor.childContextTypes = assign({}, Constructor.childContextTypes, _childContextTypes);
  },
  contextTypes: function contextTypes(Constructor, _contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, _contextTypes, ReactPropTypeLocations.context);
    }
    Constructor.contextTypes = assign({}, Constructor.contextTypes, _contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function getDefaultProps(Constructor, _getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, _getDefaultProps);
    } else {
      Constructor.getDefaultProps = _getDefaultProps;
    }
  },
  propTypes: function propTypes(Constructor, _propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, _propTypes, ReactPropTypeLocations.prop);
    }
    Constructor.propTypes = assign({}, Constructor.propTypes, _propTypes);
  },
  statics: function statics(Constructor, _statics) {
    mixStaticSpecIntoComponent(Constructor, _statics);
  },
  autobind: function autobind() {} };

// noop
function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but not in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : undefined;
    }
  }
}

function validateMethodOverride(proto, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (proto.hasOwnProperty(name)) {
    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classses.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;

  var proto = Constructor.prototype;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    validateMethodOverride(proto, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isAlreadyDefined = proto.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        if (!proto.__reactAutoBindMap) {
          proto.__reactAutoBindMap = {};
        }
        proto.__reactAutoBindMap[name] = property;
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && (typeof one === 'undefined' ? 'undefined' : _typeof(one)) === 'object' && (typeof two === 'undefined' ? 'undefined' : _typeof(two)) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    /* eslint-disable block-scoped-var, no-undef */
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : undefined;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : undefined;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
      /* eslint-enable */
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  for (var autoBindKey in component.__reactAutoBindMap) {
    if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
      var method = component.__reactAutoBindMap[autoBindKey];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function replaceState(newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function isMounted() {
    return this.updater.isMounted(this);
  },

  /**
   * Sets a subset of the props.
   *
   * @param {object} partialProps Subset of the next props.
   * @param {?function} callback Called after props are updated.
   * @final
   * @public
   * @deprecated
   */
  setProps: function setProps(partialProps, callback) {
    if (process.env.NODE_ENV !== 'production') {
      warnSetProps();
    }
    this.updater.enqueueSetProps(this, partialProps);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  },

  /**
   * Replace all the props.
   *
   * @param {object} newProps Subset of the next props.
   * @param {?function} callback Called after props are updated.
   * @final
   * @public
   * @deprecated
   */
  replaceProps: function replaceProps(newProps, callback) {
    if (process.env.NODE_ENV !== 'production') {
      warnSetProps();
    }
    this.updater.enqueueReplaceProps(this, newProps);
    if (callback) {
      this.updater.enqueueCallback(this, callback);
    }
  }
};

var ReactClassComponent = function ReactClassComponent() {};
assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function createClass(spec) {
    var Constructor = function Constructor(props, context, updater) {
      // This constructor is overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : undefined;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindMap) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (typeof initialState === 'undefined' && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : undefined;

      this.state = initialState;
    };
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : undefined;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function injectMixin(mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponent
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactNoopUpdateQueue = __webpack_require__(80);

var canDefineProperty = __webpack_require__(30);
var emptyObject = __webpack_require__(19);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : undefined;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : undefined;
  }
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback);
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    getDOMNode: ['getDOMNode', 'Use ReactDOM.findDOMNode(component) instead.'],
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceProps: ['replaceProps', 'Instead, call render again at the top level.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).'],
    setProps: ['setProps', 'Instead, call render again at the top level.']
  };
  var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function get() {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : undefined;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOM
 */

/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/



var ReactCurrentOwner = __webpack_require__(11);
var ReactDOMTextComponent = __webpack_require__(69);
var ReactDefaultInjection = __webpack_require__(71);
var ReactInstanceHandles = __webpack_require__(17);
var ReactMount = __webpack_require__(5);
var ReactPerf = __webpack_require__(7);
var ReactReconciler = __webpack_require__(15);
var ReactUpdates = __webpack_require__(8);
var ReactVersion = __webpack_require__(40);

var findDOMNode = __webpack_require__(41);
var renderSubtreeIntoContainer = __webpack_require__(162);
var warning = __webpack_require__(3);

ReactDefaultInjection.inject();

var render = ReactPerf.measure('React', 'render', ReactMount.render);

var React = {
  findDOMNode: findDOMNode,
  render: render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
};

// Inject the runtime into a devtools global hook regardless of browser.
// Allows for debugging when the hook is injected on the page.
/* eslint-enable camelcase */
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    CurrentOwner: ReactCurrentOwner,
    InstanceHandles: ReactInstanceHandles,
    Mount: ReactMount,
    Reconciler: ReactReconciler,
    TextComponent: ReactDOMTextComponent
  });
}

if (process.env.NODE_ENV !== 'production') {
  var ExecutionEnvironment = __webpack_require__(4);
  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

    // First check if devtools is not installed
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
      // If we're in Chrome or Firefox, provide a download link if not installed.
      if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
        console.debug('Download the React DevTools for a better development experience: ' + 'https://fb.me/react-devtools');
      }
    }

    // If we're in IE8, check to see if we are in compatibility mode and provide
    // information on preventing compatibility mode
    var ieCompatibilityMode = document.documentMode && document.documentMode < 8;

    process.env.NODE_ENV !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : undefined;

    var expectedFeatures = [
    // shims
    Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim,

    // shams
    Object.create, Object.freeze];

    for (var i = 0; i < expectedFeatures.length; i++) {
      if (!expectedFeatures[i]) {
        console.error('One or more ES5 shim/shams expected by React are not available: ' + 'https://fb.me/react-warning-polyfills');
        break;
      }
    }
  }
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFeatureFlags
 */



var ReactDOMFeatureFlags = {
  useCreateElement: false
};

module.exports = ReactDOMFeatureFlags;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMSelect
 */



var LinkedValueUtils = __webpack_require__(35);
var ReactMount = __webpack_require__(5);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var warning = __webpack_require__(3);

var valueContextKey = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);

function updateOptionsIfPendingUpdateAndMounted() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils.getValue(props);

    if (value != null) {
      updateOptions(this, Boolean(props.multiple), value);
    }
  }
}

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
 * Validation function for `value` and `defaultValue`.
 * @private
 */
function checkSelectPropTypes(inst, props) {
  var owner = inst._currentElement._owner;
  LinkedValueUtils.checkPropTypes('select', props, owner);

  for (var i = 0; i < valuePropNames.length; i++) {
    var propName = valuePropNames[i];
    if (props[propName] == null) {
      continue;
    }
    if (props.multiple) {
      process.env.NODE_ENV !== 'production' ? warning(Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
    } else {
      process.env.NODE_ENV !== 'production' ? warning(!Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
    }
  }
}

/**
 * @param {ReactDOMComponent} inst
 * @param {boolean} multiple
 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
 * @private
 */
function updateOptions(inst, multiple, propValue) {
  var selectedValue, i;
  var options = ReactMount.getNode(inst._rootNodeID).options;

  if (multiple) {
    selectedValue = {};
    for (i = 0; i < propValue.length; i++) {
      selectedValue['' + propValue[i]] = true;
    }
    for (i = 0; i < options.length; i++) {
      var selected = selectedValue.hasOwnProperty(options[i].value);
      if (options[i].selected !== selected) {
        options[i].selected = selected;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    selectedValue = '' + propValue;
    for (i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

/**
 * Implements a <select> native component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = {
  valueContextKey: valueContextKey,

  getNativeProps: function getNativeProps(inst, props, context) {
    return assign({}, props, {
      onChange: inst._wrapperState.onChange,
      value: undefined
    });
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      checkSelectPropTypes(inst, props);
    }

    var value = LinkedValueUtils.getValue(props);
    inst._wrapperState = {
      pendingUpdate: false,
      initialValue: value != null ? value : props.defaultValue,
      onChange: _handleChange.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };
  },

  processChildContext: function processChildContext(inst, props, context) {
    // Pass down initial value so initial generated markup has correct
    // `selected` attributes
    var childContext = assign({}, context);
    childContext[valueContextKey] = inst._wrapperState.initialValue;
    return childContext;
  },

  postUpdateWrapper: function postUpdateWrapper(inst) {
    var props = inst._currentElement.props;

    // After the initial mount, we control selected-ness manually so don't pass
    // the context value down
    inst._wrapperState.initialValue = undefined;

    var wasMultiple = inst._wrapperState.wasMultiple;
    inst._wrapperState.wasMultiple = Boolean(props.multiple);

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      inst._wrapperState.pendingUpdate = false;
      updateOptions(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  this._wrapperState.pendingUpdate = true;
  ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
  return returnValue;
}

module.exports = ReactDOMSelect;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMTextComponent
 * @typechecks static-only
 */



var DOMChildrenOperations = __webpack_require__(61);
var DOMPropertyOperations = __webpack_require__(34);
var ReactComponentBrowserEnvironment = __webpack_require__(36);
var ReactMount = __webpack_require__(5);

var assign = __webpack_require__(2);
var escapeTextContentForBrowser = __webpack_require__(31);
var setTextContent = __webpack_require__(48);
var validateDOMNesting = __webpack_require__(51);

/**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings in elements so that they can undergo
 * the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactDOMTextComponent
 * @extends ReactComponent
 * @internal
 */
var ReactDOMTextComponent = function ReactDOMTextComponent(props) {
  // This constructor and its argument is currently used by mocks.
};

assign(ReactDOMTextComponent.prototype, {

  /**
   * @param {ReactText} text
   * @internal
   */
  construct: function construct(text) {
    // TODO: This is really a ReactText (ReactNode), not a ReactElement
    this._currentElement = text;
    this._stringText = '' + text;

    // Properties
    this._rootNodeID = null;
    this._mountIndex = 0;
  },

  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function mountComponent(rootID, transaction, context) {
    if (process.env.NODE_ENV !== 'production') {
      if (context[validateDOMNesting.ancestorInfoContextKey]) {
        validateDOMNesting('span', null, context[validateDOMNesting.ancestorInfoContextKey]);
      }
    }

    this._rootNodeID = rootID;
    if (transaction.useCreateElement) {
      var ownerDocument = context[ReactMount.ownerDocumentContextKey];
      var el = ownerDocument.createElement('span');
      DOMPropertyOperations.setAttributeForID(el, rootID);
      // Populate node cache
      ReactMount.getID(el);
      setTextContent(el, this._stringText);
      return el;
    } else {
      var escapedText = escapeTextContentForBrowser(this._stringText);

      if (transaction.renderToStaticMarkup) {
        // Normally we'd wrap this in a `span` for the reasons stated above, but
        // since this is a situation where React won't take over (static pages),
        // we can simply return the text as it is.
        return escapedText;
      }

      return '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>';
    }
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {ReactText} nextText The next text content
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function receiveComponent(nextText, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        // TODO: Save this as pending props and use performUpdateIfNecessary
        // and/or updateComponent to do the actual update for consistency with
        // other component types?
        this._stringText = nextStringText;
        var node = ReactMount.getNode(this._rootNodeID);
        DOMChildrenOperations.updateTextContent(node, nextStringText);
      }
    }
  },

  unmountComponent: function unmountComponent() {
    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
  }

});

module.exports = ReactDOMTextComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDefaultBatchingStrategy
 */



var ReactUpdates = __webpack_require__(8);
var Transaction = __webpack_require__(29);

var assign = __webpack_require__(2);
var emptyFunction = __webpack_require__(9);

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function close() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function batchedUpdates(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};

module.exports = ReactDefaultBatchingStrategy;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDefaultInjection
 */



var BeforeInputEventPlugin = __webpack_require__(107);
var ChangeEventPlugin = __webpack_require__(109);
var ClientReactRootIndex = __webpack_require__(110);
var DefaultEventPluginOrder = __webpack_require__(112);
var EnterLeaveEventPlugin = __webpack_require__(113);
var ExecutionEnvironment = __webpack_require__(4);
var HTMLDOMPropertyConfig = __webpack_require__(116);
var ReactBrowserComponentMixin = __webpack_require__(118);
var ReactComponentBrowserEnvironment = __webpack_require__(36);
var ReactDefaultBatchingStrategy = __webpack_require__(70);
var ReactDOMComponent = __webpack_require__(122);
var ReactDOMTextComponent = __webpack_require__(69);
var ReactEventListener = __webpack_require__(132);
var ReactInjection = __webpack_require__(133);
var ReactInstanceHandles = __webpack_require__(17);
var ReactMount = __webpack_require__(5);
var ReactReconcileTransaction = __webpack_require__(137);
var SelectEventPlugin = __webpack_require__(143);
var ServerReactRootIndex = __webpack_require__(144);
var SimpleEventPlugin = __webpack_require__(145);
var SVGDOMPropertyConfig = __webpack_require__(142);

var alreadyInjected = false;

function inject() {
  if (alreadyInjected) {
    // TODO: This is currently true because these injections are shared between
    // the client and the server package. They should be built independently
    // and not share any injection state. Then this problem will be solved.
    return;
  }
  alreadyInjected = true;

  ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
  ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
  ReactInjection.EventPluginHub.injectMount(ReactMount);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  ReactInjection.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    SelectEventPlugin: SelectEventPlugin,
    BeforeInputEventPlugin: BeforeInputEventPlugin
  });

  ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);

  ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);

  ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);

  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);

  ReactInjection.EmptyComponent.injectEmptyComponent('noscript');

  ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);

  ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);

  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);

  if (process.env.NODE_ENV !== 'production') {
    var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
    if (/[?&]react_perf\b/.test(url)) {
      var ReactDefaultPerf = __webpack_require__(129);
      ReactDefaultPerf.start();
    }
  }
}

module.exports = {
  inject: inject
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementValidator
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactElement = __webpack_require__(6);
var ReactPropTypeLocations = __webpack_require__(27);
var ReactPropTypeLocationNames = __webpack_require__(26);
var ReactCurrentOwner = __webpack_require__(11);

var canDefineProperty = __webpack_require__(30);
var getIteratorFn = __webpack_require__(45);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

var loggedTypeFailures = {};

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
  if (addenda === null) {
    // we already showed the warning
    return;
  }
  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : undefined;
}

/**
 * Shared warning and monitoring code for the key warnings.
 *
 * @internal
 * @param {string} messageType A key used for de-duping warnings.
 * @param {ReactElement} element Component that requires a key.
 * @param {*} parentType element's parent's type.
 * @returns {?object} A set of addenda to use in the warning message, or null
 * if the warning has already been shown before (and shouldn't be shown again).
 */
function getAddendaForKeyUse(messageType, element, parentType) {
  var addendum = getDeclarationErrorAddendum();
  if (!addendum) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      addendum = ' Check the top-level render call using <' + parentName + '>.';
    }
  }

  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
  if (memoizer[addendum]) {
    return null;
  }
  memoizer[addendum] = true;

  var addenda = {
    parentOrOwner: addendum,
    url: ' See https://fb.me/react-warning-keys for more information.',
    childOwner: null
  };

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  return addenda;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Assert that the props are valid
 *
 * @param {string} componentName Name of the component for error messages.
 * @param {object} propTypes Map of prop name to a ReactPropType
 * @param {object} props
 * @param {string} location e.g. "prop", "context", "child context"
 * @private
 */
function checkPropTypes(componentName, propTypes, props, location) {
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
        error = propTypes[propName](props, propName, componentName, location);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error === 'undefined' ? 'undefined' : _typeof(error)) : undefined;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var addendum = getDeclarationErrorAddendum();
        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : undefined;
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : undefined;
  }
}

var ReactElementValidator = {

  createElement: function createElement(type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : undefined;

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function createFactory(type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : undefined;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function cloneElement(element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEmptyComponent
 */



var ReactElement = __webpack_require__(6);
var ReactEmptyComponentRegistry = __webpack_require__(74);
var ReactReconciler = __webpack_require__(15);

var assign = __webpack_require__(2);

var placeholderElement;

var ReactEmptyComponentInjection = {
  injectEmptyComponent: function injectEmptyComponent(component) {
    placeholderElement = ReactElement.createElement(component);
  }
};

function registerNullComponentID() {
  ReactEmptyComponentRegistry.registerNullComponentID(this._rootNodeID);
}

var ReactEmptyComponent = function ReactEmptyComponent(instantiate) {
  this._currentElement = null;
  this._rootNodeID = null;
  this._renderedComponent = instantiate(placeholderElement);
};
assign(ReactEmptyComponent.prototype, {
  construct: function construct(element) {},
  mountComponent: function mountComponent(rootID, transaction, context) {
    transaction.getReactMountReady().enqueue(registerNullComponentID, this);
    this._rootNodeID = rootID;
    return ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, context);
  },
  receiveComponent: function receiveComponent() {},
  unmountComponent: function unmountComponent(rootID, transaction, context) {
    ReactReconciler.unmountComponent(this._renderedComponent);
    ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
    this._rootNodeID = null;
    this._renderedComponent = null;
  }
});

ReactEmptyComponent.injection = ReactEmptyComponentInjection;

module.exports = ReactEmptyComponent;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEmptyComponentRegistry
 */



// This registry keeps track of the React IDs of the components that rendered to
// `null` (in reality a placeholder such as `noscript`)

var nullComponentIDsRegistry = {};

/**
 * @param {string} id Component's `_rootNodeID`.
 * @return {boolean} True if the component is rendered to null.
 */
function isNullComponentID(id) {
  return !!nullComponentIDsRegistry[id];
}

/**
 * Mark the component as having rendered to null.
 * @param {string} id Component's `_rootNodeID`.
 */
function registerNullComponentID(id) {
  nullComponentIDsRegistry[id] = true;
}

/**
 * Unmark the component as having rendered to null: it renders to something now.
 * @param {string} id Component's `_rootNodeID`.
 */
function deregisterNullComponentID(id) {
  delete nullComponentIDsRegistry[id];
}

var ReactEmptyComponentRegistry = {
  isNullComponentID: isNullComponentID,
  registerNullComponentID: registerNullComponentID,
  deregisterNullComponentID: deregisterNullComponentID
};

module.exports = ReactEmptyComponentRegistry;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactErrorUtils
 * @typechecks
 */



var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {?String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a, b) {
  try {
    return func(a, b);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
    return undefined;
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function rethrowCaughtError() {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    ReactErrorUtils.invokeGuardedCallback = function (name, func, a, b) {
      var boundFunc = func.bind(null, a, b);
      var evtType = 'react-' + name;
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
    };
  }
}

module.exports = ReactErrorUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInputSelection
 */



var ReactDOMSelection = __webpack_require__(126);

var containsNode = __webpack_require__(54);
var focusNode = __webpack_require__(55);
var getActiveElement = __webpack_require__(56);

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection = {

  hasSelectionCapabilities: function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
  },

  getSelectionInformation: function getSelectionInformation() {
    var focusedElem = getActiveElement();
    return {
      focusedElem: focusedElem,
      selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function restoreSelection(priorSelectionInformation) {
    var curFocusedElem = getActiveElement();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
      }
      focusNode(priorFocusedElem);
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function getSelection(input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      // IE8 input.
      var range = document.selection.createRange();
      // There can only be one selection per document in IE, so it must
      // be in our element.
      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection.getOffsets(input);
    }

    return selection || { start: 0, end: 0 };
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function setSelection(input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (typeof end === 'undefined') {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection.setOffsets(input, offsets);
    }
  }
};

module.exports = ReactInputSelection;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactMarkupChecksum
 */



var adler32 = __webpack_require__(154);

var TAG_END = /\/?>/;

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function addChecksumToMarkup(markup) {
    var checksum = adler32(markup);

    // Add checksum (handle both parent tags and self-closing tags)
    return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function canReuseMarkup(markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};

module.exports = ReactMarkupChecksum;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactMultiChildUpdateTypes
 */



var keyMirror = __webpack_require__(24);

/**
 * When a component's children are updated, a series of update configuration
 * objects are created in order to batch and serialize the required changes.
 *
 * Enumerates all the possible types of update configurations.
 *
 * @internal
 */
var ReactMultiChildUpdateTypes = keyMirror({
  INSERT_MARKUP: null,
  MOVE_EXISTING: null,
  REMOVE_NODE: null,
  SET_MARKUP: null,
  TEXT_CONTENT: null
});

module.exports = ReactMultiChildUpdateTypes;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeComponent
 */



var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);

var autoGenerateWrapperClass = null;
var genericComponentClass = null;
// This registry keeps track of wrapper classes around native tags.
var tagToComponentClass = {};
var textComponentClass = null;

var ReactNativeComponentInjection = {
  // This accepts a class that receives the tag string. This is a catch all
  // that can render any kind of tag.
  injectGenericComponentClass: function injectGenericComponentClass(componentClass) {
    genericComponentClass = componentClass;
  },
  // This accepts a text component class that takes the text string to be
  // rendered as props.
  injectTextComponentClass: function injectTextComponentClass(componentClass) {
    textComponentClass = componentClass;
  },
  // This accepts a keyed object with classes as values. Each key represents a
  // tag. That particular tag will use this class instead of the generic one.
  injectComponentClasses: function injectComponentClasses(componentClasses) {
    assign(tagToComponentClass, componentClasses);
  }
};

/**
 * Get a composite component wrapper class for a specific tag.
 *
 * @param {ReactElement} element The tag for which to get the class.
 * @return {function} The React class constructor function.
 */
function getComponentClassForElement(element) {
  if (typeof element.type === 'function') {
    return element.type;
  }
  var tag = element.type;
  var componentClass = tagToComponentClass[tag];
  if (componentClass == null) {
    tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
  }
  return componentClass;
}

/**
 * Get a native internal component class for a specific tag.
 *
 * @param {ReactElement} element The element to create.
 * @return {function} The internal class constructor function.
 */
function createInternalComponent(element) {
  !genericComponentClass ? process.env.NODE_ENV !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
  return new genericComponentClass(element.type, element.props);
}

/**
 * @param {ReactText} text
 * @return {ReactComponent}
 */
function createInstanceForText(text) {
  return new textComponentClass(text);
}

/**
 * @param {ReactComponent} component
 * @return {boolean}
 */
function isTextComponent(component) {
  return component instanceof textComponentClass;
}

var ReactNativeComponent = {
  getComponentClassForElement: getComponentClassForElement,
  createInternalComponent: createInternalComponent,
  createInstanceForText: createInstanceForText,
  isTextComponent: isTextComponent,
  injection: ReactNativeComponentInjection
};

module.exports = ReactNativeComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNoopUpdateQueue
 */



var warning = __webpack_require__(3);

function warnTDZ(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : undefined;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function isMounted(publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function enqueueCallback(publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function enqueueForceUpdate(publicInstance) {
    warnTDZ(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState) {
    warnTDZ(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function enqueueSetState(publicInstance, partialState) {
    warnTDZ(publicInstance, 'setState');
  },

  /**
   * Sets a subset of the props.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialProps Subset of the next props.
   * @internal
   */
  enqueueSetProps: function enqueueSetProps(publicInstance, partialProps) {
    warnTDZ(publicInstance, 'setProps');
  },

  /**
   * Replaces all of the props.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} props New props.
   * @internal
   */
  enqueueReplaceProps: function enqueueReplaceProps(publicInstance, props) {
    warnTDZ(publicInstance, 'replaceProps');
  }

};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypes
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactElement = __webpack_require__(6);
var ReactPropTypeLocationNames = __webpack_require__(26);

var emptyFunction = __webpack_require__(9);
var getIteratorFn = __webpack_require__(45);

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (propValue === expectedValues[i]) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRootIndex
 * @typechecks
 */



var ReactRootIndexInjection = {
  /**
   * @param {function} _createReactRootIndex
   */
  injectCreateReactRootIndex: function injectCreateReactRootIndex(_createReactRootIndex) {
    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
  }
};

var ReactRootIndex = {
  createReactRootIndex: null,
  injection: ReactRootIndexInjection
};

module.exports = ReactRootIndex;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewportMetrics
 */



var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function refreshScrollValues(scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule accumulateInto
 */



var invariant = __webpack_require__(1);

/**
 *
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(false) : undefined;
  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  var currentIsArray = Array.isArray(current);
  var nextIsArray = Array.isArray(next);

  if (currentIsArray && nextIsArray) {
    current.push.apply(current, next);
    return current;
  }

  if (currentIsArray) {
    current.push(next);
    return current;
  }

  if (nextIsArray) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

module.exports = accumulateInto;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule forEachAccumulated
 */



/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */

var forEachAccumulated = function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};

module.exports = forEachAccumulated;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getTextContentAccessor
 */



var ExecutionEnvironment = __webpack_require__(4);

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

module.exports = getTextContentAccessor;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isTextInputElement
 */



/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */

var supportedInputTypes = {
  'color': true,
  'date': true,
  'datetime': true,
  'datetime-local': true,
  'email': true,
  'month': true,
  'number': true,
  'password': true,
  'range': true,
  'search': true,
  'tel': true,
  'text': true,
  'time': true,
  'url': true,
  'week': true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === 'input' && supportedInputTypes[elem.type] || nodeName === 'textarea');
}

module.exports = isTextInputElement;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(66);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

var _Chart = __webpack_require__(52);

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _react2.default.createClass({
  displayName: 'List',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-sm-12 col-md-6 col-lg-3' },
        _react2.default.createElement(_Chart2.default, { title: "ANTAM", categories: ["jan", "feb", "mar", "apr"], data: [17, 23, 39, 30], vwap: [18, 15, 11, 10] })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-12 col-md-6 col-lg-3' },
        _react2.default.createElement(_Chart2.default, { title: "PPRO", categories: ["jan", "feb", "mar", "apr"], data: [10, 20, 30, 40], vwap: [10, 13, 8, 16] })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-12 col-md-6 col-lg-3' },
        _react2.default.createElement(_Chart2.default, { title: "SMGR", categories: ["jan", "feb", "mar", "apr"], data: [6, 10, 18, 20], vwap: [30, 19, 4, 13] })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-12 col-md-6 col-lg-3' },
        _react2.default.createElement(_Chart2.default, { title: "BBCA", categories: ["jan", "feb", "mar", "apr"], data: [10, 11, 15, 20], vwap: [40, 23, 18, 26] })
      )
    );
  }
});

module.exports = List;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule camelize
 * @typechecks
 */



var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule camelizeStyleName
 * @typechecks
 */



var camelize = __webpack_require__(91);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createArrayFromMixed
 * @typechecks
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toArray = __webpack_require__(104);

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray(obj);
  }
}

module.exports = createArrayFromMixed;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createNodesFromMarkup
 * @typechecks
 */

/*eslint-disable fb-www/unsafe-html*/



var ExecutionEnvironment = __webpack_require__(4);

var createArrayFromMixed = __webpack_require__(93);
var getMarkupWrap = __webpack_require__(57);
var invariant = __webpack_require__(1);

/**
 * Dummy container used to render all markup.
 */
var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

/**
 * Pattern used by `getNodeName`.
 */
var nodeNamePattern = /^\s*<(\w+)/;

/**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */
function getNodeName(markup) {
  var nodeNameMatch = markup.match(nodeNamePattern);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

/**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */
function createNodesFromMarkup(markup, handleScript) {
  var node = dummyNode;
  !!!dummyNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
  var nodeName = getNodeName(markup);

  var wrap = nodeName && getMarkupWrap(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    !handleScript ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : undefined;
    createArrayFromMixed(scripts).forEach(handleScript);
  }

  var nodes = createArrayFromMixed(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}

module.exports = createNodesFromMarkup;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getUnboundedScrollPosition
 * @typechecks
 */



/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable === window) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule hyphenate
 * @typechecks
 */



var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule hyphenateStyleName
 * @typechecks
 */



var hyphenate = __webpack_require__(96);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isNode
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isNode(object) {
  return !!(object && (typeof Node === 'function' ? object instanceof Node : (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isTextNode
 * @typechecks
 */



var isNode = __webpack_require__(98);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule mapObject
 */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule memoizeStringOnly
 * @typechecks static-only
 */



/**
 * Memoizes the return value of a function that accepts one string argument.
 *
 * @param {function} callback
 * @return {function}
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

module.exports = memoizeStringOnly;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule performance
 * @typechecks
 */



var ExecutionEnvironment = __webpack_require__(4);

var performance;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.msPerformance || window.webkitPerformance;
}

module.exports = performance || {};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule performanceNow
 * @typechecks
 */



var performance = __webpack_require__(102);

var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

module.exports = performanceNow;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule toArray
 * @typechecks
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var invariant = __webpack_require__(1);

/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray(obj) {
  var length = obj.length;

  // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
  // old versions of Safari).
  !(!Array.isArray(obj) && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : undefined;

  !(typeof length === 'number') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : undefined;

  !(length === 0 || length - 1 in obj) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : undefined;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

module.exports = toArray;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, r) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = r(__webpack_require__(18), __webpack_require__(59)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18), __webpack_require__(59)], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.ReactHighcharts = r(require("react"), require("highcharts")) : t.ReactHighcharts = r(t.React, t.Highcharts);
}(undefined, function (t, r) {
  return function (t) {
    function r(o) {
      if (e[o]) return e[o].exports;var n = e[o] = { exports: {}, id: o, loaded: !1 };return t[o].call(n.exports, n, n.exports, r), n.loaded = !0, n.exports;
    }var e = {};return r.m = t, r.c = e, r.p = "", r(0);
  }([function (t, r, e) {
    t.exports = e(3);
  }, function (r, e) {
    r.exports = t;
  }, function (t, r, e) {
    (function (r) {
      "use strict";
      var o = Object.assign || function (t) {
        for (var r = 1; r < arguments.length; r++) {
          var e = arguments[r];for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          }
        }return t;
      },
          n = e(1),
          i = "undefined" == typeof r ? window : r;t.exports = function (r, e) {
        var c = "Highcharts" + r,
            s = n.createClass({ displayName: c, propTypes: { config: n.PropTypes.object.isRequired, isPureConfig: n.PropTypes.bool, neverReflow: n.PropTypes.bool, callback: n.PropTypes.func, domProps: n.PropTypes.object }, defaultProps: { callback: function callback() {}, domProps: {} }, renderChart: function renderChart(t) {
            var n = this;if (!t) throw new Error("Config must be specified for the " + c + " component");var s = t.chart;this.chart = new e[r](o({}, t, { chart: o({}, s, { renderTo: this.refs.chart }) }), this.props.callback), this.props.neverReflow || i && i.requestAnimationFrame && requestAnimationFrame(function () {
              n.chart && n.chart.options && n.chart.reflow();
            });
          }, shouldComponentUpdate: function shouldComponentUpdate(t) {
            return !!(t.neverReflow || t.isPureConfig && this.props.config === t.config) || (this.renderChart(t.config), !1);
          }, getChart: function getChart() {
            if (!this.chart) throw new Error("getChart() should not be called before the component is mounted");return this.chart;
          }, componentDidMount: function componentDidMount() {
            this.renderChart(this.props.config);
          }, componentWillUnmount: function componentWillUnmount() {
            this.chart.destroy();
          }, render: function render() {
            return n.createElement("div", o({ ref: "chart" }, this.props.domProps));
          } });return s.Highcharts = e, s.withHighcharts = function (e) {
          return t.exports(r, e);
        }, s;
      };
    }).call(r, function () {
      return this;
    }());
  }, function (t, r, e) {
    "use strict";
    t.exports = e(2)("Chart", e(4));
  }, function (t, e) {
    t.exports = r;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88)(module)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AutoFocusUtils
 * @typechecks static-only
 */



var ReactMount = __webpack_require__(5);

var findDOMNode = __webpack_require__(41);
var focusNode = __webpack_require__(55);

var Mixin = {
  componentDidMount: function componentDidMount() {
    if (this.props.autoFocus) {
      focusNode(findDOMNode(this));
    }
  }
};

var AutoFocusUtils = {
  Mixin: Mixin,

  focusDOMComponent: function focusDOMComponent() {
    focusNode(ReactMount.getNode(this._rootNodeID));
  }
};

module.exports = AutoFocusUtils;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015 Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BeforeInputEventPlugin
 * @typechecks static-only
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var EventConstants = __webpack_require__(10);
var EventPropagators = __webpack_require__(21);
var ExecutionEnvironment = __webpack_require__(4);
var FallbackCompositionState = __webpack_require__(115);
var SyntheticCompositionEvent = __webpack_require__(147);
var SyntheticInputEvent = __webpack_require__(150);

var keyOf = __webpack_require__(12);

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return (typeof opera === 'undefined' ? 'undefined' : _typeof(opera)) === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

var topLevelTypes = EventConstants.topLevelTypes;

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBeforeInput: null }),
      captured: keyOf({ onBeforeInputCapture: null })
    },
    dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionEnd: null }),
      captured: keyOf({ onCompositionEndCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionStart: null }),
      captured: keyOf({ onCompositionStartCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionUpdate: null }),
      captured: keyOf({ onCompositionUpdateCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionStart:
      return eventTypes.compositionStart;
    case topLevelTypes.topCompositionEnd:
      return eventTypes.compositionEnd;
    case topLevelTypes.topCompositionUpdate:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topKeyUp:
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case topLevelTypes.topKeyDown:
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case topLevelTypes.topKeyPress:
    case topLevelTypes.topMouseDown:
    case topLevelTypes.topBlur:
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if ((typeof detail === 'undefined' ? 'undefined' : _typeof(detail)) === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition fallback object, if any.
var currentComposition = null;

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {DOMEventTarget} topLevelTarget The listening component root node.
 * @param {string} topLevelTargetID ID of `topLevelTarget`.
 * @param {object} nativeEvent Native browser event.
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!currentComposition) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!currentComposition && eventType === eventTypes.compositionStart) {
      currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (currentComposition) {
        fallbackData = currentComposition.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionEnd:
      return getDataFromCustomEvent(nativeEvent);
    case topLevelTypes.topKeyPress:
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case topLevelTypes.topTextInput:
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  if (currentComposition) {
    if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = currentComposition.getData();
      FallbackCompositionState.release(currentComposition);
      currentComposition = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case topLevelTypes.topPaste:
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case topLevelTypes.topKeyPress:
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case topLevelTypes.topCompositionEnd:
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {DOMEventTarget} topLevelTarget The listening component root node.
 * @param {string} topLevelTargetID ID of `topLevelTarget`.
 * @param {object} nativeEvent Native browser event.
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
  }
};

module.exports = BeforeInputEventPlugin;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSPropertyOperations
 * @typechecks static-only
 */



var CSSProperty = __webpack_require__(60);
var ExecutionEnvironment = __webpack_require__(4);
var ReactPerf = __webpack_require__(7);

var camelizeStyleName = __webpack_require__(92);
var dangerousStyleValue = __webpack_require__(155);
var hyphenateStyleName = __webpack_require__(97);
var memoizeStringOnly = __webpack_require__(101);
var warning = __webpack_require__(3);

var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

var hasShorthandPropertyBug = false;
var styleFloatAccessor = 'cssFloat';
if (ExecutionEnvironment.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
  // IE8 only supports accessing cssFloat (standard) as styleFloat
  if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat';
  }
}

if (process.env.NODE_ENV !== 'production') {
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};

  var warnHyphenatedStyleName = function warnHyphenatedStyleName(name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?', name, camelizeStyleName(name)) : undefined;
  };

  var warnBadVendoredStyleName = function warnBadVendoredStyleName(name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1)) : undefined;
  };

  var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    process.env.NODE_ENV !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon. ' + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, '')) : undefined;
  };

  /**
   * @param {string} name
   * @param {*} value
   */
  var warnValidStyle = function warnValidStyle(name, value) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value);
    }
  };
}

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {

  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @return {?string}
   */
  createMarkupForStyles: function createMarkupForStyles(styles) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (process.env.NODE_ENV !== 'production') {
        warnValidStyle(styleName, styleValue);
      }
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   */
  setValueForStyles: function setValueForStyles(node, styles) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      if (process.env.NODE_ENV !== 'production') {
        warnValidStyle(styleName, styles[styleName]);
      }
      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
      if (styleName === 'float') {
        styleName = styleFloatAccessor;
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }

};

ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {
  setValueForStyles: 'setValueForStyles'
});

module.exports = CSSPropertyOperations;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ChangeEventPlugin
 */



var EventConstants = __webpack_require__(10);
var EventPluginHub = __webpack_require__(20);
var EventPropagators = __webpack_require__(21);
var ExecutionEnvironment = __webpack_require__(4);
var ReactUpdates = __webpack_require__(8);
var SyntheticEvent = __webpack_require__(16);

var getEventTarget = __webpack_require__(44);
var isEventSupported = __webpack_require__(47);
var isTextInputElement = __webpack_require__(87);
var keyOf = __webpack_require__(12);

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  change: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onChange: null }),
      captured: keyOf({ onChangeCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
  }
};

/**
 * For IE shims
 */
var activeElement = null;
var activeElementID = null;
var activeElementValue = null;
var activeElementValueProp = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var doesChangeEventBubble = false;
if (ExecutionEnvironment.canUseDOM) {
  // See `handleChange` comment below
  doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent, getEventTarget(nativeEvent));
  EventPropagators.accumulateTwoPhaseDispatches(event);

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  ReactUpdates.batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue(false);
}

function startWatchingForChangeEventIE8(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
}

function stopWatchingForChangeEventIE8() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
  activeElement = null;
  activeElementID = null;
}

function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topChange) {
    return topLevelTargetID;
  }
}
function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForChangeEventIE8();
    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForChangeEventIE8();
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events
  isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
}

/**
 * (For old IE.) Replacement getter/setter for the `value` property that gets
 * set on the active element.
 */
var newValueProp = {
  get: function get() {
    return activeElementValueProp.get.call(this);
  },
  set: function set(val) {
    // Cast to a string so we can do equality checks.
    activeElementValue = '' + val;
    activeElementValueProp.set.call(this, val);
  }
};

/**
 * (For old IE.) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetID) {
  activeElement = target;
  activeElementID = targetID;
  activeElementValue = target.value;
  activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');

  // Not guarded in a canDefineProperty check: IE8 supports defineProperty only
  // on DOM elements
  Object.defineProperty(activeElement, 'value', newValueProp);
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For old IE.) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }

  // delete restores the original property definition
  delete activeElement.value;
  activeElement.detachEvent('onpropertychange', handlePropertyChange);

  activeElement = null;
  activeElementID = null;
  activeElementValue = null;
  activeElementValueProp = null;
}

/**
 * (For old IE.) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  var value = nativeEvent.srcElement.value;
  if (value === activeElementValue) {
    return;
  }
  activeElementValue = value;

  manualDispatchChangeEvent(nativeEvent);
}

/**
 * If a `change` event should be fired, returns the target's ID.
 */
function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topInput) {
    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
    // what we want so fall through here and trigger an abstract event
    return topLevelTargetID;
  }
}

// For IE8 and IE9.
function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topFocus) {
    // In IE8, we can capture almost all .value changes by adding a
    // propertychange handler and looking for events with propertyName
    // equal to 'value'
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
  } else if (topLevelType === topLevelTypes.topBlur) {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    if (activeElement && activeElement.value !== activeElementValue) {
      activeElementValue = activeElement.value;
      return activeElementID;
    }
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
  if (topLevelType === topLevelTypes.topClick) {
    return topLevelTargetID;
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {

    var getTargetIDFunc, handleEventFunc;
    if (shouldUseChangeEvent(topLevelTarget)) {
      if (doesChangeEventBubble) {
        getTargetIDFunc = getTargetIDForChangeEvent;
      } else {
        handleEventFunc = handleEventsForChangeEventIE8;
      }
    } else if (isTextInputElement(topLevelTarget)) {
      if (isInputEventSupported) {
        getTargetIDFunc = getTargetIDForInputEvent;
      } else {
        getTargetIDFunc = getTargetIDForInputEventIE;
        handleEventFunc = handleEventsForInputEventIE;
      }
    } else if (shouldUseClickEvent(topLevelTarget)) {
      getTargetIDFunc = getTargetIDForClickEvent;
    }

    if (getTargetIDFunc) {
      var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
      if (targetID) {
        var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent, nativeEventTarget);
        event.type = 'change';
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
    }
  }

};

module.exports = ChangeEventPlugin;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ClientReactRootIndex
 * @typechecks
 */



var nextReactRootIndex = 0;

var ClientReactRootIndex = {
  createReactRootIndex: function createReactRootIndex() {
    return nextReactRootIndex++;
  }
};

module.exports = ClientReactRootIndex;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Danger
 * @typechecks static-only
 */



var ExecutionEnvironment = __webpack_require__(4);

var createNodesFromMarkup = __webpack_require__(94);
var emptyFunction = __webpack_require__(9);
var getMarkupWrap = __webpack_require__(57);
var invariant = __webpack_require__(1);

var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
var RESULT_INDEX_ATTR = 'data-danger-index';

/**
 * Extracts the `nodeName` from a string of markup.
 *
 * NOTE: Extracting the `nodeName` does not require a regular expression match
 * because we make assumptions about React-generated markup (i.e. there are no
 * spaces surrounding the opening tag and there is at least one attribute).
 *
 * @param {string} markup String of markup.
 * @return {string} Node name of the supplied markup.
 * @see http://jsperf.com/extract-nodename
 */
function getNodeName(markup) {
  return markup.substring(1, markup.indexOf(' '));
}

var Danger = {

  /**
   * Renders markup into an array of nodes. The markup is expected to render
   * into a list of root nodes. Also, the length of `resultList` and
   * `markupList` should be the same.
   *
   * @param {array<string>} markupList List of markup strings to render.
   * @return {array<DOMElement>} List of rendered nodes.
   * @internal
   */
  dangerouslyRenderMarkup: function dangerouslyRenderMarkup(markupList) {
    !ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
    var nodeName;
    var markupByNodeName = {};
    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
    for (var i = 0; i < markupList.length; i++) {
      !markupList[i] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
      nodeName = getNodeName(markupList[i]);
      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
      markupByNodeName[nodeName][i] = markupList[i];
    }
    var resultList = [];
    var resultListAssignmentCount = 0;
    for (nodeName in markupByNodeName) {
      if (!markupByNodeName.hasOwnProperty(nodeName)) {
        continue;
      }
      var markupListByNodeName = markupByNodeName[nodeName];

      // This for-in loop skips the holes of the sparse array. The order of
      // iteration should follow the order of assignment, which happens to match
      // numerical index order, but we don't rely on that.
      var resultIndex;
      for (resultIndex in markupListByNodeName) {
        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
          var markup = markupListByNodeName[resultIndex];

          // Push the requested markup with an additional RESULT_INDEX_ATTR
          // attribute.  If the markup does not start with a < character, it
          // will be discarded below (with an appropriate console.error).
          markupListByNodeName[resultIndex] = markup.replace(OPEN_TAG_NAME_EXP,
          // This index will be parsed back out below.
          '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" ');
        }
      }

      // Render each group of markup with similar wrapping `nodeName`.
      var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction // Do nothing special with <script> tags.
      );

      for (var j = 0; j < renderNodes.length; ++j) {
        var renderNode = renderNodes[j];
        if (renderNode.hasAttribute && renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
          renderNode.removeAttribute(RESULT_INDEX_ATTR);

          !!resultList.hasOwnProperty(resultIndex) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Danger: Assigning to an already-occupied result index.') : invariant(false) : undefined;

          resultList[resultIndex] = renderNode;

          // This should match resultList.length and markupList.length when
          // we're done.
          resultListAssignmentCount += 1;
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Danger: Discarding unexpected node:', renderNode);
        }
      }
    }

    // Although resultList was populated out of order, it should now be a dense
    // array.
    !(resultListAssignmentCount === resultList.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Danger: Did not assign to every index of resultList.') : invariant(false) : undefined;

    !(resultList.length === markupList.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(false) : undefined;

    return resultList;
  },

  /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */
  dangerouslyReplaceNodeWithMarkup: function dangerouslyReplaceNodeWithMarkup(oldChild, markup) {
    !ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
    !markup ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(false) : undefined;
    !(oldChild.tagName.toLowerCase() !== 'html') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See ReactDOMServer.renderToString().') : invariant(false) : undefined;

    var newChild;
    if (typeof markup === 'string') {
      newChild = createNodesFromMarkup(markup, emptyFunction)[0];
    } else {
      newChild = markup;
    }
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }

};

module.exports = Danger;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DefaultEventPluginOrder
 */



var keyOf = __webpack_require__(12);

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DefaultEventPluginOrder = [keyOf({ ResponderEventPlugin: null }), keyOf({ SimpleEventPlugin: null }), keyOf({ TapEventPlugin: null }), keyOf({ EnterLeaveEventPlugin: null }), keyOf({ ChangeEventPlugin: null }), keyOf({ SelectEventPlugin: null }), keyOf({ BeforeInputEventPlugin: null })];

module.exports = DefaultEventPluginOrder;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EnterLeaveEventPlugin
 * @typechecks static-only
 */



var EventConstants = __webpack_require__(10);
var EventPropagators = __webpack_require__(21);
var SyntheticMouseEvent = __webpack_require__(28);

var ReactMount = __webpack_require__(5);
var keyOf = __webpack_require__(12);

var topLevelTypes = EventConstants.topLevelTypes;
var getFirstReactDOM = ReactMount.getFirstReactDOM;

var eventTypes = {
  mouseEnter: {
    registrationName: keyOf({ onMouseEnter: null }),
    dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
  },
  mouseLeave: {
    registrationName: keyOf({ onMouseLeave: null }),
    dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
  }
};

var extractedEvents = [null, null];

var EnterLeaveEventPlugin = {

  eventTypes: eventTypes,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (topLevelTarget.window === topLevelTarget) {
      // `topLevelTarget` is probably a window object.
      win = topLevelTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = topLevelTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    var fromID = '';
    var toID = '';
    if (topLevelType === topLevelTypes.topMouseOut) {
      from = topLevelTarget;
      fromID = topLevelTargetID;
      to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement);
      if (to) {
        toID = ReactMount.getID(to);
      } else {
        to = win;
      }
      to = to || win;
    } else {
      from = win;
      to = topLevelTarget;
      toID = topLevelTargetID;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, fromID, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = from;
    leave.relatedTarget = to;

    var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, toID, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = to;
    enter.relatedTarget = from;

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

    extractedEvents[0] = leave;
    extractedEvents[1] = enter;

    return extractedEvents;
  }

};

module.exports = EnterLeaveEventPlugin;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginUtils
 */



var EventConstants = __webpack_require__(10);
var ReactErrorUtils = __webpack_require__(75);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

/**
 * Injected dependencies:
 */

/**
 * - `Mount`: [required] Module that can convert between React dom IDs and
 *   actual node references.
 */
var injection = {
  Mount: null,
  injectMount: function injectMount(InjectedMount) {
    injection.Mount = InjectedMount;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(InjectedMount && InjectedMount.getNode && InjectedMount.getID, 'EventPluginUtils.injection.injectMount(...): Injected Mount ' + 'module is missing getNode or getID.') : undefined;
    }
  }
};

var topLevelTypes = EventConstants.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
}

var validateEventDispatches;
if (process.env.NODE_ENV !== 'production') {
  validateEventDispatches = function validateEventDispatches(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var idsIsArr = Array.isArray(dispatchIDs);
    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    process.env.NODE_ENV !== 'production' ? warning(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : undefined;
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */
function executeDispatch(event, simulated, listener, domID) {
  var type = event.type || 'unknown-event';
  event.currentTarget = injection.Mount.getNode(domID);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
  }
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchIDs);
  }
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  !!Array.isArray(dispatchListener) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
  var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getNode: function getNode(id) {
    return injection.Mount.getNode(id);
  },
  getID: function getID(node) {
    return injection.Mount.getID(node);
  },

  injection: injection
};

module.exports = EventPluginUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FallbackCompositionState
 * @typechecks static-only
 */



var PooledClass = __webpack_require__(13);

var assign = __webpack_require__(2);
var getTextContentAccessor = __webpack_require__(86);

/**
 * This helper class stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

assign(FallbackCompositionState.prototype, {
  destructor: function destructor() {
    this._root = null;
    this._startText = null;
    this._fallbackText = null;
  },

  /**
   * Get current text of input.
   *
   * @return {string}
   */
  getText: function getText() {
    if ('value' in this._root) {
      return this._root.value;
    }
    return this._root[getTextContentAccessor()];
  },

  /**
   * Determine the differing substring between the initially stored
   * text content and the current content.
   *
   * @return {string}
   */
  getData: function getData() {
    if (this._fallbackText) {
      return this._fallbackText;
    }

    var start;
    var startValue = this._startText;
    var startLength = startValue.length;
    var end;
    var endValue = this.getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    this._fallbackText = endValue.slice(start, sliceTail);
    return this._fallbackText;
  }
});

PooledClass.addPoolingTo(FallbackCompositionState);

module.exports = FallbackCompositionState;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule HTMLDOMPropertyConfig
 */



var DOMProperty = __webpack_require__(14);
var ExecutionEnvironment = __webpack_require__(4);

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var hasSVG;
if (ExecutionEnvironment.canUseDOM) {
  var implementation = document.implementation;
  hasSVG = implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
}

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
  Properties: {
    /**
     * Standard Properties
     */
    accept: null,
    acceptCharset: null,
    accessKey: null,
    action: null,
    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    allowTransparency: MUST_USE_ATTRIBUTE,
    alt: null,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: null,
    // autoFocus is polyfilled/normalized by AutoFocusUtils
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    cellPadding: null,
    cellSpacing: null,
    charSet: MUST_USE_ATTRIBUTE,
    challenge: MUST_USE_ATTRIBUTE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    classID: MUST_USE_ATTRIBUTE,
    // To set className on SVG elements, it's necessary to use .setAttribute;
    // this works on HTML elements too in all browsers except IE8. Conveniently,
    // IE8 doesn't support SVG and so we can simply use the attribute in
    // browsers that support SVG and the property in browsers that don't,
    // regardless of whether the element is HTML or SVG.
    className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: MUST_USE_ATTRIBUTE,
    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    coords: null,
    crossOrigin: null,
    data: null, // For `<object />` acts as `src`.
    dateTime: MUST_USE_ATTRIBUTE,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    dir: null,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: null,
    encType: null,
    form: MUST_USE_ATTRIBUTE,
    formAction: MUST_USE_ATTRIBUTE,
    formEncType: MUST_USE_ATTRIBUTE,
    formMethod: MUST_USE_ATTRIBUTE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    formTarget: MUST_USE_ATTRIBUTE,
    frameBorder: MUST_USE_ATTRIBUTE,
    headers: null,
    height: MUST_USE_ATTRIBUTE,
    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    high: null,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: MUST_USE_PROPERTY,
    inputMode: MUST_USE_ATTRIBUTE,
    integrity: null,
    is: MUST_USE_ATTRIBUTE,
    keyParams: MUST_USE_ATTRIBUTE,
    keyType: MUST_USE_ATTRIBUTE,
    kind: null,
    label: null,
    lang: null,
    list: MUST_USE_ATTRIBUTE,
    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    low: null,
    manifest: MUST_USE_ATTRIBUTE,
    marginHeight: null,
    marginWidth: null,
    max: null,
    maxLength: MUST_USE_ATTRIBUTE,
    media: MUST_USE_ATTRIBUTE,
    mediaGroup: null,
    method: null,
    min: null,
    minLength: MUST_USE_ATTRIBUTE,
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: null,
    nonce: MUST_USE_ATTRIBUTE,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    optimum: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    rel: null,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    role: MUST_USE_ATTRIBUTE,
    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scoped: HAS_BOOLEAN_VALUE,
    scrolling: null,
    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    shape: null,
    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    sizes: MUST_USE_ATTRIBUTE,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: null,
    src: null,
    srcDoc: MUST_USE_PROPERTY,
    srcLang: null,
    srcSet: MUST_USE_ATTRIBUTE,
    start: HAS_NUMERIC_VALUE,
    step: null,
    style: null,
    summary: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    useMap: null,
    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
    width: MUST_USE_ATTRIBUTE,
    wmode: MUST_USE_ATTRIBUTE,
    wrap: null,

    /**
     * RDFa Properties
     */
    about: MUST_USE_ATTRIBUTE,
    datatype: MUST_USE_ATTRIBUTE,
    inlist: MUST_USE_ATTRIBUTE,
    prefix: MUST_USE_ATTRIBUTE,
    // property is also supported for OpenGraph in meta tags.
    property: MUST_USE_ATTRIBUTE,
    resource: MUST_USE_ATTRIBUTE,
    'typeof': MUST_USE_ATTRIBUTE,
    vocab: MUST_USE_ATTRIBUTE,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: MUST_USE_ATTRIBUTE,
    autoCorrect: MUST_USE_ATTRIBUTE,
    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
    autoSave: null,
    // color is for Safari mask-icon link
    color: null,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: MUST_USE_ATTRIBUTE,
    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    itemType: MUST_USE_ATTRIBUTE,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: MUST_USE_ATTRIBUTE,
    itemRef: MUST_USE_ATTRIBUTE,
    // results show looking glass icon and recent searches on input
    // search fields in WebKit/Blink
    results: null,
    // IE-only attribute that specifies security restrictions on an iframe
    // as an alternative to the sandbox attribute on IE<10
    security: MUST_USE_ATTRIBUTE,
    // IE-only attribute that controls focus behavior
    unselectable: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMPropertyNames: {
    autoComplete: 'autocomplete',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    autoSave: 'autosave',
    // `encoding` is equivalent to `enctype`, IE8 lacks an `enctype` setter.
    // http://www.w3.org/TR/html5/forms.html#dom-fs-encoding
    encType: 'encoding',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc',
    srcSet: 'srcset'
  }
};

module.exports = HTMLDOMPropertyConfig;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */



var ReactDOM = __webpack_require__(66);
var ReactDOMServer = __webpack_require__(127);
var ReactIsomorphic = __webpack_require__(134);

var assign = __webpack_require__(2);
var deprecated = __webpack_require__(156);

// `version` will be added here by ReactIsomorphic.
var React = {};

assign(React, ReactIsomorphic);

assign(React, {
  // ReactDOM
  findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.findDOMNode),
  render: deprecated('render', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.render),
  unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.unmountComponentAtNode),

  // ReactDOMServer
  renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
  renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
});

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
React.__SECRET_DOM_SERVER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMServer;

module.exports = React;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactBrowserComponentMixin
 */



var ReactInstanceMap = __webpack_require__(22);

var findDOMNode = __webpack_require__(41);
var warning = __webpack_require__(3);

var didWarnKey = '_getDOMNodeDidWarn';

var ReactBrowserComponentMixin = {
  /**
   * Returns the DOM node rendered by this component.
   *
   * @return {DOMElement} The root node of this component.
   * @final
   * @protected
   */
  getDOMNode: function getDOMNode() {
    process.env.NODE_ENV !== 'production' ? warning(this.constructor[didWarnKey], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
    this.constructor[didWarnKey] = true;
    return findDOMNode(this);
  }
};

module.exports = ReactBrowserComponentMixin;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactChildReconciler
 * @typechecks static-only
 */



var ReactReconciler = __webpack_require__(15);

var instantiateReactComponent = __webpack_require__(46);
var shouldUpdateReactComponent = __webpack_require__(49);
var traverseAllChildren = __webpack_require__(50);
var warning = __webpack_require__(3);

function instantiateChild(childInstances, child, name) {
  // We found a component instance.
  var keyUnique = childInstances[name] === undefined;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
  }
  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent(child, null);
  }
}

/**
 * ReactChildReconciler provides helpers for initializing or updating a set of
 * children. Its output is suitable for passing it onto ReactMultiChild which
 * does diffed reordering and insertion.
 */
var ReactChildReconciler = {
  /**
   * Generates a "mount image" for each of the supplied children. In the case
   * of `ReactDOMComponent`, a mount image is a string of markup.
   *
   * @param {?object} nestedChildNodes Nested child maps.
   * @return {?object} A set of child instances.
   * @internal
   */
  instantiateChildren: function instantiateChildren(nestedChildNodes, transaction, context) {
    if (nestedChildNodes == null) {
      return null;
    }
    var childInstances = {};
    traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
    return childInstances;
  },

  /**
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Flat child element maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren: function updateChildren(prevChildren, nextChildren, transaction, context) {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout if nothing has changed.
    if (!nextChildren && !prevChildren) {
      return null;
    }
    var name;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      var prevChild = prevChildren && prevChildren[name];
      var prevElement = prevChild && prevChild._currentElement;
      var nextElement = nextChildren[name];
      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
        nextChildren[name] = prevChild;
      } else {
        if (prevChild) {
          ReactReconciler.unmountComponent(prevChild, name);
        }
        // The child must be instantiated before it's mounted.
        var nextChildInstance = instantiateReactComponent(nextElement, null);
        nextChildren[name] = nextChildInstance;
      }
    }
    // Unmount children that are no longer present.
    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
        ReactReconciler.unmountComponent(prevChildren[name]);
      }
    }
    return nextChildren;
  },

  /**
   * Unmounts all rendered children. This should be used to clean up children
   * when this component is unmounted.
   *
   * @param {?object} renderedChildren Previously initialized set of children.
   * @internal
   */
  unmountChildren: function unmountChildren(renderedChildren) {
    for (var name in renderedChildren) {
      if (renderedChildren.hasOwnProperty(name)) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild);
      }
    }
  }

};

module.exports = ReactChildReconciler;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCompositeComponent
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactComponentEnvironment = __webpack_require__(37);
var ReactCurrentOwner = __webpack_require__(11);
var ReactElement = __webpack_require__(6);
var ReactInstanceMap = __webpack_require__(22);
var ReactPerf = __webpack_require__(7);
var ReactPropTypeLocations = __webpack_require__(27);
var ReactPropTypeLocationNames = __webpack_require__(26);
var ReactReconciler = __webpack_require__(15);
var ReactUpdateQueue = __webpack_require__(39);

var assign = __webpack_require__(2);
var emptyObject = __webpack_require__(19);
var invariant = __webpack_require__(1);
var shouldUpdateReactComponent = __webpack_require__(49);
var warning = __webpack_require__(3);

function getDeclarationErrorAddendum(component) {
  var owner = component._currentElement._owner || null;
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function StatelessComponent(Component) {}
StatelessComponent.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  return Component(this.props, this.context, this.updater);
};

/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
var nextMountID = 1;

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponentMixin = {

  /**
   * Base constructor for all composite component.
   *
   * @param {ReactElement} element
   * @final
   * @internal
   */
  construct: function construct(element) {
    this._currentElement = element;
    this._rootNodeID = null;
    this._instance = null;

    // See ReactUpdateQueue
    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedComponent = null;

    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    // See ReactUpdates and ReactUpdateQueue.
    this._pendingCallbacks = null;
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {string} rootID DOM ID of the root node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function mountComponent(rootID, transaction, context) {
    this._context = context;
    this._mountOrder = nextMountID++;
    this._rootNodeID = rootID;

    var publicProps = this._processProps(this._currentElement.props);
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    // Initialize the public class
    var inst;
    var renderedElement;

    // This is a way to detect if Component is a stateless arrow function
    // component, which is not newable. It might not be 100% reliable but is
    // something we can do until we start detecting that Component extends
    // React.Component. We already assume that typeof Component === 'function'.
    var canInstantiate = 'prototype' in Component;

    if (canInstantiate) {
      if (process.env.NODE_ENV !== 'production') {
        ReactCurrentOwner.current = this;
        try {
          inst = new Component(publicProps, publicContext, ReactUpdateQueue);
        } finally {
          ReactCurrentOwner.current = null;
        }
      } else {
        inst = new Component(publicProps, publicContext, ReactUpdateQueue);
      }
    }

    if (!canInstantiate || inst === null || inst === false || ReactElement.isValidElement(inst)) {
      renderedElement = inst;
      inst = new StatelessComponent(Component);
    }

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (inst.render == null) {
        process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`, returned ' + 'null/false from a stateless component, or tried to render an ' + 'element whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component') : undefined;
      } else {
        // We support ES6 inheriting from React.Component, the module pattern,
        // and stateless components, but not ES6 classes that don't extend
        process.env.NODE_ENV !== 'production' ? warning(Component.prototype && Component.prototype.isReactComponent || !canInstantiate || !(inst instanceof Component), '%s(...): React component classes must extend React.Component.', Component.displayName || Component.name || 'Component') : undefined;
      }
    }

    // These should be set up in the constructor, but as a convenience for
    // simpler class abstractions, we set them up after the fact.
    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = ReactUpdateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap.set(inst, this);

    if (process.env.NODE_ENV !== 'production') {
      // Since plain JS classes are defined without any special initialization
      // logic, we can not catch common errors early. Therefore, we have to
      // catch them here, at initialization time, instead.
      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
    }

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    if (inst.componentWillMount) {
      inst.componentWillMount();
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    this._renderedComponent = this._instantiateReactComponent(renderedElement);

    var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
    if (inst.componentDidMount) {
      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
    }

    return markup;
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function unmountComponent() {
    var inst = this._instance;

    if (inst.componentWillUnmount) {
      inst.componentWillUnmount();
    }

    ReactReconciler.unmountComponent(this._renderedComponent);
    this._renderedComponent = null;
    this._instance = null;

    // Reset pending fields
    // Even if this component is scheduled for another update in ReactUpdates,
    // it would still be ignored because these fields are reset.
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = null;
    this._topLevelWrapper = null;

    // Delete the reference from the instance to this internal representation
    // which allow the internals to be properly cleaned up even if the user
    // leaks a reference to the public instance.
    ReactInstanceMap.remove(inst);

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _maskContext: function _maskContext(context) {
    var maskedContext = null;
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject;
    }
    maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function _processContext(context) {
    var maskedContext = this._maskContext(context);
    if (process.env.NODE_ENV !== 'production') {
      var Component = this._currentElement.type;
      if (Component.contextTypes) {
        this._checkPropTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
      }
    }
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function _processChildContext(currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext = inst.getChildContext && inst.getChildContext();
    if (childContext) {
      !(_typeof(Component.childContextTypes) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
      if (process.env.NODE_ENV !== 'production') {
        this._checkPropTypes(Component.childContextTypes, childContext, ReactPropTypeLocations.childContext);
      }
      for (var name in childContext) {
        !(name in Component.childContextTypes) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(false) : undefined;
      }
      return assign({}, currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Processes props by setting default values for unspecified props and
   * asserting that the props are valid. Does not mutate its argument; returns
   * a new props object with defaults merged in.
   *
   * @param {object} newProps
   * @return {object}
   * @private
   */
  _processProps: function _processProps(newProps) {
    if (process.env.NODE_ENV !== 'production') {
      var Component = this._currentElement.type;
      if (Component.propTypes) {
        this._checkPropTypes(Component.propTypes, newProps, ReactPropTypeLocations.prop);
      }
    }
    return newProps;
  },

  /**
   * Assert that the props are valid
   *
   * @param {object} propTypes Map of prop name to a ReactPropType
   * @param {object} props
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkPropTypes: function _checkPropTypes(propTypes, props, location) {
    // TODO: Stop validating prop types here and only use the element
    // validation.
    var componentName = this.getName();
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error;
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
          error = propTypes[propName](props, propName, componentName, location);
        } catch (ex) {
          error = ex;
        }
        if (error instanceof Error) {
          // We may want to extend this logic for similar errors in
          // top-level render calls, so I'm abstracting it away into
          // a function to minimize refactoring in the future
          var addendum = getDeclarationErrorAddendum(this);

          if (location === ReactPropTypeLocations.prop) {
            // Preface gives us something to blacklist in warning module
            process.env.NODE_ENV !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : undefined;
          } else {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : undefined;
          }
        }
      }
    }
  },

  receiveComponent: function receiveComponent(nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  /**
   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function performUpdateIfNecessary(transaction) {
    if (this._pendingElement != null) {
      ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
    }

    if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    }
  },

  /**
   * Perform an update to a mounted component. The componentWillReceiveProps and
   * shouldComponentUpdate methods are called, then (assuming the update isn't
   * skipped) the remaining update lifecycle methods are called and the DOM
   * representation is updated.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevParentElement
   * @param {ReactElement} nextParentElement
   * @internal
   * @overridable
   */
  updateComponent: function updateComponent(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;

    var nextContext = this._context === nextUnmaskedContext ? inst.context : this._processContext(nextUnmaskedContext);
    var nextProps;

    // Distinguish between a props update versus a simple state update
    if (prevParentElement === nextParentElement) {
      // Skip checking prop types again -- we don't read inst.props to avoid
      // warning for DOM component props in this upgrade
      nextProps = nextParentElement.props;
    } else {
      nextProps = this._processProps(nextParentElement.props);
      // An update here will schedule an update but immediately set
      // _pendingStateQueue which will ensure that any state updates gets
      // immediately reconciled instead of waiting for the next batch.

      if (inst.componentWillReceiveProps) {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    var nextState = this._processPendingState(nextProps, nextContext);

    var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(typeof shouldUpdate !== 'undefined', '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : undefined;
    }

    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      // Will set `this.props`, `this.state` and `this.context`.
      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state but we shortcut the rest of the update.
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function _processPendingState(props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactElement} nextElement Next element
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @param {?object} unmaskedContext
   * @private
   */
  _performComponentUpdate: function _performComponentUpdate(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      inst.componentWillUpdate(nextProps, nextState, nextContext);
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
    }
  },

  /**
   * Call the component's `render` method and update the DOM accordingly.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _updateRenderedComponent: function _updateRenderedComponent(transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();
    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      // These two IDs are actually the same! But nothing should rely on that.
      var thisID = this._rootNodeID;
      var prevComponentID = prevComponentInstance._rootNodeID;
      ReactReconciler.unmountComponent(prevComponentInstance);

      this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
      var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, this._processChildContext(context));
      this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
    }
  },

  /**
   * @protected
   */
  _replaceNodeWithMarkupByID: function _replaceNodeWithMarkupByID(prevComponentID, nextMarkup) {
    ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
  },

  /**
   * @protected
   */
  _renderValidatedComponentWithoutOwnerOrContext: function _renderValidatedComponentWithoutOwnerOrContext() {
    var inst = this._instance;
    var renderedComponent = inst.render();
    if (process.env.NODE_ENV !== 'production') {
      // We allow auto-mocks to proceed as if they're returning null.
      if (typeof renderedComponent === 'undefined' && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        renderedComponent = null;
      }
    }

    return renderedComponent;
  },

  /**
   * @private
   */
  _renderValidatedComponent: function _renderValidatedComponent() {
    var renderedComponent;
    ReactCurrentOwner.current = this;
    try {
      renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
    } finally {
      ReactCurrentOwner.current = null;
    }
    !(
    // TODO: An `isValidNode` function would probably be more appropriate
    renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
    return renderedComponent;
  },

  /**
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {component} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef: function attachRef(ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : undefined;
    var publicComponentInstance = component.getPublicInstance();
    if (process.env.NODE_ENV !== 'production') {
      var componentName = component && component.getName ? component.getName() : 'a component';
      process.env.NODE_ENV !== 'production' ? warning(publicComponentInstance != null, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : undefined;
    }
    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  /**
   * Detaches a reference name.
   *
   * @param {string} ref Name to dereference.
   * @final
   * @private
   */
  detachRef: function detachRef(ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  /**
   * Get a text description of the component that can be used to identify it
   * in error messages.
   * @return {string} The name or null.
   * @internal
   */
  getName: function getName() {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  /**
   * Get the publicly accessible representation of this component - i.e. what
   * is exposed by refs and returned by render. Can be null for stateless
   * components.
   *
   * @return {ReactComponent} the public component instance.
   * @internal
   */
  getPublicInstance: function getPublicInstance() {
    var inst = this._instance;
    if (inst instanceof StatelessComponent) {
      return null;
    }
    return inst;
  },

  // Stub
  _instantiateReactComponent: null

};

ReactPerf.measureMethods(ReactCompositeComponentMixin, 'ReactCompositeComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent',
  _renderValidatedComponent: '_renderValidatedComponent'
});

var ReactCompositeComponent = {

  Mixin: ReactCompositeComponentMixin

};

module.exports = ReactCompositeComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMButton
 */



var mouseListenerNames = {
  onClick: true,
  onDoubleClick: true,
  onMouseDown: true,
  onMouseMove: true,
  onMouseUp: true,

  onClickCapture: true,
  onDoubleClickCapture: true,
  onMouseDownCapture: true,
  onMouseMoveCapture: true,
  onMouseUpCapture: true
};

/**
 * Implements a <button> native component that does not receive mouse events
 * when `disabled` is set.
 */
var ReactDOMButton = {
  getNativeProps: function getNativeProps(inst, props, context) {
    if (!props.disabled) {
      return props;
    }

    // Copy the props, except the mouse listeners
    var nativeProps = {};
    for (var key in props) {
      if (props.hasOwnProperty(key) && !mouseListenerNames[key]) {
        nativeProps[key] = props[key];
      }
    }

    return nativeProps;
  }
};

module.exports = ReactDOMButton;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMComponent
 * @typechecks static-only
 */

/* global hasOwnProperty:true */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var AutoFocusUtils = __webpack_require__(106);
var CSSPropertyOperations = __webpack_require__(108);
var DOMProperty = __webpack_require__(14);
var DOMPropertyOperations = __webpack_require__(34);
var EventConstants = __webpack_require__(10);
var ReactBrowserEventEmitter = __webpack_require__(25);
var ReactComponentBrowserEnvironment = __webpack_require__(36);
var ReactDOMButton = __webpack_require__(121);
var ReactDOMInput = __webpack_require__(124);
var ReactDOMOption = __webpack_require__(125);
var ReactDOMSelect = __webpack_require__(68);
var ReactDOMTextarea = __webpack_require__(128);
var ReactMount = __webpack_require__(5);
var ReactMultiChild = __webpack_require__(135);
var ReactPerf = __webpack_require__(7);
var ReactUpdateQueue = __webpack_require__(39);

var assign = __webpack_require__(2);
var canDefineProperty = __webpack_require__(30);
var escapeTextContentForBrowser = __webpack_require__(31);
var invariant = __webpack_require__(1);
var isEventSupported = __webpack_require__(47);
var keyOf = __webpack_require__(12);
var setInnerHTML = __webpack_require__(32);
var setTextContent = __webpack_require__(48);
var shallowEqual = __webpack_require__(58);
var validateDOMNesting = __webpack_require__(51);
var warning = __webpack_require__(3);

var deleteListener = ReactBrowserEventEmitter.deleteListener;
var listenTo = ReactBrowserEventEmitter.listenTo;
var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = { 'string': true, 'number': true };

var CHILDREN = keyOf({ children: null });
var STYLE = keyOf({ style: null });
var HTML = keyOf({ __html: null });

var ELEMENT_NODE_TYPE = 1;

function getDeclarationErrorAddendum(internalInstance) {
  if (internalInstance) {
    var owner = internalInstance._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' This DOM node was rendered by `' + name + '`.';
      }
    }
  }
  return '';
}

var legacyPropsDescriptor;
if (process.env.NODE_ENV !== 'production') {
  legacyPropsDescriptor = {
    props: {
      enumerable: false,
      get: function get() {
        var component = this._reactInternalComponent;
        process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .props of a DOM node; instead, ' + 'recreate the props as `render` did originally or read the DOM ' + 'properties/attributes directly from this node (e.g., ' + 'this.refs.box.className).%s', getDeclarationErrorAddendum(component)) : undefined;
        return component._currentElement.props;
      }
    }
  };
}

function legacyGetDOMNode() {
  if (process.env.NODE_ENV !== 'production') {
    var component = this._reactInternalComponent;
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .getDOMNode() of a DOM node; ' + 'instead, use the node directly.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  return this;
}

function legacyIsMounted() {
  var component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .isMounted() of a DOM node.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  return !!component;
}

function legacySetStateEtc() {
  if (process.env.NODE_ENV !== 'production') {
    var component = this._reactInternalComponent;
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setState(), .replaceState(), or ' + '.forceUpdate() of a DOM node. This is a no-op.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
}

function legacySetProps(partialProps, callback) {
  var component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function legacyReplaceProps(partialProps, callback) {
  var component = this._reactInternalComponent;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .replaceProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
  }
  if (!component) {
    return;
  }
  ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
  if (callback) {
    ReactUpdateQueue.enqueueCallbackInternal(component, callback);
  }
}

function friendlyStringify(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    if (Array.isArray(obj)) {
      return '[' + obj.map(friendlyStringify).join(', ') + ']';
    } else {
      var pairs = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
          pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
        }
      }
      return '{' + pairs.join(', ') + '}';
    }
  } else if (typeof obj === 'string') {
    return JSON.stringify(obj);
  } else if (typeof obj === 'function') {
    return '[function object]';
  }
  // Differs from JSON.stringify in that undefined becauses undefined and that
  // inf and nan don't become null
  return String(obj);
}

var styleMutationWarning = {};

function checkAndWarnForMutatedStyle(style1, style2, component) {
  if (style1 == null || style2 == null) {
    return;
  }
  if (shallowEqual(style1, style2)) {
    return;
  }

  var componentName = component._tag;
  var owner = component._currentElement._owner;
  var ownerName;
  if (owner) {
    ownerName = owner.getName();
  }

  var hash = ownerName + '|' + componentName;

  if (styleMutationWarning.hasOwnProperty(hash)) {
    return;
  }

  styleMutationWarning[hash] = true;

  process.env.NODE_ENV !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : undefined;
}

/**
 * @param {object} component
 * @param {?object} props
 */
function assertValidProps(component, props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (process.env.NODE_ENV !== 'production') {
    if (voidElementTags[component._tag]) {
      process.env.NODE_ENV !== 'production' ? warning(props.children == null && props.dangerouslySetInnerHTML == null, '%s is a void element tag and must not have `children` or ' + 'use `props.dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : undefined;
    }
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
    !(_typeof(props.dangerouslySetInnerHTML) === 'object' && HTML in props.dangerouslySetInnerHTML) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
  }
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : undefined;
    process.env.NODE_ENV !== 'production' ? warning(!props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : undefined;
  }
  !(props.style == null || _typeof(props.style) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', getDeclarationErrorAddendum(component)) : invariant(false) : undefined;
}

function enqueuePutListener(id, registrationName, listener, transaction) {
  if (process.env.NODE_ENV !== 'production') {
    // IE8 has no API for event capturing and the `onScroll` event doesn't
    // bubble.
    process.env.NODE_ENV !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), 'This browser doesn\'t support the `onScroll` event') : undefined;
  }
  var container = ReactMount.findReactContainerForID(id);
  if (container) {
    var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
    listenTo(registrationName, doc);
  }
  transaction.getReactMountReady().enqueue(putListener, {
    id: id,
    registrationName: registrationName,
    listener: listener
  });
}

function putListener() {
  var listenerToPut = this;
  ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapBubbledEventsLocal() {
  var inst = this;
  // If a component renders to null or if another component fatals and causes
  // the state of the tree to be corrupted, `node` here can be null.
  !inst._rootNodeID ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Must be mounted to trap events') : invariant(false) : undefined;
  var node = ReactMount.getNode(inst._rootNodeID);
  !node ? process.env.NODE_ENV !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : invariant(false) : undefined;

  switch (inst._tag) {
    case 'iframe':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'video':
    case 'audio':

      inst._wrapperState.listeners = [];
      // create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], mediaEvents[event], node));
        }
      }

      break;
    case 'img':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
      break;
    case 'form':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', node)];
      break;
  }
}

function mountReadyInputWrapper() {
  ReactDOMInput.mountReadyWrapper(this);
}

function postUpdateSelectWrapper() {
  ReactDOMSelect.postUpdateWrapper(this);
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special cased tags.

var omittedCloseTags = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'embed': true,
  'hr': true,
  'img': true,
  'input': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true
};

// NOTE: menuitem's close tag should be omitted, but that causes problems.
var newlineEatingTags = {
  'listing': true,
  'pre': true,
  'textarea': true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = assign({
  'menuitem': true
}, omittedCloseTags);

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
var hasOwnProperty = {}.hasOwnProperty;

function validateDangerousTag(tag) {
  if (!hasOwnProperty.call(validatedTagCache, tag)) {
    !VALID_TAG_REGEX.test(tag) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
    validatedTagCache[tag] = true;
  }
}

function processChildContextDev(context, inst) {
  // Pass down our tag name to child components for validation purposes
  context = assign({}, context);
  var info = context[validateDOMNesting.ancestorInfoContextKey];
  context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(info, inst._tag, inst);
  return context;
}

function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @constructor ReactDOMComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent(tag) {
  validateDangerousTag(tag);
  this._tag = tag.toLowerCase();
  this._renderedChildren = null;
  this._previousStyle = null;
  this._previousStyleCopy = null;
  this._rootNodeID = null;
  this._wrapperState = null;
  this._topLevelWrapper = null;
  this._nodeWithLegacyProperties = null;
  if (process.env.NODE_ENV !== 'production') {
    this._unprocessedContextDev = null;
    this._processedContextDev = null;
  }
}

ReactDOMComponent.displayName = 'ReactDOMComponent';

ReactDOMComponent.Mixin = {

  construct: function construct(element) {
    this._currentElement = element;
  },

  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {string} rootID The root DOM ID for this node.
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} context
   * @return {string} The computed markup.
   */
  mountComponent: function mountComponent(rootID, transaction, context) {
    this._rootNodeID = rootID;

    var props = this._currentElement.props;

    switch (this._tag) {
      case 'iframe':
      case 'img':
      case 'form':
      case 'video':
      case 'audio':
        this._wrapperState = {
          listeners: null
        };
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'button':
        props = ReactDOMButton.getNativeProps(this, props, context);
        break;
      case 'input':
        ReactDOMInput.mountWrapper(this, props, context);
        props = ReactDOMInput.getNativeProps(this, props, context);
        break;
      case 'option':
        ReactDOMOption.mountWrapper(this, props, context);
        props = ReactDOMOption.getNativeProps(this, props, context);
        break;
      case 'select':
        ReactDOMSelect.mountWrapper(this, props, context);
        props = ReactDOMSelect.getNativeProps(this, props, context);
        context = ReactDOMSelect.processChildContext(this, props, context);
        break;
      case 'textarea':
        ReactDOMTextarea.mountWrapper(this, props, context);
        props = ReactDOMTextarea.getNativeProps(this, props, context);
        break;
    }

    assertValidProps(this, props);
    if (process.env.NODE_ENV !== 'production') {
      if (context[validateDOMNesting.ancestorInfoContextKey]) {
        validateDOMNesting(this._tag, this, context[validateDOMNesting.ancestorInfoContextKey]);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      this._unprocessedContextDev = context;
      this._processedContextDev = processChildContextDev(context, this);
      context = this._processedContextDev;
    }

    var mountImage;
    if (transaction.useCreateElement) {
      var ownerDocument = context[ReactMount.ownerDocumentContextKey];
      var el = ownerDocument.createElement(this._currentElement.type);
      DOMPropertyOperations.setAttributeForID(el, this._rootNodeID);
      // Populate node cache
      ReactMount.getID(el);
      this._updateDOMProperties({}, props, transaction, el);
      this._createInitialChildren(transaction, props, context, el);
      mountImage = el;
    } else {
      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
      var tagContent = this._createContentMarkup(transaction, props, context);
      if (!tagContent && omittedCloseTags[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(mountReadyInputWrapper, this);
      // falls through
      case 'button':
      case 'select':
      case 'textarea':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
    }

    return mountImage;
  },

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkupAndPutListeners: function _createOpenTagMarkupAndPutListeners(transaction, props) {
    var ret = '<' + this._currentElement.type;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules.hasOwnProperty(propKey)) {
        if (propValue) {
          enqueuePutListener(this._rootNodeID, propKey, propValue, transaction);
        }
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            if (process.env.NODE_ENV !== 'production') {
              // See `_updateDOMProperties`. style block
              this._previousStyle = propValue;
            }
            propValue = this._previousStyleCopy = assign({}, props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
        }
        var markup = null;
        if (this._tag != null && isCustomComponent(this._tag, props)) {
          if (propKey !== CHILDREN) {
            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
          }
        } else {
          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        }
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    // For static pages, no need to put React ID and checksum. Saves lots of
    // bytes.
    if (transaction.renderToStaticMarkup) {
      return ret;
    }

    var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
    return ret + ' ' + markupForID;
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @param {object} context
   * @return {string} Content markup.
   */
  _createContentMarkup: function _createContentMarkup(transaction, props, context) {
    var ret = '';

    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        ret = innerHTML.__html;
      }
    } else {
      var contentToUse = CONTENT_TYPES[_typeof(props.children)] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        ret = escapeTextContentForBrowser(contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
      // text/html ignores the first character in these tags if it's a newline
      // Prefer to break application/xml over text/html (for now) by adding
      // a newline specifically to get eaten by the parser. (Alternately for
      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
      // \r is normalized out by HTMLTextAreaElement#value.)
      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
      // See: Parsing of "textarea" "listing" and "pre" elements
      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
      return '\n' + ret;
    } else {
      return ret;
    }
  },

  _createInitialChildren: function _createInitialChildren(transaction, props, context, el) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        setInnerHTML(el, innerHTML.__html);
      }
    } else {
      var contentToUse = CONTENT_TYPES[_typeof(props.children)] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        setTextContent(el, contentToUse);
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i < mountImages.length; i++) {
          el.appendChild(mountImages[i]);
        }
      }
    }
  },

  /**
   * Receives a next element and updates the component.
   *
   * @internal
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} context
   */
  receiveComponent: function receiveComponent(nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  },

  /**
   * Updates a native DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevElement
   * @param {ReactElement} nextElement
   * @internal
   * @overridable
   */
  updateComponent: function updateComponent(transaction, prevElement, nextElement, context) {
    var lastProps = prevElement.props;
    var nextProps = this._currentElement.props;

    switch (this._tag) {
      case 'button':
        lastProps = ReactDOMButton.getNativeProps(this, lastProps);
        nextProps = ReactDOMButton.getNativeProps(this, nextProps);
        break;
      case 'input':
        ReactDOMInput.updateWrapper(this);
        lastProps = ReactDOMInput.getNativeProps(this, lastProps);
        nextProps = ReactDOMInput.getNativeProps(this, nextProps);
        break;
      case 'option':
        lastProps = ReactDOMOption.getNativeProps(this, lastProps);
        nextProps = ReactDOMOption.getNativeProps(this, nextProps);
        break;
      case 'select':
        lastProps = ReactDOMSelect.getNativeProps(this, lastProps);
        nextProps = ReactDOMSelect.getNativeProps(this, nextProps);
        break;
      case 'textarea':
        ReactDOMTextarea.updateWrapper(this);
        lastProps = ReactDOMTextarea.getNativeProps(this, lastProps);
        nextProps = ReactDOMTextarea.getNativeProps(this, nextProps);
        break;
    }

    if (process.env.NODE_ENV !== 'production') {
      // If the context is reference-equal to the old one, pass down the same
      // processed object so the update bailout in ReactReconciler behaves
      // correctly (and identically in dev and prod). See #5005.
      if (this._unprocessedContextDev !== context) {
        this._unprocessedContextDev = context;
        this._processedContextDev = processChildContextDev(context, this);
      }
      context = this._processedContextDev;
    }

    assertValidProps(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction, null);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    if (!canDefineProperty && this._nodeWithLegacyProperties) {
      this._nodeWithLegacyProperties.props = nextProps;
    }

    if (this._tag === 'select') {
      // <select> value update needs to occur after <option> children
      // reconciliation
      transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
    }
  },

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {ReactReconcileTransaction} transaction
   * @param {?DOMElement} node
   */
  _updateDOMProperties: function _updateDOMProperties(lastProps, nextProps, transaction, node) {
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          // Only call deleteListener if there was a listener previously or
          // else willDeleteListener gets called when there wasn't actually a
          // listener (e.g., onClick={null})
          deleteListener(this._rootNodeID, propKey);
        }
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        DOMPropertyOperations.deleteValueForProperty(node, propKey);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          if (process.env.NODE_ENV !== 'production') {
            checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
            this._previousStyle = nextProp;
          }
          nextProp = this._previousStyleCopy = assign({}, nextProp);
        } else {
          this._previousStyleCopy = null;
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          enqueuePutListener(this._rootNodeID, propKey, nextProp, transaction);
        } else if (lastProp) {
          deleteListener(this._rootNodeID, propKey);
        }
      } else if (isCustomComponent(this._tag, nextProps)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        if (propKey === CHILDREN) {
          nextProp = null;
        }
        DOMPropertyOperations.setValueForAttribute(node, propKey, nextProp);
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        if (!node) {
          node = ReactMount.getNode(this._rootNodeID);
        }
        // If we're updating to null or undefined, we should remove the property
        // from the DOM node instead of inadvertantly setting to a string. This
        // brings us in line with the same behavior we have on initial render.
        if (nextProp != null) {
          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, propKey);
        }
      }
    }
    if (styleUpdates) {
      if (!node) {
        node = ReactMount.getNode(this._rootNodeID);
      }
      CSSPropertyOperations.setValueForStyles(node, styleUpdates);
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   */
  _updateDOMChildren: function _updateDOMChildren(lastProps, nextProps, transaction, context) {
    var lastContent = CONTENT_TYPES[_typeof(lastProps.children)] ? lastProps.children : null;
    var nextContent = CONTENT_TYPES[_typeof(nextProps.children)] ? nextProps.children : null;

    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction, context);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        this.updateMarkup('' + nextHtml);
      }
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction, context);
    }
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function unmountComponent() {
    switch (this._tag) {
      case 'iframe':
      case 'img':
      case 'form':
      case 'video':
      case 'audio':
        var listeners = this._wrapperState.listeners;
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].remove();
          }
        }
        break;
      case 'input':
        ReactDOMInput.unmountWrapper(this);
        break;
      case 'html':
      case 'head':
      case 'body':
        /**
         * Components like <html> <head> and <body> can't be removed or added
         * easily in a cross-browser way, however it's valuable to be able to
         * take advantage of React's reconciliation for styling and <title>
         * management. So we just document it and throw in dangerous cases.
         */
         true ? process.env.NODE_ENV !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, ' + '<head>, and <body>) reliably and efficiently. To fix this, have a ' + 'single top-level component that never unmounts render these ' + 'elements.', this._tag) : invariant(false) : undefined;
        break;
    }

    this.unmountChildren();
    ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
    this._rootNodeID = null;
    this._wrapperState = null;
    if (this._nodeWithLegacyProperties) {
      var node = this._nodeWithLegacyProperties;
      node._reactInternalComponent = null;
      this._nodeWithLegacyProperties = null;
    }
  },

  getPublicInstance: function getPublicInstance() {
    if (!this._nodeWithLegacyProperties) {
      var node = ReactMount.getNode(this._rootNodeID);

      node._reactInternalComponent = this;
      node.getDOMNode = legacyGetDOMNode;
      node.isMounted = legacyIsMounted;
      node.setState = legacySetStateEtc;
      node.replaceState = legacySetStateEtc;
      node.forceUpdate = legacySetStateEtc;
      node.setProps = legacySetProps;
      node.replaceProps = legacyReplaceProps;

      if (process.env.NODE_ENV !== 'production') {
        if (canDefineProperty) {
          Object.defineProperties(node, legacyPropsDescriptor);
        } else {
          // updateComponent will update this property on subsequent renders
          node.props = this._currentElement.props;
        }
      } else {
        // updateComponent will update this property on subsequent renders
        node.props = this._currentElement.props;
      }

      this._nodeWithLegacyProperties = node;
    }
    return this._nodeWithLegacyProperties;
  }

};

ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
  mountComponent: 'mountComponent',
  updateComponent: 'updateComponent'
});

assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);

module.exports = ReactDOMComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFactories
 * @typechecks static-only
 */



var ReactElement = __webpack_require__(6);
var ReactElementValidator = __webpack_require__(72);

var mapObject = __webpack_require__(100);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */
function createDOMFactory(tag) {
  if (process.env.NODE_ENV !== 'production') {
    return ReactElementValidator.createFactory(tag);
  }
  return ReactElement.createFactory(tag);
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = mapObject({
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  big: 'big',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  menuitem: 'menuitem',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  'var': 'var',
  video: 'video',
  wbr: 'wbr',

  // SVG
  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  ellipse: 'ellipse',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  mask: 'mask',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  svg: 'svg',
  text: 'text',
  tspan: 'tspan'

}, createDOMFactory);

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMInput
 */



var ReactDOMIDOperations = __webpack_require__(38);
var LinkedValueUtils = __webpack_require__(35);
var ReactMount = __webpack_require__(5);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);

var instancesByReactID = {};

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMInput.updateWrapper(this);
  }
}

/**
 * Implements an <input> native component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = {
  getNativeProps: function getNativeProps(inst, props, context) {
    var value = LinkedValueUtils.getValue(props);
    var checked = LinkedValueUtils.getChecked(props);

    var nativeProps = assign({}, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : inst._wrapperState.initialValue,
      checked: checked != null ? checked : inst._wrapperState.initialChecked,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
    }

    var defaultValue = props.defaultValue;
    inst._wrapperState = {
      initialChecked: props.defaultChecked || false,
      initialValue: defaultValue != null ? defaultValue : null,
      onChange: _handleChange.bind(inst)
    };
  },

  mountReadyWrapper: function mountReadyWrapper(inst) {
    // Can't be in mountWrapper or else server rendering leaks.
    instancesByReactID[inst._rootNodeID] = inst;
  },

  unmountWrapper: function unmountWrapper(inst) {
    delete instancesByReactID[inst._rootNodeID];
  },

  updateWrapper: function updateWrapper(inst) {
    var props = inst._currentElement.props;

    // TODO: Shouldn't this be getChecked(props)?
    var checked = props.checked;
    if (checked != null) {
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'checked', checked || false);
    }

    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils.executeOnChange(props, event);

  // Here we use asap to wait until all updates have propagated, which
  // is important when using controlled components within layers:
  // https://github.com/facebook/react/issues/1698
  ReactUpdates.asap(forceUpdateIfMounted, this);

  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var rootNode = ReactMount.getNode(this._rootNodeID);
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form, let's just use the global
    // `querySelectorAll` to ensure we don't miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React with non-React.
      var otherID = ReactMount.getID(otherNode);
      !otherID ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(false) : undefined;
      var otherInstance = instancesByReactID[otherID];
      !otherInstance ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
    }
  }

  return returnValue;
}

module.exports = ReactDOMInput;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMOption
 */



var ReactChildren = __webpack_require__(63);
var ReactDOMSelect = __webpack_require__(68);

var assign = __webpack_require__(2);
var warning = __webpack_require__(3);

var valueContextKey = ReactDOMSelect.valueContextKey;

/**
 * Implements an <option> native component that warns when `selected` is set.
 */
var ReactDOMOption = {
  mountWrapper: function mountWrapper(inst, props, context) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : undefined;
    }

    // Look up whether this option is 'selected' via context
    var selectValue = context[valueContextKey];

    // If context key is null (e.g., no specified value or after initial mount)
    // or missing (e.g., for <datalist>), we don't change props.selected
    var selected = null;
    if (selectValue != null) {
      selected = false;
      if (Array.isArray(selectValue)) {
        // multiple
        for (var i = 0; i < selectValue.length; i++) {
          if ('' + selectValue[i] === '' + props.value) {
            selected = true;
            break;
          }
        }
      } else {
        selected = '' + selectValue === '' + props.value;
      }
    }

    inst._wrapperState = { selected: selected };
  },

  getNativeProps: function getNativeProps(inst, props, context) {
    var nativeProps = assign({ selected: undefined, children: undefined }, props);

    // Read state only from initial mount because <select> updates value
    // manually; we need the initial state only for server rendering
    if (inst._wrapperState.selected != null) {
      nativeProps.selected = inst._wrapperState.selected;
    }

    var content = '';

    // Flatten children and warn if they aren't strings or numbers;
    // invalid types are ignored.
    ReactChildren.forEach(props.children, function (child) {
      if (child == null) {
        return;
      }
      if (typeof child === 'string' || typeof child === 'number') {
        content += child;
      } else {
        process.env.NODE_ENV !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : undefined;
      }
    });

    if (content) {
      nativeProps.children = content;
    }

    return nativeProps;
  }

};

module.exports = ReactDOMOption;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMSelection
 */



var ExecutionEnvironment = __webpack_require__(4);

var getNodeForCharacterOffset = __webpack_require__(159);
var getTextContentAccessor = __webpack_require__(86);

/**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */
function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

/**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getIEOffsets(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  // Duplicate selection so we can move range without breaking user selection.
  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);

  // In Firefox, range.startContainer and range.endContainer can be "anonymous
  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
  // divs do not seem to expose properties, triggering a "Permission denied
  // error" if any of its properties are accessed. The only seemingly possible
  // way to avoid erroring is to access a property that typically works for
  // non-anonymous divs and catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
  try {
    /* eslint-disable no-unused-expressions */
    currentRange.startContainer.nodeType;
    currentRange.endContainer.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  // If the node and offset values are the same, the selection is collapsed.
  // `Selection.isCollapsed` is available natively, but IE sometimes gets
  // this value wrong.
  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setIEOffsets(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (typeof offsets.end === 'undefined') {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

var useIEOffsets = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
};

module.exports = ReactDOMSelection;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMServer
 */



var ReactDefaultInjection = __webpack_require__(71);
var ReactServerRendering = __webpack_require__(140);
var ReactVersion = __webpack_require__(40);

ReactDefaultInjection.inject();

var ReactDOMServer = {
  renderToString: ReactServerRendering.renderToString,
  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
  version: ReactVersion
};

module.exports = ReactDOMServer;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMTextarea
 */



var LinkedValueUtils = __webpack_require__(35);
var ReactDOMIDOperations = __webpack_require__(38);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMTextarea.updateWrapper(this);
  }
}

/**
 * Implements a <textarea> native component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = {
  getNativeProps: function getNativeProps(inst, props, context) {
    !(props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.
    var nativeProps = assign({}, props, {
      defaultValue: undefined,
      value: undefined,
      children: inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return nativeProps;
  },

  mountWrapper: function mountWrapper(inst, props) {
    if (process.env.NODE_ENV !== 'production') {
      LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
    }

    var defaultValue = props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = props.children;
    if (children != null) {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : undefined;
      }
      !(defaultValue == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
      if (Array.isArray(children)) {
        !(children.length <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    var value = LinkedValueUtils.getValue(props);

    inst._wrapperState = {
      // We save the initial value so that `ReactDOMComponent` doesn't update
      // `textContent` (unnecessary since we update value).
      // The initial value can be a boolean or object so that's why it's
      // forced to be a string.
      initialValue: '' + (value != null ? value : defaultValue),
      onChange: _handleChange.bind(inst)
    };
  },

  updateWrapper: function updateWrapper(inst) {
    var props = inst._currentElement.props;
    var value = LinkedValueUtils.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils.executeOnChange(props, event);
  ReactUpdates.asap(forceUpdateIfMounted, this);
  return returnValue;
}

module.exports = ReactDOMTextarea;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDefaultPerf
 * @typechecks static-only
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DOMProperty = __webpack_require__(14);
var ReactDefaultPerfAnalysis = __webpack_require__(130);
var ReactMount = __webpack_require__(5);
var ReactPerf = __webpack_require__(7);

var performanceNow = __webpack_require__(103);

function roundFloat(val) {
  return Math.floor(val * 100) / 100;
}

function addValue(obj, key, val) {
  obj[key] = (obj[key] || 0) + val;
}

var ReactDefaultPerf = {
  _allMeasurements: [], // last item in the list is the current one
  _mountStack: [0],
  _injected: false,

  start: function start() {
    if (!ReactDefaultPerf._injected) {
      ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
    }

    ReactDefaultPerf._allMeasurements.length = 0;
    ReactPerf.enableMeasure = true;
  },

  stop: function stop() {
    ReactPerf.enableMeasure = false;
  },

  getLastMeasurements: function getLastMeasurements() {
    return ReactDefaultPerf._allMeasurements;
  },

  printExclusive: function printExclusive(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
    console.table(summary.map(function (item) {
      return {
        'Component class name': item.componentName,
        'Total inclusive time (ms)': roundFloat(item.inclusive),
        'Exclusive mount time (ms)': roundFloat(item.exclusive),
        'Exclusive render time (ms)': roundFloat(item.render),
        'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
        'Render time per instance (ms)': roundFloat(item.render / item.count),
        'Instances': item.count
      };
    }));
    // TODO: ReactDefaultPerfAnalysis.getTotalTime() does not return the correct
    // number.
  },

  printInclusive: function printInclusive(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
    console.table(summary.map(function (item) {
      return {
        'Owner > component': item.componentName,
        'Inclusive time (ms)': roundFloat(item.time),
        'Instances': item.count
      };
    }));
    console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
  },

  getMeasurementsSummaryMap: function getMeasurementsSummaryMap(measurements) {
    var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
    return summary.map(function (item) {
      return {
        'Owner > component': item.componentName,
        'Wasted time (ms)': item.time,
        'Instances': item.count
      };
    });
  },

  printWasted: function printWasted(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
    console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
  },

  printDOM: function printDOM(measurements) {
    measurements = measurements || ReactDefaultPerf._allMeasurements;
    var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
    console.table(summary.map(function (item) {
      var result = {};
      result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
      result.type = item.type;
      result.args = JSON.stringify(item.args);
      return result;
    }));
    console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
  },

  _recordWrite: function _recordWrite(id, fnName, totalTime, args) {
    // TODO: totalTime isn't that useful since it doesn't count paints/reflows
    var writes = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].writes;
    writes[id] = writes[id] || [];
    writes[id].push({
      type: fnName,
      time: totalTime,
      args: args
    });
  },

  measure: function measure(moduleName, fnName, func) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var totalTime;
      var rv;
      var start;

      if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
        // A "measurement" is a set of metrics recorded for each flush. We want
        // to group the metrics for a given flush together so we can look at the
        // components that rendered and the DOM operations that actually
        // happened to determine the amount of "wasted work" performed.
        ReactDefaultPerf._allMeasurements.push({
          exclusive: {},
          inclusive: {},
          render: {},
          counts: {},
          writes: {},
          displayNames: {},
          totalTime: 0,
          created: {}
        });
        start = performanceNow();
        rv = func.apply(this, args);
        ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].totalTime = performanceNow() - start;
        return rv;
      } else if (fnName === '_mountImageIntoNode' || moduleName === 'ReactBrowserEventEmitter' || moduleName === 'ReactDOMIDOperations' || moduleName === 'CSSPropertyOperations' || moduleName === 'DOMChildrenOperations' || moduleName === 'DOMPropertyOperations') {
        start = performanceNow();
        rv = func.apply(this, args);
        totalTime = performanceNow() - start;

        if (fnName === '_mountImageIntoNode') {
          var mountID = ReactMount.getID(args[1]);
          ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
        } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
          // special format
          args[0].forEach(function (update) {
            var writeArgs = {};
            if (update.fromIndex !== null) {
              writeArgs.fromIndex = update.fromIndex;
            }
            if (update.toIndex !== null) {
              writeArgs.toIndex = update.toIndex;
            }
            if (update.textContent !== null) {
              writeArgs.textContent = update.textContent;
            }
            if (update.markupIndex !== null) {
              writeArgs.markup = args[1][update.markupIndex];
            }
            ReactDefaultPerf._recordWrite(update.parentID, update.type, totalTime, writeArgs);
          });
        } else {
          // basic format
          var id = args[0];
          if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
            id = ReactMount.getID(args[0]);
          }
          ReactDefaultPerf._recordWrite(id, fnName, totalTime, Array.prototype.slice.call(args, 1));
        }
        return rv;
      } else if (moduleName === 'ReactCompositeComponent' && (fnName === 'mountComponent' || fnName === 'updateComponent' || // TODO: receiveComponent()?
      fnName === '_renderValidatedComponent')) {

        if (this._currentElement.type === ReactMount.TopLevelWrapper) {
          return func.apply(this, args);
        }

        var rootNodeID = fnName === 'mountComponent' ? args[0] : this._rootNodeID;
        var isRender = fnName === '_renderValidatedComponent';
        var isMount = fnName === 'mountComponent';

        var mountStack = ReactDefaultPerf._mountStack;
        var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];

        if (isRender) {
          addValue(entry.counts, rootNodeID, 1);
        } else if (isMount) {
          entry.created[rootNodeID] = true;
          mountStack.push(0);
        }

        start = performanceNow();
        rv = func.apply(this, args);
        totalTime = performanceNow() - start;

        if (isRender) {
          addValue(entry.render, rootNodeID, totalTime);
        } else if (isMount) {
          var subMountTime = mountStack.pop();
          mountStack[mountStack.length - 1] += totalTime;
          addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
          addValue(entry.inclusive, rootNodeID, totalTime);
        } else {
          addValue(entry.inclusive, rootNodeID, totalTime);
        }

        entry.displayNames[rootNodeID] = {
          current: this.getName(),
          owner: this._currentElement._owner ? this._currentElement._owner.getName() : '<root>'
        };

        return rv;
      } else {
        return func.apply(this, args);
      }
    };
  }
};

module.exports = ReactDefaultPerf;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDefaultPerfAnalysis
 */



var assign = __webpack_require__(2);

// Don't try to save users less than 1.2ms (a number I made up)
var DONT_CARE_THRESHOLD = 1.2;
var DOM_OPERATION_TYPES = {
  '_mountImageIntoNode': 'set innerHTML',
  INSERT_MARKUP: 'set innerHTML',
  MOVE_EXISTING: 'move',
  REMOVE_NODE: 'remove',
  SET_MARKUP: 'set innerHTML',
  TEXT_CONTENT: 'set textContent',
  'setValueForProperty': 'update attribute',
  'setValueForAttribute': 'update attribute',
  'deleteValueForProperty': 'remove attribute',
  'setValueForStyles': 'update styles',
  'replaceNodeWithMarkup': 'replace',
  'updateTextContent': 'set textContent'
};

function getTotalTime(measurements) {
  // TODO: return number of DOM ops? could be misleading.
  // TODO: measure dropped frames after reconcile?
  // TODO: log total time of each reconcile and the top-level component
  // class that triggered it.
  var totalTime = 0;
  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    totalTime += measurement.totalTime;
  }
  return totalTime;
}

function getDOMSummary(measurements) {
  var items = [];
  measurements.forEach(function (measurement) {
    Object.keys(measurement.writes).forEach(function (id) {
      measurement.writes[id].forEach(function (write) {
        items.push({
          id: id,
          type: DOM_OPERATION_TYPES[write.type] || write.type,
          args: write.args
        });
      });
    });
  });
  return items;
}

function getExclusiveSummary(measurements) {
  var candidates = {};
  var displayName;

  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);

    for (var id in allIDs) {
      displayName = measurement.displayNames[id].current;

      candidates[displayName] = candidates[displayName] || {
        componentName: displayName,
        inclusive: 0,
        exclusive: 0,
        render: 0,
        count: 0
      };
      if (measurement.render[id]) {
        candidates[displayName].render += measurement.render[id];
      }
      if (measurement.exclusive[id]) {
        candidates[displayName].exclusive += measurement.exclusive[id];
      }
      if (measurement.inclusive[id]) {
        candidates[displayName].inclusive += measurement.inclusive[id];
      }
      if (measurement.counts[id]) {
        candidates[displayName].count += measurement.counts[id];
      }
    }
  }

  // Now make a sorted array with the results.
  var arr = [];
  for (displayName in candidates) {
    if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
      arr.push(candidates[displayName]);
    }
  }

  arr.sort(function (a, b) {
    return b.exclusive - a.exclusive;
  });

  return arr;
}

function getInclusiveSummary(measurements, onlyClean) {
  var candidates = {};
  var inclusiveKey;

  for (var i = 0; i < measurements.length; i++) {
    var measurement = measurements[i];
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
    var cleanComponents;

    if (onlyClean) {
      cleanComponents = getUnchangedComponents(measurement);
    }

    for (var id in allIDs) {
      if (onlyClean && !cleanComponents[id]) {
        continue;
      }

      var displayName = measurement.displayNames[id];

      // Inclusive time is not useful for many components without knowing where
      // they are instantiated. So we aggregate inclusive time with both the
      // owner and current displayName as the key.
      inclusiveKey = displayName.owner + ' > ' + displayName.current;

      candidates[inclusiveKey] = candidates[inclusiveKey] || {
        componentName: inclusiveKey,
        time: 0,
        count: 0
      };

      if (measurement.inclusive[id]) {
        candidates[inclusiveKey].time += measurement.inclusive[id];
      }
      if (measurement.counts[id]) {
        candidates[inclusiveKey].count += measurement.counts[id];
      }
    }
  }

  // Now make a sorted array with the results.
  var arr = [];
  for (inclusiveKey in candidates) {
    if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
      arr.push(candidates[inclusiveKey]);
    }
  }

  arr.sort(function (a, b) {
    return b.time - a.time;
  });

  return arr;
}

function getUnchangedComponents(measurement) {
  // For a given reconcile, look at which components did not actually
  // render anything to the DOM and return a mapping of their ID to
  // the amount of time it took to render the entire subtree.
  var cleanComponents = {};
  var dirtyLeafIDs = Object.keys(measurement.writes);
  var allIDs = assign({}, measurement.exclusive, measurement.inclusive);

  for (var id in allIDs) {
    var isDirty = false;
    // For each component that rendered, see if a component that triggered
    // a DOM op is in its subtree.
    for (var i = 0; i < dirtyLeafIDs.length; i++) {
      if (dirtyLeafIDs[i].indexOf(id) === 0) {
        isDirty = true;
        break;
      }
    }
    // check if component newly created
    if (measurement.created[id]) {
      isDirty = true;
    }
    if (!isDirty && measurement.counts[id] > 0) {
      cleanComponents[id] = true;
    }
  }
  return cleanComponents;
}

var ReactDefaultPerfAnalysis = {
  getExclusiveSummary: getExclusiveSummary,
  getInclusiveSummary: getInclusiveSummary,
  getDOMSummary: getDOMSummary,
  getTotalTime: getTotalTime
};

module.exports = ReactDefaultPerfAnalysis;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEventEmitterMixin
 */



var EventPluginHub = __webpack_require__(20);

function runEventQueueInBatch(events) {
  EventPluginHub.enqueueEvents(events);
  EventPluginHub.processEventQueue(false);
}

var ReactEventEmitterMixin = {

  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {object} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native environment event.
   */
  handleTopLevel: function handleTopLevel(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
    runEventQueueInBatch(events);
  }
};

module.exports = ReactEventEmitterMixin;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactEventListener
 * @typechecks static-only
 */



var EventListener = __webpack_require__(53);
var ExecutionEnvironment = __webpack_require__(4);
var PooledClass = __webpack_require__(13);
var ReactInstanceHandles = __webpack_require__(17);
var ReactMount = __webpack_require__(5);
var ReactUpdates = __webpack_require__(8);

var assign = __webpack_require__(2);
var getEventTarget = __webpack_require__(44);
var getUnboundedScrollPosition = __webpack_require__(95);

var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

/**
 * Finds the parent React component of `node`.
 *
 * @param {*} node
 * @return {?DOMEventTarget} Parent container, or `null` if the specified node
 *                           is not nested.
 */
function findParent(node) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  var nodeID = ReactMount.getID(node);
  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
  var container = ReactMount.findReactContainerForID(rootID);
  var parent = ReactMount.getFirstReactDOM(container);
  return parent;
}

// Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}
assign(TopLevelCallbackBookKeeping.prototype, {
  destructor: function destructor() {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.ancestors.length = 0;
  }
});
PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);

function handleTopLevelImpl(bookKeeping) {
  // TODO: Re-enable event.path handling
  //
  // if (bookKeeping.nativeEvent.path && bookKeeping.nativeEvent.path.length > 1) {
  //   // New browsers have a path attribute on native events
  //   handleTopLevelWithPath(bookKeeping);
  // } else {
  //   // Legacy browsers don't have a path attribute on native events
  //   handleTopLevelWithoutPath(bookKeeping);
  // }

  void handleTopLevelWithPath; // temporarily unused
  handleTopLevelWithoutPath(bookKeeping);
}

// Legacy browsers don't have a path attribute on native events
function handleTopLevelWithoutPath(bookKeeping) {
  var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = topLevelTarget;
  while (ancestor) {
    bookKeeping.ancestors.push(ancestor);
    ancestor = findParent(ancestor);
  }

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    topLevelTarget = bookKeeping.ancestors[i];
    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

// New browsers have a path attribute on native events
function handleTopLevelWithPath(bookKeeping) {
  var path = bookKeeping.nativeEvent.path;
  var currentNativeTarget = path[0];
  var eventsFired = 0;
  for (var i = 0; i < path.length; i++) {
    var currentPathElement = path[i];
    if (currentPathElement.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE) {
      currentNativeTarget = path[i + 1];
    }
    // TODO: slow
    var reactParent = ReactMount.getFirstReactDOM(currentPathElement);
    if (reactParent === currentPathElement) {
      var currentPathElementID = ReactMount.getID(currentPathElement);
      var newRootID = ReactInstanceHandles.getReactRootIDFromNodeID(currentPathElementID);
      bookKeeping.ancestors.push(currentPathElement);

      var topLevelTargetID = ReactMount.getID(currentPathElement) || '';
      eventsFired++;
      ReactEventListener._handleTopLevel(bookKeeping.topLevelType, currentPathElement, topLevelTargetID, bookKeeping.nativeEvent, currentNativeTarget);

      // Jump to the root of this React render tree
      while (currentPathElementID !== newRootID) {
        i++;
        currentPathElement = path[i];
        currentPathElementID = ReactMount.getID(currentPathElement);
      }
    }
  }
  if (eventsFired === 0) {
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, window, '', bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

function scrollValueMonitor(cb) {
  var scrollPosition = getUnboundedScrollPosition(window);
  cb(scrollPosition);
}

var ReactEventListener = {
  _enabled: true,
  _handleTopLevel: null,

  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,

  setHandleTopLevel: function setHandleTopLevel(handleTopLevel) {
    ReactEventListener._handleTopLevel = handleTopLevel;
  },

  setEnabled: function setEnabled(enabled) {
    ReactEventListener._enabled = !!enabled;
  },

  isEnabled: function isEnabled() {
    return ReactEventListener._enabled;
  },

  /**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapBubbledEvent: function trapBubbledEvent(topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  /**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} handle Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapCapturedEvent: function trapCapturedEvent(topLevelType, handlerBaseName, handle) {
    var element = handle;
    if (!element) {
      return null;
    }
    return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  monitorScrollValue: function monitorScrollValue(refresh) {
    var callback = scrollValueMonitor.bind(null, refresh);
    EventListener.listen(window, 'scroll', callback);
  },

  dispatchEvent: function dispatchEvent(topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // Event queue being processed in the same cycle allows
      // `preventDefault`.
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
};

module.exports = ReactEventListener;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInjection
 */



var DOMProperty = __webpack_require__(14);
var EventPluginHub = __webpack_require__(20);
var ReactComponentEnvironment = __webpack_require__(37);
var ReactClass = __webpack_require__(64);
var ReactEmptyComponent = __webpack_require__(73);
var ReactBrowserEventEmitter = __webpack_require__(25);
var ReactNativeComponent = __webpack_require__(79);
var ReactPerf = __webpack_require__(7);
var ReactRootIndex = __webpack_require__(82);
var ReactUpdates = __webpack_require__(8);

var ReactInjection = {
  Component: ReactComponentEnvironment.injection,
  Class: ReactClass.injection,
  DOMProperty: DOMProperty.injection,
  EmptyComponent: ReactEmptyComponent.injection,
  EventPluginHub: EventPluginHub.injection,
  EventEmitter: ReactBrowserEventEmitter.injection,
  NativeComponent: ReactNativeComponent.injection,
  Perf: ReactPerf.injection,
  RootIndex: ReactRootIndex.injection,
  Updates: ReactUpdates.injection
};

module.exports = ReactInjection;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactIsomorphic
 */



var ReactChildren = __webpack_require__(63);
var ReactComponent = __webpack_require__(65);
var ReactClass = __webpack_require__(64);
var ReactDOMFactories = __webpack_require__(123);
var ReactElement = __webpack_require__(6);
var ReactElementValidator = __webpack_require__(72);
var ReactPropTypes = __webpack_require__(81);
var ReactVersion = __webpack_require__(40);

var assign = __webpack_require__(2);
var onlyChild = __webpack_require__(160);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function createMixin(mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Hook for JSX spread, don't use this for anything else.
  __spread: assign
};

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactMultiChild
 * @typechecks static-only
 */



var ReactComponentEnvironment = __webpack_require__(37);
var ReactMultiChildUpdateTypes = __webpack_require__(78);

var ReactCurrentOwner = __webpack_require__(11);
var ReactReconciler = __webpack_require__(15);
var ReactChildReconciler = __webpack_require__(119);

var flattenChildren = __webpack_require__(157);

/**
 * Updating children of a component may trigger recursive updates. The depth is
 * used to batch recursive updates to render markup more efficiently.
 *
 * @type {number}
 * @private
 */
var updateDepth = 0;

/**
 * Queue of update configuration objects.
 *
 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
 *
 * @type {array<object>}
 * @private
 */
var updateQueue = [];

/**
 * Queue of markup to be rendered.
 *
 * @type {array<string>}
 * @private
 */
var markupQueue = [];

/**
 * Enqueues markup to be rendered and inserted at a supplied index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function enqueueInsertMarkup(parentID, markup, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: markupQueue.push(markup) - 1,
    content: null,
    fromIndex: null,
    toIndex: toIndex
  });
}

/**
 * Enqueues moving an existing element to another index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function enqueueMove(parentID, fromIndex, toIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: toIndex
  });
}

/**
 * Enqueues removing an element at an index.
 *
 * @param {string} parentID ID of the parent component.
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function enqueueRemove(parentID, fromIndex) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: null
  });
}

/**
 * Enqueues setting the markup of a node.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} markup Markup that renders into an element.
 * @private
 */
function enqueueSetMarkup(parentID, markup) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.SET_MARKUP,
    markupIndex: null,
    content: markup,
    fromIndex: null,
    toIndex: null
  });
}

/**
 * Enqueues setting the text content.
 *
 * @param {string} parentID ID of the parent component.
 * @param {string} textContent Text content to set.
 * @private
 */
function enqueueTextContent(parentID, textContent) {
  // NOTE: Null values reduce hidden classes.
  updateQueue.push({
    parentID: parentID,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
    markupIndex: null,
    content: textContent,
    fromIndex: null,
    toIndex: null
  });
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue() {
  if (updateQueue.length) {
    ReactComponentEnvironment.processChildrenUpdates(updateQueue, markupQueue);
    clearQueue();
  }
}

/**
 * Clears any enqueued updates.
 *
 * @private
 */
function clearQueue() {
  updateQueue.length = 0;
  markupQueue.length = 0;
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    _reconcilerInstantiateChildren: function _reconcilerInstantiateChildren(nestedChildren, transaction, context) {
      if (process.env.NODE_ENV !== 'production') {
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
          } finally {
            ReactCurrentOwner.current = null;
          }
        }
      }
      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function _reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context) {
      var nextChildren;
      if (process.env.NODE_ENV !== 'production') {
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            nextChildren = flattenChildren(nextNestedChildrenElements);
          } finally {
            ReactCurrentOwner.current = null;
          }
          return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
        }
      }
      nextChildren = flattenChildren(nextNestedChildrenElements);
      return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
    },

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function mountChildren(nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;
      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
          var rootID = this._rootNodeID + name;
          var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }
      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function updateTextContent(nextContent) {
      updateDepth++;
      var errorThrown = true;
      try {
        var prevChildren = this._renderedChildren;
        // Remove any rendered children.
        ReactChildReconciler.unmountChildren(prevChildren);
        // TODO: The setTextContent operation should be enough
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            this._unmountChild(prevChildren[name]);
          }
        }
        // Set new text content.
        this.setTextContent(nextContent);
        errorThrown = false;
      } finally {
        updateDepth--;
        if (!updateDepth) {
          if (errorThrown) {
            clearQueue();
          } else {
            processQueue();
          }
        }
      }
    },

    /**
     * Replaces any rendered children with a markup string.
     *
     * @param {string} nextMarkup String of markup.
     * @internal
     */
    updateMarkup: function updateMarkup(nextMarkup) {
      updateDepth++;
      var errorThrown = true;
      try {
        var prevChildren = this._renderedChildren;
        // Remove any rendered children.
        ReactChildReconciler.unmountChildren(prevChildren);
        for (var name in prevChildren) {
          if (prevChildren.hasOwnProperty(name)) {
            this._unmountChildByName(prevChildren[name], name);
          }
        }
        this.setMarkup(nextMarkup);
        errorThrown = false;
      } finally {
        updateDepth--;
        if (!updateDepth) {
          if (errorThrown) {
            clearQueue();
          } else {
            processQueue();
          }
        }
      }
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function updateChildren(nextNestedChildrenElements, transaction, context) {
      updateDepth++;
      var errorThrown = true;
      try {
        this._updateChildren(nextNestedChildrenElements, transaction, context);
        errorThrown = false;
      } finally {
        updateDepth--;
        if (!updateDepth) {
          if (errorThrown) {
            clearQueue();
          } else {
            processQueue();
          }
        }
      }
    },

    /**
     * Improve performance by isolating this hot code path from the try/catch
     * block in `updateChildren`.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function _updateChildren(nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context);
      this._renderedChildren = nextChildren;
      if (!nextChildren && !prevChildren) {
        return;
      }
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var lastIndex = 0;
      var nextIndex = 0;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          this.moveChild(prevChild, nextIndex, lastIndex);
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            this._unmountChild(prevChild);
          }
          // The child must be instantiated before it's mounted.
          this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
        }
        nextIndex++;
      }
      // Remove children that are no longer present.
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
          this._unmountChild(prevChildren[name]);
        }
      }
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted.
     *
     * @internal
     */
    unmountChildren: function unmountChildren() {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler.unmountChildren(renderedChildren);
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function moveChild(child, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function createChild(child, mountImage) {
      enqueueInsertMarkup(this._rootNodeID, mountImage, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function removeChild(child) {
      enqueueRemove(this._rootNodeID, child._mountIndex);
    },

    /**
     * Sets this text content string.
     *
     * @param {string} textContent Text content to set.
     * @protected
     */
    setTextContent: function setTextContent(textContent) {
      enqueueTextContent(this._rootNodeID, textContent);
    },

    /**
     * Sets this markup string.
     *
     * @param {string} markup Markup to set.
     * @protected
     */
    setMarkup: function setMarkup(markup) {
      enqueueSetMarkup(this._rootNodeID, markup);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildByNameAtIndex: function _mountChildByNameAtIndex(child, name, index, transaction, context) {
      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
      var rootID = this._rootNodeID + name;
      var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
      child._mountIndex = index;
      this.createChild(child, mountImage);
    },

    /**
     * Unmounts a rendered child.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @private
     */
    _unmountChild: function _unmountChild(child) {
      this.removeChild(child);
      child._mountIndex = null;
    }

  }

};

module.exports = ReactMultiChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactOwner
 */



var invariant = __webpack_require__(1);

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {

  /**
   * @param {?object} object
   * @return {boolean} True if `object` is a valid owner.
   * @final
   */
  isValidOwner: function isValidOwner(object) {
    return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
  },

  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function addComponentAsRefTo(component, ref, owner) {
    !ReactOwner.isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function removeComponentAsRefFrom(component, ref, owner) {
    !ReactOwner.isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
    // Check that `component` is still the current ref because we do not want to
    // detach the ref if another component stole it.
    if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }

};

module.exports = ReactOwner;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactReconcileTransaction
 * @typechecks static-only
 */



var CallbackQueue = __webpack_require__(33);
var PooledClass = __webpack_require__(13);
var ReactBrowserEventEmitter = __webpack_require__(25);
var ReactDOMFeatureFlags = __webpack_require__(67);
var ReactInputSelection = __webpack_require__(76);
var Transaction = __webpack_require__(29);

var assign = __webpack_require__(2);

/**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */
var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection.getSelectionInformation,
  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection.restoreSelection
};

/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */
var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
   * the reconciliation.
   */
  initialize: function initialize() {
    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
    ReactBrowserEventEmitter.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of
   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
   *   restores the previous value.
   */
  close: function close(previouslyEnabled) {
    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
  }
};

/**
 * Provides a queue for collecting `componentDidMount` and
 * `componentDidUpdate` callbacks during the the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function initialize() {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function close() {
    this.reactMountReady.notifyAll();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactReconcileTransaction
 */
function ReactReconcileTransaction(forceHTML) {
  this.reinitializeTransaction();
  // Only server-side rendering really needs this option (see
  // `ReactServerRendering`), but server-side uses
  // `ReactServerRenderingTransaction` instead. This option is here so that it's
  // accessible and defaults to false when `ReactDOMComponent` and
  // `ReactTextComponent` checks it in `mountComponent`.`
  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function getReactMountReady() {
    return this.reactMountReady;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function destructor() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);

PooledClass.addPoolingTo(ReactReconcileTransaction);

module.exports = ReactReconcileTransaction;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRef
 */



var ReactOwner = __webpack_require__(136);

var ReactRef = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;

  return (
    // This has a few false positives w/r/t empty components.
    prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref
  );
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || element === false) {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

module.exports = ReactRef;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerBatchingStrategy
 * @typechecks
 */



var ReactServerBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function batchedUpdates(callback) {
    // Don't do anything here. During the server rendering we don't want to
    // schedule any updates. We will simply ignore them.
  }
};

module.exports = ReactServerBatchingStrategy;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks static-only
 * @providesModule ReactServerRendering
 */


var ReactDefaultBatchingStrategy = __webpack_require__(70);
var ReactElement = __webpack_require__(6);
var ReactInstanceHandles = __webpack_require__(17);
var ReactMarkupChecksum = __webpack_require__(77);
var ReactServerBatchingStrategy = __webpack_require__(139);
var ReactServerRenderingTransaction = __webpack_require__(141);
var ReactUpdates = __webpack_require__(8);

var emptyObject = __webpack_require__(19);
var instantiateReactComponent = __webpack_require__(46);
var invariant = __webpack_require__(1);

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup
 */
function renderToString(element) {
  !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : invariant(false) : undefined;

  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(false);

    return transaction.perform(function () {
      var componentInstance = instantiateReactComponent(element, null);
      var markup = componentInstance.mountComponent(id, transaction, emptyObject);
      return ReactMarkupChecksum.addChecksumToMarkup(markup);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);
    // Revert to the DOM batching strategy since these two renderers
    // currently share these stateful modules.
    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  }
}

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup, without the extra React ID and checksum
 * (for generating static pages)
 */
function renderToStaticMarkup(element) {
  !ReactElement.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(false) : undefined;

  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    var id = ReactInstanceHandles.createReactRootID();
    transaction = ReactServerRenderingTransaction.getPooled(true);

    return transaction.perform(function () {
      var componentInstance = instantiateReactComponent(element, null);
      return componentInstance.mountComponent(id, transaction, emptyObject);
    }, null);
  } finally {
    ReactServerRenderingTransaction.release(transaction);
    // Revert to the DOM batching strategy since these two renderers
    // currently share these stateful modules.
    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  }
}

module.exports = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactServerRenderingTransaction
 * @typechecks
 */



var PooledClass = __webpack_require__(13);
var CallbackQueue = __webpack_require__(33);
var Transaction = __webpack_require__(29);

var assign = __webpack_require__(2);
var emptyFunction = __webpack_require__(9);

/**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks
 * during the performing of the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function initialize() {
    this.reactMountReady.reset();
  },

  close: emptyFunction
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [ON_DOM_READY_QUEUEING];

/**
 * @class ReactServerRenderingTransaction
 * @param {boolean} renderToStaticMarkup
 */
function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.reactMountReady = CallbackQueue.getPooled(null);
  this.useCreateElement = false;
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array} Empty list of operation wrap procedures.
   */
  getTransactionWrappers: function getTransactionWrappers() {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function getReactMountReady() {
    return this.reactMountReady;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function destructor() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);

PooledClass.addPoolingTo(ReactServerRenderingTransaction);

module.exports = ReactServerRenderingTransaction;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SVGDOMPropertyConfig
 */



var DOMProperty = __webpack_require__(14);

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;

var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

var SVGDOMPropertyConfig = {
  Properties: {
    clipPath: MUST_USE_ATTRIBUTE,
    cx: MUST_USE_ATTRIBUTE,
    cy: MUST_USE_ATTRIBUTE,
    d: MUST_USE_ATTRIBUTE,
    dx: MUST_USE_ATTRIBUTE,
    dy: MUST_USE_ATTRIBUTE,
    fill: MUST_USE_ATTRIBUTE,
    fillOpacity: MUST_USE_ATTRIBUTE,
    fontFamily: MUST_USE_ATTRIBUTE,
    fontSize: MUST_USE_ATTRIBUTE,
    fx: MUST_USE_ATTRIBUTE,
    fy: MUST_USE_ATTRIBUTE,
    gradientTransform: MUST_USE_ATTRIBUTE,
    gradientUnits: MUST_USE_ATTRIBUTE,
    markerEnd: MUST_USE_ATTRIBUTE,
    markerMid: MUST_USE_ATTRIBUTE,
    markerStart: MUST_USE_ATTRIBUTE,
    offset: MUST_USE_ATTRIBUTE,
    opacity: MUST_USE_ATTRIBUTE,
    patternContentUnits: MUST_USE_ATTRIBUTE,
    patternUnits: MUST_USE_ATTRIBUTE,
    points: MUST_USE_ATTRIBUTE,
    preserveAspectRatio: MUST_USE_ATTRIBUTE,
    r: MUST_USE_ATTRIBUTE,
    rx: MUST_USE_ATTRIBUTE,
    ry: MUST_USE_ATTRIBUTE,
    spreadMethod: MUST_USE_ATTRIBUTE,
    stopColor: MUST_USE_ATTRIBUTE,
    stopOpacity: MUST_USE_ATTRIBUTE,
    stroke: MUST_USE_ATTRIBUTE,
    strokeDasharray: MUST_USE_ATTRIBUTE,
    strokeLinecap: MUST_USE_ATTRIBUTE,
    strokeOpacity: MUST_USE_ATTRIBUTE,
    strokeWidth: MUST_USE_ATTRIBUTE,
    textAnchor: MUST_USE_ATTRIBUTE,
    transform: MUST_USE_ATTRIBUTE,
    version: MUST_USE_ATTRIBUTE,
    viewBox: MUST_USE_ATTRIBUTE,
    x1: MUST_USE_ATTRIBUTE,
    x2: MUST_USE_ATTRIBUTE,
    x: MUST_USE_ATTRIBUTE,
    xlinkActuate: MUST_USE_ATTRIBUTE,
    xlinkArcrole: MUST_USE_ATTRIBUTE,
    xlinkHref: MUST_USE_ATTRIBUTE,
    xlinkRole: MUST_USE_ATTRIBUTE,
    xlinkShow: MUST_USE_ATTRIBUTE,
    xlinkTitle: MUST_USE_ATTRIBUTE,
    xlinkType: MUST_USE_ATTRIBUTE,
    xmlBase: MUST_USE_ATTRIBUTE,
    xmlLang: MUST_USE_ATTRIBUTE,
    xmlSpace: MUST_USE_ATTRIBUTE,
    y1: MUST_USE_ATTRIBUTE,
    y2: MUST_USE_ATTRIBUTE,
    y: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  },
  DOMAttributeNames: {
    clipPath: 'clip-path',
    fillOpacity: 'fill-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    patternContentUnits: 'patternContentUnits',
    patternUnits: 'patternUnits',
    preserveAspectRatio: 'preserveAspectRatio',
    spreadMethod: 'spreadMethod',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strokeDasharray: 'stroke-dasharray',
    strokeLinecap: 'stroke-linecap',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    textAnchor: 'text-anchor',
    viewBox: 'viewBox',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space'
  }
};

module.exports = SVGDOMPropertyConfig;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SelectEventPlugin
 */



var EventConstants = __webpack_require__(10);
var EventPropagators = __webpack_require__(21);
var ExecutionEnvironment = __webpack_require__(4);
var ReactInputSelection = __webpack_require__(76);
var SyntheticEvent = __webpack_require__(16);

var getActiveElement = __webpack_require__(56);
var isTextInputElement = __webpack_require__(87);
var keyOf = __webpack_require__(12);
var shallowEqual = __webpack_require__(58);

var topLevelTypes = EventConstants.topLevelTypes;

var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes = {
  select: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSelect: null }),
      captured: keyOf({ onSelectCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
  }
};

var activeElement = null;
var activeElementID = null;
var lastSelection = null;
var mouseDown = false;

// Track whether a listener exists for this plugin. If none exist, we do
// not extract events.
var hasListener = false;
var ON_SELECT_KEY = keyOf({ onSelect: null });

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    if (!hasListener) {
      return null;
    }

    switch (topLevelType) {
      // Track the input node that has focus.
      case topLevelTypes.topFocus:
        if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
          activeElement = topLevelTarget;
          activeElementID = topLevelTargetID;
          lastSelection = null;
        }
        break;
      case topLevelTypes.topBlur:
        activeElement = null;
        activeElementID = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case topLevelTypes.topMouseDown:
        mouseDown = true;
        break;
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topMouseUp:
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case topLevelTypes.topSelectionChange:
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case topLevelTypes.topKeyDown:
      case topLevelTypes.topKeyUp:
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function didPutListener(id, registrationName, listener) {
    if (registrationName === ON_SELECT_KEY) {
      hasListener = true;
    }
  }
};

module.exports = SelectEventPlugin;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ServerReactRootIndex
 * @typechecks
 */



/**
 * Size of the reactRoot ID space. We generate random numbers for React root
 * IDs and if there's a collision the events and DOM update system will
 * get confused. In the future we need a way to generate GUIDs but for
 * now this will work on a smaller scale.
 */

var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);

var ServerReactRootIndex = {
  createReactRootIndex: function createReactRootIndex() {
    return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
  }
};

module.exports = ServerReactRootIndex;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SimpleEventPlugin
 */



var EventConstants = __webpack_require__(10);
var EventListener = __webpack_require__(53);
var EventPropagators = __webpack_require__(21);
var ReactMount = __webpack_require__(5);
var SyntheticClipboardEvent = __webpack_require__(146);
var SyntheticEvent = __webpack_require__(16);
var SyntheticFocusEvent = __webpack_require__(149);
var SyntheticKeyboardEvent = __webpack_require__(151);
var SyntheticMouseEvent = __webpack_require__(28);
var SyntheticDragEvent = __webpack_require__(148);
var SyntheticTouchEvent = __webpack_require__(152);
var SyntheticUIEvent = __webpack_require__(23);
var SyntheticWheelEvent = __webpack_require__(153);

var emptyFunction = __webpack_require__(9);
var getEventCharCode = __webpack_require__(42);
var invariant = __webpack_require__(1);
var keyOf = __webpack_require__(12);

var topLevelTypes = EventConstants.topLevelTypes;

var eventTypes = {
  abort: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onAbort: true }),
      captured: keyOf({ onAbortCapture: true })
    }
  },
  blur: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBlur: true }),
      captured: keyOf({ onBlurCapture: true })
    }
  },
  canPlay: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCanPlay: true }),
      captured: keyOf({ onCanPlayCapture: true })
    }
  },
  canPlayThrough: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCanPlayThrough: true }),
      captured: keyOf({ onCanPlayThroughCapture: true })
    }
  },
  click: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onClick: true }),
      captured: keyOf({ onClickCapture: true })
    }
  },
  contextMenu: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onContextMenu: true }),
      captured: keyOf({ onContextMenuCapture: true })
    }
  },
  copy: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCopy: true }),
      captured: keyOf({ onCopyCapture: true })
    }
  },
  cut: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCut: true }),
      captured: keyOf({ onCutCapture: true })
    }
  },
  doubleClick: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDoubleClick: true }),
      captured: keyOf({ onDoubleClickCapture: true })
    }
  },
  drag: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDrag: true }),
      captured: keyOf({ onDragCapture: true })
    }
  },
  dragEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragEnd: true }),
      captured: keyOf({ onDragEndCapture: true })
    }
  },
  dragEnter: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragEnter: true }),
      captured: keyOf({ onDragEnterCapture: true })
    }
  },
  dragExit: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragExit: true }),
      captured: keyOf({ onDragExitCapture: true })
    }
  },
  dragLeave: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragLeave: true }),
      captured: keyOf({ onDragLeaveCapture: true })
    }
  },
  dragOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragOver: true }),
      captured: keyOf({ onDragOverCapture: true })
    }
  },
  dragStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDragStart: true }),
      captured: keyOf({ onDragStartCapture: true })
    }
  },
  drop: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDrop: true }),
      captured: keyOf({ onDropCapture: true })
    }
  },
  durationChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onDurationChange: true }),
      captured: keyOf({ onDurationChangeCapture: true })
    }
  },
  emptied: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEmptied: true }),
      captured: keyOf({ onEmptiedCapture: true })
    }
  },
  encrypted: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEncrypted: true }),
      captured: keyOf({ onEncryptedCapture: true })
    }
  },
  ended: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onEnded: true }),
      captured: keyOf({ onEndedCapture: true })
    }
  },
  error: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onError: true }),
      captured: keyOf({ onErrorCapture: true })
    }
  },
  focus: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onFocus: true }),
      captured: keyOf({ onFocusCapture: true })
    }
  },
  input: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onInput: true }),
      captured: keyOf({ onInputCapture: true })
    }
  },
  keyDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyDown: true }),
      captured: keyOf({ onKeyDownCapture: true })
    }
  },
  keyPress: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyPress: true }),
      captured: keyOf({ onKeyPressCapture: true })
    }
  },
  keyUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onKeyUp: true }),
      captured: keyOf({ onKeyUpCapture: true })
    }
  },
  load: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoad: true }),
      captured: keyOf({ onLoadCapture: true })
    }
  },
  loadedData: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadedData: true }),
      captured: keyOf({ onLoadedDataCapture: true })
    }
  },
  loadedMetadata: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadedMetadata: true }),
      captured: keyOf({ onLoadedMetadataCapture: true })
    }
  },
  loadStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onLoadStart: true }),
      captured: keyOf({ onLoadStartCapture: true })
    }
  },
  // Note: We do not allow listening to mouseOver events. Instead, use the
  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
  mouseDown: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseDown: true }),
      captured: keyOf({ onMouseDownCapture: true })
    }
  },
  mouseMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseMove: true }),
      captured: keyOf({ onMouseMoveCapture: true })
    }
  },
  mouseOut: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseOut: true }),
      captured: keyOf({ onMouseOutCapture: true })
    }
  },
  mouseOver: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseOver: true }),
      captured: keyOf({ onMouseOverCapture: true })
    }
  },
  mouseUp: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onMouseUp: true }),
      captured: keyOf({ onMouseUpCapture: true })
    }
  },
  paste: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPaste: true }),
      captured: keyOf({ onPasteCapture: true })
    }
  },
  pause: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPause: true }),
      captured: keyOf({ onPauseCapture: true })
    }
  },
  play: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPlay: true }),
      captured: keyOf({ onPlayCapture: true })
    }
  },
  playing: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onPlaying: true }),
      captured: keyOf({ onPlayingCapture: true })
    }
  },
  progress: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onProgress: true }),
      captured: keyOf({ onProgressCapture: true })
    }
  },
  rateChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onRateChange: true }),
      captured: keyOf({ onRateChangeCapture: true })
    }
  },
  reset: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onReset: true }),
      captured: keyOf({ onResetCapture: true })
    }
  },
  scroll: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onScroll: true }),
      captured: keyOf({ onScrollCapture: true })
    }
  },
  seeked: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSeeked: true }),
      captured: keyOf({ onSeekedCapture: true })
    }
  },
  seeking: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSeeking: true }),
      captured: keyOf({ onSeekingCapture: true })
    }
  },
  stalled: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onStalled: true }),
      captured: keyOf({ onStalledCapture: true })
    }
  },
  submit: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSubmit: true }),
      captured: keyOf({ onSubmitCapture: true })
    }
  },
  suspend: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onSuspend: true }),
      captured: keyOf({ onSuspendCapture: true })
    }
  },
  timeUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTimeUpdate: true }),
      captured: keyOf({ onTimeUpdateCapture: true })
    }
  },
  touchCancel: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchCancel: true }),
      captured: keyOf({ onTouchCancelCapture: true })
    }
  },
  touchEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchEnd: true }),
      captured: keyOf({ onTouchEndCapture: true })
    }
  },
  touchMove: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchMove: true }),
      captured: keyOf({ onTouchMoveCapture: true })
    }
  },
  touchStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onTouchStart: true }),
      captured: keyOf({ onTouchStartCapture: true })
    }
  },
  volumeChange: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onVolumeChange: true }),
      captured: keyOf({ onVolumeChangeCapture: true })
    }
  },
  waiting: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onWaiting: true }),
      captured: keyOf({ onWaitingCapture: true })
    }
  },
  wheel: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onWheel: true }),
      captured: keyOf({ onWheelCapture: true })
    }
  }
};

var topLevelEventsToDispatchConfig = {
  topAbort: eventTypes.abort,
  topBlur: eventTypes.blur,
  topCanPlay: eventTypes.canPlay,
  topCanPlayThrough: eventTypes.canPlayThrough,
  topClick: eventTypes.click,
  topContextMenu: eventTypes.contextMenu,
  topCopy: eventTypes.copy,
  topCut: eventTypes.cut,
  topDoubleClick: eventTypes.doubleClick,
  topDrag: eventTypes.drag,
  topDragEnd: eventTypes.dragEnd,
  topDragEnter: eventTypes.dragEnter,
  topDragExit: eventTypes.dragExit,
  topDragLeave: eventTypes.dragLeave,
  topDragOver: eventTypes.dragOver,
  topDragStart: eventTypes.dragStart,
  topDrop: eventTypes.drop,
  topDurationChange: eventTypes.durationChange,
  topEmptied: eventTypes.emptied,
  topEncrypted: eventTypes.encrypted,
  topEnded: eventTypes.ended,
  topError: eventTypes.error,
  topFocus: eventTypes.focus,
  topInput: eventTypes.input,
  topKeyDown: eventTypes.keyDown,
  topKeyPress: eventTypes.keyPress,
  topKeyUp: eventTypes.keyUp,
  topLoad: eventTypes.load,
  topLoadedData: eventTypes.loadedData,
  topLoadedMetadata: eventTypes.loadedMetadata,
  topLoadStart: eventTypes.loadStart,
  topMouseDown: eventTypes.mouseDown,
  topMouseMove: eventTypes.mouseMove,
  topMouseOut: eventTypes.mouseOut,
  topMouseOver: eventTypes.mouseOver,
  topMouseUp: eventTypes.mouseUp,
  topPaste: eventTypes.paste,
  topPause: eventTypes.pause,
  topPlay: eventTypes.play,
  topPlaying: eventTypes.playing,
  topProgress: eventTypes.progress,
  topRateChange: eventTypes.rateChange,
  topReset: eventTypes.reset,
  topScroll: eventTypes.scroll,
  topSeeked: eventTypes.seeked,
  topSeeking: eventTypes.seeking,
  topStalled: eventTypes.stalled,
  topSubmit: eventTypes.submit,
  topSuspend: eventTypes.suspend,
  topTimeUpdate: eventTypes.timeUpdate,
  topTouchCancel: eventTypes.touchCancel,
  topTouchEnd: eventTypes.touchEnd,
  topTouchMove: eventTypes.touchMove,
  topTouchStart: eventTypes.touchStart,
  topVolumeChange: eventTypes.volumeChange,
  topWaiting: eventTypes.waiting,
  topWheel: eventTypes.wheel
};

for (var type in topLevelEventsToDispatchConfig) {
  topLevelEventsToDispatchConfig[type].dependencies = [type];
}

var ON_CLICK_KEY = keyOf({ onClick: null });
var onClickListeners = {};

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case topLevelTypes.topAbort:
      case topLevelTypes.topCanPlay:
      case topLevelTypes.topCanPlayThrough:
      case topLevelTypes.topDurationChange:
      case topLevelTypes.topEmptied:
      case topLevelTypes.topEncrypted:
      case topLevelTypes.topEnded:
      case topLevelTypes.topError:
      case topLevelTypes.topInput:
      case topLevelTypes.topLoad:
      case topLevelTypes.topLoadedData:
      case topLevelTypes.topLoadedMetadata:
      case topLevelTypes.topLoadStart:
      case topLevelTypes.topPause:
      case topLevelTypes.topPlay:
      case topLevelTypes.topPlaying:
      case topLevelTypes.topProgress:
      case topLevelTypes.topRateChange:
      case topLevelTypes.topReset:
      case topLevelTypes.topSeeked:
      case topLevelTypes.topSeeking:
      case topLevelTypes.topStalled:
      case topLevelTypes.topSubmit:
      case topLevelTypes.topSuspend:
      case topLevelTypes.topTimeUpdate:
      case topLevelTypes.topVolumeChange:
      case topLevelTypes.topWaiting:
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent;
        break;
      case topLevelTypes.topKeyPress:
        // FireFox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case topLevelTypes.topKeyDown:
      case topLevelTypes.topKeyUp:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case topLevelTypes.topBlur:
      case topLevelTypes.topFocus:
        EventConstructor = SyntheticFocusEvent;
        break;
      case topLevelTypes.topClick:
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case topLevelTypes.topContextMenu:
      case topLevelTypes.topDoubleClick:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topMouseMove:
      case topLevelTypes.topMouseOut:
      case topLevelTypes.topMouseOver:
      case topLevelTypes.topMouseUp:
        EventConstructor = SyntheticMouseEvent;
        break;
      case topLevelTypes.topDrag:
      case topLevelTypes.topDragEnd:
      case topLevelTypes.topDragEnter:
      case topLevelTypes.topDragExit:
      case topLevelTypes.topDragLeave:
      case topLevelTypes.topDragOver:
      case topLevelTypes.topDragStart:
      case topLevelTypes.topDrop:
        EventConstructor = SyntheticDragEvent;
        break;
      case topLevelTypes.topTouchCancel:
      case topLevelTypes.topTouchEnd:
      case topLevelTypes.topTouchMove:
      case topLevelTypes.topTouchStart:
        EventConstructor = SyntheticTouchEvent;
        break;
      case topLevelTypes.topScroll:
        EventConstructor = SyntheticUIEvent;
        break;
      case topLevelTypes.topWheel:
        EventConstructor = SyntheticWheelEvent;
        break;
      case topLevelTypes.topCopy:
      case topLevelTypes.topCut:
      case topLevelTypes.topPaste:
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    !EventConstructor ? process.env.NODE_ENV !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
    var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function didPutListener(id, registrationName, listener) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    if (registrationName === ON_CLICK_KEY) {
      var node = ReactMount.getNode(id);
      if (!onClickListeners[id]) {
        onClickListeners[id] = EventListener.listen(node, 'click', emptyFunction);
      }
    }
  },

  willDeleteListener: function willDeleteListener(id, registrationName) {
    if (registrationName === ON_CLICK_KEY) {
      onClickListeners[id].remove();
      delete onClickListeners[id];
    }
  }

};

module.exports = SimpleEventPlugin;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticClipboardEvent
 * @typechecks static-only
 */



var SyntheticEvent = __webpack_require__(16);

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function clipboardData(event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

module.exports = SyntheticClipboardEvent;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticCompositionEvent
 * @typechecks static-only
 */



var SyntheticEvent = __webpack_require__(16);

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

module.exports = SyntheticCompositionEvent;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticDragEvent
 * @typechecks static-only
 */



var SyntheticMouseEvent = __webpack_require__(28);

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

module.exports = SyntheticDragEvent;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticFocusEvent
 * @typechecks static-only
 */



var SyntheticUIEvent = __webpack_require__(23);

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticInputEvent
 * @typechecks static-only
 */



var SyntheticEvent = __webpack_require__(16);

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);

module.exports = SyntheticInputEvent;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticKeyboardEvent
 * @typechecks static-only
 */



var SyntheticUIEvent = __webpack_require__(23);

var getEventCharCode = __webpack_require__(42);
var getEventKey = __webpack_require__(158);
var getEventModifierState = __webpack_require__(43);

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,
  // Legacy Interface
  charCode: function charCode(event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    return 0;
  },
  keyCode: function keyCode(event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function which(event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

module.exports = SyntheticKeyboardEvent;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticTouchEvent
 * @typechecks static-only
 */



var SyntheticUIEvent = __webpack_require__(23);

var getEventModifierState = __webpack_require__(43);

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

module.exports = SyntheticTouchEvent;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticWheelEvent
 * @typechecks static-only
 */



var SyntheticMouseEvent = __webpack_require__(28);

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function deltaX(event) {
    return 'deltaX' in event ? event.deltaX :
    // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function deltaY(event) {
    return 'deltaY' in event ? event.deltaY :
    // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY :
    // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

module.exports = SyntheticWheelEvent;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule adler32
 */



var MOD = 65521;

// adler32 is not cryptographically strong, and is only used to sanity check that
// markup generated on the server matches the markup generated on the client.
// This implementation (a modified version of the SheetJS version) has been optimized
// for our use case, at the expense of conforming to the adler32 specification
// for non-ascii inputs.
function adler32(data) {
  var a = 1;
  var b = 0;
  var i = 0;
  var l = data.length;
  var m = l & ~0x3;
  while (i < m) {
    for (; i < Math.min(i + 4096, m); i += 4) {
      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
    }
    a %= MOD;
    b %= MOD;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= MOD;
  b %= MOD;
  return a | b << 16;
}

module.exports = adler32;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 * @typechecks static-only
 */



var CSSProperty = __webpack_require__(60);

var isUnitlessNumber = CSSProperty.isUnitlessNumber;

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}

module.exports = dangerousStyleValue;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule deprecated
 */



var assign = __webpack_require__(2);
var warning = __webpack_require__(3);

/**
 * This will log a single deprecation notice per function and forward the call
 * on to the new API.
 *
 * @param {string} fnName The name of the function
 * @param {string} newModule The module that fn will exist in
 * @param {string} newPackage The module that fn will exist in
 * @param {*} ctx The context this forwarded call should run in
 * @param {function} fn The function to forward on to
 * @return {function} The function that will warn once and then call fn
 */
function deprecated(fnName, newModule, newPackage, ctx, fn) {
  var warned = false;
  if (process.env.NODE_ENV !== 'production') {
    var newFn = function newFn() {
      process.env.NODE_ENV !== 'production' ? warning(warned,
      // Require examples in this string must be split to prevent React's
      // build tools from mistaking them for real requires.
      // Otherwise the build tools will attempt to build a '%s' module.
      'React.%s is deprecated. Please use %s.%s from require' + '(\'%s\') ' + 'instead.', fnName, newModule, fnName, newPackage) : undefined;
      warned = true;
      return fn.apply(ctx, arguments);
    };
    // We need to make sure all properties of the original fn are copied over.
    // In particular, this is needed to support PropTypes
    return assign(newFn, fn);
  }

  return fn;
}

module.exports = deprecated;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule flattenChildren
 */



var traverseAllChildren = __webpack_require__(50);
var warning = __webpack_require__(3);

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 */
function flattenSingleChildIntoContext(traverseContext, child, name) {
  // We found a component instance.
  var result = traverseContext;
  var keyUnique = result[name] === undefined;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
  }
  if (keyUnique && child != null) {
    result[name] = child;
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children) {
  if (children == null) {
    return children;
  }
  var result = {};
  traverseAllChildren(children, flattenSingleChildIntoContext, result);
  return result;
}

module.exports = flattenChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventKey
 * @typechecks static-only
 */



var getEventCharCode = __webpack_require__(42);

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  'Esc': 'Escape',
  'Spacebar': ' ',
  'Left': 'ArrowLeft',
  'Up': 'ArrowUp',
  'Right': 'ArrowRight',
  'Down': 'ArrowDown',
  'Del': 'Delete',
  'Win': 'OS',
  'Menu': 'ContextMenu',
  'Apps': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'MozPrintableKey': 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

module.exports = getEventKey;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getNodeForCharacterOffset
 */



/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */

function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

module.exports = getNodeForCharacterOffset;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule onlyChild
 */


var ReactElement = __webpack_require__(6);

var invariant = __webpack_require__(1);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection. The current implementation of this
 * function assumes that a single child gets passed without a wrapper, but the
 * purpose of this helper function is to abstract away the particular structure
 * of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactComponent} The first and only `ReactComponent` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule quoteAttributeValueForBrowser
 */



var escapeTextContentForBrowser = __webpack_require__(31);

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser(value) + '"';
}

module.exports = quoteAttributeValueForBrowser;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule renderSubtreeIntoContainer
*/



var ReactMount = __webpack_require__(5);

module.exports = ReactMount.renderSubtreeIntoContainer;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(89);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _List = __webpack_require__(90);

var _List2 = _interopRequireDefault(_List);

var _Chart = __webpack_require__(52);

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_List2.default, null), document.getElementById('main'));

/***/ })
/******/ ]);