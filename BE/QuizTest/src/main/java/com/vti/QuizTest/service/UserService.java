package com.vti.QuizTest.service;


import com.vti.QuizTest.model.User;
import com.vti.QuizTest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Configuration
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getUserByPaging(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<User> listBooking = userRepository.findAllByIsActive(false, pageable);
        return listBooking.stream().toList();
    }

    public List<User> insertUser(User newUser) {
        List<User> userList = new ArrayList<>();
        userList.add(userRepository.save(newUser));
        return userList;
    }

    public User deleteUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.get();
        user.setActive(false);
        User returnUser = userRepository.save(user);
        return returnUser;
    }

    public User updateUser(User newUser) {
        Optional<User> userOptional = userRepository.findById(newUser.getId());
        userOptional.get().setActive(newUser.isActive());
        userOptional.get().setEmail(newUser.getEmail());
        userOptional.get().setUserName(newUser.getUserName());
        userOptional.get().setPassWord(newUser.getPassWord());
        userOptional.get().setRoles(newUser.getRoles());
        userRepository.save(userOptional.get());
        return userOptional.get();
    }

    public List<String> getUsernamesByPaging(int pageNumber, int pageSize) {
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        Page<User> pageResult = userRepository.findAll(paging);
        List<String> usernames = new ArrayList<>();
        for (User user : pageResult.getContent()) {
            usernames.add(user.getUserName());
        }
        return usernames;
    }
}
