package co.com.sofka.crud.services;

import co.com.sofka.crud.entities.ItemDTO;
import co.com.sofka.crud.entities.ToDo;

public interface InterfaceToDoService {
    public Iterable<ItemDTO> list();
    public ItemDTO save(ToDo toDo, Long listGroup);
    public ItemDTO update(ToDo toDo);
    public void delete(Long id);
    public ItemDTO get(Long id);
}
