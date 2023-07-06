import React from 'react'
import ReactMarkdown from 'react-markdown';

const Hints = (props) => {
  return (
    <>
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </>
  )
}

export default Hints