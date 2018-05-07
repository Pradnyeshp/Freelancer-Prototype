package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import server.entity.Users;
import server.repository.UserRepository;

import java.awt.*;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void addUser(Users user){
        userRepository.save(user);
        System.out.println("User details saved in database");
    }

    public List<Users> login(String username, String password ) {
        System.out.println("In User Service" + username + " : "+ password);
        return userRepository.findByUsernameAndPassword(username,password);
    }

    public List<Users> getProfile(String username ) {
        System.out.println("In User Service : " + username );
        return userRepository.findByUsername(username);
    }

    public String updateProfile(Users user ) {
        System.out.println("In User Service : " + user.getUsername() );
        userRepository.updateProfile( user.getName(), user.getEmail(),user.getPhone(), user.getAboutme(), user.getSkills(), user.getUsername());
        return "Profile Updated";
    }

}
