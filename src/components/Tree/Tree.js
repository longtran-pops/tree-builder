import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({ node, setEditNode }) => {
  return (
    <div className="Tree Tree-container">
      <ul>
        <TreeNode node={node} setEditNode={setEditNode} />
      </ul>
    </div>
  );
};

export default Tree;
