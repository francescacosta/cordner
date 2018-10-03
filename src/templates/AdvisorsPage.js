import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Image from '../components/Image'
import Content from '../components/Content.js'
import NumberedHeader from '../components/NumberedHeader'
import Link from 'gatsby-link'

import './AdvisorsPage.scss'

// Export Template for use in CMS preview
export const AdvisorsPageTemplate = ({
  title,
  featuredImage,
  categories,
  section1,
  section2,
  team
}) => (
  <main className="Advisors">
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {console.log(team)}
    <PageHeader title={title} backgroundImage={featuredImage} />

    <section className="section--1 section dark">
      <div className="container">
        <div className="column">
          <NumberedHeader number="01" title="Who Are We" />
          <h2>{section1.title}</h2>
        </div>
        <div className="column">
          <h3>{section1.rightTitle}</h3>
          {section1.rightContent}
        </div>
      </div>
    </section>

    <section className="TeamSection dark">
      <div className="grid">
        {team.map((member, index) => (
          <Link to={member.slug} className="single--team relative">
            <Image background src={member.featuredImage} size="cover" />

            <div className="sneak-peak color">
              <div className="sneak-peak--text">
                <h3>{member.title}</h3>
                <p>{member.content}</p>
              </div>
            </div>
          </Link>
        ))}

        <div className="services-sneak">
          <div className="container">
            <h2>{section2.title}</h2>
            <p className="big-body">{section2.content}</p>
            <Link to={section2.link} className="Button">
              {section2.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
)

const AdvisorsPage = ({ data: { page, team } }) => (
  <AdvisorsPageTemplate
    {...page}
    {...page.frontmatter}
    body={page.html}
    team={team.edges.map(edge => ({
      ...edge.node.frontmatter,
      ...edge.node.fields
    }))}
  />
)

export default AdvisorsPage

export const pageQuery = graphql`
  query AdvisorsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        featuredImage {
          ...FluidImage
        }
        categories {
          category
        }
        section1 {
          title
          rightTitle
          rightContent
        }
        section2 {
          title
          subtitle
          button {
            label
            link
          }
        }
      }
    }
    team: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "team" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            categories {
              category
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
