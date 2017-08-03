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
 数据Table

 @example
 */
var DataTable = function (_PureComponent) {
	_inherits(DataTable, _PureComponent);

	function DataTable() {
		_classCallCheck(this, DataTable);

		return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
	}

	_createClass(DataTable, [{
		key: "_renderDataSource",


		/**
   * @private
   *
   * render data source
   * */
		value: function _renderDataSource() {
			var _this2 = this;

			if (this.props.dataSource.length > 0) {
				return this.props.dataSource.map(function (rowData, rowDataIndex) {
					return _react2.default.createElement(
						"tr",
						{ key: rowDataIndex },
						_this2.props.columns.map(function (column, columnIndex) {
							return _react2.default.createElement(
								"td",
								{ key: columnIndex,
									className: column.className,
									style: column.style },
								column.render(rowData, rowDataIndex, column, columnIndex)
							);
						})
					);
				});
			}
			return this.props.renderDataEmpty(this.props.columns);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"table",
				{ className: this.props.className, style: this.props.style },
				_react2.default.createElement(
					"thead",
					null,
					_react2.default.createElement(
						"tr",
						null,
						this.props.columns.map(function (column, index) {
							return _react2.default.createElement(
								"th",
								{ key: index },
								column.name
							);
						})
					)
				),
				_react2.default.createElement(
					"tbody",
					null,
					this._renderDataSource()
				)
			);
		}
	}]);

	return DataTable;
}(_react.PureComponent);

DataTable.propTypes = {
	columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.string.isRequired,
		className: _propTypes2.default.any,
		style: _propTypes2.default.object,
		render: _propTypes2.default.func.isRequired
	})).isRequired,
	dataSource: _propTypes2.default.array,
	style: _propTypes2.default.object,
	className: _propTypes2.default.any,
	renderDataEmpty: _propTypes2.default.func
};
DataTable.defaultProps = {
	dataSource: [],
	className: 'pure-table pure-table-striped',
	style: {
		width: "100%"
	},
	renderDataEmpty: function renderDataEmpty(definedColumn) {
		return _react2.default.createElement(
			"tr",
			null,
			_react2.default.createElement(
				"td",
				{ colSpan: definedColumn.length, style: { textAlign: "center" } },
				"NO DATA"
			)
		);
	}
};
exports.default = DataTable;
