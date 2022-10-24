import "../App.css";
import Header from "./Header";
import { useFormik } from "formik";

async function registerUser(credentials) {
    return fetch("http://127.0.0.1:8000/account/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

function Register() {
    
    const onSubmit = async (values) => {

		const res = await registerUser({
            "username": values.username,
            "password": values.password
        });

        console.log(res);
	}

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			username: "",
            password: ""
		},
		onSubmit
	});
    
    return (
        <div className="fullPageWrapper">
            <Header />

            <div className="register">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="username" 
                        placeholder="username" 
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input 
                        name="password" 
                        placeholder="password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <button className="registerButton" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;