import React from "react";
import styles from "./footer.module.css";
import { Facebook, Instagram, Twitter } from "react-feather";

export default () => (
	<div className={styles.footer}>
		<div className="container">
			<div className="row row-center">
				<div>
					&copy; {new Date().getFullYear()} - Les Dames d'Escossier International · Greater Des Moines Chapter
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
