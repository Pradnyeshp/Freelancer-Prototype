package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import server.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import server.service.UserService;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserService userService;

    @PostMapping(path="/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String addNewUser (@RequestBody Users user){
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("User in addNewUser" + user.getUsername());
        userService.addUser(user);
        return "Saved";
    }

    @PostMapping(path="/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> login (@RequestBody Users user){
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("In User Controller Login" + user.getUsername());
        String username = user.getUsername();
        String password = user.getPassword();
        return new ResponseEntity(userService.login(username, password), HttpStatus.OK);

    }

    @PostMapping(path="/getprofile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> getProfile (@RequestBody Users user){
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("In User Controller getProfile" + user.getUsername() );
        return new ResponseEntity(userService.getProfile(user.getUsername()), HttpStatus.OK);

    }

    @PostMapping(path="/updateprofile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateProfile (@RequestBody Users user){
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("In User Controller : Update Profile : " + user.getUsername() );
        return new ResponseEntity(userService.updateProfile(user), HttpStatus.OK);

    }

}