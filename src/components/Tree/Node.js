import React from 'react';
import cn from 'classnames';

const Node = ({ val, setEditNode, id }) => {
  const nodeClasses = cn('node', { node_empty: !val });

  return (
    <>
      {val && (
        <label className={nodeClasses}>
          <span>{val}</span>
        </label>
      )}
      {!val && (
        <label className={nodeClasses} onClick={() => setEditNode(id)}>
          <span>+</span>
        </label>
      )}
    </>
  );
};

export default Node;
