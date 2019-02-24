import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { Facebook, Instagram, Twitter } from "react-feather";
import styles from "./footer.module.css";

export default () => (
	<StaticQuery
		query={graphql`
			query FooterQuery {
				allContentfulSocialMedia(filter: { title: { eq: "Social Media Links" } }) {
					edges {
						node {
							facebook
							twitter
							instagram
						}
					}
				}
			}
		`}
		render={(data) => {
			const node = data.allContentfulSocialMedia.edges[0].node;

			return (
				<div className={styles.footer}>
					<div className="container">
						<div className="row row-center">
							<div>
								&copy; {new Date().getFullYear()} - Les Dames d'Escoffier International · Greater Des
								Moines Chapter
							</div>
							<div className="row">
								{node.facebook && (
									<a href={node.facebook} aria-label="Dames DSM Facebook">
										<Facebook />
									</a>
								)}
								{node.twitter && (
									<a href={node.twitter} aria-label="Dames DSM Facebook">
										<Twitter />
									</a>
								)}
								{node.instagram && (
									<a href={node.instagram} aria-label="Dames DSM Facebook">
										<Instagram />
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}}
	/>
);
