import get from "lodash/get";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";
import { graphql } from "gatsby";
import styles from "./membership.module.css";
import HeroImage from "../components/hero-image";
import { AuthContext } from "../components/auth";
import { Phone, Mail } from "react-feather";

export default ({ data }) => {
  const siteTitle = get(data, "site.siteMetadata.title");
  const members = get(data, "allContentfulMember.edges");
  const membership = get(data, "allContentfulMembership.edges");
  const context = useContext(AuthContext);

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
            <div className={styles.criteria}>
              <div
                dangerouslySetInnerHTML={{
                  __html: node.body.childMarkdownRemark.html
                }}
              />
            </div>
          </div>
        ))}
        <div className="wrapper">
          <h2 className="section-headline top-margin text-centered">
            Meet our Members
          </h2>
          <ul className={styles.memberList}>
            {members.map(({ node }) => {
              return (
                <li key={node.id}>
                  <strong>{node.name}</strong>
                  <div>
                    {node.company} - {node.title}
                  </div>
                  {context.isLoggedIn && (
                    <div>
                      {node.email && (
                        <div className={styles.extra}>
                          <Mail size={12} color="#667" /> {node.email}
                        </div>
                      )}
                      {node.phone && (
                        <div className={styles.extra}>
                          <Phone size={12} color="#667" /> {node.phone}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

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
