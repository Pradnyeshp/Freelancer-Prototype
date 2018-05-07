package server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import server.entity.Bids;

@Repository
public interface BidRepository extends CrudRepository<Bids, Long> {



}
