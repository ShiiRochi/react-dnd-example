import React from "react";
import { DropTarget } from "react-dnd";

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

class Target extends React.Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? "green" : "white";
    return connectDropTarget(
      <div className="items-target" style={{ backgroundColor }}>
        Target
      </div>
    );
    // return <div className="items-target">Target</div>;
  }
}

export default DropTarget("items-list-item", {}, collect)(Target);
