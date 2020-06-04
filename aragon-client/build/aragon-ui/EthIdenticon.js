'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-0711941d.js');
require('./unsupportedIterableToArray-68db1d3b.js');
var React = require('react');
var React__default = _interopDefault(React);
var _commonjsHelpers = require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
var defineProperty = require('./defineProperty-0921a47c.js');
require('./toConsumableArray-d8a4a2c3.js');
var _styled = require('styled-components');
var _styled__default = _interopDefault(_styled);
var getPrototypeOf = require('./getPrototypeOf-2a661a20.js');
require('./color.js');
var components = require('./components.js');
require('./contains-component.js');
require('./css.js');
require('./dayjs.min-e07657bf.js');
require('./date.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./math-f4029164.js');
require('./characters.js');
require('./format.js');
require('./keycodes.js');
require('./url.js');
var web3 = require('./web3.js');
var _extends = require('./extends-40571110.js');
var taggedTemplateLiteral = require('./taggedTemplateLiteral-227ed122.js');
require('./_react_commonjs-external-bf8fc71c.js');

var main = _commonjsHelpers.createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React__default);



var _propTypes2 = _interopRequireDefault(index.PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Identicon = function (_Component) {
  _inherits(Identicon, _Component);

  function Identicon(props) {
    _classCallCheck(this, Identicon);

    var _this = _possibleConstructorReturn(this, (Identicon.__proto__ || Object.getPrototypeOf(Identicon)).call(this, props));

    _this.generateIdenticon = _this.generateIdenticon.bind(_this);
    return _this;
  }

  _createClass(Identicon, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.generateIdenticon(_extends({}, this.props));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (!this.isEquivalent(this.props, nextProps)) this.generateIdenticon(_extends({}, nextProps));
    }
  }, {
    key: 'isEquivalent',
    value: function isEquivalent(prevProps, nextProps) {
      var aProps = Object.getOwnPropertyNames(prevProps);
      var bProps = Object.getOwnPropertyNames(nextProps);

      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (prevProps[propName] !== nextProps[propName]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: 'generateIdenticon',
    value: function generateIdenticon(options) {
      // NOTE --  Majority of this code is referenced from: https://github.com/alexvandesande/blockies
      //          Mostly to ensure congruence to Ethereum Mist's Identicons

      // The random number is a js implementation of the Xorshift PRNG
      var randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

      function seedrand(seed) {
        for (var i = 0; i < randseed.length; i++) {
          randseed[i] = 0;
        }
        for (var _i = 0; _i < seed.length; _i++) {
          randseed[_i % 4] = (randseed[_i % 4] << 5) - randseed[_i % 4] + seed.charCodeAt(_i);
        }
      }

      function rand() {
        // based on Java's String.hashCode(), expanded to 4 32bit values
        var t = randseed[0] ^ randseed[0] << 11;

        randseed[0] = randseed[1];
        randseed[1] = randseed[2];
        randseed[2] = randseed[3];
        randseed[3] = randseed[3] ^ randseed[3] >> 19 ^ t ^ t >> 8;

        return (randseed[3] >>> 0) / (1 << 31 >>> 0);
      }

      function createColor() {
        // saturation is the whole color spectrum
        var h = Math.floor(rand() * 360);
        // saturation goes from 40 to 100, it avoids greyish colors
        var s = rand() * 60 + 40 + '%';
        // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
        var l = (rand() + rand() + rand() + rand()) * 25 + '%';

        var color = 'hsl(' + h + ',' + s + ',' + l + ')';
        return color;
      }

      function createImageData(size) {
        var width = size; // Only support square icons for now
        var height = size;

        var dataWidth = Math.ceil(width / 2);
        var mirrorWidth = width - dataWidth;

        var data = [];
        for (var y = 0; y < height; y++) {
          var row = [];
          for (var x = 0; x < dataWidth; x++) {
            // this makes foreground and background color to have a 43% (1/2.3) probability
            // spot color has 13% chance
            row[x] = Math.floor(rand() * 2.3);
          }
          var r = row.slice(0, mirrorWidth);
          r.reverse();
          row = row.concat(r);

          for (var i = 0; i < row.length; i++) {
            data.push(row[i]);
          }
        }

        return data;
      }

      function setCanvas(identicon, imageData, color, scale, bgcolor, spotcolor) {
        var width = Math.sqrt(imageData.length);
        var size = width * scale;

        identicon.width = size;
        identicon.style.width = size + 'px';

        identicon.height = size;
        identicon.style.height = size + 'px';

        var cc = identicon.getContext('2d');
        cc.fillStyle = bgcolor;
        cc.fillRect(0, 0, identicon.width, identicon.height);
        cc.fillStyle = color;

        for (var i = 0; i < imageData.length; i++) {
          // if data is 2, choose spot color, if 1 choose foreground
          cc.fillStyle = imageData[i] === 1 ? color : spotcolor;

          // if data is 0, leave the background
          if (imageData[i]) {
            var row = Math.floor(i / width);
            var col = i % width;

            cc.fillRect(col * scale, row * scale, scale, scale);
          }
        }
      }

      var opts = options || {};
      var size = opts.size || 8;
      var scale = opts.scale || 4;
      var seed = opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);

      seedrand(seed);

      var color = opts.color || createColor();
      var bgcolor = opts.bgColor || createColor();
      var spotcolor = opts.spotColor || createColor();
      var imageData = createImageData(size);
      var canvas = setCanvas(this.identicon, imageData, color, scale, bgcolor, spotcolor);

      return canvas;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('canvas', {
        ref: function ref(identicon) {
          _this2.identicon = identicon;
        },
        className: this.props.className
      });
    }
  }]);

  return Identicon;
}(React__default.Component);

