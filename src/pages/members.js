import { navigate } from "gatsby";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../components/auth";
import Button from "../components/button";
import Layout from "../layouts";

export default class Members extends Component {
	static contextType = AuthContext;

	componentDidMount() {
		console.log(this.context);
		if (!this.context.isLoggedIn) {
			navigate("/login/");
		}
	}

	render() {
		const siteTitle = "hi";
		return (
			<Layout>
				<div>
					<Helmet title={`Members - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline">Members Only</h2>
					</div>
					<Button onClick={() => this.context.logout(() => navigate("/"))} value="Log out" />
				</div>
			</Layout>
		);
	}
}
