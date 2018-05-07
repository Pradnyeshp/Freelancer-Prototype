package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import server.entity.Projects;
import server.service.ProjectService;

@Controller
@RequestMapping(path = "/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping(path = "/getprojects")
    public ResponseEntity<Projects> getProjects(){
        return new ResponseEntity( projectService.getAllProjects(), HttpStatus.OK);
    }

    @PostMapping(path = "/addproject")
    public ResponseEntity<String> addProject(@RequestBody Projects project) {
        System.out.println("In Project Controller, Add Project : " + project.getEmployer());
        projectService.addProject(project);
        return new ResponseEntity("Project Added", HttpStatus.OK) ;
    }

    @PostMapping(path = "/getproject")
    public ResponseEntity<Projects> getProjectbyId(@RequestBody Projects project ){
        System.out.println("In Project Controller, Get Project By Id : " + project.getId() );
        return new ResponseEntity( projectService.getProjectbyId(project.getId()), HttpStatus.OK);
    }


}
