import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";
import Helmet from "react-helmet";
import BlockQuote from "../components/block-quote";
import HeroImage from "../components/hero-image";
import LinkButton from "../components/link-button";
import Layout from "../layouts";
import styles from "./about.module.css";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const about = get(this, "props.data.allContentfulAbout.edges");

    return (
      <Layout>
        <div>
          <Helmet title={`About Us - ${siteTitle}`} />
          <div>
            {about.map(({ node }) => (
              <div key={node.id}>
                <HeroImage photos={node.photos} title={node.title} />
                <div className={`row ${styles.row} ${styles.rowReverse}`} style={{ marginBottom: "4em" }}>
                  <div className={`col text-centered ${styles.col}`}>
                    <h2 className="section-headline">Our Chapter</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: node.chapterInformation.childMarkdownRemark.html
                      }}
                    />
					<LinkButton to="news-events" value="Join our community" />
                  </div>
                  <div className={`col ${styles.col}`}>
                    <img src={node.chapterImage.sizes.src} alt="" />
                  </div>
                </div>
                <div className={`row ${styles.row}`} style={{ marginBottom: "4em" }}>
                  <div className={`col ${styles.col} ${styles.pinwheel}`}>
                    <img className={styles.landscape} src={node.aboutLandscapePhotos[0].sizes.src} alt="" />
                    <img className={styles.portrait} src={node.aboutPortraitPhotos[0].sizes.src} alt="" />
                    <img className={styles.portrait} src={node.aboutPortraitPhotos[1].sizes.src} alt="" />
                    <img className={styles.landscape} src={node.aboutLandscapePhotos[1].sizes.src} alt="" />
                  </div>
                  <div className={`{col ${styles.col} text-centered`}>
                    <h2 className="section-headline text-center">
                      About Les Dames
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: node.about.childMarkdownRemark.html
                      }}
                    />
                  </div>
                </div>
                <BlockQuote quote={node.quote} cite={node.quotePerson} />
              </div>
            ))}
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
          id
          title
          chapterInformation {
            childMarkdownRemark {
              html
            }
          }
          chapterImage {
            sizes(maxWidth: 600, maxHeight: 350, resizingBehavior: FILL) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          photos {
            contentful_id
            sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          about {
            childMarkdownRemark {
              html
            }
          }
          aboutLandscapePhotos {
            sizes(maxWidth: 400, maxHeight: 300, resizingBehavior: FILL) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          aboutPortraitPhotos {
            sizes(maxWidth: 200, maxHeight: 300, resizingBehavior: FILL) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          quote {
            childMarkdownRemark {
              html
            }
          }
          quotePerson
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
