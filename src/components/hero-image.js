import React from "react";
import Img from "gatsby-image";

import styles from "./hero-image.module.css";

export default ({ photos, title }) => (
	<div className={styles.hero}>
		<div className={styles.photos}>
			{photos.map((photo) => (
				<div key={photo.contentful_id}>
					<Img className={styles.heroImage} sizes={photo.sizes} />
				</div>
			))}
		</div>
		<div className={styles.heroText}>
			<h1 className={styles.heroTitle}>{title}</h1>
		</div>
	</div>
);
