import React, { useReducer, createContext } from 'react';

const initialState = {
  todo: {
    groupToDo: [],
    item: {}
  }
};

export const Store = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'update-item':
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem }
    case 'delete-item':
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete }
    case 'update-list':
      const listGroup = action.groupToDo;
      state.todo.groupToDo = action.groupToDo;
      return { todo: { groupToDo: listGroup } }
    case 'edit-item':
      const todoEdit = state.todo.groupToDo.map(
        (group) => {
          if (group.id == action.groupId) {
            group.tasks = group.tasks.map(task =>
              task.id == action.task.id ? action.task : task
            )
          }

          return group;
        });

      state.todo.groupToDo = todoEdit;
      console.log(todoEdit);
      return {...state, todo: { groupToDo: todoEdit } }
    case 'add-item-group':
      const todoGroupUp = state.todo.groupToDo;
      todoGroupUp.push({ ...action.groupToDo, tasks: [] });
      state.todo.groupToDo = todoGroupUp;
      return { todo: { groupToDo: todoGroupUp } };
    case 'add-item':
      const todoUp = state.todo.groupToDo.map(
        (group) => {
          if (group.id == action.groupId)
            group.tasks.push(action.item);

          return group;
        });

      state.todo.groupToDo = todoUp;
      console.log(todoUp);
      return { todo: { groupToDo: todoUp } }
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}


export default StoreProvider;