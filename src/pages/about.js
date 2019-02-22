import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";

class RootIndex extends React.Component {
	render() {
		const siteTitle = get(this, "props.data.site.siteMetadata.title");
		const about = get(this, "props.data.allContentfulAbout.edges");

		return (
			<Layout>
				<div style={{ background: "#fff" }}>
					<Helmet title={`About Us - ${siteTitle}`} />
					<div className="wrapper">
						<h2 className="section-headline">About Us</h2>
						<ul className="about-list">
							{about.map(({ node }) => {
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
	query AboutUsQuery {
		allContentfulAbout(sort: { fields: [title], order: ASC }) {
			edges {
				node {
                    title
                    chapterInformation{
                        childMarkdownRemark{
                            html
                        }
                    }
                    about{
                        childMarkdownRemark{
                            html
                        }
                    }
                    mission{
                        childMarkdownRemark{
                            html
                        }
                    }
				}
			}
		}
	}
`;
