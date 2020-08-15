import React, { useState, useRef } from 'react';

import Tree from './components/Tree/Tree';
import data from './components/Tree/data';

import './App.scss';

function updateTree(tree, value, newValue, key = 'id', reverse = false) {
  const stack = [tree];
  while (stack.length) {
    const node = stack[reverse ? 'pop' : 'shift']();
    if (node[key] === value) {
      node.value = newValue;
      return tree;
    }
    node.children && stack.push(...node.children);
  }
  return null;
}

function App() {
  const textInput = useRef(null);
  const [nodeEdit, setNodeEdit] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [dataSource, setDataSource] = useState(data);

  const handleSetIdEditNode = (text) => {
    setNodeEdit(text);
    textInput.current.focus();
  };

  const handleChangeInput = (event) => {
    setNodeName(event.target.value);
  };

  const handleSave = () => {
    let tree = {};
    Object.assign(tree, dataSource);
    const result = updateTree(tree, nodeEdit, nodeName);

    setDataSource(result);
    setNodeName('');
    setNodeEdit('');
  };

  return (
    <div className="App">
      <div className="tree">
        <Tree node={dataSource} setEditNode={handleSetIdEditNode} />
      </div>
      <div className="input-zone">
        <label>Name</label>
        <input
          ref={textInput}
          value={nodeName}
          onChange={handleChangeInput}
          placeholder="Enter node name"
          disabled={!nodeEdit}
        />

        <button disabled={!nodeEdit} onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
