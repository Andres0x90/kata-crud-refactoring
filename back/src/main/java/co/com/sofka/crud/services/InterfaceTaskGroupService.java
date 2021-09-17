package co.com.sofka.crud.services;

import co.com.sofka.crud.entities.ItemDTO;
import co.com.sofka.crud.entities.TaskGroup;
import co.com.sofka.crud.entities.TaskGroupDTO;
import co.com.sofka.crud.entities.ToDo;

public interface InterfaceTaskGroupService {
    public Iterable<TaskGroupDTO> list();
    public TaskGroupDTO save(TaskGroup taskGroup);
    public void delete(Long id);
    public TaskGroupDTO get(Long id);
}
