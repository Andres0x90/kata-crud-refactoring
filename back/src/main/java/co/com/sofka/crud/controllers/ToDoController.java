package co.com.sofka.crud.controllers;

import co.com.sofka.crud.entities.ItemDTO;
import co.com.sofka.crud.entities.ToDo;
import co.com.sofka.crud.services.InterfaceToDoService;
import co.com.sofka.crud.services.ToDoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/to-do/items")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ToDoController {

    @Autowired
    private InterfaceToDoService service;

    @Autowired
    private ModelMapper mapper;

    @PostMapping(value = "/save/{listGroup}")
    public ItemDTO save(@RequestBody ItemDTO itemDTO,@PathVariable Long listGroup)
    {
        ToDo toDo = mapper.map(itemDTO, ToDo.class);
        return service.save(toDo, listGroup);
    }

    @GetMapping(value = "/list")
    public Iterable<ItemDTO> list(){
        return service.list();
    }

    @GetMapping(value = "/list/{id}")
    public ItemDTO get(@PathVariable("id") Long id){
        return service.get(id);
    }

    @PutMapping(value = "/update")
    public ItemDTO update(@RequestBody ItemDTO itemDTO){
        ToDo toDo = mapper.map(itemDTO, ToDo.class);
        return service.update(toDo);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }


}
