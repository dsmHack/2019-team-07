import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import HrefButton from "../components/href-button";
import Container from "../components/container";
import Feature from "../components/feature";
import Hero from "../components/hero";
import Mission from "../components/mission";
import HomePageLayout from "../layouts/homePage";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const features = get(this, "props.data.allContentfulFeature.edges");
		const mission = get(this, "props.data.allContentfulMissionStatement.edges");
		const page = get(this, "props.data.allContentfulHomePage.edges");

		return (
			<HomePageLayout>
				<Hero data={page[0].node} />
				<Container>
					<div>
						<Helmet title={siteTitle} />
						<Mission mission={mission[0].node} />
						<div className="wrapper">
							<div className="row">{features.map(({ node }) => <Feature feature={node} key={node.contentful_id} />)}</div>
						</div>
						<div style={{ margin: "2em" }}>
							<h2 className="section-headline text-centered">{page[0].node.donateHeader}</h2>
							<div className="lead lead-no-margin">
								<div
									dangerouslySetInnerHTML={{
										__html: page[0].node.donateBody.childMarkdownRemark.html
									}}
								/>
							</div>
							{
								(page[0].node.callToActionEnabled) &&
									<div className="text-centered donate-button">
										<HrefButton href={page[0].node.donateUrl} value={page[0].node.callToActionLabel} ghost />
									</div>
							}
						</div>
					</div>
				</Container>
			</HomePageLayout>
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
					contentful_id
					image {
						sizes(maxWidth: 350, maxHeight: 350, resizingBehavior: FILL) {
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
		allContentfulHomePage(filter: { contentful_id: { eq: "7xXpIF01hW7xFEyGqa5SI2" } }) {
			edges {
				node {
					title
					heroImage {
						title
						contentful_id
						fluid(maxWidth: 1200) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					secondaryHeroImages {
						title
						contentful_id
						fixed(width: 200, height: 200) {
							...GatsbyContentfulFixed_withWebp
						}
					}
					donateHeader
					donateBody {
						childMarkdownRemark {
							html
						}
					}
					donateUrl
					callToActionLabel
					callToActionEnabled
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
