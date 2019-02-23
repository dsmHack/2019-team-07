import { graphql } from "gatsby";
import Img from "gatsby-image";
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
					<div>
						{about.map(({ node }) => (
							<div key={node.id}>
								<HeroImage photos={node.photos} title={node.title} />
								<div className="row" style={{ marginBottom: "4em" }}>
									<div className="col text-centered">
										<h2 className="section-headline">Our Chapter</h2>
										<div
											dangerouslySetInnerHTML={{
												__html: node.chapterInformation.childMarkdownRemark.html
											}}
										/>
										<LinkButton to="new-events" value="Join our community" />
									</div>
									<div className="col">
										<Img sizes={node.chapterImage.sizes} alt="" />
									</div>
								</div>
								<div className="row" style={{ marginBottom: "4em" }}>
									<div className="col">
										<div className="row" style={{ marginBottom: "1em" }}>
											<div style={{ flexGrow: 2, marginRight: "1em" }}>
												<Img sizes={node.aboutLandscapePhotos[0].sizes} alt="" />
											</div>
											<div style={{ flexGrow: 1 }}>
												<Img sizes={node.aboutPortraitPhotos[0].sizes} alt="" />
											</div>
										</div>
										<div className="row">
											<div style={{ flexGrow: 1, marginRight: "1em" }}>
												<Img sizes={node.aboutPortraitPhotos[1].sizes} alt="" />
											</div>
											<div style={{ flexGrow: 2 }}>
												<Img sizes={node.aboutLandscapePhotos[1].sizes} alt="" />
											</div>
										</div>
									</div>
									<div className="col text-centered">
										<h2 className="section-headline text-center">About Les Dames</h2>
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
					id
					title
					chapterInformation {
						childMarkdownRemark {
							html
						}
					}
					chapterImage {
						sizes(maxWidth: 600, maxHeight: 350, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					photos {
						sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					about {
						childMarkdownRemark {
							html
						}
					}
					aboutLandscapePhotos {
						sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					aboutPortraitPhotos {
						sizes(maxWidth: 200, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
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
		site {
			siteMetadata {
				title
			}
		}
	}
`;
