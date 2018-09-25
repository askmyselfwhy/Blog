import * as action_type from './action_types';

export const logout = () => {
	return {
		type: action_type.LOG_OUT
	};
};
export const login = (obj) => {
	return {
		type: action_type.LOG_IN,
		payload: {
			...obj
		}
	};
};
export const saveToStorage = () => {
	return {
		type: action_type.SAVE_TO_STORAGE
	};
};
