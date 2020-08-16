import React, {useReducer, useState} from 'react'
import TreeNode from './components/TreeNode'
import './App.css'
const initialData = JSON.parse(localStorage.getItem('localNode'))|| {
  node: {
    name: 'root',
    level: 1,
    nodeLength: 0,
    data: [],
  },
  selectedNodeLevel: null
}

const reducer = function(state, action) {
  const bfs = function (startNode,callback = console.log) {
    if (!startNode) return
    const stack = []
    const result = []
    const doCallback = callback
    stack.push(startNode)

    while (stack.length) {
      const nodeItem = stack.pop()
      const leaveNodes = nodeItem.data || []
      result.push(doCallback(nodeItem))
      leaveNodes.forEach((childNode) => stack.push(childNode))
    }
    return result
  }

  function traverseNode(state, payload) {
    const {selectedNodeLevel: {nodeLevel, nodeLength, nodeId}, name} = payload
    let newNode = {...state.node}
    if(nodeId === '0') {
      newNode.data = [...newNode.data, {
        id: `${nodeLength+1}`,
        name: name,
        level: nodeLevel+1,
        nodeLength: 0,
        data: []
      }]
      newNode.nodeLength = newNode.data.length
    } else {
      let foundNode = null;
      let subData = [];
      let newNodeId = nodeId;
      const getNewNode = (nde) => {
        if(nde.id === newNodeId) foundNode = nde
      }
      const filterData = node => node.id !== subData.id
      while(newNodeId.length) {
        bfs(state.node, getNewNode)

        if(nodeId === foundNode.id) {
          subData = {
            ...foundNode,
            data: [
              ...foundNode.data,
              {
                id: `${foundNode.id}${nodeLength+1}`,
                name: name,
                level: nodeLevel+1,
                nodeLength: 0,
                data: [],
              }
            ],
            nodeLength: foundNode.data.length+1
          }
        }
        if(nodeId !== foundNode.id) {
          subData = {
            ...foundNode,
            data: [
              ...foundNode.data.filter(filterData),
              {
                ...subData
              }
            ]
          }
        }
        newNodeId = newNodeId.slice(0, -1)
      }

      // foundNode.level always 2 after loop
      newNode = {
        ...newNode,
        data: [
          ...newNode.data.filter(node => node.id !== foundNode.id),
          {
            ...subData
          }
        ]
      }
    }

    const localData = {...state, node:{...newNode}, selectedNodeLevel: null};
    localStorage.setItem('localNode', JSON.stringify(localData))
    return localData
  }

  switch(action.type) {
    case 'newNode': return {...state, selectedNodeLevel: action.payload};
    case 'saveNode': return traverseNode(state, action.payload);
    default: return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData)
  const [inputName, setInputName] = useState('')

  const {selectedNodeLevel} = state

  // form save event
  const saveNode = (evt) => {
    evt.preventDefault();
    if(!inputName.length) return
    setInputName('')
    dispatch({
      type: 'saveNode',
      payload: {
        name: inputName,
        selectedNodeLevel
      }
    })
  }

  // set name of input
  const getInput = (evt) => {
    setInputName(evt.target.value)
  }
  return (
    <div className='App'>
      <div className='tree'>
        <TreeNode node={state.node} dispatch={dispatch}/>
      </div>
      <form onSubmit={saveNode}>
        <div className='input-zone'>
            <label>Name</label>
            <input disabled={!selectedNodeLevel} placeholder='Node Name' onChange={getInput} required value={inputName}/>
            <button disabled={!selectedNodeLevel}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default App
