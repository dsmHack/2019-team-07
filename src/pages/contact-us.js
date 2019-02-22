import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const contact = get(this, "props.data.allContentfulContactUs.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={`Contact Us - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline">Contact Us</h2>
						<ul className="Contact-list">
							{contact.map(({ node }) => {
								return (
									<li key={node.id}>
										{node.title}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query ContactQuery {
		allContentfulContactUs(sort: { fields: [title], order: ASC }) {
			edges {
				node {
                    title
                    description
                    name
                    phoneNumber
                    email
                    address
                    city
                    state
                    zip
				}
			}
		}
	}
`;