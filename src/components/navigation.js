import { graphql, navigate, StaticQuery } from "gatsby";
import Link from "gatsby-link";
import React, { useContext, useState, useEffect } from "react";
import { Menu } from "react-feather";
import { AuthContext } from "./auth";
import Button from "./button";
import LinkButton from "./link-button";
import styles from "./navigation.module.css";

export default () => {
	const [ show, setShow ] = useState(false);

	const showMenu = () => {
		const close = () => {
			setShow(false);
			document.body.removeEventListener("click", close);
		};

		setShow(true);

		document.body.addEventListener("click", close);
	};

	const context = useContext(AuthContext);
	console.log(context);
	const handleSubmit = () => context.login(() => navigate(`/members/`));

	return (
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
								<img className={styles.logoText} src="/logo-text.svg" alt="" />
								<span className={styles.logo}>
									<img src="/logo.svg" alt="" />
									<span>
										<strong style={{ display: "block" }}>
											Les Dames d'Escossier International
										</strong>
										Greater Des Moines Chapter
									</span>
								</span>
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
								{context.isLoggedIn ? (
									<LinkButton to={"members/"} value="Members" />
								) : (
									<Button onClick={handleSubmit} value="Login" />
								)}
							</span>
						</li>
						<li className={`${styles.navigationItem} ${styles.menu}`}>
							<a onClick={showMenu}>
								<Menu />
							</a>
						</li>
					</ul>

					{show && (
						<ul className={styles.dropdownMenu}>
							{data.allContentfulMainNavigation.edges[0].node.navigationItems.map((item) => (
								<li key={item.pageSlug}>
									<Link to={(item.pageSlug || "") + "/"} activeClassName={styles.dropdownActive}>
										{item.navigationText}
									</Link>
								</li>
							))}
							<li>
								{context.isLoggedIn ? (
									<Link to={"members/"}>Members</Link>
								) : (
									<a onClick={handleSubmit}>Login</a>
								)}
							</li>
						</ul>
					)}
				</nav>
			)}
		/>
	);
};
