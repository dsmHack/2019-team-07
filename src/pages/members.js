import { navigate, graphql } from "gatsby";
import get from "lodash/get";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../components/auth";
import Button from "../components/button";
import DatesToRemember from "../components/dates-to-remember";
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
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const membersOnly = get(this, "props.data.allContentfulMembersOnly.edges");
		const dtrs = get(this, "props.data.allContentfulDateToRemember.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Members Only - ${siteTitle}`} />
					{membersOnly.map(({ node }) => (
						<div style={{ marginBottom: "2em" }}>
							<h1 className="section-headline text-centered">{node.title}</h1>
							<div>
								<div
									dangerouslySetInnerHTML={{
										__html: node.body.childMarkdownRemark.html
									}}
								/>
							</div>
						</div>
					))}
					<DatesToRemember dtrs={dtrs} />
					<div style={{ margin: "5em 0", textAlign: "center" }}>
						<Button onClick={() => this.context.logout(() => navigate("/"))} value="Log out" />
					</div>
				</div>
			</Layout>
		);
	}
}

export const pageQuery = graphql`
	query MembersOnlyQuery {
		allContentfulMembersOnly {
			edges {
				node {
					title
					body {
						childMarkdownRemark {
							html
						}
					}
				}
			}
		}
		allContentfulDateToRemember(sort: { fields: [startDate], order: ASC }) {
			edges {
				node {
					date
					startDate
					description {
						childMarkdownRemark {
							html
						}
					}
					extraInfo
				}
			}
		}
	}
`;
