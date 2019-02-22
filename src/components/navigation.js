import { graphql, StaticQuery } from "gatsby";
import Link from "gatsby-link";
import React from "react";
import LinkButton from "./link-button";
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
					<li className={styles.navigationItemLogo}>
						<Link to="/">
							<img src="/logo.jpg" alt="" />
						</Link>
					</li>

					{data.allContentfulMainNavigation.edges[0].node.navigationItems.map((item) => (
						<li className={styles.navigationItem} key={item.pageSlug}>
							<Link
								to={(item.pageSlug || "") + "/"}
								className={styles.navigationLink}
								activeClassName={styles.navigationLinkActive}
							>
								{item.navigationText}
							</Link>
						</li>
					))}
					<li className={styles.navigationItem}>
						<span style={{ fontSize: "0.9em" }}>
							<LinkButton to="login" value="Login" />
						</span>
					</li>
				</ul>
			</nav>
		)}
	/>
);
