package server.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import server.entity.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    List<Users> findByUsernameAndPassword( String username, String password );
    List<Users> findByUsername( String username );

    @Modifying
    @Transactional
    @Query("UPDATE Users SET name = :name, email = :email, phone = :phone, aboutme = :aboutme, skills = :skills WHERE username = :username ")
    void updateProfile(@Param("name") String name,
                       @Param("email") String email,
                       @Param("phone") String phone,
                       @Param("aboutme") String aboutme,
                       @Param("skills") String skills,
                       @Param("username") String username
    );

}
