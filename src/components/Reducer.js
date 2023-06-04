import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./Action";

const Reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          done: action.payload.done,
        },
      ];
    case CHANGE_ITEM:
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            done: action.done,
            text: action.text,
          };
        }
        return task;
      });

    case DELETE_ITEM:
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
};

export default Reducer;
