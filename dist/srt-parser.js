(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["srtParser"] = factory();
	else
		root["srtParser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function parseSrt(srt) {\n  var subtitles = [];\n  var textSubtitles = srt.split('\\r\\n\\r\\n'); // 每条字幕的信息，包含了序号，时间，字幕内容\n\n  for (var i = 0; i < textSubtitles.length; i++) {\n    var textSubtitle = textSubtitles[i].split('\\n');\n\n    if (textSubtitle.length >= 2) {\n      var sn = textSubtitle[0];\n      var startTime = toSecond(textSubtitle[1].split(' --> ')[0].trim());\n      var endTime = toSecond(textSubtitle[1].split(' --> ')[1].trim());\n      var contentEN = '';\n      var contentCN = '';\n\n      for (var j = 2; j < textSubtitle.length; j++) {\n        if (/[\\u4e00-\\u9fa5]/g.test(textSubtitle[j])) {\n          contentCN += textSubtitle[j] + '\\n';\n        } else {\n          contentEN += textSubtitle[j] + '\\n';\n        }\n      }\n\n      var subtitle = {\n        sn: sn.trim(),\n        startTime: startTime,\n        endTime: endTime,\n        contentEN: contentEN.trim(),\n        contentCN: contentCN.trim()\n      };\n      subtitles.push(subtitle);\n    }\n  }\n\n  var _subtitles$endTime = subtitles[subtitles.length - 1].endTime,\n      e = _subtitles$endTime === void 0 ? 0 : _subtitles$endTime;\n  var minutes = parseInt(e / 60);\n  var seconds = parseInt(e % 60);\n  return {\n    subtitles: subtitles,\n    minutes: minutes,\n    seconds: seconds\n  };\n};\n/**\r\n * 把字符串格式的字幕时间转换为浮点数\r\n * @param  string t 字符串格式的时间\r\n * @return 浮点数格式的时间\r\n */\n\n\nfunction toSecond(t) {\n  var s = 0.0;\n\n  if (t) {\n    return t.split(':').reduce(function (s, cur) {\n      s += s * 60 + parseFloat(cur.replace(',', '.'));\n      return s;\n    }, 0.0);\n  }\n\n  return s;\n}\n\n//# sourceURL=webpack://srtParser/./src/index.js?");

/***/ })

/******/ });
});