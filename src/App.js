import React, { useState, useCallback } from 'react';

import Tree from './components/Tree/Tree';
import data from './components/Tree/data';

import './App.scss';
import { updateTree } from './utils';

function App() {
  const [nodeEdit, setNodeEdit] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [dataSource, setDataSource] = useState(data);

  const handleSetIdEditNode = (text) => {
    setNodeEdit(text);
  };

  const handleChangeInput = useCallback((event) => {
    setNodeName(event.target.value);
  }, []);

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
