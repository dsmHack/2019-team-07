import React from "react";
// eslint-disable-next-line
import { Link } from "gatsby";
import styles from "./link-button.module.css";

export default ({ onClick, value, block, ghost }) => (
	<button
		className={ghost ? styles.ghost : styles.button}
		style={block ? { display: "block", textAlign: "center" } : null}
		onClick={onClick}
	>
		{value}
	</button>
);
