import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "./Store";
import UpdateForm from "./UpdateForm";

const TableItems = () => {
  const HOST_API = "http://localhost:8080/api/to-do";

  const { register, formState: {errors}, handleSubmit } = useForm();

  const { dispatch, state: { todo } } = useContext(Store);
  const [currentList, setCurrentList] =  useState({name: "", id: ""});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(HOST_API + "/groups/list")
      .then(response => response.json())
      .then((groups) => {
        dispatch({ type: "update-list", groupToDo: groups })
        setGroups(todo.groupToDo);
      });

  }, [dispatch]);



  const decorationDone = {
    textDecoration: 'line-through'
  };

  const addTaskToGroup = (data) => {

    const request = {
      name: data.nameItem,
      completed: false,
      tasks:[]
    };

    if (data.groupId !== "Seleccione una categoria")
    {
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
  }

  const onUpdate = (data) => 
  {
    const request = {
      name: data.nameItemUpdate,
      id: currentList.idItemUpdate,
    };
    fetch(HOST_API + "/items/update", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then((data) =>
    {
        dispatch({type: "edit-item", task: data, groupId: currentList.idGroupUpdate});
        setCurrentList({...currentList, nameItemUpdate: data.name, idItemUpdate: data.id})
    })
  }

  return <div>

    <form className="col-md-5"  onSubmit={handleSubmit(addTaskToGroup)}>
      <input className="form-control my-3 " {...register("nameItem", {required: true})} 
      type="text" placeholder="Nombre del To-Do" />

      <select className="form-select" {...register("groupId")}>
        <option>Seleccione una categoria</option>
        {
          groups.map((group) => {
            return (
              <option key={group.id} value={group.id}>{group.name}</option>
            );
          })
        }
      </select>
      <div><b>{errors.nameItem && "Por favor rellene el nombre de la tarea"}</b></div>

      <button className="btn btn-success my-3" type="submit">Crear tarea</button>
    </form>

    <UpdateForm onUpdate={onUpdate} currentList={currentList}></UpdateForm>
    
    {
      groups.map((group) => {
        return (
          <div key={group.id}>
            <h3 className="d-inline">{group.name}</h3>
            <button className="btn btn-danger m-2" onClick={()=>
              {
                fetch(HOST_API + "/groups/delete/" + group.id,
                {
                    method:"DELETE"
                });
                dispatch({type:"delete-group", group: group,groupId: group.id});
              }}>Eliminar</button>
            <form>
              <table className="table">
                <thead className="table-dark">
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
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td style={task.isCompleted ? decorationDone : {}}>{task.name}</td>
                        <td><input className="form-check-input mx-1" type="checkbox" onChange={()=>
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
                            }).then(response => response.json())
                            .then((data)=>
                            {
                              dispatch({type: "edit-item", task: data, groupId: group.id});
                            });
                          }} checked={task.isCompleted} />Completado</td>
                        <td><button className="btn btn-warning" type="submit" onClick={(event) =>
                          {
                            event.preventDefault();
                            setCurrentList({"nameItemUpdate": task.name, "idItemUpdate": task.id
                          , "idGroupUpdate": group.id});
                            
                          }}>Editar</button></td>
                        <td><button className="btn btn-danger" type="submit" onClick={(event)=>
                          {
                            event.preventDefault();
                            fetch(HOST_API + "/items/delete/" + task.id, {
                              method: "DELETE",
                              headers: {
                                'Content-Type': 'application/json'
                              }
                            })
                            dispatch({type:'delete-item', task: {id: task.id}});
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
  </div>
}
export default TableItems;