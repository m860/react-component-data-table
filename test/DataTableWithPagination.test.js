/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import DataTableWithPagination from "../src/components/DataTableWithPagination";
import {shallow, render,mount} from "enzyme";

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
	className: 'name',
	style: {color: "red"}
}, {
	name: "Age",
	render: rowData=>rowData['age']
}];

describe("render `<DataTableWithPagination/>` with data source have 2 records", ()=> {
	const wrapper = mount(<DataTableWithPagination
		dataTableClassName="pure-table pure-table-striped"
		total={dataSource.length}
		columns={columns}
		renderNextPage={()=>('Next')}
		renderPrevPage={()=>('Prev')}
		dataSource={dataSource}/>);
	const table= wrapper.find('table');
	test(`DataTable.className='pure-table pure-table-striped'`, ()=> {
		expect(table.prop('className')).toBe('pure-table pure-table-striped');
	});
	test(`next action text is 'Next'`,()=>{
		const nextLi=wrapper.find('li').last();
		const text=nextLi.find('a').text();
		expect(text).toBe('Next');
	});
	test(`prev action test is 'Prev'`,()=>{
		const firstLi=wrapper.find('li').first();
		const text=firstLi.find('a').text();
		expect(text).toBe('Prev');
	})
})