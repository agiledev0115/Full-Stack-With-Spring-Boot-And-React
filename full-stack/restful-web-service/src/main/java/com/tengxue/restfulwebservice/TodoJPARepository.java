package com.tengxue.restfulwebservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//Spring Data JPA: create an interface to extend JpaRepository<Entity, Primary Key>
@Repository
public interface TodoJPARepository extends JpaRepository<Todos, Long> {
    List<Todos> findByUsername(String username);
}
