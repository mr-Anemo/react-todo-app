export const ADD_TASK    = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';

export function addTask(task) {
	return Object.assign(
		{},
		{
			type: ADD_TASK,
			text: 'Введите задание',
			id: `task_${Math.random()}`
		},
		task
	);
};


export function deleteTask(id) {
	return {
		type: DELETE_TASK,
		id
	};
};


export function changeTask(task) {
	return Object.assign({}, { type: CHANGE_TASK }, task);
};