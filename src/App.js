import React, { useReducer } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Reducer from "./components/Reducer";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./components/Action";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, []);
  const ID = uuidv4();

  const handleAddItem = (text, done) => {
    dispatch({
      type: ADD_ITEM,
      payload: { id: ID, text: text, done: done },
    });
  };

  const handleChangeItem = (id, done, text) => {
    dispatch({
      type: CHANGE_ITEM,
      id,
      text,
      done,
    });
  };

  const handleDeleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      id,
    });
  };

  return (
    <div id="list">
      <h1>List of Items</h1>
      <AddTask handleAddItem={handleAddItem} />
      <div>
        {" "}
        {state.map((task) => (
          <div
            key={task.id}
            style={{
              textDecorationLine: task.done ? "line-through" : "none",
              margin: "5px",
            }}
          >
            <TaskList
              task={task}
              handleChangeItem={handleChangeItem}
              handleDeleteItem={handleDeleteItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
