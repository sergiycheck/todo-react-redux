import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateTodo, selectTodoById } from "../../redux_components/todos/todosSlice";

import { useFormik } from "formik";
import { Formik, Form, useField } from "formik";

import { unwrapResult } from "@reduxjs/toolkit";
import { StatusData } from "../../api/apiRoutes";

import { MyTextInput } from "../../helpers/MyTextInput";
import * as Yup from "yup";
import classnames from "classnames";
import todoStyles from "./UpdateFormFormik.module.css";

export const UpdateFormFormik = (props) => {
  const { todoId } = props;
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const [addRequestStatus, setAddRequestStatus] = useState(StatusData.idle);

  const inputEditTodoClass = classnames(
    "form-control-plaintext",
    todoStyles.inputEdit
  );
	const canSave = addRequestStatus === StatusData.idle;

  return (
    <Formik
			enableReinitialize={true}
      initialValues={{ title: todo.title }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, "Must be more than 2 characters")
          .required("Required")
          .test(
            "check for spaces",'title can not be empty or not saved',
            (title) => {
							return title && title.trim().length > 1 
						}
          )
      })}
      onSubmit={async (values) => {
        try {
          setAddRequestStatus(StatusData.loading);
          const resUpdatedTodo = await dispatch(
            fetchUpdateTodo({
              title: values.title,
              id: todo.id,
              isFinished: todo.isFinished,
            })
          );

          unwrapResult(resUpdatedTodo);
        } catch (err) {
          console.error("Failed to update todo", err);
        } finally {
          setAddRequestStatus(StatusData.idle);
        }
      }}
    >
      <Form className="row g-3 p-3">
        <div className="col-auto">
          <MyTextInput
            className={inputEditTodoClass}
            name="title"
            type="text"
            placeholder="type your todo"
          ></MyTextInput>
        </div>
        <div className="col-auto">
          <button
            disabled={!canSave}
            type="submit"
            className="btn btn-primary mb-3"
          >
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};
