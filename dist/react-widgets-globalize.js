/*! (c) 2015 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
var ReactWidgetLocalizer =
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(1);

	exports.__esModule = true;
	exports['default'] = globalizeLocalizers;

	var _react = __webpack_require__(2);

	var _configure = __webpack_require__(3);

	var _configure2 = babelHelpers.interopRequireDefault(_configure);

	function endOfDecade(date) {
	  date = new Date(date);
	  date.setFullYear(date.getFullYear() + 10);
	  date.setMilliseconds(date.getMilliseconds() - 1);
	  return date;
	}

	function endOfCentury(date) {
	  date = new Date(date);
	  date.setFullYear(date.getFullYear() + 100);
	  date.setMilliseconds(date.getMilliseconds() - 1);
	  return date;
	}

	function globalizeLocalizers(globalize) {
	  var localizers = globalize.load ? newGlobalize(globalize) : oldGlobalize(globalize);

	  _configure2['default'].setLocalizers(localizers);
	  return localizers;
	}

	function newGlobalize(globalize) {
	  var locale = function locale(culture) {
	    return culture ? globalize(culture) : globalize;
	  };

	  var date = {

	    formats: {
	      date: { date: 'short' },
	      time: { time: 'short' },
	      'default': { datetime: 'medium' },
	      header: 'MMMM yyyy',
	      footer: { date: 'full' },
	      weekday: 'eeeeee',
	      dayOfMonth: 'dd',
	      month: 'MMM',
	      year: 'yyyy',

	      decade: function decade(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfDecade(dt), l.formats.year, culture);
	      },

	      century: function century(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfCentury(dt), l.formats.year, culture);
	      }
	    },

	    propType: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.func]),

	    firstOfWeek: function firstOfWeek(culture) {
	      var date = new Date();
	      //cldr-data doesn't seem to be zero based
	      var localeDay = Math.max(parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0);

	      return Math.abs(date.getDay() - localeDay);
	    },

	    parse: function parse(value, format, culture) {
	      format = typeof format === 'string' ? { raw: format } : format;
	      return locale(culture).parseDate(value, format);
	    },

	    format: function format(value, _format, culture) {
	      _format = typeof _format === 'string' ? { raw: _format } : _format;
	      return locale(culture).formatDate(value, _format);
	    }
	  };

	  var number = {
	    formats: {
	      'default': { maximumFractionDigits: 0 }
	    },

	    propType: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

	    parse: function parse(value, format, culture) {
	      return locale(culture).parseNumber(value, format);
	    },

	    format: function format(value, _format2, culture) {
	      return value == null ? value : locale(culture).formatNumber(value, _format2);
	    },

	    precision: function precision(format) {
	      return !format || format.maximumFractionDigits == null ? null : format.maximumFractionDigits;
	    }
	  };
	  return { date: date, number: number };
	}

	function oldGlobalize(globalize) {
	  var shortNames = Object.create(null);

	  function getCulture(culture) {
	    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
	  }

	  function firstOfWeek(culture) {
	    culture = getCulture(culture);
	    return culture && culture.calendar.firstDay || 0;
	  }

	  function shortDay(dayOfTheWeek) {
	    var culture = getCulture(arguments[1]),
	        name = culture.name,
	        start = firstOfWeek(culture),
	        days = function days() {
	      var days = culture.calendar.days.namesShort.slice();
	      return start === 0 ? days : days.concat(days.splice(0, start));
	    };

	    var names = shortNames[name] || (shortNames[name] = days());

	    return names[dayOfTheWeek.getDay()];
	  }

	  var date = {

	    formats: {
	      date: 'd',
	      time: 't',
	      'default': 'f',
	      header: 'MMMM yyyy',
	      footer: 'D',
	      weekday: shortDay,
	      dayOfMonth: 'dd',
	      month: 'MMM',
	      year: 'yyyy',

	      decade: function decade(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfDecade(dt), l.formats.year, culture);
	      },

	      century: function century(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfCentury(dt), l.formats.year, culture);
	      }
	    },

	    firstOfWeek: firstOfWeek,

	    parse: function parse(value, format, culture) {
	      return globalize.parseDate(value, format, culture);
	    },

	    format: function format(value, _format3, culture) {
	      return globalize.format(value, _format3, culture);
	    }
	  };

	  var number = {

	    formats: {
	      'default': 'D'
	    },

	    parse: function parse(value, culture) {
	      return globalize.parseFloat(value, 10, culture);
	    },

	    format: function format(value, _format4, culture) {
	      return globalize.format(value, _format4, culture);
	    },

	    precision: function precision(format, _culture) {
	      var culture = getCulture(_culture),
	          numFormat = culture.numberFormat;

	      if (typeof format === 'string') {
	        if (format.length > 1) return parseFloat(format.substr(1));

	        if (format.indexOf('p') !== -1) numFormat = numFormat.percent;
	        if (format.indexOf('c') !== -1) numFormat = numFormat.curency;

	        return numFormat.decimals || null;
	      }

	      return null;
	    }
	  };

	  return { date: date, number: number };
	}
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.createDecoratedObject = function (descriptors) {
	    var target = {};

	    for (var i = 0; i < descriptors.length; i++) {
	      var descriptor = descriptors[i];
	      var decorators = descriptor.decorators;
	      var key = descriptor.key;
	      delete descriptor.key;
	      delete descriptor.decorators;
	      descriptor.enumerable = true;
	      descriptor.configurable = true;
	      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	      if (decorators) {
	        for (var f = 0; f < decorators.length; f++) {
	          var decorator = decorators[f];

	          if (typeof decorator === "function") {
	            descriptor = decorator(target, key, descriptor) || descriptor;
	          } else {
	            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	          }
	        }
	      }

	      if (descriptor.initializer) {
	        descriptor.value = descriptor.initializer.call(target);
	      }

	      Object.defineProperty(target, key, descriptor);
	    }

	    return target;
	  };

	  babelHelpers.objectWithoutProperties = function (obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  };

	  babelHelpers.interopRequireWildcard = function (obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  };

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	})

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = window.ReactWidgets;

/***/ }
/******/ ]);