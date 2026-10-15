import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";

const CreateTasks = () => {
	const [taskName, setTaskName] = useState("");
	const setTasks = useSetRecoilState(tasksState);
	const createTask = () => {
		if (taskName.trim() === "") return;
		setTasks((oldTasks) => [...oldTasks, taskName]);
		setTaskName("");
	}
	return (
		<>
			<Form>
				<InputGroup>
					<Form.Control
						onChange={(e) => setTaskName(e.target.value)}
						type="text" 
						value={taskName}
						placeholder="Enter title of task"
					/>
					<Button onClick={createTask} type="button" variant="primary">
						Create Task
					</Button>
				</InputGroup>
			</Form>
		</>
	);
};

export default CreateTasks;
