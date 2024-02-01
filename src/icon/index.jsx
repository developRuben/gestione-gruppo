import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Icon({icon}) {
  return (
    <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
  )
}
