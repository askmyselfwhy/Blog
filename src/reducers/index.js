import { LOG_IN, LOG_OUT, SAVE_TO_STORAGE } from '../actions/action_types';

const defaultState = {
	user: {
		id: null,
		name: '',
		password: '',
		priviliges: 0
	}
};

const loadFromStorage = () => {
	let store = JSON.parse(sessionStorage.getItem('test_blog123'));
	let state = store !== null ? store : { ...defaultState };
	return state;
};

const initialState = loadFromStorage();

const saveToStorage = (state) => {
	let obj = JSON.stringify({
		...state
	});
	sessionStorage.setItem('test_blog123', obj);
};
const login = (payload) => {
	return {
		user: {
			id: payload.id,
			name: payload.name,
			password: payload.password,
			priviliges: payload.rights
		}
	};
};

function app(state = initialState, event) {
	switch (event.type) {
		case LOG_IN:
			return login(event.payload);
		case LOG_OUT:
			return defaultState;
		case SAVE_TO_STORAGE:
			saveToStorage(state);
		case 'CHANGE':
			return {
				...state,
				...event.payload
			};
		default:
			return state;
	}
}

export default app;
