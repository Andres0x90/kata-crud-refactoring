package co.com.sofka.crud.entities;


import java.io.Serializable;

public class ItemDTO {

    private Long id;
    private String name;
    private boolean isCompleted;
    private TaskGroup listGroup;

    public ItemDTO(){}

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

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public TaskGroup getListGroup() {
        return listGroup;
    }

    public void setListGroup(TaskGroup listGroup) {
        this.listGroup = listGroup;
    }
}
