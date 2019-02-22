import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Link from "gatsby-link";
import styles from "./navigation.module.css";

export default () => (
	<StaticQuery
		query={graphql`
			query NavigationQuery {
				allContentfulMainNavigation(filter: { title: { eq: "Main Navigation" } }) {
					edges {
						node {
							navigationItems {
								navigationText
								pageSlug
							}
						}
					}
				}
			}
		`}
		render={(data) => (
			<nav role="navigation" className={styles.navigation}>
				<ul className={styles.navigationList}>
					<li className={styles.navigationItem}>
						<Link to="/">
							<img src="./logo.jpg" />
						</Link>
					</li>

					{data.allContentfulMainNavigation.edges[0].node.navigationItems.map((item) => (
						<li className={styles.navigationItem}>
							<Link to={item.pageSlug}>{item.navigationText}</Link>
						</li>
					))}
					<li className={styles.navigationItem}>
						<button className={styles.navButton}>Sign In</button>
					</li>
				</ul>
			</nav>
		)}
	/>
);
