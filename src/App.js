import React, { Fragment } from 'react';
import './App.css';
import List from './components/List';
import Input from './components/Input';

const toDoList = [
	{ id: 1, name: 'Đi học', isDone: false },
	{ id: 2, name: 'Đi làm', isDone: false },
	{ id: 3, name: 'Ăn cơm', isDone: false },
	{ id: 4, name: 'Rửa bát', isDone: false },
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDoList: toDoList,
			newTodo: '',
		};
	}

	componentDidMount() {
		console.log('did mount');
	}

	static getDerivedStateFromProps(props, state) {
		return state;
	}

	getSnapshotBeforeUpdate(prevProps, prevStates) {
		console.log(prevProps);
		console.log(prevStates);

		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('did update');
		console.log(prevState);
		console.log(this.state);
	}

	removeItem = (id) => {
		const list = [...this.state.toDoList];
		const index = list.findIndex((el) => el.id === id);
		if (index !== -1) {
			list[index].isDone = !list[index].isDone;
			this.setState({
				toDoList: list,
			});
		}
	};

	addTodo = (toDo) => {
		const newTodo = {
			id: this.state.toDoList.length + 1,
			isDone: false,
			name: toDo,
		};

		const newList = [...this.state.toDoList, newTodo];

		this.setState({
			toDoList: newList,
		});
	};

	render() {
		console.log('render app');
		return (
			<div className='app-container'>
				<Input addToDo={this.addTodo} />
				<div className='list-container'>
					<div>
						<List
							name='To Do'
							list={this.state.toDoList.filter((el) => el.isDone === false)}
							removeItem={this.removeItem}
						/>
						<div>
							{this.state.toDoList.filter((el) => el.isDone === true).length}/
							{this.state.toDoList.length}
						</div>
					</div>
					<div>
						<List
							name='Done'
							list={this.state.toDoList.filter((el) => el.isDone === true)}
							removeItem={this.removeItem}
						/>
					</div>
				</div>
			</div>
		);
	}
}
