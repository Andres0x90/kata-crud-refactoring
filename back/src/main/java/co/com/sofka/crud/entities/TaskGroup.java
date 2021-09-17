package co.com.sofka.crud.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="task_group")
public class TaskGroup implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "list_group_id")
    private List<ToDo>tasks;

    public TaskGroup(){}

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

    public void addTask(ToDo toDo){
        this.tasks.add(toDo);
    }
}
