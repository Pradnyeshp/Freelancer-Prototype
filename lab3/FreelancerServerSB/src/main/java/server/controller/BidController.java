package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import server.entity.Bids;
import server.service.BidService;

@Controller
@RequestMapping(path = "/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping(path = "/updatebid")
    public ResponseEntity<?> registerBid(@RequestBody Bids bid) {
        System.out.println("In Bid Controller, Bid Amount  : " + bid.getBidamount());
        return new ResponseEntity(bidService.registerBid(bid), HttpStatus.OK);
    }

}
