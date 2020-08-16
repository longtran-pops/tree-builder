import React from 'react';
import BaseNode from './BaseNode'
import LeafNode from './LeafNode'
import './TreeNode.css'

function renderChildNode(data, dispatch) {
  return (
    <>
      {data&&data.map(nodeElement => (
        <div className="tree-node-item" key={nodeElement.id}>
          <BaseNode name={nodeElement.name}/>
          {nodeElement.data&&renderChildNode(nodeElement.data, dispatch)}
          <div className="tree-node-item">
            <LeafNode nodeLevel={nodeElement.level} nodeLength={nodeElement.nodeLength} nodeId={nodeElement.id} dispatch={dispatch}/>
          </div>
        </div>
      ))}
    </>
  )
}

function TreeNode({node, dispatch}) {
  return (
    <div className="tree-node">
      <BaseNode name={node.name}/>
      {renderChildNode(node.data, dispatch)}
      <div className="tree-node-item">
        <LeafNode nodeLevel={node.level} nodeLength={node.nodeLength} dispatch={dispatch} nodeId='0'/>
      </div>
    </div>
  )
}

export default TreeNode