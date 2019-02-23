import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import HeroImage from "../components/hero-image";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const contact = get(this, "props.data.allContentfulContactUs.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Contact Us - ${siteTitle}`} />
					{contact.map(({ node }) => (
						<div>
							<HeroImage photos={node.photos} title={node.title} />
							<div className="lead">
								<div
									dangerouslySetInnerHTML={{
										__html: node.body.childMarkdownRemark.html
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query ContactQuery {
		allContentfulContactUs {
			edges {
				node {
					title
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
		}
	}
`;
