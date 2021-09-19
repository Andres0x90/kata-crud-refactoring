import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from './Store';

const Form = () => {
    const HOST_API = "http://localhost:8080/api/to-do";
    const {register,formState:{errors}, handleSubmit} = useForm();
    const { dispatch, state: { todo } } = useContext(Store);

    const onAddGroup = (data, event)=>
    {
      event.preventDefault();
      const request = {
        name: data.nameGroup,
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
          todo.groupToDo = [...todo.groupToDo, groupItem];
        });       
    }

  
    return <form className="col-md-4" onSubmit={handleSubmit(onAddGroup)}>
      <input className="form-control" type="text" placeholder="Crear nueva seccion" 
      {...register("nameGroup", {required: true})} />
      <div><b>{errors.nameGroup && "Por favor rellene el nombre de la categoria"}</b></div>
      <button type="submit" className="btn btn-primary my-3">Crear categoria</button>
    </form>
}

export default Form;
