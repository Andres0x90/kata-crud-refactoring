import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "./StoreProvider";

const TableItems = () => {
  const HOST_API = "http://localhost:8080/api/to-do";

  const { register, errors, handleSubmit, setValue } = useForm();

  const { dispatch, state: { todo } } = useContext(Store);
  const [currentList, setCurrentList] =  useState({name: ""});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(HOST_API + "/groups/list")
      .then(response => response.json())
      .then((groups) => {
        dispatch({ type: "update-list", groupToDo: groups })
        setGroups(todo.groupToDo);
      });

  }, [dispatch]);

  setValue("nameItemUpdate",currentList.nameItemUpdate);

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => {
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
      name: data.nameItem,
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

  const onUpdate = (data) => 
  {
    const request = {
      name: data.nameItemUpdate,
      id: currentList.idItemUpdate,
    };
    console.log(request);
    fetch(HOST_API + "/items/update", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then((data) =>
    {
      console.log(data);
        dispatch({type: "edit-item", task: data, groupId: currentList.idItemUpdate});
    })
  }

  return <div>

    <form onSubmit={handleSubmit(addTaskToGroup)}>
      <input {...register("nameItem")} type="text" placeholder="Nombre del To-Do" />
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



    <form onSubmit={handleSubmit(onUpdate)}>
        <input type="text" {...register("nameItemUpdate")}/>
        <button type="submit">Actualizar</button>
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
                    <th>ID</th>
                    <th>Tarea</th>
                    <th>¿Completado?</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                {
                  group.tasks!=null?group.tasks.map((task) => {
                    return (
                      <tr>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td><input type="checkbox" onChange={()=>
                          {
                            const request = {
                              name: task.name,
                              id: task.id,
                              isCompleted: !task.isCompleted
                            };

                            fetch(HOST_API + "/items/update", {
                              method: "PUT",
                              body: JSON.stringify(request),
                              headers: {
                                'Content-Type': 'application/json'
                              }
                            })
                          }} defaultChecked={task.isCompleted} />Completado</td>
                        <td><button type="submit" onClick={(event) =>
                          {
                            event.preventDefault();
                            setCurrentList({"nameItemUpdate": task.name, "idItemUpdate": task.id});
                            
                          }}>Editar</button></td>
                        <td><button type="submit" onClick={(event)=>
                          {
                            event.preventDefault();
                            fetch(HOST_API + "/items/delete/" + task.id, {
                              method: "DELETE",
                              headers: {
                                'Content-Type': 'application/json'
                              }
                            })
                          }}>Eliminar</button></td>
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