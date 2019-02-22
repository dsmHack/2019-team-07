import React from "react";
import Layout from "../layouts";
import Helmet from "react-helmet";

export default () => (
	<Layout>
		<Helmet title="Sample page" />
		<div className="wrapper">
			<h2 className="section-headline">Sample Page</h2>
			<p>lorem ipsum....</p>
		</div>
	</Layout>
);
