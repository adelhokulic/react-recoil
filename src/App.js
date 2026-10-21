import { RecoilRoot } from "recoil";
import "./App.css";
import Login from "./Components/Login";
import Tasks from "./Components/Tasks";

const App = () => {
	return (
		<>
			<RecoilRoot>
				<div className="app">
					<Login />
					<Tasks />
				</div>
			</RecoilRoot>
		</>
	);
};

export default App;
