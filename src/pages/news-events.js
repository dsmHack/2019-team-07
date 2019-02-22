/*jshint esversion: 6 */

import { graphql } from "gatsby";
import Img from "gatsby-image";
import get from "lodash/get";
import React from "react";
import { Calendar, DollarSign } from "react-feather";
import Helmet from "react-helmet";
import HrefButton from "../components/href-button";
import Layout from "../layouts";
import styles from "./news-events.module.css";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const news = get(this, "props.data.allContentfulNews.edges");
		const events = get(this, "props.data.allContentfulEvent.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`News and Events - ${siteTitle}`} />
					<div className="events-wrapper">
						<h2 className="section-headline">Latest Event</h2>
						{events.map(({ node }) => (
							<div className="row">
								<div className={styles.eventData}>
									<h3 className={styles.title}>{node.eventName}</h3>
									<div className={styles.meta}>
										<div className={styles.metaItem}>
											<Calendar /> {new Date(node.dateTime).toLocaleDateString("en-us")}
										</div>
										{node.price && (
											<div className={styles.metaItem}>
												<DollarSign /> {node.price}
											</div>
										)}
									</div>
									<p>{node.eventDetails}</p>
									<HrefButton href={node.url} value="Attend" />
								</div>
								<div className={styles.eventImage}>
									<Img sizes={node.eventImage.sizes} />
								</div>
							</div>
						))}
					</div>
					<div className="news-wrapper">
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
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query NewsEventsQuery {
		allContentfulNews(sort: { fields: [title], order: ASC }) {
			edges {
				node {
					title
					teaserText
					date
				}
			}
		}
		allContentfulEvent(sort: { fields: [dateTime], order: DESC }, limit: 1) {
			edges {
				node {
					eventName
					eventType
					eventDetails
					dateTime
					maxAttendees
					price
					url
					eventImage {
						sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
						}
					}
				}
			}
		}
	}
`;
