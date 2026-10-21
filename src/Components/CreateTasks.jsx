import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";
import { useForm } from "react-hook-form";

const CreateTasks = () => {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm();

	const setTasks = useSetRecoilState(tasksState);
	const tasks = useRecoilValue(tasksState);

	const createTask = (data) => {
		if (data.taskName.trim() === "") {
			setError("taskName", { message: "Task name is required." });
			return;
		}

		const sameTasks = tasks.filter((task) => task === data.taskName);
		if (sameTasks.length > 0) {
			setError("taskName", {
				message: "A task with this name already exists.",
			});
			return;
		}

		setTasks((oldTasks) => [...oldTasks, data.taskName]);
		reset();
	};
	return (
		<>
			{errors.taskName && (
				<Alert variant="danger" className="py-2 mb-2">
					{errors.taskName.message}
				</Alert>
			)}
			<Form onSubmit={handleSubmit(createTask)} className="create-task-form">
				<InputGroup hasValidation size="lg">
					<Form.Control
						{...register("taskName", {
							required: "Task name is required.",
						})}
						type="text"
						placeholder="Enter a task title"
						isInvalid={!!errors.taskName}
					/>
					<Button type="submit" variant="primary" className="px-4">
						Create task
					</Button>
					<Form.Control.Feedback type="invalid">
						{errors.taskName?.message}
					</Form.Control.Feedback>
				</InputGroup>
			</Form>
		</>
	);
};

export default CreateTasks;
