package server.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Projects;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Projects, Long > {

//    ResponseEntity<Projects> findAll
    List<Projects> findById(int id);

    @Modifying
    @Transactional
    @Query("UPDATE Projects SET averagebid = :averagebid, number_of_bids = :number_of_bids WHERE id = :projectid ")
    void updateProjectforAvg(@Param("averagebid") int averagebid,
                       @Param("number_of_bids") int number_of_bids,
                       @Param("projectid") int projectid
    );

}
