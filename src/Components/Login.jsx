import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Alert, Button, Card, Container, Form, Navbar } from "react-bootstrap";
import { userState } from "../States/userState";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const setUserState = useSetRecoilState(userState);
	const userData = useRecoilValue(userState);

	const handleLogin = (e) => {
		e.preventDefault();
		if (email !== "admin@admin.com" || password !== "123456") {
			setError("Pogrešan email ili lozinka.");
			return;
		}
		setError("");
		setUserState({ email: email, loggedIn: true });
		setPassword("");
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
								Logout
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
								Dobrodošli
							</Card.Title>
							<p className="text-center text-muted mb-4">
								Prijavite se na svoj račun
							</p>
							{error && <Alert variant="danger">{error}</Alert>}
							<Form onSubmit={handleLogin}>
								<Form.Group className="mb-3" controlId="loginEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										value={email}
										placeholder="Enter your email"
									/>
								</Form.Group>
								<Form.Group className="mb-4" controlId="loginPassword">
									<Form.Label>Lozinka</Form.Label>
									<Form.Control
										onChange={(e) => setPassword(e.target.value)}
										type="password"
										value={password}
										placeholder="Enter your password"
									/>
								</Form.Group>
								<Button type="submit" className="w-100">
									Login
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
