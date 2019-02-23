import React from "react";
import { Link } from "gatsby";
import styles from "./link-button.module.css";

export default ({ onClick, value, block }) => (
	<button
		className={styles.button}
		style={block ? { display: "block", textAlign: "center" } : null}
		onClick={onClick}
	>
		{value}
	</button>
);
