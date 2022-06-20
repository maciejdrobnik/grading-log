package pl.dmcs.springbootjsp_iwa.model;

import javax.persistence.*;

@Entity
public class Grade {
    @Id
    @GeneratedValue
    private long id;
    private int grade;
    private long userId;

    @ManyToOne
    GradedTask task;

    public GradedTask getTask() {
        return task;
    }

    public void setTask(GradedTask task) {
        this.task = task;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }



}
