package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.GradedTask;
import pl.dmcs.springbootjsp_iwa.model.Subject;
import pl.dmcs.springbootjsp_iwa.repository.GradedTaskRepository;
import pl.dmcs.springbootjsp_iwa.repository.SubjectRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tasks")
public class GradedTaskRESTController {

    private GradedTaskRepository tasksRepository;
    private SubjectRepository subjectRepository;

    @Autowired
    public GradedTaskRESTController(GradedTaskRepository tasksRepository, SubjectRepository subjectRepository) {
        this.tasksRepository = tasksRepository;
        this.subjectRepository = subjectRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    //@GetMapping
    public List<GradedTask> findAllTasks() { return tasksRepository.findAll();
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Optional<GradedTask> getTask (@PathVariable("id") long id) {
        return tasksRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    //@PostMapping
    public ResponseEntity<GradedTask> addTask(@RequestBody GradedTask task) {
        tasksRepository.save(task);
        return new ResponseEntity<GradedTask>(task, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{name}", method = RequestMethod.DELETE)
    //@DeleteMapping("/{id}")
    public ResponseEntity<GradedTask> deleteTask (@PathVariable("name") String name) {
        GradedTask task = tasksRepository.findByTaskName(name);
        tasksRepository.deleteByTaskName(name);
        return new ResponseEntity<GradedTask>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    //@PutMapping("/{id}")
    public ResponseEntity<GradedTask> updateTask(@RequestBody GradedTask task, @PathVariable("id") long id) {
        Subject subject = subjectRepository.findById(id);
        subject.addTask(task);
        subjectRepository.save(subject);
        return new ResponseEntity<GradedTask>(task,HttpStatus.NO_CONTENT);
    }
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<GradedTask> updateTask2(@RequestBody GradedTask task) {
        tasksRepository.save(task);
        return new ResponseEntity<GradedTask>(task, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{name}", method = RequestMethod.PATCH)
    //@PatchMapping("/{id}")
    public ResponseEntity<GradedTask> updatePartOfTask(@RequestBody Map<String, Object> updates, @PathVariable("name") String name) {
        GradedTask task = tasksRepository.findByTaskName(name);
        partialUpdate(task,updates);
        return new ResponseEntity<GradedTask>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(GradedTask task, Map<String, Object> updates) {
        if (updates.containsKey("taskName")) {
            task.setTaskName((String) updates.get("taskName"));
        }
        if (updates.containsKey("description")) {
            task.setDescription((String) updates.get("description"));
        }
        tasksRepository.save(task);
    }

}
