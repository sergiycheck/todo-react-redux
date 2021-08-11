import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../redux_components/todos/todosSlice';

export default configureStore({
	reducer:{
		todos:todosReducer
	}
})