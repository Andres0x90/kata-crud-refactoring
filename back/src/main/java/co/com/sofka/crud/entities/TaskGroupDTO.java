package co.com.sofka.crud.entities;

import java.util.List;

public class TaskGroupDTO
{
    private Long id;
    private String name;
    private List<ToDo> tasks;

    public TaskGroupDTO(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ToDo> getTasks() {
        return tasks;
    }

    public void setTasks(List<ToDo> tasks) {
        this.tasks = tasks;
    }
}
