/*jshint esversion: 6 */

const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	const additionalPage = path.resolve("./src/templates/additional-page.js");
	return graphql(
		`
          {
            allContentfulAdditionalPage {
              edges {
                node {
									slug
                  title
                }
              }
            }
					}
        `
	).then((result) => {
		if (result.errors) {
			console.log(result.errors);
		}

		const posts = result.data.allContentfulAdditionalPage.edges;
		posts.forEach((post) => {
			createPage({
				path: `/page/${post.node.slug}/`,
				component: additionalPage,
				context: {
					slug: post.node.slug
				}
			});
		});
	});
};
