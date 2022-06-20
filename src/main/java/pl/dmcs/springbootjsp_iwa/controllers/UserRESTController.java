package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Subject;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.repository.SubjectRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;

import java.util.*;

@RestController
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/users")
    public class UserRESTController {
    private UserRepository userRepository;
    private SubjectRepository subjectRepository;

    @Autowired
    public UserRESTController(UserRepository userRepository, SubjectRepository subjectRepository) {
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
    }

    @RequestMapping(method = RequestMethod.GET/*, produces = "application/xml"*/)
    //@GetMapping
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/2", method = RequestMethod.GET/*, produces = "application/xml"*/)
    //@GetMapping
    public List<User> findAllStudents() {
        List<User> allUsers = userRepository.findAll();
        System.out.println(allUsers);
        List<User> users = new ArrayList<>();
        for(int i = 0; i < allUsers.size(); i++) {
            if (allUsers.get(i).getRoles().size() != 2) {
                users.add(allUsers.get(i));
                }
            }
        return users;
    }




    @RequestMapping(value = "/{subjectid}/2", method = RequestMethod.GET)
    //@GetMapping
    public List<User> findAllUsers(@PathVariable("subjectid") long subjectid) {
        Subject subject = subjectRepository.findById(subjectid);
        Set<User> users = subject.getUsers();
        List<User> students = new ArrayList<>();
        for (Iterator<User> it = users.iterator(); it.hasNext(); ) {
            User f = it.next();
            if(f.getRoles().size() != 2) {
                Set<Subject> subjects = f.getSubjects();
                for (Iterator<Subject> it2 = subjects.iterator(); it2.hasNext(); ) {
                    Subject f2 = it2.next();
                    if (f2.getId() == subjectid) {
                        students.add(f);
                    }
                }
            }
        }
//        TreeSet<User> sortedUsers = new TreeSet<>(users);
        students.sort(new Comparator<User>() {
            @Override
            public int compare(User o1, User o2) {
                return o1.getFirstname().compareTo(o2.getFirstname());
            }
        });
        return students;
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    //@GetMapping
    public Optional<User> findUser(@PathVariable("username") String username) {
        return userRepository.findByUsername(username);
    }

//    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
//    //@GetMapping
//    public User findUser(@PathVariable("id") long id) {
//        return userRepository.findById(id);
//    }

    @RequestMapping(method = RequestMethod.POST)
    //@PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userRepository.save(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    //@DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            System.out.println("Student not found!");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{subjectId}/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<User> deleteUserFromSubject(@PathVariable("id") long id, @PathVariable("subjectId") long subjectId) {
        Subject subject = subjectRepository.findById(subjectId);
        User user = userRepository.findById(id);
        Set<Subject> subjects = user.getSubjects();
        if(user != null){
            if(subjects.contains(subject))
                subjects.remove(subject);
                userRepository.save(user);
        }

        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    //@PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("id") long id) {
        user.setId(id);
        userRepository.save(user);
        return new ResponseEntity<User>(user, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PATCH)
    public ResponseEntity<Subject> updateUserAddSubject(@RequestBody Subject subject, @PathVariable("username") String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            User tempUser = user.get();
            Set<Subject> subjects = tempUser.getSubjects();
            subjects.add(subject);
            tempUser.setSubjects(subjects);
            subjectRepository.save(subject);
            userRepository.save(tempUser);
        }
        return new ResponseEntity<Subject>(subject, HttpStatus.NO_CONTENT);
    }



    private void partialUserUpdate(User user, Map<String, Object> updates) {
        if (updates.containsKey("firstname")) {
            user.setFirstname((String) updates.get("firstname"));
        }
        if (updates.containsKey("lastname")) {
            user.setLastname((String) updates.get("lastname"));
        }
        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("telephone")) {
            user.setTelephone((String) updates.get("telephone"));
        if(updates.containsKey("subjectName")){
            Set<Subject> subjects = user.getSubjects();
            Subject subject = new Subject((String) updates.get("subjectName"));
            subjects.add(subject);
            user.setSubjects(subjects);
            subjectRepository.save(subject);
        }
            userRepository.save(user);
        }

    }
}

