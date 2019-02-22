import React from "react";
import styles from "./mission.module.css";

export default ({ mission }) => (
	<div className={styles.mission}>
		<h2 className={styles.missionTitle}>{mission.title}</h2>
		<div
			dangerouslySetInnerHTML={{
				__html: mission.body.childMarkdownRemark.html
			}}
		/>
	</div>
);
