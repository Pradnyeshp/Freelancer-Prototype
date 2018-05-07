package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import server.entity.Bids;
import server.repository.BidRepository;

import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public String registerBid( Bids bid ) {
        System.out.println("In Bid Service, : " + bid.getBidamount() );
        bidRepository.save(bid);
        return "Bid Saved";
    }

}
