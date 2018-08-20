import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ItemsList from "./ItemsList";
import SortableItemsList from "./SortableItemsList";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import Switch from 'react-switch';
import update from 'immutability-helper';
import Target from "./Target";
import "./styles.css";

const initialState = {
  mode: "sort", // delete or sorting
  data: [
    {
      id: 1,
      content: "MALAK"
    },
    {
      id: 2,
      content: "REVAN"
    },
    {
      id: 3,
      content: "LUKE"
    }
  ]
};

class App extends React.Component {
  state = initialState;

  handleElementDrop = id => {
    if (this.state.mode === "delete") {
      this.deleteElement(id);
    } else if (this.state.mode === "sorting") {
      // this.modeItem();
    }
  };

  deleteElement = id => {
    const data = this.state.data;
    const newData = data.filter(data => data.id !== id);
    this.setState({ data: newData });
  };

  moveItem = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragItem = data[dragIndex];
    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        }
      })
    );
  };

  handleRefresh = () => {
    this.setState({
      data: initialState.data,
    });
  };

  handleSwitchChange = (checked, event) => {
    this.setState({ 
      mode: checked ? 'sort' : 'delete',  
    });
  };

  handleItemCreate = (item) => {
    this.setState(update(this.state, {
      data: {
        $push: [item]
      }
    }));
  }

  render() {
    const { data, mode } = this.state;

    const checked = mode === 'sort';

    const modeTitle = mode === 'sort' ? 'Sortable List' : 'Removing Items';

    return (
      <div className="App">
        <h1>React DnD Example ("{modeTitle}")</h1>
        <h3>For mode changing use toggle below</h3>
        <div className="App-inner">
          <div className="control-panel">
            <button className="refresh-btn" onClick={this.handleRefresh}>Refresh</button>
            <Switch
              checked={checked}
              onChange={this.handleSwitchChange}
            />
          </div>
          {mode === "delete" && (
            <Fragment>
              <ItemsList onCreate={this.handleItemCreate} onDrop={this.handleElementDrop} items={data} />
              <Target />
            </Fragment>
          )}
          {mode === "sort" && (
            <SortableItemsList onMove={this.moveItem} items={data} />
          )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
