import "../App.css";
import Header from "./Header";
import React, { useEffect } from "react";
import Todo from "./Todo";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("access")) {
      navigate("/");
    }
  })


  const onSubmit = async (values) => {
    const res = await loginUser({
      "username": values.username,
      "password": values.password
    });

    sessionStorage.setItem("access", res.access);
    sessionStorage.setItem("refresh", res.refresh);
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit
  });

  return (
    <div className="fullPageWrapper">
      <Header />

      <div class="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button className="loginButton" type="submit">Logga in</button>
        </form>
        <p>Har du inget konto?</p><a href="/register">Registrera dig!</a>
      </div>
    </div>
  );
}

export default Login;
