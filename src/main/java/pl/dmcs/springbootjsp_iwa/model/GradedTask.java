package pl.dmcs.springbootjsp_iwa.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
public class GradedTask {

    @Id
    @GeneratedValue
    private long id;
    private String taskName;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String description;

    @JsonBackReference
    @OneToMany(fetch = FetchType.LAZY,  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Grade> grades;

    @ManyToOne( fetch = FetchType.EAGER)
    private Subject subject;

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }
    public Optional<Grade> getGrade(long id) {
        List<Grade> grades = getGrades();
        for(int i = 0; i < grades.size(); i++){
            if(grades.get(i).getUserId() == id){
                return Optional.ofNullable(grades.get(i));
            }
        }
        return Optional.empty();
    }

    public void addGrade(Grade grade){
        this.grades.add(grade);
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }
}
