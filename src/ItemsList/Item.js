import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

const itemSource = {
  beginDrag(props) {
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.item.id);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class Item extends React.Component {
  render() {
    const { item, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div className="items-list-item" style={{ opacity }}>
        {item.content} - {item.id}
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object
};

export default DragSource("items-list-item", itemSource, collect)(Item);
