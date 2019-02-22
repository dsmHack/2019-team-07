import React from "react";
import styles from "./mission.module.css";

export default ({ mission }) => (
	<div className={styles.mission}>
		<div className={styles.missionTitle}>
			<h2 className="section-headline">{mission.title}</h2>
		</div>
		<div className={styles.missionText}>
			<div
				dangerouslySetInnerHTML={{
					__html: mission.body.childMarkdownRemark.html
				}}
			/>
		</div>
	</div>
);
