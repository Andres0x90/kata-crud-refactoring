package co.com.sofka.crud.services;

import co.com.sofka.crud.entities.TaskGroup;
import co.com.sofka.crud.entities.TaskGroupDTO;
import co.com.sofka.crud.repositories.TaskGroupRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskGroupService implements InterfaceTaskGroupService{
    @Autowired
    private TaskGroupRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Iterable<TaskGroupDTO> list() {
        List<TaskGroupDTO> taskGroupDTO = new ArrayList<>();
        repository.findAll().forEach((taskGroup) -> {
            taskGroupDTO.add(mapper.map(taskGroup, TaskGroupDTO.class));
        });
        return taskGroupDTO;
    }

    @Override
    public TaskGroupDTO save(TaskGroup taskGroup) {
        return mapper.map(repository.save(taskGroup), TaskGroupDTO.class);
    }

    @Override
    public void delete(Long id) {
        TaskGroupDTO taskGroupDTO = get(id);
        repository.delete(mapper.map(taskGroupDTO, TaskGroup.class));
    }

    @Override
    public TaskGroupDTO get(Long id) {
        TaskGroup taskGroup = repository.findById(id).orElseThrow();
        return mapper.map(taskGroup, TaskGroupDTO.class);
    }
}
