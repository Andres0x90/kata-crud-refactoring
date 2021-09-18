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
      const todoUpDelete = state.todo.groupToDo.map((group)=>
      {
        const listUpdate = group.tasks.filter((item) => {
          return item.id !== action.task.id;
        });
        group.tasks = listUpdate;
        return group;
      });
      //todoUpDelete.list = listUpdate;
      return { todo: {groupToDo: todoUpDelete} }
    case 'update-list':
      const listGroup = action.groupToDo;
      state.todo.groupToDo = action.groupToDo;
      return { todo: { groupToDo: listGroup } }
    case 'edit-item':
      const groupEdited = state.todo.groupToDo.map(
        (group) => {

          if (group.id == action.groupId) {
               const listUpdated = group.tasks.map(task =>
                task.id === action.task.id ? action.task : task
            )
            group.tasks = listUpdated;
          }

          return group;
        });

      //state.todo.groupToDo = todoEdit;
      return {todo: { groupToDo: groupEdited } }
    case 'add-item-group':
      const todoGroupUp = state.todo.groupToDo;
      todoGroupUp.push({ ...action.groupToDo, tasks: [] });
      state.todo.groupToDo = todoGroupUp;
      return { todo: { groupToDo: todoGroupUp } };
    case 'add-item':
      const todoItemUp = state.todo.groupToDo.map(
        (group) => {
          if (group.id == action.groupId)
            group.tasks.push(action.item);

          return group;
        });

      state.todo.groupToDo = todoItemUp;
      console.log(todoItemUp);
      return { todo: { groupToDo: todoItemUp } }
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