import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "./auth/authApiCalls";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#A3CB37" };
  } else {
    return { color: "#EAF0F1" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark ">
      
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item ">
          
          <Link
            style={currentTab(history, "/user/home")}
            className="nav-link "
            to="/user/home"
          >
            {isAuthenticated().user.name}'s Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item ">
          
          <Link
            style={currentTab(history, "/user/home")}
            className="nav-link "
            to="/user/previous-results"
          >
            Previous Results
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (       
        <li className="nav-item ">
          <Link
            style={currentTab(history, "/admin/home")}
            className="nav-link "
            to="/admin/home"
          >
           {isAuthenticated().user.name}'s  Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (       
        <li className="nav-item ">
          <Link
            style={currentTab(history, "/admin/home")}
            className="nav-link "
            to="/admin/all-quizzes"
          >
           Quizzes
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item ">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link "
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link "
              to="/signin"
            >
              Signin
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item ">
          <span
            className="nav-link text-white text-waring"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
