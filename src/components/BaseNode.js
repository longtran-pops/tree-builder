import React from 'react';
import './BaseNode.css'

function BaseNode({name}) {
  return (
    <div className="base-node">
      {name}
    </div>
  )
}

export default BaseNode