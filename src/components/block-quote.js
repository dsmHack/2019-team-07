import React from "react";
import styles from "./block-quote.module.css";

export default ({ quote, cite }) => (
	<blockquote className={styles.blockquote}>
		<div className={styles.blockquoteWrapper}>
			<div className={styles.quote}>
				<span
					dangerouslySetInnerHTML={{
						__html: quote.childMarkdownRemark.html
					}}
				/>
			</div>
			<div className={styles.cite}>- {cite}</div>
		</div>
	</blockquote>
);
