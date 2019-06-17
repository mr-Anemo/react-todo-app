'use strict'

import React from 'react';
import { TasksList } from './components/TasksList/TasksList.jsx';
import produce from 'immer';

const _ = {
	get: require('lodash/get'),
	merge: require('lodash/merge')
};

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			tasks: []
		};

		this.onClickAddTask              = this.onClickAddTask.bind(this);
		this.onDeleteTask                = this.onDeleteTask.bind(this);
		this.onChangeTaskText            = this.onChangeTaskText.bind(this);
		this.onExitTaskEditMode          = this.onExitTaskEditMode.bind(this);
		this.onSaveTaskChanges           = this.onSaveTaskChanges.bind(this);
		this.onEnterTaskEditMode         = this.onEnterTaskEditMode.bind(this);
		this.onChangeTaskCompletedStatus = this.onChangeTaskCompletedStatus.bind(this);
	}


	onChangeTaskCompletedStatus(e, id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { completed: !task.completed });
				});
			})
		);
	}


	onEnterTaskEditMode(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { 
						editMode: true,
						nextText: task.text
					});
				});
			})
		);
	}


	onChangeTaskText(e, id) {
		let nextText = e.target.value;

		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { nextText });
				});
			})
		);
	}


	onSaveTaskChanges(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign(
						{},
						task, 
						{
							editMode: false,
							text: task.nextText,
						}
					);
				});
			})
		);
	}


	onExitTaskEditMode(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { editMode: false });
				});
			})
		);
	}


	onClickAddTask() {
		this.setState(
			produce(state => {
				state.tasks.push({
					nextText: 'Введите текст',
					text: 'Введите текст',
					id: `task_${Math.random()}`,
					editMode: true,
					completed: false
				});
			})
		);
	}


	onDeleteTask(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.filter(task => task.id !== id);
			})
		);
	}


	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<button 
								className="btn btn-primary btn-lg btn-block"
								onClick={this.onClickAddTask}
							>
								Добавить задачу
							</button>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<TasksList
								tasks={_.get(this, 'state.tasks', [])}
								onChangeTaskText={this.onChangeTaskText}
								onDeleteTask={this.onDeleteTask}
								onExitTaskEditMode={this.onExitTaskEditMode}
								onSaveTaskChanges={this.onSaveTaskChanges}
								onEnterTaskEditMode={this.onEnterTaskEditMode}
								onChangeTaskCompletedStatus={this.onChangeTaskCompletedStatus}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
