import { graphql, navigate, StaticQuery } from "gatsby";
import Link from "gatsby-link";
import React, { Component } from "react";
import { Menu } from "react-feather";
import { AuthContext } from "./auth";
import Button from "./button";
import LinkButton from "./link-button";
import styles from "./navigation.module.css";

export default class Navigation extends Component {
	static contextType = AuthContext;

	state = {
		show: false
	};

	showMenu() {
		const close = () => {
			this.setState({ show: false });
			document.body.removeEventListener("click", close);
		};

		this.setState({ show: true });

		document.body.addEventListener("click", close);
	}

	handleSubmit() {
		this.context.login(() => navigate("/members/"));
	}

	render() {
		const context = this.context;
		const show = this.state.show;
		console.log(context);

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
										to={"/" + (item.pageSlug || "") + "/"}
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
										<Button onClick={this.handleSubmit.bind(this)} value="Login" />
									)}
								</span>
							</li>
							<li className={`${styles.navigationItem} ${styles.menu}`}>
								<a onClick={this.showMenu.bind(this)}>
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
										<a onClick={this.handleSubmit.bind(this)}>Login</a>
									)}
								</li>
							</ul>
						)}
					</nav>
				)}
			/>
		);
	}
}
