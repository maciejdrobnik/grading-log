package pl.dmcs.springbootjsp_iwa.model;

import com.fasterxml.jackson.annotation.JsonBackReference;


import javax.persistence.*;
import java.util.*;

@Entity
public class Subject {

    @Id
    @GeneratedValue
    private long id;
    private String subjectName;

    @JsonBackReference
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<User> users;

    public Subject(String subjectName){
        this.subjectName = subjectName;
    }

    public Subject() {

    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<GradedTask> getTasks() {
        return tasks;
    }
    public void addTask(GradedTask task){
        this.tasks.add(task);
    }
    public void setTasks(Set<GradedTask> tasks) {
        this.tasks = tasks;
    }

    public Optional<GradedTask> getTask(long id){
        Set<GradedTask> tasks = getTasks();
        GradedTask task = null;
        for (Iterator<GradedTask> it = tasks.iterator(); it.hasNext(); ) {
            GradedTask f = it.next();
            if (f.getId() == id)
                task = f;
        }
        if(task != null){
            return Optional.of(task);
        }
        return Optional.empty();
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<GradedTask> tasks;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }
}
