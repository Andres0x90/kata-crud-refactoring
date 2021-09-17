package co.com.sofka.crud.controllers;

import co.com.sofka.crud.entities.TaskGroup;
import co.com.sofka.crud.entities.TaskGroupDTO;
import co.com.sofka.crud.services.InterfaceTaskGroupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/to-do/groups")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskGroupController
{
    @Autowired
    private InterfaceTaskGroupService service;

    @Autowired
    private ModelMapper mapper;

    @PostMapping(value = "/save")
    public TaskGroupDTO save(@RequestBody TaskGroupDTO taskGroupDTO)
    {
        TaskGroup taskGroup = mapper.map(taskGroupDTO, TaskGroup.class);
        return service.save(taskGroup);
    }

    @GetMapping(value = "/list")
    public Iterable<TaskGroupDTO> list(){
        return service.list();
    }

    @GetMapping(value = "/list/{id}")
    public TaskGroupDTO get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

}
