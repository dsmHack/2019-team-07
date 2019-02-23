/*jshint esversion: 6 */

const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	const additionalPage = path.resolve("./src/templates/additional-page.js");
	const newsComponent = path.resolve("./src/templates/news-post.js");
	return graphql(
		`
          {
            allContentfulAdditionalPage {
              edges {
                node {
									slug
                }
              }
						}
						allContentfulNews {
							edges {
								node {
									slug
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

		const news = result.data.allContentfulNews.edges;
		news.forEach((post) => {
			createPage({
				path: `/news/${post.node.slug}/`,
				component: newsComponent,
				context: {
					slug: post.node.slug
				}
			});
		});
	});
};
