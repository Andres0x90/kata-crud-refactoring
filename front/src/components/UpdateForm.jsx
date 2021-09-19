
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const UpdateForm = (props)=>
{
    const {register, formState: {errors}, handleSubmit, setValue} = useForm();
    setValue("nameItemUpdate",props.currentList.nameItemUpdate);
    return <Fragment>
        <form className="col-4" onSubmit={handleSubmit(props.onUpdate)}>
            <input disabled={props.currentList.id != ""?false:true} 
            className="form-control" type="text" placeholder="Nombre del To-Do"
            {...register("nameItemUpdate", {required: true})}/>
            <div><b>{errors.nameItemUpdate && "Por favor seleccione una tarea primero"}</b></div>
            <button className="btn btn-warning my-3" type="submit">Actualizar</button>
        </form>
    </Fragment>
}

export default UpdateForm;