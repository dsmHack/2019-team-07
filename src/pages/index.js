import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import ArticlePreview from "../components/article-preview";
import Layout from "../layouts";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const posts = get(this, "props.data.allContentfulNewsLetter.edges");
		//const [ author ] = get(this, "props.data.allContentfulMember.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={siteTitle} />
					{/* <Hero data={author.node} /> */}
					<div className="wrapper">
						<h2 className="section-headline">Recent articles</h2>
						<ul className="article-list">
							{posts.map(({ node }) => {
								return (
									<li key={node.slug}>
										<ArticlePreview article={node} />
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
	query HomeQuery {
		allContentfulNewsLetter(sort: { fields: [publishDate], order: DESC }) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					tags
					heroImage {
						sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					description {
						childMarkdownRemark {
							html
						}
					}
				}
			}
		}
		allContentfulMember(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
			edges {
				node {
					name
					shortBio {
						shortBio
					}
					title
					heroImage: image {
						sizes(maxWidth: 1180, maxHeight: 480, resizingBehavior: PAD, background: "rgb:000000") {
							...GatsbyContentfulSizes_withWebp
						}
					}
				}
			}
		}
	}
`;
