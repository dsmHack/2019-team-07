import React from "react";
import get from "lodash/get";
import Helmet from "react-helmet";
import styles from "./blog.module.css";
import ArticlePreview from "../components/article-preview";
import Layout from "../layouts";
import { graphql } from "gatsby";

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const posts = get(this, "props.data.allContentfulNewsLetter.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={siteTitle} />
					<div className={styles.hero}>Blog</div>
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

export default BlogIndex;

export const pageQuery = graphql`
	query BlogIndexQuery {
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
	}
`;
