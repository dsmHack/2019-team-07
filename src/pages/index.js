import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import ArticlePreview from "../components/article-preview";
import Layout from "../layouts";
import Img from "gatsby-image";
import Feature from "../components/feature";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const features = get(this, "props.data.allContentfulFeature.edges");

		return (
			<Layout>
				<div>
					<Helmet title={siteTitle} />
					{/* <Hero data={author.node} /> */}
					<div className="wrapper">
						<div className="row">{features.map(({ node }) => <Feature feature={node} />)}</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		allContentfulFeature {
			edges {
				node {
					title
					image {
						sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					description {
						childMarkdownRemark {
							html
						}
					}
					callToActionText
					callToActionUrl
				}
			}
		}
	}
`;
