"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DataTable = require("./DataTable");

var _DataTable2 = _interopRequireDefault(_DataTable);

var _Pagination = require("./Pagination");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 带分页的DataTable,由DataTable和Pagination组合的复合组件
 * */
var DataTableWithPagination = function (_PureComponent) {
	_inherits(DataTableWithPagination, _PureComponent);

	function DataTableWithPagination() {
		_classCallCheck(this, DataTableWithPagination);

		return _possibleConstructorReturn(this, (DataTableWithPagination.__proto__ || Object.getPrototypeOf(DataTableWithPagination)).apply(this, arguments));
	}

	_createClass(DataTableWithPagination, [{
		key: "getGlobalRowIndex",


		/**
   * 获取DataTable全局数据索引
   * @param {Number} localRowIndex - 当前分页中的数据索引
   * @return {Number} - 全局数据索引
   * */

		/**
   * {@link DataTable.propTypes ...DataTable.propTypes}
   * {@link Pagination.propTypes ...Pagination.propTypes}
   * @property {?Object} style
   * @property {?String} className
   * @property {?Object} dataTableStyle - DataTable样式
   * @property {?String} dataTableClassName - DataTable css class
   * @property {?Object} paginationStyle - Pagination 样式
   * @property {?String} paginationClassName - Pagination css class
   * @property {?Boolean} showIndex [ true ] - 是否显示索引列
   * */
		value: function getGlobalRowIndex(localRowIndex) {
			var pagination = this.refs['pagination'];
			if (pagination) {
				var index = this.refs['pagination'].pageIndex * this.refs['pagination'].pageSize;
				if (this.refs['pagination'].startPageNumber === 0) {
					return index + localRowIndex + 1;
				}
				return index + localRowIndex;
			}
			return localRowIndex + 1;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var dataTablePropKeys = Object.keys(_DataTable2.default.propTypes).concat(["dataTableStyle", "dataTableClassName"]);
			var paginationPropKeys = Object.keys(_Pagination2.default.propTypes).concat(["paginationStyle", "paginationClassName"]);
			var dataTableOption = {};
			dataTablePropKeys.filter(function (f) {
				return f !== "style" || f !== "className";
			}).forEach(function (k) {
				dataTableOption[k] = _this2.props[k];
			});
			var paginationOption = {};
			paginationPropKeys.filter(function (f) {
				return f !== "style" || f !== "className";
			}).map(function (k) {
				paginationOption[k] = _this2.props[k];
			});
			if (this.props.showIndex) {
				dataTableOption.columns = [{
					name: "#",
					style: { width: "20px" },
					render: function render(rowData, rowIndex) {
						return _this2.getGlobalRowIndex(rowIndex);
					}
				}].concat(_toConsumableArray(dataTableOption.columns));
			}
			return _react2.default.createElement(
				"div",
				{ style: this.props.style, className: this.props.className },
				_react2.default.createElement(_DataTable2.default, dataTableOption),
				_react2.default.createElement(_Pagination2.default, _extends({}, paginationOption, { ref: "pagination" }))
			);
		}
	}]);

	return DataTableWithPagination;
}(_react.PureComponent);

DataTableWithPagination.propTypes = {
	style: _propTypes2.default.object,
	className: _propTypes2.default.any,
	columns: _DataTable2.default.propTypes.columns,
	dataSource: _DataTable2.default.propTypes.dataSource,
	renderDataEmpty: _DataTable2.default.propTypes.renderDataEmpty,
	dataTableStyle: _DataTable2.default.propTypes.style,
	dataTableClassName: _DataTable2.default.propTypes.className,
	startPageNumber: _Pagination2.default.propTypes.startPageNumber,
	pageIndex: _Pagination2.default.propTypes.pageIndex,
	pageSize: _Pagination2.default.propTypes.pageSize,
	onPageChange: _Pagination2.default.propTypes.onPageChange,
	total: _Pagination2.default.propTypes.total,
	displayPageCount: _Pagination2.default.propTypes.displayPageCount,
	paginationStyle: _Pagination2.default.propTypes.style,
	paginationClassName: _Pagination2.default.propTypes.className,
	showIndex: _propTypes2.default.bool
};
DataTableWithPagination.defaultProps = {
	showIndex: true
};
exports.default = DataTableWithPagination;