import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import TreeInput from './TreeInput';

const data = [
  {
    path: 'root',
    label: 'Root',
    isRoot: true,
    children: [
      {
        path: 'root/level_1a',
        label: 'Level 1A',
        children: [],
      },
      {
        path: 'root/level_1b',
        label: 'Level 1B',
        children: [
          {
            path: 'root/level_1b/level_2a',
            label: 'Level 2A',
            children: [],
          },
        ],
      },
    ],
  },
];

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: data,
      isToggleAddNode: false,
      parentNode: {},
    };
    this.getRootNodes = this.getRootNodes.bind(this);
    this.handleClickAddChildNode = this.handleClickAddChildNode.bind(this);
    this.handleSubmitAddNode = this.handleSubmitAddNode.bind(this);
  }

  getRootNodes() {
    const { nodes } = this.state;
    return nodes.filter((node) => node.isRoot === true);
  }
  
  getChildNodes = (node) => {
    if (!node.children) {return [];}
    return node.children;
  }

  convertToSlug(text){
    return text
      .toLowerCase()
      .replace(/ /g,'_')
      .replace(/[^\w-]+/g,'');
  }

  prepareNodeToAdd(nodes, path, label){
    if (nodes.path === path){
      const slug = this.convertToSlug(label);
      nodes.children.push({
        path: `${path}/${slug}`,
        label,
        children: [],
      });
    } else if (nodes.children !== null){
      for(let i = 0; nodes.children && i < nodes.children.length; i++){
        this.prepareNodeToAdd(nodes.children[i], path, label);
      }
    }
    return nodes;
  }

  handleClickAddChildNode(parentNode) {
    this.setState({
      isToggleAddNode: true,
      parentNode
    });
  }

  handleSubmitAddNode(label) {
    const { nodes, parentNode } = this.state;
    const node = this.prepareNodeToAdd(nodes[0], parentNode.path, label);
    this.setState({
      nodes: [...[], node],
      isToggleAddNode: false,
    });
  }

  render() {
    const rootNodes = this.getRootNodes();
    const { isToggleAddNode } = this.state;
    return (
      <div className="tree">
        <div className="tree-view">
          { rootNodes.map((node, index) => (
            <TreeNode
              key={index}
              node={node}
              getChildNodes={this.getChildNodes}
              onClickAddChildNode={this.handleClickAddChildNode}
            />
          )) }
        </div>
        <div className="tree-input">
          { isToggleAddNode ? <TreeInput onSubmitAddNode={this.handleSubmitAddNode} /> : null }
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  nodes: PropTypes.array,
};

export default Tree;
