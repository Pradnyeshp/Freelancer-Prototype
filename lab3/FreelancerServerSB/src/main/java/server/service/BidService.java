package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import server.entity.Bids;
import server.repository.BidRepository;
import server.repository.ProjectRepository;

import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public String registerBid( Bids bid ) {
        System.out.println("In Bid Service, Bid Amount : " + bid.getBidamount() );
        System.out.println("In Bid Service, Avg Bid : " + bid.getAveragebid() );
        bidRepository.save(bid);
        int averagebid =  bid.getAveragebid();
        int projectid = bid.getProjectid();
        int number_of_bids = bid.getNumber_of_bids();
        projectRepository.updateProjectforAvg( averagebid , number_of_bids , projectid);
        return "Bid Saved, Number of Bids & Average Updated.";
    }

    public List<Bids> getallbids( Bids bid ) {
        System.out.println("In Bid Service, ID : " + bid.getProjectid());
        int projectid = bid.getProjectid();
        return bidRepository.findByProjectid(projectid);
    }

}
