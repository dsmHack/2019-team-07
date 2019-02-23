import styles from "./dates-to-remember.module.css";
import React from "react";

export default ({ dtrs }) => (
	<div>
		<h2 className="section-headline text-centered">Dates to Remember</h2>
		<div className={styles.dtrRow}>
			{dtrs.filter((x) => new Date(x.node.startDate) > new Date()).map(({ node }) => (
				<div className={styles.dtr}>
					<h3 className={styles.dtrTitle}>{node.date}</h3>
					<div
						dangerouslySetInnerHTML={{
							__html: node.description.childMarkdownRemark.html
						}}
					/>
					{node.extraInfo && <p className={styles.dtrExtra}>{node.extraInfo}</p>}
				</div>
			))}
		</div>
	</div>
);
