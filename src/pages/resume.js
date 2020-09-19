import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

export default ({ data }) => {
  const { siteMetadata } = data.site
  const resumes = data.allMarkdownRemark.edges
  const resume = resumes
    .filter(({ node }) => node.frontmatter.type === "resume")
    .map(({ node }) => node)[0]

  return (
    <Layout location={location} title={siteMetadata.title}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${0} ${rhythm(0.5)} ${rhythm(0.5)} ${rhythm(0.5)}`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: resume.html }} />
      </div>
    </Layout>

  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            type
          }
        }
      }
    }
  }
`
