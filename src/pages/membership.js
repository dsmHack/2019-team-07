import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const members = get(this, "props.data.allContentfulMember.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={`Members - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline">Members</h2>
						<ul className="member-list">
							{members.map(({ node }) => {
								return (
									<li key={node.id}>
										{node.name} - {node.title}
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
	query MembersQuery {
		allContentfulMember(sort: { fields: [name], order: ASC }) {
			edges {
				node {
					name
					title
					company
					email
					phone
					facebook
					twitter
					id
				}
			}
		}
	}
`;
