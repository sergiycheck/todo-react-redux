export const StatusData = {
	loading:'loading',
	succeeded:'succeeded',
	failed:'failed',
	idle:'idle'
}


export const apiRoot = 'https://localhost';
const apiPort = 5021;
export const apiLocation = `${apiRoot}:${apiPort}`;
export const apiRootUrl = `${apiLocation}/api`;

export const todoItemsControllerName = 'TodoItems';
export const todoItemsControllerDefaultRoute = `${apiRootUrl}/${todoItemsControllerName}`;

export const getAllTodos = `${todoItemsControllerDefaultRoute}/getAll`;
export const getTodo = `${todoItemsControllerDefaultRoute}/get/{id}`;
export const updateTodo = `${todoItemsControllerDefaultRoute}/update/{id}`;
export const addTodo = `${todoItemsControllerDefaultRoute}/add`;
export const deleteTodo = `${todoItemsControllerDefaultRoute}/delete/{id}`;
