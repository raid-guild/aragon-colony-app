import { P as PropTypes } from './index-097535f1.js';
import { _ as _defineProperty } from './defineProperty-a0480c32.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isEmpty(value) {
  return value === undefined || value === null;
} // Require a prop to not be empty


function requireProp(props, propName, componentName) {
  return isEmpty(props[propName]) ? new Error("The prop `".concat(propName, "` is required for `").concat(componentName, "`.")) : null;
} // Create the `isRequired` version of a prop type


function createIsRequired(propTypeFn) {
  return function () {
    return requireProp.apply(void 0, arguments) || propTypeFn.apply(void 0, arguments);
  };
} // Accept any number in the 0 => 1 range


function _0to1(props, propName, componentName) {
  if (isEmpty(props[propName])) {
    return null;
  }

  if (typeof props[propName] === 'number' && props[propName] >= 0 && props[propName] <= 1) {
    return null;
  }

  return new Error("Invalid prop `".concat(propName, "` supplied to `").concat(componentName, "`. Please provide a number in the 0-1 range."));
}

_0to1.isRequired = createIsRequired(_0to1); // Accept DOM Element, in DOM environments

function _element(props, propName, componentName) {
  if (!props[propName]) {
    return null;
  }

  if (typeof Element !== 'undefined') {
    return props[propName] instanceof Element ? null : new Error("Invalid prop `".concat(propName, "` supplied to `").concat(componentName, "`. Please provide a DOM Element."));
  }

  return null;
}

_element.isRequired = createIsRequired(_element);

var ExtendedPropTypes = _objectSpread({}, PropTypes, {
  _component: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({
    render: PropTypes.func.isRequired
  })]),
  _spring: PropTypes.shape({
    mass: PropTypes.number,
    tension: PropTypes.number,
    friction: PropTypes.number,
    precision: PropTypes.number
  }),
  _null: PropTypes.oneOf([null]),
  _0to1: _0to1,
  _element: _element
});

export { ExtendedPropTypes as P };
//# sourceMappingURL=proptypes-c8a77d05.js.map
