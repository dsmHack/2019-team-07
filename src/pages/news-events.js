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
import LinkButton from "../components/link-button";
import Layout from "../layouts";
import styles from "./news-events.module.css";
import HrefButton from "../components/href-button";

export default ({ data }) => {
	const siteTitle = get(data, "site.siteMetadata.title");
	const info = get(data, "allContentfulEventsAndNews.edges");
	const news = get(data, "allContentfulNews.edges");
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
										{node.featuredEvent.url && node.featuredEvent.callToActionEnabled && (
											<HrefButton href={node.featuredEvent.url} value={node.featuredEvent.callToActionLabel} />
										)}
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

				{context.isLoggedIn && (
					<div style={{ margin: "2em 0" }}>
						<h2 className="section-headline text-centered">News</h2>
						<div className="row">
							{news.map(({ node }) => (
								<article key={node.slug} className={styles.article}>
									<h3 className={styles.title}>{node.title}</h3>
									{node.date && (
										<div className={styles.metaItem}>
											<Calendar /> {node.date}
										</div>
									)}
									<p>{node.teaserText}</p>
									<LinkButton to={`/news/${node.slug}/`} value="Read more" ghost />
								</article>
							))}
						</div>
						<div className="text-centered" style={{ margin: "2em 0" }}>
							<LinkButton to="/members/#news" value="See all news" />
						</div>
					</div>
				)}
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
						url
						callToActionLabel
						callToActionEnabled
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
		allContentfulNews(sort: { fields: [date], order: DESC }, limit: 3) {
			edges {
				node {
					title
					slug
					teaserText
					date(formatString: "MMMM Do, YYYY")
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
