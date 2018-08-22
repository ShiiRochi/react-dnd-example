import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Button
} from "reactstrap";

class ItemModal extends Component {
  state = {
    content: ""
  };

  onSubmit = () => {
    const { content } = this.state;
    this.props.onSubmit({ content });
    this.clearValues();
  };

  onCancel = () => {
    this.props.onCancel();
    this.clearValues();
  };

  handleItemChange = updateData => {
    this.setState(updateData);
  };

  clearValues = () => {
    this.setState({
      content: ""
    });
  };

  render() {
    const { visible } = this.props;
    const { content } = this.state;
    return (
      <Modal isOpen={visible}>
        <ModalHeader>Add New Element</ModalHeader>
        <ModalBody>
          <Label>Element Text</Label>
          <Input
            onChange={e => this.handleItemChange({ content: e.target.value })}
            value={content}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={this.onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ItemModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default ItemModal;
