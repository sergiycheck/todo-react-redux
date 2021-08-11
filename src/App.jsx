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

export const App = () => {
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
                      <div className="container">
                        <div className="row g-2">

                          <TodoList></TodoList>

                          <div className="col-sm-3">
                            <AddTodoForm></AddTodoForm>
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
