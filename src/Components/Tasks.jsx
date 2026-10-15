import { useRecoilValue, useSetRecoilState } from "recoil";
import { Badge, Button, Card, Container, ListGroup } from "react-bootstrap";
import { userState } from "../States/userState";
import CreateTasks from "./CreateTasks";
import { tasksState } from "../States/tasksState";

const Tasks = () => {
	const userData = useRecoilValue(userState);
	const taskData = useRecoilValue(tasksState);
	const setTaskData = useSetRecoilState(tasksState);

	const deleteTask = (taskName) => {
		const filteredTasks = taskData.filter((task) => task !== taskName);
		setTaskData(filteredTasks);
	};

	return (
		<>
			{userData.loggedIn && (
				<Container style={{ maxWidth: 720 }}>
					<Card className="tasks-card">
						<Card.Body className="p-4">
							<div className="d-flex align-items-center justify-content-between mb-3">
								<Card.Title as="h4" className="fw-bold mb-0">
									Moji taskovi
								</Card.Title>
								<Badge bg="primary" pill>
									{taskData.length}
								</Badge>
							</div>
							<CreateTasks />

							{taskData.length === 0 ? (
								<p className="tasks-empty mb-0">Još nema taskova.</p>
							) : (
								<ListGroup className="task-list mt-4">
									{taskData.map((taskName) => {
										return (
											<ListGroup.Item className="task-item">
												<span className="task-name">{taskName}</span>
												<Button
													onClick={() => deleteTask(taskName)}
													variant="outline-danger"
													size="sm"
												>
													Delete task
												</Button>
											</ListGroup.Item>
										);
									})}
								</ListGroup>
							)}
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default Tasks;
