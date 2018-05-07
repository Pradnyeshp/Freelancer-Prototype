package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import server.entity.Projects;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Projects, Long > {

//    ResponseEntity<Projects> findAll
    List<Projects> findById(int id);

}
