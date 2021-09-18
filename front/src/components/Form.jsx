import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from './StoreProvider';

const Form = () => {
    const HOST_API = "http://localhost:8080/api/to-do";
    const {register, errors, handleSubmit} = useForm();
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
  
  
      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
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
          setState({ name: "" });
          formRef.current.reset();
        });
    }

    const onAddGroup = (data)=>
    {
   
      const request = {
        name: data.name,
      };
  
      fetch(HOST_API + "/groups/save", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((groupItem) => {
          dispatch({ type: "add-item-group", groupToDo: groupItem });
          //setState({ name: "" });

        });       
    }

  
    return <form className="col-md-4" onSubmit={handleSubmit(onAddGroup)}>
      <input className="form-control my-3" type="text" placeholder="Crear nueva seccion" {...register("name")} />
      <button type="submit" className="btn btn-primary">Crear grupo</button>

      {/* <input
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input>
      {item.id && <button onClick={onEdit}>Actualizar</button>}
      {!item.id && <button onClick={onAdd}>Crear</button>} */}
    </form>
}

export default Form;
