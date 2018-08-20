import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ItemsList from "./ItemsList";
import SortableItemsList from "./SortableItemsList";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import Target from "./Target";
import "./styles.css";
const update = require("immutability-helper");

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
    this.setState(initialState);
  };

  render() {
    const { data, mode } = this.state;
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.handleRefresh}>Refresh</button>
        {mode === "delete" && (
          <Fragment>
            <ItemsList onDrop={this.handleElementDrop} items={data} />
            <Target />
          </Fragment>
        )}
        {mode === "sort" && (
          <SortableItemsList onMove={this.moveItem} items={data} />
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
