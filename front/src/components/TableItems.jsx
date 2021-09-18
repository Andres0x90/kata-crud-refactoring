import React, { useContext, useEffect, useState } from "react";
import { Store } from "./StoreProvider";

const TableItems = () => {
    const HOST_API = "http://localhost:8080/api/to-do";

    const { dispatch, state: {todo}} = useContext(Store);
    //const currentList = todo.list;
    const [groups, setGroups] = useState([]);
    const currentList = [{}];
    useEffect(() => {
      fetch(HOST_API + "/groups/list")
        .then(response => response.json())
        .then((groups) => {
          dispatch({ type: "update-list", groupToDo: groups })
          setGroups(todo.groupToDo);
        });

      }, [dispatch]);
  
  
    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todo", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked
      };
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
        });


    };

  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return <div>

      {
        groups.map((group) =>
        {
            return (
              <div>
                <h3>{group.name}</h3>
              </div>
            );
        })
      }
      <table >
        <thead>
          <tr>
            <td>ID</td>
            <td>Tarea</td>
            <td>¿Completado?</td>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
              <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
              <td><button onClick={() => onEdit(todo)}>Editar</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
}
export default TableItems;