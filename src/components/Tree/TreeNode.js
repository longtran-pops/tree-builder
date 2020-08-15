import React from 'react';
import Node from './Node';

const TreeNode = ({ node, setEditNode }) => {
  const { children, value, id } = node;

  const nodes =
    children && children.length > 0 ? (
      <ul>
        {children.map((node, indx) => {
          return <TreeNode node={node} key={indx} setEditNode={setEditNode} />;
        })}
      </ul>
    ) : null;

  return (
    <li>
      <Node val={value} id={id} setEditNode={setEditNode} />
      {nodes}
    </li>
  );
};

export default TreeNode;
