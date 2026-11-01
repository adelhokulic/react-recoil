import { Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";
import { useForm } from "react-hook-form";
import { CATEGORIES } from "../Categories";

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
		const name = data.taskName.trim();
		if (name === "") {
			setError("taskName", {
				message: "Task name is required.",
			});
			return;
		}

		const sameTasks = tasks.filter((task) => task.name === name);
		if (sameTasks.length > 0) {
			setError("taskName", {
				message: "A task with this name already exists.",
			});
			return;
		}

		setTasks((oldTasks) => [
			...oldTasks,
			{
				id: Date.now(),
				name: name,
				category: data.category,
				comments: [],
			},
		]);
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
							maxLength: {
								value: 28,
								message: "Task name can have at most 28 characters.",
							},
						})}
						type="text"
						placeholder="Enter a task title"
						isInvalid={!!errors.taskName}
					/>
					<Form.Select {...register("category")}>
						{CATEGORIES.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							);
						})}
					</Form.Select>
					<Button type="submit" variant="primary" className="px-4">
						Create Task
					</Button>
				</InputGroup>
			</Form>
		</>
	);
};

export default CreateTasks;
