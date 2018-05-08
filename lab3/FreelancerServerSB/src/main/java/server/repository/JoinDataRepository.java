package server.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import server.entity.JoinData;

import java.util.List;

@Repository
public interface JoinDataRepository extends CrudRepository< JoinData, Long> {

    @Modifying
    @Transactional
    @Query( value = "select * from Bids INNER join projects on Bids.projectid = Projects.id where Bids.freelancer = :freelancer ",
    nativeQuery = true)
    List<JoinData> findByFreelancer(@Param("freelancer") String freelancer );

}
