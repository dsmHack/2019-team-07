import React from "react";
import Link from "gatsby-link";
import styles from "./navigation.module.css";

export default () => (
	<nav role="navigation" className={styles.navigation}>
		<ul className={styles.navigationList}>
			<li className={styles.navigationItem}>
				<Link to="/">
					<img src="./logo.jpg" /> Welcome
				</Link>
			</li>
			<li className={styles.navigationItem}>
				<Link to="/">About Us</Link>
			</li>
			<li className={styles.navigationItem}>
				<Link to="/">New & Events</Link>
			</li>
			<li className={styles.navigationItem}>
				<Link to="/">Giving</Link>
			</li>
			<li className={styles.navigationItem}>
				<Link to="/">Contact</Link>
			</li>
			<li className={styles.navigationItem}>
				<button className={styles.navButton}>Sign In</button>
			</li>
		</ul>
	</nav>
);
