package co.com.sofka.crud.repositories;

import co.com.sofka.crud.entities.TaskGroup;
import org.springframework.data.repository.CrudRepository;

public interface TaskGroupRepository extends CrudRepository<TaskGroup, Long> {
}
