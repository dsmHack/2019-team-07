import { navigate, graphql } from "gatsby";
import get from "lodash/get";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../components/auth";
import Button from "../components/button";
import DatesToRemember from "../components/dates-to-remember";
import Layout from "../layouts";
import { Calendar } from "react-feather";
import LinkButton from "../components/link-button";

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
		const news = get(this, "props.data.allContentfulNews.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Members Only - ${siteTitle}`} />
					{membersOnly.map(({ node }) => (
						<div style={{ margin: "2em 0" }}>
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
					<div style={{ margin: "2em 0" }} id="news">
						<h2 className="section-headline">News</h2>
						{news.map(({ node }) => (
							<article key={node.slug}>
								<h3 style={{ marginBottom: 0, color: "#0055a4" }}>{node.title}</h3>
								{node.date && <div>{node.date}</div>}
								<p>{node.teaserText}</p>
								<LinkButton to={`/news/${node.slug}/`} value="Read more" ghost />
							</article>
						))}
					</div>
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
		allContentfulNews(sort: { fields: [date], order: DESC }) {
			edges {
				node {
					title
					slug
					teaserText
					date(formatString: "MMMM Do, YYYY")
				}
			}
		}
	}
`;
