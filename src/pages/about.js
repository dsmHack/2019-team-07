import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import BlockQuote from "../components/block-quote";
import HeroImage from "../components/hero-image";
import LinkButton from "../components/link-button";
import Layout from "../layouts";

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
								<HeroImage photos={node.photos} title={node.title} />
								<div className="row" style={{ marginBottom: "4em" }}>
									<div className="col text-centered">
										<h2 className="section-headline">Our Chapter</h2>
										<div
											dangerouslySetInnerHTML={{
												__html: node.chapterInformation.childMarkdownRemark.html
											}}
										/>
										<LinkButton to="new-events" value="Join the community" />
									</div>
									<div className="col">
										<img src="https://via.placeholder.com/600x300" />
									</div>
								</div>
								<div className="row" style={{ marginBottom: "4em" }}>
									<div className="col">
										<img src="https://via.placeholder.com/600x600" />
									</div>
									<div className="col text-centered">
										<h2 className="section-headline">About Les Dames</h2>
										<div
											dangerouslySetInnerHTML={{
												__html: node.about.childMarkdownRemark.html
											}}
										/>
									</div>
								</div>
								<BlockQuote quote={node.quote} cite={node.quotePerson} />
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
					photos {
						sizes(maxWidth: 1200, maxHeight: 350, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
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
