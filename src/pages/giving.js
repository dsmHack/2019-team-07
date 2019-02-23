import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import HeroImage from "../components/hero-image";
import LinkButton from "../components/link-button";
import styles from "./giving.module.css";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const giving = get(this, "props.data.allContentfulGrantsScholarships.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Grants & Scholarship - ${siteTitle}`} />
					{giving.map(({ node }) => (
						<div>
							<HeroImage photos={node.photos} title={node.title} />
							<div className="lead">
								<div
									dangerouslySetInnerHTML={{
										__html: node.lead.childMarkdownRemark.html
									}}
								/>
							</div>
							<h2 className="section-headline text-centered">{node.bodyTitle}</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: node.body.childMarkdownRemark.html
								}}
							/>
							<div className="text-centered" style={{ margin: "2em 0 4em" }}>
								<LinkButton to="contact-us/" value="Contact Us" />
							</div>
							<h2 className="section-headline text-centered">{node.philanthropicEventsTitle}</h2>
							<div className="row" style={{ marginBottom: "2em" }}>
								{node.philanthropicEvents.map((event) => (
									<div className={styles.event}>
										<h3 className={styles.eventTitle}>{event.title}</h3>
										<div
											dangerouslySetInnerHTML={{
												__html: event.body.childMarkdownRemark.html
											}}
										/>
									</div>
								))}
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
	query GivingQuery {
		allContentfulGrantsScholarships {
			edges {
				node {
					title
					lead {
						childMarkdownRemark {
							html
						}
					}
					body {
						childMarkdownRemark {
							html
						}
					}
					bodyTitle
					photos {
						sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					philanthropicEventsTitle
					philanthropicEvents {
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
		site {
			siteMetadata {
				title
			}
		}
	}
`;
