import React from 'react';
import './LeafNode.css'

function LeafNode({nodeLevel, nodeLength, dispatch, nodeId}) {
  const addNewNode = () => {
    dispatch({type: 'newNode', payload: {
      nodeLevel,
      nodeLength,
      nodeId
    }})
  }
  return (
    <div className="leaf-node" onClick={addNewNode}>
      +
    </div>
  )
}

export default LeafNode