import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	Badge,
	Button,
	Card,
	Container,
	Form,
	ListGroup,
	Alert,
	InputGroup,
} from "react-bootstrap";
import { userState } from "../States/userState";
import CreateTasks from "./CreateTasks";
import { tasksState } from "../States/tasksState";
import { useState } from "react";
import { CATEGORIES } from "../Categories";

const Tasks = () => {
	const userData = useRecoilValue(userState);
	const taskData = useRecoilValue(tasksState);
	const setTaskData = useSetRecoilState(tasksState);

	const [editedTaskId, setEditedTaskId] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [editedCategory, setEditedCategory] = useState("");
	const [editError, setEditError] = useState("");

	const [openCommentsId, setOpenCommentsId] = useState(null);
	const [commentText, setCommentText] = useState("");
	const [commentError, setCommentError] = useState("");

	const addComment = (e, taskId) => {
		e.preventDefault();
		const text = commentText.trim();

		if (text === "") {
			setCommentError("Comment can't be empty.");
			return;
		}
		if (text.length > 30) {
			setCommentError("Comment can have at most 30 characters.");
			return;
		}
		const updatedTasks = taskData.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					comments: [...task.comments, { id: Date.now(), text: text }],
				};
			}
			return task;
		});

		setTaskData(updatedTasks);
		setCommentText("");
		setCommentError("");
	};
	const deleteComment = (taskId, commentId) => {
		const updatedTasks = taskData.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					comments: task.comments.filter((comment) => comment.id !== commentId),
				};
			}
			return task;
		});

		setTaskData(updatedTasks);
	};

	const openComments = (id) => {
		if (id === openCommentsId) {
			setOpenCommentsId(null);
		} else {
			setOpenCommentsId(id);
		}
		setCommentError("");
		setCommentText("");
	};

	const deleteTask = (id) => {
		const filteredTasks = taskData.filter((task) => task.id !== id);
		setTaskData(filteredTasks);
	};

	const editTask = (id, name, category) => {
		setEditedTaskId(id);
		setEditedName(name);
		setEditedCategory(category);
		setEditError("");
	};
	const cancelEdit = () => {
		setEditedTaskId(null);
		setEditError("");
	};
	const saveTask = () => {
		const name = editedName.trim();
		if (name === "") {
			setEditError("Task name is required.");
			return;
		}
		if (name.length > 28) {
			setEditError("Task name can have at most 28 characters.");
			return;
		}
		const sameTasks = taskData.filter(
			(task) => task.name === name && task.id !== editedTaskId,
		);
		if (sameTasks.length > 0) {
			setEditError("A task with this name already exists.");
			return;
		}
		const updatedTasks = taskData.map((task) => {
			if (task.id === editedTaskId) {
				return {
					id: task.id,
					name: name,
					category: editedCategory,
					comments: task.comments,
				};
			}
			return task;
		});
		setTaskData(updatedTasks);
		cancelEdit();
	};

	return (
		<>
			{userData.loggedIn && (
				<Container style={{ maxWidth: 720 }}>
					<Card className="tasks-card">
						<Card.Body className="p-4">
							<div className="d-flex align-items-center justify-content-between mb-3">
								<Card.Title as="h4" className="fw-bold mb-0">
									My tasks
								</Card.Title>
								<Badge bg="primary" pill>
									{taskData.length}
								</Badge>
							</div>

							<CreateTasks />

							{taskData.length === 0 ? (
								<p className="tasks-empty mb-0">No tasks yet.</p>
							) : (
								<>
									{editError && (
										<Alert variant="danger" className="py-2 mt-3 mb-0">
											{editError}
										</Alert>
									)}

									<ListGroup className="task-list mt-4">
										{taskData.map((task) => {
											return (
												<ListGroup.Item
													key={task.id}
													className={`task-item ${editedTaskId === task.id ? "is-editing" : ""}`}
												>
													{editedTaskId === task.id ? (
														<Form.Control
															type="text"
															size="sm"
															value={editedName}
															onChange={(e) => setEditedName(e.target.value)}
														/>
													) : (
														<span className="task-name">{task.name}</span>
													)}
													{editedTaskId === task.id ? (
														<Form.Select
															size="sm"
															value={editedCategory}
															onChange={(e) =>
																setEditedCategory(e.target.value)
															}
														>
															{CATEGORIES.map((category) => {
																return (
																	<option key={category} value={category}>
																		{category}
																	</option>
																);
															})}
														</Form.Select>
													) : (
														<span className={`task-category ${task.category}`}>
															{task.category}
														</span>
													)}
													<div className="task-actions">
														{editedTaskId === task.id ? (
															<>
																<Button
																	onClick={() => saveTask()}
																	variant="primary"
																	size="sm"
																>
																	Save Task
																</Button>
																<Button
																	onClick={() => cancelEdit()}
																	variant="outline-secondary"
																	size="sm"
																>
																	Cancel Task
																</Button>
															</>
														) : (
															<>
																<Button
																	onClick={() => openComments(task.id)}
																	variant="outline-secondary"
																	size="sm"
																>
																	Comments ({task.comments.length})
																</Button>
																<Button
																	onClick={() =>
																		editTask(task.id, task.name, task.category)
																	}
																	variant="outline-primary"
																	size="sm"
																>
																	Edit Task
																</Button>
																<Button
																	onClick={() => deleteTask(task.id)}
																	variant="outline-danger"
																	size="sm"
																>
																	Delete Task
																</Button>
															</>
														)}
													</div>
													{openCommentsId === task.id && (
														<div className="task-comments">
															{task.comments.length === 0 ? (
																<p className="comments-empty mb-0">
																	No comments yet.
																</p>
															) : (
																<ul className="comment-list">
																	{task.comments.map((comment) => {
																		return (
																			<li
																				key={comment.id}
																				className="comment-item"
																			>
																				<span className="comment-text">
																					{comment.text}
																				</span>
																				<Button
																					onClick={() =>
																						deleteComment(task.id, comment.id)
																					}
																					className="comment-delete"
																					variant="link"
																					size="sm"
																				>
																					Delete
																				</Button>
																			</li>
																		);
																	})}
																</ul>
															)}
															{commentError && (
																<Alert
																	variant="danger"
																	className="py-1 px-2 mb-2 small"
																>
																	{commentError}
																</Alert>
															)}

															<Form onSubmit={(e) => addComment(e, task.id)}>
																<InputGroup size="sm">
																	<Form.Control
																		type="text"
																		placeholder="Write a comment..."
																		value={commentText}
																		onChange={(e) =>
																			setCommentText(e.target.value)
																		}
																	/>
																	<Button type="submit" variant="primary">
																		Add
																	</Button>
																</InputGroup>
															</Form>
														</div>
													)}
												</ListGroup.Item>
											);
										})}
									</ListGroup>
								</>
							)}
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default Tasks;
