import React from "react";
import Img from "gatsby-image";

import styles from "./hero-image.module.css";

export default ({ imageSizes, title }) => (
	<div className={styles.hero}>
		<Img className={styles.heroImage} sizes={imageSizes} />
		<div className={styles.heroText}>
			<h1 className={styles.heroTitle}>{title}</h1>
		</div>
	</div>
);
