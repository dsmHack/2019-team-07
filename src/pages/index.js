import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Mission from "../components/mission";
import Feature from "../components/feature";
import Layout from "../layouts";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const features = get(this, "props.data.allContentfulFeature.edges");
		const mission = get(this, "props.data.allContentfulMissionStatement.edges");

		return (
			<Layout>
				<div>
					<Helmet title={siteTitle} />
					<Mission mission={mission[0].node} />
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
						sizes(maxWidth: 350, maxHeight: 350, resizingBehavior: CROP) {
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
		allContentfulMissionStatement {
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
	}
`;
