import React from "react";
import { Link } from "gatsby";
import styles from "./link-button.module.css";

export default ({ to, value, block, ghost }) => (
	<Link
		to={to}
		className={ghost ? styles.ghost : styles.button}
		style={block ? { display: "block", textAlign: "center" } : null}
	>
		{value}
	</Link>
);
