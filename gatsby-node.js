/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  console.log(page);
  const { createPage, deletePage } = actions;

  if (page.path === '/') {
    page.matchPath = '/*';

    // Update the page.
    createPage(page);
  }
};
