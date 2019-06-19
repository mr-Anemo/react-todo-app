import { ADD_TASK, DELETE_TASK, SAVE_TASK, TOGGLE_TASK } from './../actions/actions.js';


function addTask(state, action) {
	return {
		text: action.text,
		id: action.id,
		completed: false
	};
};


function deleteTask(state, action) {
	let taskIndex = state.findIndex(task => task.id === action.id);

	return [
		...state.slice(0, taskIndex),
		...state.slice(taskIndex + 1)
	]
}


function toggleTask(state, action) {
	if (action.id !== state.id)
		return state;

	return Object.assign({}, state, { completed: !state.completed });
}


function saveTask(state, action) {
	if (action.id !== state.id)
		return state;

	return Object.assign({}, state, action);
}


export default function reducer(state = [], action) {
	switch (action.type) {
		case ADD_TASK:
			return [...state, addTask(undefined, action)];
		
		case DELETE_TASK:
			return deleteTask(state, action);

		case SAVE_TASK:
			return state.map(task => saveTask(task, action));

		case TOGGLE_TASK: 
			return state.map(task => toggleTask(task, action));

		default:
			return state;
	}
};