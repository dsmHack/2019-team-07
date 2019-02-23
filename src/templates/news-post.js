import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import { graphql } from "gatsby";


class BlogPostTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulNews");
		const siteTitle = get(this.props, "data.site.siteMetadata.title");

		return (
			<div style={{ background: "#fff" }}>
				<Helmet title={`${post.title} | ${siteTitle}`} />
				<div className="wrapper">
					<h1 className="section-headline">{post.title}</h1>
					<p
						style={{
							display: "block"
						}}
					>
						{post.date}
					</p>
					<div>Hello World!</div>
				</div>
			</div>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query NewsByTitle($title: String!) {
		contentfulNews(title: { eq: $title }) {
			title
			date(formatString: "MMMM Do, YYYY")
			content {
				childMarkdownRemark {
					html
				}
			}
		}
	}
`;
