import Img from "gatsby-image";
import React from "react";
import styles from "./feature.module.css";
import LinkButton from "./link-button";

export default ({ feature }) => (
	<div className={styles.featureWrapper}>
		<div className={styles.feature}>
			{feature.image && <Img sizes={feature.image.sizes} />}
			<div style={{ flex: 1 }}>
				<div
					dangerouslySetInnerHTML={{
						__html: feature.description.childMarkdownRemark.html
					}}
				/>
			</div>
			<LinkButton to={feature.callToActionUrl} value={feature.callToActionText} block />
		</div>
	</div>
);
