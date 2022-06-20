package pl.dmcs.springbootjsp_iwa.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.GradedTask;
import pl.dmcs.springbootjsp_iwa.model.Subject;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.repository.SubjectRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/subjects")
public class SubjectRESTController {

    private SubjectRepository subjectRepository;
    private UserRepository userRepository;

    @Autowired
    public SubjectRESTController(SubjectRepository subjectRepository, UserRepository userRepository) {
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    //@GetMapping
    public List<Subject> findAllSubjects() { return subjectRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    //@GetMapping
    public Subject findSubject(@PathVariable("id") long id) {
        return subjectRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    //@PostMapping
    public ResponseEntity<Subject> addSubject(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return new ResponseEntity<Subject>(subject, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    //@DeleteMapping("/{id}")
    public ResponseEntity<Subject> deleteSubject (@PathVariable("id") long id) {
        subjectRepository.deleteById(id);
        return new ResponseEntity<Subject>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{subjectId}/{userId}", method = RequestMethod.POST)
    //@PutMapping("/{id}")
    public ResponseEntity<Subject> addUserToSubject(@PathVariable("subjectId") long subjectId, @PathVariable("userId") long userId) {
        Subject subject = subjectRepository.findById(subjectId);
        User user = userRepository.findById(userId);
        Set<User> subjectUsers = subject.getUsers();
        boolean check = !subjectUsers.contains(user);
        if(check){
            subjectUsers.add(user);
            Set<Subject> subjects = user.getSubjects();
            subjects.add(subject);
            user.setSubjects(subjects);
            subjectRepository.save(subject);
        }
        return new ResponseEntity<Subject>(HttpStatus.NO_CONTENT);
    }


    @RequestMapping(value="/{username}", method = RequestMethod.PUT)
    //@PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@RequestBody Subject subject, @PathVariable("username") String username) {
        Set<User> users = new HashSet<>();
        Optional<User> user = userRepository.findByUsername(username);
        System.out.println(username);
        if(user.isPresent()){
            User user2 = user.get();
            users.add(user2);
            subject.setUsers(users);
            Set<Subject> subjects = user2.getSubjects();
            subjects.add(subject);
            user2.setSubjects(subjects);
        }
        subjectRepository.save(subject);
        return new ResponseEntity<Subject>(subject,HttpStatus.NO_CONTENT);
    }
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Subject> updateSubject2(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return new ResponseEntity<Subject>(subject, HttpStatus.NO_CONTENT);
    }


    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)
    //@PatchMapping("/{id}")
    public ResponseEntity<Subject> updatePartOfSubject(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Subject subject = subjectRepository.findById(id);
        partialUpdate(subject,updates);
        return new ResponseEntity<Subject>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}/2", method = RequestMethod.PATCH)
    //@PatchMapping("/{id}")
    public ResponseEntity<Subject> updatePartOfSubject(@PathVariable("id") long id) {
        Subject subject = subjectRepository.findById(id);
        Set<User> users = subject.getUsers();
        for(int i = 0; i < users.size(); i++){
            if(users.contains(id)){

            }
        }
        return new ResponseEntity<Subject>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Subject subject, Map<String, Object> updates) {
        if (updates.containsKey("subjectName")) {
            subject.setSubjectName((String) updates.get("subjectName"));
        }
        if (updates.containsKey("tasks")) {
            Object task = updates.get("tasks");
            ObjectMapper mapper = new ObjectMapper();
            GradedTask task2  = mapper.convertValue(task, new TypeReference<GradedTask>() {});
            subject.addTask(task2);
        }
        subjectRepository.save(subject);
    }


    private void addTask(Subject subject, Map<String, GradedTask> updates) {
        if (updates.containsKey("tasks")) {
            GradedTask task = updates.get("tasks");
            subject.addTask(task);
        }
        subjectRepository.save(subject);
    }
}
