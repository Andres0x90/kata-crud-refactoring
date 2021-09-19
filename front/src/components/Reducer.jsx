export function reducer(state, action) {
    switch (action.type) {
      case 'delete-item':
        let groupIndexUpdate;
        const todoUpDelete = state.todo.groupToDo.map((group, index)=>
        {
          const listUpdate = group.tasks.filter((item) => {
            groupIndexUpdate = index;
            return item.id !== action.task.id;
          });
          group.tasks = listUpdate;
          return group;
        });

        state.todo.groupToDo.splice(groupIndexUpdate,1,todoUpDelete[groupIndexUpdate]);
        return { todo: {groupToDo: state.todo.groupToDo} }
        case 'delete-group':
            const index = state.todo.groupToDo.indexOf(action.group);
            state.todo.groupToDo.splice(index,1);
            console.log(state.todo.groupToDo);
            return { todo: {groupToDo: state.todo.groupToDo}};
      case 'update-list':
        const listGroup = action.groupToDo;
        state.todo.groupToDo = action.groupToDo;
        return { todo: { groupToDo: listGroup } };
      case 'edit-item':
        let indexGroupTaskUpdated;
        const groupEdited = state.todo.groupToDo.map(
          (group, index) => {
  
            if (group.id == action.groupId) {
                 const listUpdated = group.tasks.map(task =>
                  task.id === action.task.id ? action.task : task
              )
              group.tasks = listUpdated;
              indexGroupTaskUpdated = index;
            }
  
            return group;
          });
          state.todo.groupToDo.splice(indexGroupTaskUpdated, 1, groupEdited[indexGroupTaskUpdated]);
        return {todo: { groupToDo: state.todo.groupToDo } };
      case 'add-item-group':
        const todoGroupUp = state.todo.groupToDo;
        todoGroupUp.push({ ...action.groupToDo, tasks: [] });
        state.todo.groupToDo = todoGroupUp;
        return { todo: { groupToDo: todoGroupUp } };
      case 'add-item':
        let groupIndex;
        const todoItemUp = state.todo.groupToDo.map(
          (group, index) => {
            if (group.id == action.groupId)
            { 
                group.tasks.push(action.item);
                groupIndex = index
            }
            return group;
          });
  
        state.todo.groupToDo.splice(groupIndex, 1, todoItemUp[groupIndex]);
        return { todo: { groupToDo: state.todo.groupToDo } };
      default:
        return state;
    }
}