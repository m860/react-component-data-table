import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import DataTable from './components/DataTable'
import './sass/DataTable.sass'

class SimpleDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class EmptyDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class RadioDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="radio" value={rowData['name']} name="radio-data-table"/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class CheckboxDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="checkbox" value={rowData['name']}/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class Example extends Component {
	render() {
		return (
			<div>
				<h5>Simple DataTable</h5>
				<SimpleDataTableDemo/>
				<h5>Empty DataTable</h5>
				<EmptyDataTableDemo/>
				<h5>Radio DataTable</h5>
				<RadioDataTableDemo/>
				<h5>Checkbox DataTable</h5>
				<CheckboxDataTableDemo/>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));