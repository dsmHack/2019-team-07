import { navigate } from "gatsby";
import React, { useContext } from "react";
import { AuthContext } from "../components/auth.js";
import Button from "../components/button";
import Layout from "../layouts";

export default () => {
	const context = useContext(AuthContext);

	const handleSubmit = () => context.login(() => navigate("members"));

	return (
		<Layout>
			<div style={{ textAlign: "center", margin: "7.5em 0" }}>
				<h1 class="section-headline">Log in</h1>
				<p>To read secure content, please log in below.</p>
				<Button onClick={handleSubmit} value="Log in" />
			</div>
		</Layout>
	);
};
