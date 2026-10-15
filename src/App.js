import { RecoilRoot } from "recoil";
import "./App.css";
import Login from "./Components/Login";
import UserData from "./Components/UserData";
import Tasks from "./Components/Tasks";

const App = () => {
	return (
		<>
			<RecoilRoot>
				<div className="app">
					<UserData />
					<Login />
					<Tasks />
				</div>
			</RecoilRoot>
		</>
	);
};

export default App;
