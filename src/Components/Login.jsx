import { useRecoilValue, useSetRecoilState } from "recoil";
import { Alert, Button, Card, Container, Form, Navbar } from "react-bootstrap";
import { userState } from "../States/userState";
import { useForm } from "react-hook-form";
const Login = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const setUserState = useSetRecoilState(userState);
	const userData = useRecoilValue(userState);

	const handleLogin = (data) => {
		if (data.email !== "admin@admin.com" || data.password !== "123456") {
			setError("root", {
				type: "manual",
				message: "Invalid email or password.",
			});
			return;
		}
		setUserState({ email: data.email, loggedIn: true });
	};

	const logout = () => {
		setUserState({});
	};

	return (
		<>
			{userData.loggedIn && (
				<Navbar bg="white" className="app-navbar mb-4">
					<Container>
						<Navbar.Brand className="fw-bold">User System</Navbar.Brand>
						<div className="d-flex align-items-center gap-3">
							<span className="text-muted small">{userData.email}</span>
							<Button variant="outline-danger" size="sm" onClick={logout}>
								Log out
							</Button>
						</div>
					</Container>
				</Navbar>
			)}
			{!userData.loggedIn && (
				<div className="login-wrapper">
					<Card className="login-card">
						<Card.Body className="p-4">
							<Card.Title as="h3" className="text-center mb-1">
								Welcome back
							</Card.Title>
							<p className="text-center text-muted mb-4">
								Log in to your account
							</p>
							{errors.root && (
								<Alert variant="danger">{errors.root.message}</Alert>
							)}
							<Form onSubmit={handleSubmit(handleLogin)}>
								<Form.Group className="mb-3" controlId="loginEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										{...register("email")}
										type="email"
										placeholder="Enter your email"
									/>
								</Form.Group>
								<Form.Group className="mb-4" controlId="loginPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										{...register("password")}
										type="password"
										placeholder="Enter your password"
									/>
								</Form.Group>
								<Button type="submit" className="w-100">
									Log in
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</div>
			)}
		</>
	);
};

export default Login;
