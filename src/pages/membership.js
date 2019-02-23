import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import styles from "./membership.module.css";
import HeroImage from "../components/hero-image";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const members = get(this, "props.data.allContentfulMember.edges");
		const membership = get(this, "props.data.allContentfulMembership.edges");

		return (
			<Layout>
				<div>
					<Helmet title={`Membership - ${siteTitle}`} />
					{membership.map(({ node }) => (
						<div>
							<HeroImage photos={node.photos} title={node.title} />
							<div className="lead">
								<div
									dangerouslySetInnerHTML={{
										__html: node.lead.childMarkdownRemark.html
									}}
								/>
							</div>
							<h2 className="section-headline text-centered">{node.bodyTitle}</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: node.body.childMarkdownRemark.html
								}}
							/>
						</div>
					))}
					<div className="wrapper">
						<h2 className="section-headline text-centered">Meet our Members</h2>
						<ul className={styles.memberList}>
							{members.map(({ node }) => {
								return (
									<li key={node.id}>
										<strong>{node.name}</strong>
										<div>
											{node.company} - {node.title}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Layout>
		);
	}
}

export default RootIndex;

export const pageQuery = graphql`
	query MembershipQuery {
		allContentfulMembership {
			edges {
				node {
					title
					lead {
						childMarkdownRemark {
							html
						}
					}
					bodyTitle
					body {
						childMarkdownRemark {
							html
						}
					}
					photos {
						sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
							...GatsbyContentfulSizes_withWebp
						}
					}
				}
			}
		}
		allContentfulMember(sort: { fields: [name], order: ASC }) {
			edges {
				node {
					name
					title
					company
					email
					phone
					facebook
					twitter
					id
				}
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`;
