import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts'

import PageHeader from '../components/PageHeader'
import ServicesSection from '../components/ServicesSection'
import './ServicesIndex.scss'

// Export Template for use in CMS preview
export const ServicesIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  services = []
}) => (
  <Fragment>
    <main className="ServicesIndex">
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      {!!services.length && <ServicesSection services={services} />}
    </main>
  </Fragment>
)

// Export Default ServicesIndex for front-end
const ServicesIndex = ({ data }) => {
  const { page, services } = data
  return (
    <Layout>
      <ServicesIndexTemplate
        title={page.frontmatter.title}
        subtitle={page.frontmatter.subtitle}
        featuredImage={page.frontmatter.featuredImage}
        // pull frontmatter to root of post
        services={services.edges.map(post => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
      />
    </Layout>
  )
}

export default ServicesIndex

export const pageQuery = graphql`
  ## Query for ServicesIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ServicesIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          ...FluidImage
        }
      }
    }

    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            icon {
              ...FluidImage
            }
            featuredImage {
              ...MediumImage
            }
          }
        }
      }
    }
  }
`
