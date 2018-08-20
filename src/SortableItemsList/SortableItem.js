import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import flow from "lodash/flow";
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceMonitor,
  DragSourceConnector
} from "react-dnd";
import { XYCoord } from "dnd-core";

const itemSource = {
  beginDrag(props) {
    return {
      index: props.index,
      ...props.item
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.handleMove(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class SortableItem extends React.Component {
  render() {
    const {
      item,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      connectDropTarget(
        <div className="items-list-sortable-item" style={{ opacity }}>
          {item.content} - {item.id}
        </div>
      )
    );
  }
}

SortableItem.propTypes = {
  item: PropTypes.object
};

export default flow(
  DragSource("items-list-item", itemSource, collect),
  DropTarget("items-list-item", itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(SortableItem);
