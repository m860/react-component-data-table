"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Pagination - 页码
 *
 * @example <caption>从0开始分页</caption>
 *
 * <Pagination
 *    onPageChange={(pageInfo)=>{
 *						console.log('page change',pageInfo)
 *					}}
 *      total={23}/>
 *
 * @example <caption>从1开始分页</caption>
 * <Pagination
 *    startPageNumber={1}
 *    pageIndex={1}
 *    onPageChange={(pageInfo)=>{
 *		console.log('page change',pageInfo)
 *	}}
 *    total={100}/>
 *
 * */
var Pagination = function (_PureComponent) {
	_inherits(Pagination, _PureComponent);

	/**
  * @property {?Number} startPageNumber [ 0 ] - 分页开始的起始页`0`或者`1`
  * @property {?Number} pageIndex [ 0 ] - 当前页
  * @property {?Number} pageSize [ 10 ] - 每页记录数
  * @property {?Function} onPageChange [ ()=>null ] - 分页事件监听
  * @property {Number} total - 总记录数
  * @property {?Object} style - 样式
  * @property {String} className [pagination] - css class样式,样式定义在`css/Pagination.css`
  * @property {?Number} displayPageCount [5] - 最多可以显示多少页面
  * @property {?Function} renderNextPage [()=>(<img style={{width:20,height:20,transform:'rotate(180deg)'}} src={require('../assets/img/angle-left.svg')}/>)] - `>`按钮样式
  * @property {?Function} renderPrevPage [()=>(<img style={{width:20,height:20}} src={require('../assets/img/angle-left.svg')}/>)] - `<`按钮样式
  * */
	function Pagination(props) {
		_classCallCheck(this, Pagination);

		var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

		_this.state = {
			pageIndex: props.pageIndex,
			pageSize: props.pageSize,
			startPageNumber: props.startPageNumber
		};
		return _this;
	}

	/**
  * 总页数
  * @readonly
  * */


	_createClass(Pagination, [{
		key: "refresh",


		/**
   * 刷新当前页数据
   * @return {void}
   * */
		value: function refresh() {
			this.props.onPageChange(Object.assign({}, this.state));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var pages = Array.apply(null, { length: this.totalPage }).map(Number.call, function (value) {
				return value + _this2.state.startPageNumber;
			});
			var lastPageIndex = pages[pages.length - 1];
			var disabledPrevButton = this.state.pageIndex === this.state.startPageNumber;
			var disabledNextButton = this.state.pageIndex === lastPageIndex;

			var dis = Math.floor(this.props.displayPageCount / 2);
			var begin = this.state.pageIndex - dis;
			var end = this.state.pageIndex + dis;
			if (begin < this.state.startPageNumber) {
				begin = this.state.startPageNumber;
			}
			if (end > lastPageIndex) {
				end = lastPageIndex;
			}
			var realDis = end - begin + 1;
			if (realDis !== this.props.displayPageCount) {
				if (begin === this.state.startPageNumber) {
					//append page
					while (end !== lastPageIndex && end - begin + 1 !== this.props.displayPageCount) {
						end++;
					}
				}
				if (end === lastPageIndex) {
					//prepend page
					while (begin !== this.state.startPageNumber && end - begin + 1 !== this.props.displayPageCount) {
						begin--;
					}
				}
			}
			var startIndex = pages.indexOf(begin);
			var stopIndex = pages.indexOf(end) + 1;
			var displayPages = stopIndex >= pages.length ? pages.slice(startIndex) : pages.slice(startIndex, stopIndex);
			var hasLeft = begin > this.state.startPageNumber;
			var hasRight = end < lastPageIndex;
			return _react2.default.createElement(
				"ul",
				{ className: this.props.className, style: this.props.style },
				_react2.default.createElement(
					"li",
					{ className: disabledPrevButton ? "disabled" : '' },
					_react2.default.createElement(
						"a",
						{ onClick: function onClick() {
								var prevIndex = _this2.state.pageIndex - 1;
								var state = Object.assign({}, _this2.state, {
									pageIndex: prevIndex
								});
								_this2.setState(state, function () {
									_this2.props.onPageChange(Object.assign({}, _this2.state));
								});
							}, href: "javascript:void(0)" },
						this.props.renderPrevPage()
					)
				),
				hasLeft && _react2.default.createElement(
					"li",
					null,
					"..."
				),
				displayPages.map(function (num, i) {
					return _react2.default.createElement(
						"li",
						{
							className: _this2.state.pageIndex === num ? "cur" : '',
							key: num },
						_react2.default.createElement(
							"a",
							{ onClick: function onClick() {
									var state = Object.assign({}, _this2.state, {
										pageIndex: num
									});
									_this2.setState(state, function () {
										_this2.props.onPageChange(Object.assign({}, _this2.state));
									});
								}, href: "javascript:void(0)" },
							_this2.startPageNumber === 0 ? num + 1 : num
						)
					);
				}),
				hasRight && _react2.default.createElement(
					"li",
					null,
					"..."
				),
				_react2.default.createElement(
					"li",
					{ className: disabledNextButton ? "disabled" : "" },
					_react2.default.createElement(
						"a",
						{ onClick: function onClick() {
								var nextIndex = _this2.state.pageIndex + 1;
								var state = Object.assign({}, _this2.state, {
									pageIndex: nextIndex
								});
								_this2.setState(state, function () {
									_this2.props.onPageChange(Object.assign({}, _this2.state));
								});
							}, href: "javascript:void(0)" },
						this.props.renderNextPage()
					)
				)
			);
		}
	}, {
		key: "totalPage",
		get: function get() {
			if (this.props.total <= 0) {
				return 0;
			}
			return Math.ceil(this.props.total / this.props.pageSize);
		}

		/**
   * 当前页码
   * @readonly
   * */

	}, {
		key: "pageIndex",
		get: function get() {
			return this.state.pageIndex;
		}

		/**
   * 每页记录数
   * @readonly
   * */

	}, {
		key: "pageSize",
		get: function get() {
			return this.state.pageSize;
		}

		/**
   * 起始分页页码
   * @readonly
   * */

	}, {
		key: "startPageNumber",
		get: function get() {
			return this.state.startPageNumber;
		}
	}]);

	return Pagination;
}(_react.PureComponent);

Pagination.propTypes = {
	startPageNumber: _propTypes2.default.number,
	pageIndex: _propTypes2.default.number,
	pageSize: _propTypes2.default.number,
	onPageChange: _propTypes2.default.func,
	total: _propTypes2.default.number.isRequired,
	style: _propTypes2.default.object,
	className: _propTypes2.default.any,
	displayPageCount: _propTypes2.default.number,
	renderNextPage: _propTypes2.default.func,
	renderPrevPage: _propTypes2.default.func
};
Pagination.defaultProps = {
	startPageNumber: 0,
	pageIndex: 0,
	pageSize: 10,
	onPageChange: function onPageChange() {
		return null;
	},
	displayPageCount: 5,
	renderNextPage: function renderNextPage() {
		return _react2.default.createElement("img", { style: { width: 20, height: 20, transform: 'rotate(180deg)' },
			src: require('../assets/img/angle-left.svg') });
	},
	renderPrevPage: function renderPrevPage() {
		return _react2.default.createElement("img", { style: { width: 20, height: 20 }, src: require('../assets/img/angle-left.svg') });
	}
};
exports.default = Pagination;