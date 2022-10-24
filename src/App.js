import "./App.css";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Register from "./components/Register";
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
  return (
	  <div>
		<Router>
			<Switch>
					<Route path="/" element={<Todo/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Register/>} />
			</Switch>
		</Router>
	  </div>
  );
}

export default App;
