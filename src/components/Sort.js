import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class Sort extends PureComponent {
	static propTypes = {
		defaultType: PropTypes.oneOf(['asc', 'desc', 'none']),
		className: PropTypes.string,
		style: PropTypes.object,
		onChange: PropTypes.func
	};
	static defaultProps = {
		defaultType: "none",
		onChange: () => null
	};

	constructor(props) {
		super(props);
		this.state = {
			type: props.defaultType
		};
	}

	render() {
		return (
			<div
				style={this.props.style}
				className={this.props.className}>
				<a
					onClick={() => {
						this.setState({
							type: this.state.type === 'asc' ? 'none' : 'asc'
						}, () => {
							this.props.onChange(this.state.type);
						});
					}}
					href="javascript:void(0)"
					className={this.state.type === 'asc' ? 'active' : ''}>
					<img src={require('../assets/img/triangle-down.svg')}/>
				</a>
				<a
					onClick={() => {
						this.setState({
							type: this.state.type === "desc" ? 'none' : 'desc'
						}, () => {
							this.props.onChange(this.state.type);
						})
					}}
					className={this.state.type === 'desc' ? 'active' : ''}
					href="javascript:void(0)">
					<img src={require('../assets/img/triangle-down.svg')}/>
				</a>
			</div>
		);
	}
}