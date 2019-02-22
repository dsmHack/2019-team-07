import React from "react";
import styles from "./footer.module.css";
import { Facebook, Instagram, Twitter } from "react-feather";

export default () => (
	<div className={styles.footer}>
		<div className="wrapper">
			<div className="row">
				<div>
					<p>Les Dames d'Escossier | Greater Des Moines Chapter</p>
					<p>&copy; {new Date().getFullYear()}</p>
				</div>
				<div className="row">
					<a href="https://www.facebook.com/damesdsm/" aria-label="Dames DSM Facebook">
						<Facebook />
					</a>
					<a href="https://www.twitter.com" aria-label="Dames DSM Facebook">
						<Twitter />
					</a>
					<a href="https://www.facebook.com/damesdsm/" aria-label="Dames DSM Facebook">
						<Instagram />
					</a>
				</div>
			</div>
		</div>
	</div>
);
