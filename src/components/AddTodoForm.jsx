import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAddTodo } from "../redux_components/todos/todosSlice";

import { useFormik } from "formik";
import { Formik, Form, useField } from 'formik';

import { unwrapResult } from "@reduxjs/toolkit";
import { StatusData } from "../api/apiRoutes";

import addFormStyles from "./AddTodoForm.module.css";
import * as Yup from "yup";
import classNames from "classnames";

import { MyTextInput } from '../helpers/MyTextInput';

export const AddTodoForm = () => {
  const dispatch = useDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState(StatusData.idle);
  const canSave = addRequestStatus === StatusData.idle;

  return (
    <section className={addFormStyles.addNewTodoForm}>
      <h2>Add a new todo item</h2>

      <Formik
        initialValues={{ title: "" }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(2, "Must be more than 2 characters")
            .required("Required")
            .test(
              "check for spaces",
              (title) => title && title.trim().length > 1
            ),
        })}
        onSubmit={async (values) => {
          console.log(`onSubmit: async (values) `, values);

          try {
            setAddRequestStatus(StatusData.loading);
            const resultOfAddNewTodo = await dispatch(
              fetchAddTodo({
                title: values.title,
                isFinished: false,
              })
            );
            unwrapResult(resultOfAddNewTodo);
          } catch (error) {
            console.error("Failed to add new todo", error);
          } finally {
            setAddRequestStatus(StatusData.idle);
          }
        }}
      >
        {/* we use the name to tell Formik which key of `values` to update */}

        <Form className="mb-3 row g-3">
          <div className="col-auto">
						<MyTextInput
              className="form-control"
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
    </section>
  );
};
