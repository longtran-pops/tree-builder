import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class TreeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
    this.onSubmitAddNode = this.onSubmitAddNode.bind(this);
  }

  onSubmitAddNode() {
    this.props.onSubmitAddNode(this.state.label);
  }

  render() {
    return (
      <Fragment>
        <label>Node Name</label>
        <input type="text" onChange={e => this.setState({ label: e.target.value })} />
        <button onClick={this.onSubmitAddNode} disabled={!this.state.label}>Save</button>
      </Fragment>
    );
  }
}

TreeInput.propTypes = {
  onSubmitAddNode: PropTypes.func,
};

export default TreeInput;
