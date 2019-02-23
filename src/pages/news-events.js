/*jshint esversion: 6 */

import { graphql } from "gatsby";
import Img from "gatsby-image";
import get from "lodash/get";
import React, { useContext } from "react";
import { Calendar } from "react-feather";
import Helmet from "react-helmet";
import { AuthContext } from "../components/auth";
import DatesToRemember from "../components/dates-to-remember";
import HeroImage from "../components/hero-image";
import Layout from "../layouts";
import styles from "./news-events.module.css";

export default ({ data }) => {
	const siteTitle = get(data, "site.siteMetadata.title");
	const info = get(data, "allContentfulEventsAndNews.edges");
	const dtrs = get(data, "allContentfulDateToRemember.edges");
	const context = useContext(AuthContext);

	return (
		<Layout>
			<div>
				<Helmet title={`News and Events - ${siteTitle}`} />
				{info.map(({ node }) => (
					<div>
						<HeroImage photos={node.photos} title={node.title} />

						{node.featuredEvent && (
							<div className="events-wrapper" style={{ margin: "2em 0" }}>
								<h2 className="section-headline text-centered">What's next</h2>
								<div className={styles.eventRow}>
									<div className={styles.eventData}>
										<h3 className={styles.title}>{node.featuredEvent.eventName}</h3>
										<div className={styles.metaItem}>
											<Calendar />{" "}
											{new Date(node.featuredEvent.dateTime).toLocaleDateString("en-us", {
												month: "long",
												day: "numeric",
												year: "numeric"
											})}
										</div>
										<div
											dangerouslySetInnerHTML={{
												__html: node.featuredEvent.description.childMarkdownRemark.html
											}}
										/>
									</div>
									<div className={styles.eventImage}>
										<Img sizes={node.featuredEvent.eventImage.sizes} />
									</div>
								</div>
							</div>
						)}
					</div>
				))}
				{context.isLoggedIn && <DatesToRemember dtrs={dtrs} />}

				{/* <div className="news-wrapper">
						<h2 className="section-headline">News</h2>
						<div className="row">
							{news.map(({ node }) => (
								<article key={node.id} className={styles.article}>
									<h3 className={styles.title}>{node.title}</h3>
									<div className={styles.meta}>
										{node.date && (
											<div className={styles.metaItem}>
												<Calendar /> {new Date(node.date).toLocaleDateString("en-us")}
											</div>
										)}
									</div>
									<p>{node.teaserText}</p>
								</article>
							))}
						</div>
					</div> */}
			</div>
		</Layout>
	);
};

export const pageQuery = graphql`
	query NewsEventsQuery {
		allContentfulEventsAndNews {
			edges {
				node {
					title
					photos {
						sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
					featuredEvent {
						eventName
						dateTime
						description {
							childMarkdownRemark {
								html
							}
						}
						eventImage {
							sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: FILL) {
								...GatsbyContentfulSizes_withWebp
							}
						}
					}
				}
			}
		}
		allContentfulDateToRemember(sort: { fields: [startDate], order: ASC }) {
			edges {
				node {
					date
					startDate
					description {
						childMarkdownRemark {
							html
						}
					}
					extraInfo
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
