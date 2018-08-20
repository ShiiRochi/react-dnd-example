import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class ItemsList extends React.Component {
  static Item = Item;
  static defaultProps = {
    items: []
  };
  render() {
    const { items, onDrop, onCreate } = this.props;
    return (
      <div className="items-list">
        <div className="items-list-item create-item">Add Item +</div>
        {items.map(item => (
          <Item handleDrop={onDrop} key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

ItemsList.propTypes = {
  items: PropTypes.array,
  onCreate: PropTypes.func,
};

export default ItemsList;