exports.default = Identicon;


Identicon.defaultProps = {
  className: 'identicon'
};

Identicon.propTypes = {
  seed: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.number,
  scale: _propTypes2.default.number,
  color: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  spotColor: _propTypes2.default.string
};
});

var Blockies = _commonjsHelpers.unwrapExports(main);

function _templateObject3() {
  var data = taggedTemplateLiteral._taggedTemplateLiteral(["\n  /* display:flex to remove the display:inline on the child without using a\n  * selector (Blockies doesn\u2019t allow the style prop to be passed). */\n  display: flex;\n  width: ", "px;\n  height: ", "px;\n  background: #fff;\n\n  /* add high-res screens support to Blockies */\n  transform: scale(", ", ", ");\n  transform-origin: 0 0;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral._taggedTemplateLiteral(["\n  opacity: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral._taggedTemplateLiteral(["\n  display: inline-flex;\n  vertical-align: middle;\n  overflow: hidden;\n  width: ", "px;\n  height: ", "px;\n  border-radius: ", "px;\n\n  // Fix an issue where the border-radius wasn\u2019t visible on Blink browsers.\n  // See https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b\n  mask-image: linear-gradient(red, red);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { return function () { var Super = getPrototypeOf._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return getPrototypeOf._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var PX_RATIO = typeof devicePixelRatio === 'undefined' ? 2 : devicePixelRatio;
var BLOCKIES_SQUARES = 8; // commonly used to represent Ethereum addresses

var BASE_SCALE = 3;

var EthIdenticon = /*#__PURE__*/function (_React$Component) {
  getPrototypeOf._inherits(EthIdenticon, _React$Component);

  var _super = _createSuper(EthIdenticon);

  function EthIdenticon() {
    getPrototypeOf._classCallCheck(this, EthIdenticon);

    return _super.apply(this, arguments);
  }

  getPrototypeOf._createClass(EthIdenticon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          address = _this$props.address,
          scale = _this$props.scale,
          radius = _this$props.radius,
          soften = _this$props.soften;
      var blockiesScale = scale * BASE_SCALE;
      return web3.isAddress(address) ? /*#__PURE__*/React__default.createElement(Main, _extends._extends({
        size: BLOCKIES_SQUARES * blockiesScale,
        radius: radius
      }, components.stylingProps(this)), /*#__PURE__*/React__default.createElement(BlockiesScaling, {
        size: BLOCKIES_SQUARES * blockiesScale * PX_RATIO
      }, /*#__PURE__*/React__default.createElement(BlockiesOpacity, {
        soften: soften
      }, /*#__PURE__*/React__default.createElement(Blockies, {
        seed: address.toLowerCase(),
        size: BLOCKIES_SQUARES,
        scale: blockiesScale * PX_RATIO
      })))) : null;
    }
  }]);

  return EthIdenticon;
}(React__default.Component);
/*
 * `vertical-align` prevents the inline parent to have an incorrect height.
 *
 * See
 * - https://bugzilla.mozilla.org/show_bug.cgi?id=491549#c9
 * - https://bugzilla.mozilla.org/show_bug.cgi?id=737757#c1
 */


defineProperty._defineProperty(EthIdenticon, "propTypes", {
  address: index.PropTypes.string.isRequired,
  scale: index.PropTypes.number,
  radius: index.PropTypes.number,
  soften: index.PropTypes.number
});

defineProperty._defineProperty(EthIdenticon, "defaultProps", {
  scale: 1,
  radius: 0,
  soften: 0.3
});

var Main = _styled__default.div(_templateObject(), function (p) {
  return p.size;
}, function (p) {
  return p.size;
}, function (p) {
  return p.radius;
});
var BlockiesOpacity = _styled__default.div(_templateObject2(), function (p) {
  return 1 - p.soften;
});
var BlockiesScaling = _styled__default.div(_templateObject3(), function (p) {
  return p.size;
}, function (p) {
  return p.size;
}, 1 / PX_RATIO, 1 / PX_RATIO);

exports.default = EthIdenticon;
//# sourceMappingURL=EthIdenticon.js.map
