export const ADD_TASK    = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SAVE_TASK   = 'SAVE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';

export function addTask(text) {
	return {
		type: ADD_TASK,
		text,
		id: `task_${Math.random()}`
	};
};


export function deleteTask(id) {
	return {
		type: DELETE_TASK,
		id
	};
}


export function toggleTask(id) {
	return {
		type: TOGGLE_TASK,
		id
	};
}


export function saveTask(task) {
	return Object.assign({}, { type: SAVE_TASK }, task);
}