import get from "lodash/get";
import React, { useEffect } from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql, navigate } from "gatsby";
import { isLoggedIn } from "../components/auth";

export default () => {
	const siteTitle = get(this, "props.data.site.siteMetadata.title");

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login/");
		}
	}, []);

	return (
		<Layout>
			<div>
				<Helmet title={`Members - ${siteTitle}`} />
				<div className="wrapper">
					<h2 className="section-headline">Members Only</h2>
				</div>
			</div>
		</Layout>
	);
};
