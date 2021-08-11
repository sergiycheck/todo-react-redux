import { 
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from "@reduxjs/toolkit";

import { 
	StatusData,
	getAllTodos,
	getTodo,
	updateTodo,
	addTodo,
	deleteTodo
 } from "../../api/apiRoutes";

 import { client } from "../../api/client";


 export const fetchAllTodos = createAsyncThunk(
	 'Get_All_Todos',
	 async()=>{
		 const response = await client.get(getAllTodos);
		 console.log('response from server ', response);
		 return response;
	 }
 )
 export const fetchAddTodo = createAsyncThunk(
	 'Add_Todo',
	 async(todo)=>{
		 console.log('fetchAddTodo ', todo);
		 const response = await client.post(addTodo,todo);
		 console.log('got response, added todo', response);
		 return response;
	 }
 )
export const fetchUpdateTodo = createAsyncThunk(
	'Update_Todo',
	async(todo)=>{
		console.log('fetchUpdateTodo ', todo);
		return await postTodoUpdate(todo);
	}
)

export const fetchToggleTodo = createAsyncThunk(
	'Toggle_Todo',
	async(todo)=>{
		let toggledTodo = {...todo, isFinished:!todo.isFinished}
		console.log('fetchToggleTodo todo, toggledTodo \n', todo,'\n', toggledTodo);
		return await postTodoUpdate(toggledTodo);
	}
)
const postTodoUpdate = async (todo)=>{
		let route = updateTodo.replace(`{id}`,todo.id);
		const response = await client.update(route,todo);
		console.log('got response, updated todo', response);
		return response;
}

export const fetchDeleteTodo = createAsyncThunk(
	'Delete_Todo',
	async({todoId})=>{
		console.log('fetchDeleteTodo ', todoId);
		let route = deleteTodo.replace(`{id}`, todoId);
		const response = await client.delete(route);
		console.log('got response, delete todo', response);
		return {todoId};
	}
)


 const todosAdapter = createEntityAdapter({});
 const initialState = todosAdapter.getInitialState({
	 status:StatusData.idle,
	 error:null
 })
 const todosSlice = createSlice({
	 name:'todos',
	 initialState:initialState,
	 reducers:{
		finishTodo(state, action){
			const {id} = action.payload;
			if(id){
				console.log('finishing todo with id ', id);
				const finished = state.entities[id].isFinished;
				state.entities[id].isFinished = !finished;
			}

		}
	 },
	 extraReducers:{
		[fetchAllTodos.pending]:(state, action)=>{
			state.status = StatusData.loading;
		},
		[fetchAllTodos.fulfilled]:(state, action)=>{
			state.status = StatusData.succeeded;
			console.log('got all todos', action.payload);
			todosAdapter.upsertMany(state,action.payload);
		},
		[fetchAddTodo.fulfilled]:(state,action)=>{
			console.log('got new todo', action.payload);
			todosAdapter.upsertOne(state, action.payload);
		},
		[fetchToggleTodo.fulfilled]:(state,action)=>{
			console.log('got updated todo \n', action.payload);

			const updatedTodo = action.payload;
			const {id} = updatedTodo;
			const oldTodo = state.entities[id];
			Object.assign(oldTodo, updatedTodo);

		},
		[fetchUpdateTodo.fulfilled]:(state,action)=>{
			console.log('got updated todo \n', action.payload);

			const updatedTodo = action.payload;
			const {id} = updatedTodo;
			const oldTodo = state.entities[id];
			Object.assign(oldTodo, updatedTodo);

		},
		[fetchDeleteTodo.fulfilled]:(state, action)=>{
			const {todoId} = action.payload
			console.log('got id of todo to delete', todoId);
			todosAdapter.removeOne(state, todoId);

		}
	 }
 })
 export default todosSlice.reducer;
 export const {
	finishTodo
 } = todosSlice.actions;
export const {
	selectAll: selectAllTodos,
	selectById:selectTodoById,
	selectIds:selectTodosIds
} = todosAdapter.getSelectors(state=>state.todos) 

