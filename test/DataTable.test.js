/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import DataTable from "../src/components/DataTable";
import {shallow, render} from "enzyme";

const dataSource = [{
	name: "name1",
	age: 1
}, {
	name: "name2",
	age: 2
}];

const columns = [{
	name: "Name",
	render: rowData=>rowData['name'],
	className:'name',
	style:{color:"red"}
}, {
	name: "Age",
	render: rowData=>rowData['age']
}];

describe("render `<DataTable/>` with data source have 2 records", ()=> {
	const wrapper = shallow(<DataTable columns={columns} dataSource={dataSource}/>);
	test(`have ${dataSource.length} <tr/>`, ()=> {
		expect(wrapper.find('tbody').find('tr').length).toBe(dataSource.length);
	});
	test(`\`Name\` column className=${columns[0].className}`,()=>{
		const firstTD=wrapper.find('tbody').find('tr').first().find('td').first();
		expect(firstTD.prop('className')).toBe(columns[0].className);
	});
	test(`\`Name\` column style.color=${columns[0].style.color}`,()=>{
		const firstTD=wrapper.find('tbody').find('tr').first().find('td').first();
		expect(firstTD.prop('style').color).toBe(columns[0].style.color);
	})
})