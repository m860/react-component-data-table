"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sort = function (_PureComponent) {
	_inherits(Sort, _PureComponent);

	function Sort(props) {
		_classCallCheck(this, Sort);

		var _this = _possibleConstructorReturn(this, (Sort.__proto__ || Object.getPrototypeOf(Sort)).call(this, props));

		_this.state = {
			type: props.defaultType
		};
		return _this;
	}

	_createClass(Sort, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{
					style: this.props.style,
					className: (0, _classnames2.default)('data-table-sort', this.props.className) },
				_react2.default.createElement(
					"a",
					{
						onClick: function onClick() {
							_this2.setState({
								type: _this2.state.type === 'asc' ? 'none' : 'asc'
							}, function () {
								_this2.props.onChange(_this2.state.type);
							});
						},
						href: "javascript:void(0)",
						className: this.state.type === 'asc' ? 'active' : '' },
					_react2.default.createElement("img", { src: require('../assets/img/triangle-down.svg') })
				),
				_react2.default.createElement(
					"a",
					{
						onClick: function onClick() {
							_this2.setState({
								type: _this2.state.type === "desc" ? 'none' : 'desc'
							}, function () {
								_this2.props.onChange(_this2.state.type);
							});
						},
						className: this.state.type === 'desc' ? 'active' : '',
						href: "javascript:void(0)" },
					_react2.default.createElement("img", { src: require('../assets/img/triangle-down.svg') })
				)
			);
		}
	}]);

	return Sort;
}(_react.PureComponent);

Sort.propTypes = {
	defaultType: _propTypes2.default.oneOf(['asc', 'desc', 'none']),
	className: _propTypes2.default.string,
	style: _propTypes2.default.object,
	onChange: _propTypes2.default.func
};
Sort.defaultProps = {
	defaultType: "none",
	onChange: function onChange() {
		return null;
	}
};
exports.default = Sort;