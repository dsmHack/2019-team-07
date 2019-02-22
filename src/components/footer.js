import React from "react";
import styles from "./footer.module.css";

export default () => (
	<div className={styles.footer}>
		<div class="wrapper">
			<div class="row">
				<div>
					<p>Les Dames d'Escossier | Greater Des Moines Chapter</p>
					<p>&copy; {new Date().getFullYear()}</p>
				</div>
				<div>Twitter, etc..</div>
			</div>
		</div>
	</div>
);
