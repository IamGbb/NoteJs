import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keyword' content={keywords}/>
    </Helmet>  )
}

Meta.defaultProps = {
    title: 'Welcome to NoteJs',
    description: 'We love programming and chords(except c#, we dont like c#)',
    keywords: 'Choose your instrument and start playing)'
}

export default Meta