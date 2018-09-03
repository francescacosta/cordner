import React from 'react'
import Link from 'gatsby-link'

import Image from './Image'

import './ContactSection.scss'

export default ({ image, title, content, link, buttonText }) => (
  <div className="ContactSection container">
    <Image background src={image} alt={title} size="cover" />

    <div className="container">
      <h2>{title}</h2>
      <p>{content}</p>
      <Link to={link} className="Button">
        {buttonText}
      </Link>
    </div>
  </div>
)
