package com.vti.QuizTest.database;


import com.vti.QuizTest.model.ERole;
import com.vti.QuizTest.model.Role;
import com.vti.QuizTest.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Database {
    @Bean
    CommandLineRunner initDatabase(RoleRepository repository){
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                Role role1 = new Role();
                role1.setName(ERole.ROLE_ADMIN);
                role1.setId(1);
                Role role2 = new Role();
                role2.setId(2);
                role2.setName(ERole.ROLE_CREATOR);
                Role role3 = new Role();
                role3.setName(ERole.ROLE_USER);

                role3.setId(3);

                repository.save(role1);
                repository.save(role2);
                repository.save(role3);
            }
//            if(userRepository.findAll().size()==0){
//
//                User admin = new User();
//                admin.setId(1l);
//                admin.setUserName("super_admin");
//                admin.setFullName("Super");
//                admin.setBalance(1000000000);
//                admin.setCreatedTime(new Date());
//                admin.setNote("This is super account");
//                Set<Role> roles = new HashSet<>();
//                admin.setPassWord(encoder.encode("Azd1232421@#$$$$$!!@!@$#$#$#$%%"));
//                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
//                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                roles.add(adminRole);
//                admin.setRoles(roles);
//                userRepository.save(admin);
//            }
        };
    }
}