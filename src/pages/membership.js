import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import styles from "./membership.module.css";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const members = get(this, "props.data.allContentfulMember.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Membership - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline text-centered">Meet our Members</h2>
						<ul className={styles.memberList}>
							{members.map(({ node }) => {
								return (
									<li key={node.id}>
										<strong>{node.name}</strong>
										<div>
											{node.company} - {node.title}
										</div>
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
	query MembershipQuery {
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
