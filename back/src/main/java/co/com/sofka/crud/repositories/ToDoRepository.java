package co.com.sofka.crud.repositories;

import co.com.sofka.crud.entities.ToDo;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo, Long> {
}
