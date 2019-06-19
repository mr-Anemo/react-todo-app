'use strict'

import React    from 'react';
import { Task } from './../Task/Task.jsx';
import {
	deleteTask, 
	toggleTask,
	saveTask
} from './../../redux/actions/actions.js';

const _ = {
	get: require('lodash/get')
};

class TasksList extends React.Component {

	constructor(props) {
		super(props);

		this.store = this.props.store;

		this.onDeleteTask                = this.onDeleteTask.bind(this);
		this.onSaveTaskChanges           = this.onSaveTaskChanges.bind(this);
		this.onChangeTaskCompletedStatus = this.onChangeTaskCompletedStatus.bind(this);
	}


	onChangeTaskCompletedStatus(id) {
		this.store.dispatch(toggleTask(id));
	}


	onSaveTaskChanges(id, changes) {
		let tasks = this.store.getState(),
			task = Object.assign({}, tasks[tasks.findIndex(task => task.id === id)], changes);

		this.store.dispatch(saveTask(id, task));
	}


	onDeleteTask(id) {
		this.store.dispatch(deleteTask(id));
	}


	renderTasks() {
		const tasks = this.store.getState();

		return tasks.map(task => {
			return (
				<Task
					key={task.id}
					id={task.id}
					text={task.text}
					completed={task.completed}
					onDelete={this.onDeleteTask}
					onSaveChanges={this.onSaveTaskChanges}
					onChangeCompletedStatus={this.onChangeTaskCompletedStatus}
				/>
			);
		}).reverse();
	}


	render() {
		return (
			<div className="tasks-list">
				{this.renderTasks()}
			</div>
		);
	}

}

export { TasksList }; 