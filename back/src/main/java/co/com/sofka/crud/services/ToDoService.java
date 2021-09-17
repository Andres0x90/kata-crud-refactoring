package co.com.sofka.crud.services;

import co.com.sofka.crud.entities.ItemDTO;
import co.com.sofka.crud.entities.TaskGroup;
import co.com.sofka.crud.repositories.ToDoRepository;
import co.com.sofka.crud.entities.ToDo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ToDoService implements InterfaceToDoService{

    @Autowired
    private ToDoRepository repository;
    @Autowired
    private InterfaceTaskGroupService taskGroupService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public Iterable<ItemDTO> list(){
        List<ItemDTO> itemsDTO = new ArrayList<>();
        repository.findAll().forEach((toDo) -> {itemsDTO.add(mapper.map(toDo, ItemDTO.class));});
        return itemsDTO;
    }

    @Override
    public ItemDTO save(ToDo toDo, Long listGroupId){
        TaskGroup taskGroup = mapper.map(taskGroupService.get(listGroupId), TaskGroup.class);
        toDo = repository.save(toDo);
        taskGroup.addTask(toDo);
        taskGroupService.save(taskGroup);
        return mapper.map(toDo, ItemDTO.class);
    }

    @Override
    public ItemDTO get(Long id){
        ToDo toDo = repository.findById(id).orElseThrow();
        return mapper.map(toDo, ItemDTO.class);
    }

    @Override
    public ItemDTO update(ToDo toDo)
    {
        if(toDo.getId() == null)
            throw new NoSuchElementException();

        get(toDo.getId());
        return mapper.map(repository.save(toDo), ItemDTO.class);
    }

    @Override
    public void delete(Long id){
        ItemDTO toDo = get(id);
        repository.delete(mapper.map(toDo, ToDo.class));
    }
}
