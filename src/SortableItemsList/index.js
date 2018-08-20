import React from "react";
import PropTypes from "prop-types";
import SortableItem from "./SortableItem";

class SortableItemsList extends React.Component {
  static defaultProps = {
    items: []
  };
  render() {
    const { items, onMove } = this.props;
    return (
      <div className="items-list">
        {items.map((item, index) => (
          <SortableItem
            handleMove={onMove}
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    );
  }
}

SortableItemsList.propTypes = {
  items: PropTypes.array
};

export default SortableItemsList;
