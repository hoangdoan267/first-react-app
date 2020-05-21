import React, { Component } from 'react';

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: '',
		};
	}

	onChangeValue = (e) => {
		this.setState({
			newTodo: e.target.value,
		});
	};

	addToDo = () => {
		this.props.addToDo(this.state.newTodo);
	};

	render() {
		return (
			<div className='input-group'>
				<input
					type='text'
					id='fname'
					name='to do'
					onChange={this.onChangeValue}
				/>
				<button onClick={this.addToDo}>Add</button>
			</div>
		);
	}
}
