import Img from "gatsby-image";
import React from "react";
import styles from "./feature.module.css";
import LinkButton from "./link-button";

export default ({ feature }) => (
	<div className={styles.featureWrapper}>
		<div className={styles.feature}>
			<Img sizes={feature.image.sizes} />
			<p
				style={{ flex: 1 }}
				dangerouslySetInnerHTML={{
					__html: feature.description.childMarkdownRemark.html
				}}
			/>
			<LinkButton to={feature.callToActionUrl} value={feature.callToActionText} block />
		</div>
	</div>
);
