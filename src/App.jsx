import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { NavBar } from "./components/NavBar";

import { TodoList } from "./components/TodoList.jsx";

import { AddTodoForm } from "./components/AddTodoForm";

import AppStyles from "./App.module.css";
import classnames from "classnames";

export const App = () => {
  
  // "row g-2",
  const appInnerContainer = classnames( AppStyles.innerCont);
  const addFormClasses = classnames(AppStyles['bd-aside'],'col-sm-5');
  const mainContent = classnames(AppStyles['bd-main'],'justify-content-center col-sm-7');

  return (
    <div className="wrapper">
      <Router>
        <NavBar></NavBar>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <div className="container-fluid">
                    <div className="d-flex justify-content-center">
                      <div className="container-lg">
                        <div className={appInnerContainer}>

                          <div className={addFormClasses}>
                            <AddTodoForm></AddTodoForm>
                          </div>

                          <div className={mainContent}>
                            <TodoList></TodoList>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
