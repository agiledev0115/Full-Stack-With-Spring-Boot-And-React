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
public class TodoResource {

    @Autowired
    private TodoHardcodedService todoHardCodedService;

    //1. Retrive/GET all todos for a user:
    @GetMapping("/users/{username}/todos")
    public List<Todos> getAllTodos(@PathVariable String username) {
        return todoHardCodedService.findAll();
    }
    //1. Retrive/GET a todo for a user:
    @GetMapping("/users/{username}/todos/{id}")
    public Todos getTodo(@PathVariable String username, @PathVariable long id) {
        return todoHardCodedService.findById(id);
    }

    //2. DELETE a todo of a user:
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        Todos todo = todoHardCodedService.deleteById(id);
        //if delete was successful, meaning todo was not null
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        //else
        return ResponseEntity.notFound().build();
    }

    //3. Edit/Update/PUT a todo of a user:
    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todos> updateTodo(@PathVariable String username, @PathVariable long id,
                                            @RequestBody Todos todo) {
        Todos todoUpdated = todoHardCodedService.save(todo);
        return new ResponseEntity<Todos>(todo, HttpStatus.OK);
    }

    //4. Add/Create/POST a new todo of a user:
    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todos todo) {
        Todos todoCreated = todoHardCodedService.save(todo);
        //get current location url and expand the new id into it
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(todoCreated.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
