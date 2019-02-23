import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { Calendar, Download } from "react-feather";

class BlogPostTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulNews");
		const siteTitle = get(this.props, "data.site.siteMetadata.title");

		return (
			<Layout>
				<Helmet title={`${post.title} | ${siteTitle}`} />
				<div className="wrapper" style={{ margin: "2em 0" }}>
					<h1 className="section-headline">{post.title}</h1>
					<div
						style={{
							color: "#20bf55",
							display: "flex",
							alignItems: "center"
						}}
					>
						<Calendar size={12} /> {post.date}
					</div>
					<div
						dangerouslySetInnerHTML={{
							__html: post.content.childMarkdownRemark.html
						}}
					/>
					{post.attachment && (
						<span style={{ display: "flex", alignItems: "center" }}>
							<Download size={12} />{" "}
							<a href={post.attachment.file.url} download>
								Download Attachment
							</a>
						</span>
					)}
				</div>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query NewsBySlug($slug: String!) {
		contentfulNews(slug: { eq: $slug }) {
			title
			date(formatString: "MMMM Do, YYYY")
			content {
				childMarkdownRemark {
					html
				}
			}
			attachment {
				file {
					url
				}
			}
		}
	}
`;
