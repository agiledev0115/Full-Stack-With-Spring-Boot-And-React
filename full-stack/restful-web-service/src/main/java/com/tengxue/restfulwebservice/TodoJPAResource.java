package com.tengxue.restfulwebservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoJPAResource {

    @Autowired
    private TodoHardcodedService todoHardCodedService;

    @Autowired
    private TodoJPARepository todoJPARepository;

    //1. Retrive/GET all todos for a user:
    @GetMapping("/jpa/users/{username}/todos")
    public List<Todos> getAllTodos(@PathVariable String username) {
        //return todoHardCodedService.findAll();
        return todoJPARepository.findByUsername(username);
    }

    //1. Retrive/GET a todo for a user:
    @GetMapping("/jpa/users/{username}/todos/{id}")
    public Todos getTodo(@PathVariable String username, @PathVariable long id) {
        //return todoHardCodedService.findById(id);
        return todoJPARepository.findById(id).get();
    }

    //2. DELETE a todo of a user:
    @DeleteMapping("/jpa/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        todoJPARepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //3. Edit/Update/PUT a todo of a user:
    @PutMapping("/jpa/users/{username}/todos/{id}")
    public ResponseEntity<Todos> updateTodo(@PathVariable String username, @PathVariable long id,
                                            @RequestBody Todos todo) {
        //Todos todoUpdated = todoHardCodedService.save(todo);
        todo.setUsername(username);
        Todos todoUpdated = todoJPARepository.save(todo);
        return new ResponseEntity<Todos>(todo, HttpStatus.OK);
    }

    //4. Add/Create/POST a new todo of a user:
    @PostMapping("/jpa/users/{username}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todos todo) {
        //Todos todoCreated = todoHardCodedService.save(todo);
        todo.setUsername(username);
        Todos todoCreated = todoJPARepository.save(todo);
        //get current location url and expand the new id into it
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(todoCreated.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
