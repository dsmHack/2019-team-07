/*jshint esversion: 6 */

const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

		const newsPost = path.resolve("./src/templates/news-post.js");
		return graphql(
				`
          {
            allContentfulNews {
              edges {
                node {
                  title
									teaserText
									content{
										childMarkdownRemark {
											html
										}
									}
									date
                }
              }
            }
					}
        `
			).then((result) => {
				if (result.errors) {
					console.log(result.errors);
				}

				const posts = result.data.allContentfulNews.edges;
				posts.forEach((post, index) => {
					createPage({
						path: `/news/${post.node.title}/`,
						component: newsPost,
						context: {
							title: post.node.title
						}
					});
				});
			})
};
