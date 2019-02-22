/*jshint esversion: 6 */

import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
        const news = get(this, "props.data.allContentfulNews.edges");
        const events = get(this, "props.data.allContentfulEvent.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={`News and Events - ${siteTitle}`} />
					<div className="news-wrapper">
						<h2 className="section-headline">News</h2>
						<ul className="news-list">
							{news.map(({ node }) => {
								return (
									<li key={node.id}>
										{node.title}
									</li>
								);
							})}
						</ul>
					</div>
                    <div className="events-wrapper">
						<h2 className="section-headline">Events</h2>
						<ul className="events-list">
							{events.map(({ node }) => {
								return (
									<li key={node.id}>
										{node.eventName} - {node.eventType}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
query NewsEventsQuery {
    allContentfulNews(sort: {fields: [title], order: ASC}) {
      edges {
        node {
          title
        }
      }
    }
    allContentfulEvent(sort: {fields: [eventName], order: ASC}) {
      edges {
        node {
          eventName
          eventType
          eventDetails
          maxAttendees
          price
          url
        }
      }
    }
  }
`;
