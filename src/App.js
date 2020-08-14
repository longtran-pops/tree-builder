import React from 'react'
import './App.css'
const TreeNode = ({ name }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '16px',
        background: '#000',
        color: '#fff',
        borderRadius: '4px',
        minWidth: '60px',
        textAlign: 'center',
      }}
    >
      {name}
    </div>
  )
}
function App() {
  return (
    <div className='App'>
      <div className='tree'>
        <TreeNode name='root' />
      </div>
      <div className='input-zone'>
        <label>Name</label>
        <input value='' placeholder='Node Name' />
        <button>Save</button>
      </div>
    </div>
  )
}

export default App
