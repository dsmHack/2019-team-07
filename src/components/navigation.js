import { graphql, navigate, StaticQuery } from "gatsby";
import Link from "gatsby-link";
import React, { useEffect, useState } from "react";
import { handleLogin, initAuth, isLoggedIn } from "./auth";
import Button from "./button";
import LinkButton from "./link-button";
import styles from "./navigation.module.css";
import { Menu } from "react-feather";

const handleSubmit = () => handleLogin(() => navigate(`/members/`));

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

	useEffect(() => {
		initAuth();
	}, []);

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
								{isLoggedIn() ? (
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
								{isLoggedIn() ? (
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
