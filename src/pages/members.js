import get from "lodash/get";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../components/auth";
import Layout from "../layouts";
import { navigate } from "gatsby";
import Button from "../components/button";

export default () => {
	const siteTitle = get(this, "props.data.site.siteMetadata.title");

	const context = useContext(AuthContext);
	if (!context.isLoggedIn) {
		navigate("/login/");
	}

	return (
		<Layout>
			<div>
				<Helmet title={`Members - ${siteTitle}`} />
				<div className="wrapper">
					<h2 className="section-headline">Members Only</h2>
				</div>
				<Button onClick={() => context.logout(() => navigate("/"))} value="Log out" />
			</div>
		</Layout>
	);
};
