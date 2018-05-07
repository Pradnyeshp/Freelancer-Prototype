package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import server.entity.Projects;
import server.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Iterable<Projects> getAllProjects() {
        return projectRepository.findAll();
    }

    public void addProject( Projects project ) {
        System.out.println( "In Project service "+ project);
        projectRepository.save(project);
    }

    public Iterable<Projects> getProjectbyId( int id ) {
        System.out.println( "In Project service "+ id );
        return projectRepository.findById(id);
    }

}
