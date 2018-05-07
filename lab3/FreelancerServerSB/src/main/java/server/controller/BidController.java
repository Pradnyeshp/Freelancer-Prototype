package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import server.entity.Bids;
import server.service.BidService;

@Controller
public class BidController {

    @Autowired
    private BidService bidService;

    public ResponseEntity<?> registerBid(Bids bid) {
        System.out.println(bid.getBidamount());
        return new ResponseEntity(bidService.registerBid(bid), HttpStatus.OK);
    }

}
