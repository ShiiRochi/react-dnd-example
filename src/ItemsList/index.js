import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class ItemsList extends React.Component {
  static Item = Item;
  static defaultProps = {
    items: []
  };
  render() {
    const { items, onDrop } = this.props;
    return (
      <div className="items-list">
        {items.map(item => (
          <Item handleDrop={onDrop} key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

ItemsList.propTypes = {
  items: PropTypes.array
};

export default ItemsList;
