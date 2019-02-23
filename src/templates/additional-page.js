import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import HeroImage from "../components/hero-image";
import Layout from "../layouts";

class BlogPostTemplate extends React.Component {
	render() {
		const post = get(this.props, "data.contentfulAdditionalPage");
		const siteTitle = get(this.props, "data.site.siteMetadata.title");

		return (
			<Layout>
				<Helmet title={`${post.title} | ${siteTitle}`} />
				<HeroImage photos={post.photos} title={post.title} />
				{post.lead && (
					<div className="lead">
						<div
							dangerouslySetInnerHTML={{
								__html: post.lead.childMarkdownRemark.html
							}}
						/>
					</div>
				)}
				{post.bodyTitle && <h2 className="section-headline text-centered">{post.bodyTitle}</h2>}
				<div
					dangerouslySetInnerHTML={{
						__html: post.body.childMarkdownRemark.html
					}}
				/>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query AdditionPageBySlug($slug: String!) {
		contentfulAdditionalPage(slug: { eq: $slug }) {
			title
			lead {
				childMarkdownRemark {
					html
				}
			}
			bodyTitle
			body {
				childMarkdownRemark {
					html
				}
			}
			photos {
				sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
					...GatsbyContentfulSizes_withWebp
				}
			}
		}
	}
`;
