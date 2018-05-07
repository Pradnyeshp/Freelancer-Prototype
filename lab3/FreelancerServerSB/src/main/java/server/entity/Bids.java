package server.entity;

import javax.persistence.*;

@Entity
public class Bids {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int projectid;
    private String freelancer;
    private int period;
    private int bidamount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProjectid() {
        return projectid;
    }

    public void setProjectid(int projectid) {
        this.projectid = projectid;
    }

    public String getFreelancer() {
        return freelancer;
    }

    public void setFreelancer(String freelancer) {
        this.freelancer = freelancer;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public int getBidamount() {
        return bidamount;
    }

    public void setBidamount(int bidamount) {
        this.bidamount = bidamount;
    }
}
