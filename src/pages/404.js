import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import _get from 'lodash/get'
import AlertTriangle from 'react-feather/dist/icons/alert-triangle'

const NotFoundPage = ({ data }) => (
  <main className="fourOfour">
    <Helmet>
      <title>404 – Page Not Found</title>
    </Helmet>
    <section className="section thick dark ">
      <div className="container skinny taCenter">
        <p>
          <AlertTriangle size="5rem" />
        </p>
        <h1>404 - Page Not Found</h1>
        <p>
          We can't find the page you are looking for!<br />Head back to{' '}
          <Link to="/">{_get(data, 'globalSettings.siteTitle')}</Link>
        </p>
      </div>
    </section>
  </main>
)

export default NotFoundPage

export const query = graphql`
  query NotFoundPageQuery {
    globalSettings: settingsYaml {
      siteTitle
    }
  }
`
