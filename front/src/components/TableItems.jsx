import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "./StoreProvider";

const TableItems = () => {
  const HOST_API = "http://localhost:8080/api/to-do";

  const { register, errors, handleSubmit } = useForm();

  const { dispatch, state: { todo } } = useContext(Store);
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

  const addTaskToGroup = (data) => {
    const request = {
      name: data.name,
      completed: false,
      tasks:[]
    };

    
    fetch(HOST_API + "/items/save/" + data.groupId, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo, groupId: data.groupId });
      });
  }

  const mark = () => {

  }

  return <div>

    <form onSubmit={handleSubmit(addTaskToGroup)}>
      <input {...register("name")} type="text" placeholder="Nombre del To-Do" />
      <select {...register("groupId")}>
        <option>Seleccione una categoria</option>
        {
          groups.map((group) => {
            return (
              <option value={group.id}>{group.name}</option>
            );
          })
        }
      </select>
      <button type="submit">Crear tarea</button>
    </form>

    {
      groups.map((group) => {
        return (
          <div>
            <h3>{group.name}</h3>
            <form onChange={handleSubmit(mark)}>
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Completado?</td>
                  </tr>
                </thead>
                <tbody>
                {
                  group.tasks!=null?group.tasks.map((task) => {
                    return (
                      <tr>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td><input type="checkbox" />Completado</td>
                      </tr>
                    );
                  }): <h3>No tiene actividades en esta seccion</h3>
                }
                </tbody>
              </table>

            </form>

          </div>
        );
      })
    }
    {/* <table >
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
      </table> */}
  </div>
}
export default TableItems;