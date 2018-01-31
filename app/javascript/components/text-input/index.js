import React from 'react'
import PropTypes from 'prop-types'

export default function TextInput(props) {
  const className = props.error.length === 0
    ? '' : 'invalid'
  switch(props.display) {
    case 'long':
      return <LongTextInput {...props} className={className} />

    default:
      return <ShortTextInput {...props} className={className} />
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  display: PropTypes.oneOf(['short', 'long'])
}


function ShortTextInput(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type='text'
        value={props.value}
        className={props.className}
        onChange={props.onChange}
      />
      { <span>{props.error}</span> }
    </div>
  )
}

function LongTextInput(props) {
  return (
    <div>
      <label>{props.label}</label>
      <textarea
        className={props.className}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
      { <span>{props.error}</span> }
    </div>
  )
}
