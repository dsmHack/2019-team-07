import React from "react";
import styles from "./link-button.module.css";

export default ({ href, value, block, ghost }) => (
	<a
		href={href}
		className={ghost ? styles.ghostGreen : styles.button}
		style={block ? { display: "block", textAlign: "center" } : null}
	>
		{value}
	</a>
);
