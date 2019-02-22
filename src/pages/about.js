import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import HeroImage from "../components/hero-image";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const about = get(this, "props.data.allContentfulAbout.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`About Us - ${siteTitle}`} />
					<div className="wrapper">
						{about.map(({ node }) => (
							<div>
								{/* <HeroImage imageSizes={node.photos.sizes} title={node.title} /> */}
								<ul className="about-list" />
							</div>
						))}
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query AboutUsQuery {
		allContentfulAbout(sort: { fields: [title], order: ASC }) {
			edges {
				node {
					title
					chapterInformation {
						childMarkdownRemark {
							html
						}
					}
					about {
						childMarkdownRemark {
							html
						}
					}
					quote {
						childMarkdownRemark {
							html
						}
					}
					quotePerson
				}
			}
		}
	}
`;
