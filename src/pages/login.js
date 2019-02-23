import React from "react";
import { navigate } from "gatsby";
import Layout from "../layouts";
import Button from "../components/button";
import { handleLogin, initAuth } from "../components/auth.js";

class Login extends React.Component {
	componentDidMount() {
		initAuth();
	}

	handleSubmit() {
		return handleLogin((user) => navigate(`/app/profile`));
	}

	render() {
		return (
			<Layout>
				<div style={{ textAlign: "center", margin: "5em 0" }}>
					<h1 class="section-headline">Log in</h1>
					<p>To read secure content, please log in below.</p>
					<Button onClick={this.handleSubmit} value="Log in" />
				</div>
			</Layout>
		);
	}
}

export default Login;
