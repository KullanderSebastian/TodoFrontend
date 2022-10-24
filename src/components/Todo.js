import '../App.css';
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createHashRouter, createPath, useNavigate } from 'react-router-dom';
import Login from "./Login";
import Header from "./Header";
import { render } from '@testing-library/react';
import { TiDeleteOutline } from "react-icons/ti";



async function createTask(data) {
    return fetch("http://127.0.0.1:8000/tasks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
			"Authorization": "Bearer " + sessionStorage.getItem("access")
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
}

async function updateTask(data, id) {
	return fetch("http://127.0.0.1:8000/tasks/" + id + "/", {
		method: "PUT",
		headers: {
            "Content-Type": "application/json",
			"Authorization": "Bearer " + sessionStorage.getItem("access")
        },
		body: JSON.stringify(data)
	})
	.then(data => data.json())
}

function Todo() {
	const [todoData, setTodoData] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem("access")) {
			navigate("/login");
		}

		const fetchTodoData = async () => {
			const response = await fetch("http://127.0.0.1:8000/tasks/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("access")
				}
			})

			const data = await response.json();
			setTodoData(data.results);
		};
		fetchTodoData();
	}, [])
	

	const handleClick = (e) => {
		let completed;

		if (e.target.checked) {
			completed = "true";
		} else {
			completed = "false";
		}
		
		updateTask({
			"title": e.target.parentElement.innerText,
			"completed": completed
		}, e.target.id);

		window.location.reload(false);
	}

	const onSubmit = async (values) => {
		createTask({
			"title": values.title
		});

		window.location.reload(false);
	}

	const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			title: "",
		},
		onSubmit
	});

  	return (
		<div className="fullPageWrapper">
			<Header />
			<div class="addTodo">
				<form onSubmit={handleSubmit}>
					<input 
						name="title" 
						placeholder="title" 
						value={values.title}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<button type="submit">+</button>
				</form>
			</div>
		  	<div className="todoList">
		  		{todoData ? todoData.map(obj => (
					<div className="todoItem">
						<p className={obj.completed ? "completed" : ""} id={obj.id}>{obj.title}</p>
						<input 
							checked={obj.completed ? true : false} 
							onClick={handleClick} 
							id={obj.id} type="checkbox" 
							name="completed">
						</input>
					</div>
				)) : ""}
		  	</div>
		</div>
  	);
}

export default Todo;
