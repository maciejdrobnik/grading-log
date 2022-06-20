package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Grade;
import pl.dmcs.springbootjsp_iwa.model.GradedTask;
import pl.dmcs.springbootjsp_iwa.model.Subject;
import pl.dmcs.springbootjsp_iwa.repository.GradeRepository;
import pl.dmcs.springbootjsp_iwa.repository.GradedTaskRepository;
import pl.dmcs.springbootjsp_iwa.repository.SubjectRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/grades")
public class GradeRESTController {

    private GradeRepository gradesRepository;
    private GradedTaskRepository taskRepository;
    private SubjectRepository subjectRepository;

    @Autowired
    public GradeRESTController(GradeRepository gradesRepository, GradedTaskRepository taskRepository, SubjectRepository subjectRepository) {
        this.gradesRepository = gradesRepository;
        this.taskRepository = taskRepository;
        this.subjectRepository = subjectRepository;
    }
    @RequestMapping(method = RequestMethod.GET)
    //@GetMapping
    public List<Grade> findAllGrades() { return gradesRepository.findAll();
    }

    @RequestMapping(value="/{subjectId}/{taskId}/{id}", method = RequestMethod.GET)
    //@GetMapping
    public Optional<Grade> findGrade(@PathVariable("subjectId") long subjectId,@PathVariable("taskId") long taskId, @PathVariable("id") long userId) {
        Subject subject = subjectRepository.findById(subjectId);
        Optional<GradedTask> tempTask = subject.getTask(taskId);
        if(tempTask.isPresent()){
            GradedTask task = tempTask.get();
            return task.getGrade(userId);
        }
        else{
        return Optional.empty();
        }
    }
    @RequestMapping(value="/{subjectId}/{taskId}", method = RequestMethod.POST)
    //@GetMapping
    public ResponseEntity<Grade> putGrade(@RequestBody Grade grade, @PathVariable("subjectId") long subjectId,@PathVariable("taskId") long taskId) {
        Subject subject = subjectRepository.findById(subjectId);
        Optional<GradedTask> tempTask = subject.getTask(taskId);
        if(tempTask.isPresent()) {
            GradedTask task = tempTask.get();
            List<Grade> grades = task.getGrades();
            Grade tempGrade = null;
            for (int i = 0; i < grades.size(); i++) {
                if (grades.get(i).getUserId() == grade.getUserId() && grades.get(i).getTask().getId() == grade.getTask().getId()) {
                    if (grades.get(i).getUserId() == grade.getUserId()) {
                        grades.get(i).setGrade(grade.getGrade());
                        grades.get(i).setUserId(grade.getUserId());
                        grades.get(i).setTask(grade.getTask());
                        tempGrade = grades.get(i);
                    }
                }
            }
            if (tempGrade != null) {
            } else {
                task.addGrade(grade);
            }
        }
        subjectRepository.save(subject);
        Optional<GradedTask> tempTask2 = taskRepository.findById(taskId);
        if(tempTask.isPresent()){
            GradedTask tempp = tempTask2.get();
            List<Grade> grades = tempp.getGrades();
            for(int i = 0; i < grades.size(); i++){
                if(grades.get(i).getUserId() == grade.getUserId()){
                    grades.get(i).setGrade(grade.getGrade());
                    grades.get(i).setUserId(grade.getUserId());
                    taskRepository.save(tempp);
                }
            }
        }
        return new ResponseEntity<Grade>(grade, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Grade> updateTask2(@RequestBody Grade grade) {
        gradesRepository.save(grade);
        return new ResponseEntity<Grade>(grade, HttpStatus.NO_CONTENT);
    }

}
