import React from 'react';
import './App.css';
import List from './components/List';

const toDoList = [
	{ name: 'Đi học' },
	{ name: 'Đi làm' },
	{ name: 'Ăn cơm' },
	{ name: 'Rửa bát' },
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDoList: toDoList,
		};
	}

	render() {
		return (
			<div>
				<List list={this.state.toDoList} />
			</div>
		);
	}
}
