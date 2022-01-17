package com.tengxue.restfulwebservice;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {
    private static List<Todos> todos = new ArrayList<>();
    private static long idCounter = 0;

    //serve as a temp database
    static {
        todos.add(new Todos(++idCounter, "tengxue", "Learn React", new Date(), false));
        todos.add(new Todos(++idCounter, "tengxue", "Learn Spring Boot", new Date(), false));
        todos.add(new Todos(++idCounter, "tengxue", "Learn Leetcode", new Date(), false));
    }

    public List<Todos> findAll() {
        return todos;
    }

    public Todos deleteById(long id) {
        Todos todo = findById(id);
        if(todo == null) return null;
        if(todos.remove(todo)) return todo;
        return null;
    }

    public Todos findById(long id) {
        for(Todos todo : todos) {
            if(todo.getId() == id) return todo;
        }
        return null;
    }

    public Todos save(Todos todo) {
        if (todo.getId() <= 0) {
            //create a new todo
            todo.setId(++idCounter);
            todos.add(todo);
        }
        else {
            //update an existed todo
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }


}
