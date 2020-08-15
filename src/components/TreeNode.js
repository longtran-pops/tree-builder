import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

class TreeNode extends Component {

  getNodeLabel(node) {
    return node.label;
  }

  onClickAddChildNode(node) {
    this.props.onClickAddChildNode(node);
  }

  render() {
    const { node, getChildNodes } = this.props;
    return (
      <ul>
        <li>
          <label>
            { this.getNodeLabel(node) }
          </label>
        </li>
        { getChildNodes(node).map((childNode, index) => {
          return (
            <TreeNode 
              {...this.props}
              key={index}
              node={childNode}
            />
          );
        }) }
        <ul>
          <li className="add" onClick={() => this.onClickAddChildNode(node)}>
            <label>+</label>
          </li>
        </ul>
      </ul>
    );
  }
}

TreeNode.propTypes = {
  node: PropTypes.object,
  getChildNodes: PropTypes.func,
  onClickAddChildNode: PropTypes.func,
};

export default TreeNode;
