import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const giving = get(this, "props.data.allContentfulGiving.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={`Giving - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline">Giving</h2>
						<ul className="Giving-list">
							{giving.map(({ node }) => {
								return (
									<li key={node.id}>
										{node.title}
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
	query GivingQuery {
		allContentfulGiving(sort: { fields: [title], order: ASC }) {
			edges {
				node {
                    title
                    scholarship
                    scholarshipPhoto{
						sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
						}
					}
                    grant
                    grantPhoto{
						sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
							...GatsbyContentfulSizes_withWebp
						}
					}
                    callToActionText
                    callToActionUrl
				}
			}
		}
	}
`;
