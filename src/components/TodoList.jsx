import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllTodos,
  fetchAllTodos,
  selectTodosIds,
  selectTodoById,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchToggleTodo,
  finishTodo,
} from "../redux_components/todos/todosSlice";
import { StatusData } from "../api/apiRoutes";
import classnames from "classnames";
import { unwrapResult } from "@reduxjs/toolkit";
import todoStyles from "./TodoList.module.css";

import {UpdateFormFormik} from './updateFormComp/UpdateFormFormik'

export const TodoList = () => {
  const dispatch = useDispatch();
  const todoListStatus = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (todoListStatus === StatusData.idle) {
      console.log("fetching todos");
      dispatch(fetchAllTodos());
    }
  }, [todoListStatus, dispatch]);

  const todoIds = useSelector((state) => selectTodosIds(state));

  const todoElements = todoIds.map((todoId) => {
    return <Todo key={todoId} todoId={todoId}></Todo>;
  });
  let LoadingData = "";
  if (todoListStatus === StatusData.loading) {
    console.log("todoListStatus===StatusData.loading ");
    LoadingData = <Loader></Loader>;
  } else if (todoListStatus === StatusData.succeeded) {
    console.log(" todoListStatus === StatusData.succeeded ");
    LoadingData = "";
  }

  return (
    <>
      <div className="justify-content-center col-sm-7">
        <div>
          <h1>Todos {todoIds.length}</h1>
        </div>
        {LoadingData}
        {todoElements}
      </div>
    </>
  );
};

/**
 *
 * @param { Object } props
 * @param { string } props.todoId
 */
export const Todo = (props) => {
  const dispatch = useDispatch();
  const { todoId } = props;
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const [addRequestStatus, setAddRequestStatus] = useState(StatusData.idle);

  const loaderCont =
    addRequestStatus == StatusData.loading ? <Loader sidePx={40}></Loader> : "";

  const todoClassname = classnames(
    "p-3 m-3 row justify-content-between",
    todoStyles.todo,
    {
      [todoStyles["todo-done"]]: todo.isFinished,
    }
  );
  const todoContainer = classnames("col-auto", todoStyles.todoContainer);
  const deleteTodo = () => {
    if (todo.id) {
      dispatch(fetchDeleteTodo({ todoId: todo.id }));
    }
  };
  const updateTodo = async () => {
    if (todo.id) {
      setAddRequestStatus(StatusData.loading);
      const resultOfUpdatedTodo = await dispatch(fetchToggleTodo(todo));
      unwrapResult(resultOfUpdatedTodo);
      setAddRequestStatus(StatusData.idle);
      // dispatch(finishTodo(todo))
      // dispatch(fetchUpdateTodo(todo));
    }
  };

  return (
    <div className={todoContainer}>
      <div className={todoClassname}>
        <div className="col-auto">
          {/* <p>{todo.title}</p> */}

          <UpdateFormFormik todoId={todo.id}></UpdateFormFormik>
          {/* <UpdateForm todoId={todo.id}></UpdateForm> */}
        </div>

        <div className=" col-auto d-flex">
          <div>{loaderCont}</div>
          <div>
            <button onClick={updateTodo} className="mx-2 btn btn-success">
              ✓
            </button>
            <button onClick={deleteTodo} className="mx-2 btn btn-danger">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export const Loader = (props) => {
  const { sidePx } = props;
  let loaderStyles;
  if (sidePx) {
    loaderStyles = {
      width: `${sidePx}px`,
      height: `${sidePx}px`,
    };
  }
  const loaderClass = classnames(todoStyles["loader-img"], "img img-fluid");
  return (
    <div style={loaderStyles} className="loader">
      <div className="d-flex align-items-center">
        <img
          className={loaderClass}
          src="./assets/img/spinner.gif"
          alt="loader image"
        />
      </div>
    </div>
  );
};




export const UpdateForm = (props) => {
  const { todoId } = props;
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const [inputVisited, setVisited] = useState(false);

  const focusTodoHandler = (event) => {
    console.log("todo focused");
  };
  const blurHandler = (event) => {
    console.log("todo blured");
    setVisited(true);
  };

  const [title, setTitle] = useState(todo.title);
  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };
  const [addRequestStatus, setAddRequestStatus] = useState(StatusData.idle);

  const canSave = Boolean(title) && addRequestStatus === StatusData.idle;

  const savePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus(StatusData.loading);
        const resUpdatedTodo = await dispatch(
          fetchUpdateTodo({
            title: title,
            id: todo.id,
            isFinished: todo.isFinished,
          })
        );

        unwrapResult(resUpdatedTodo);
        setAddRequestStatus(StatusData.idle);
        setVisited(false);
      } catch (error) {
        console.error("error occurred", error);
      }
    }
  };
  const inputEditTodoClass = classnames(
    "form-control-plaintext",
    todoStyles.inputEdit
  );
  return (
    <>
      <div
        onFocus={focusTodoHandler}
        onBlur={blurHandler}
        className="row g-3 p-3"
      >
        <div className="col-auto">
          <input
            value={title}
            onChange={onTitleChanged}
            className={inputEditTodoClass}
          ></input>
          {inputVisited && <div>changes not saved</div>}
        </div>

        <div className="col-auto">
          <button
            className="btn btn-primary"
            disabled={!canSave}
            onClick={savePostClicked}
            type="button"
          >
            Save todo
          </button>
        </div>
      </div>
    </>
  );
};


