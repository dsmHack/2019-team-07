import React from "react";
import styles from "./link-button.module.css";

export default ({ href, value, block }) => (
	<a href={href} className={styles.button} style={block ? { display: "block", textAlign: "center" } : null}>
		{value}
	</a>
);
