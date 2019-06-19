'use strict'

import React    from 'react';
import { Task } from './../Task/Task.jsx';
import {
	deleteTask, 
	changeTask
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

		this._processTasksHash();
	}

	
	componentWillReceiveProps() {
		this._processTasksHash();
	}


	_processTasksHash() {
		this.tasksHash = {};

		this.store.getState().forEach(task => {
			this.tasksHash[task.id] = task;
		});
	}


	/**
	 * Toggle completed task
	 * 
	 * @param {String} id - task id
	 */
	onChangeTaskCompletedStatus(id) {
		let task = Object.assign({}, this.tasksHash[id], { completed: !this.tasksHash[id].completed });

		this.store.dispatch(changeTask(task));
	}


	/**
	 * Save task changes
	 * 
	 * @param {String} id - task id
	 * @param {Object} changes - task object
	 */
	onSaveTaskChanges(id, changes) {
		let task = Object.assign({}, this.tasksHash[id], changes);

		this.store.dispatch(changeTask(task));
	}


	/**
	 * Delete task
	 * 
	 * @param {String} id - task id
	 */
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