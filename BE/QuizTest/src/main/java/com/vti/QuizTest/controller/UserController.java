package com.vti.QuizTest.controller;


import com.vti.QuizTest.model.User;
import com.vti.QuizTest.model.ResponseObject;
import com.vti.QuizTest.repository.UserRepository;
import com.vti.QuizTest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

        @GetMapping("")
        ResponseEntity<ResponseObject> getUser()
        {
            List<User> UserList = userRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).
                    body(new ResponseObject(200, "SUCCESS", UserList));
        }
//    @GetMapping("")
////    http://localhost:8080/api/v1/users?pageNumber=0&pageSize=5
//    ResponseEntity<ResponseObject> getUserPaging(@RequestParam int pageNumber, @RequestParam int pageSize){
//        return  ResponseEntity.status(HttpStatus.OK).
//                body(new ResponseObject("ok","success", userService.getUserByPaging(pageNumber,pageSize)));
//    }

        @PostMapping("/insert")
        ResponseEntity<ResponseObject> insertUser(@RequestBody User newUser) {

            Optional<User> foundUser = userRepository.findByUserName(newUser.getUserName());

            if (foundUser.isPresent())
            {
                return  ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).
                        body(new ResponseObject(200,"User already exist", "" ));
            }
            return  ResponseEntity.status(HttpStatus.OK).
                    body(new ResponseObject(200,"success", userService.insertUser(newUser) ));
        }

        @PutMapping("/update/{id}")
        ResponseEntity<ResponseObject> updateUserById(@RequestBody User user)
        {
            return  ResponseEntity.status(HttpStatus.OK).
                    body(new ResponseObject(200,"success", userService.updateUser(user)));
        }

        @DeleteMapping("/delete/{id}")
        ResponseEntity<ResponseObject> deleteUserById(@PathVariable Long id)
        {
            Optional<User> foundUser = userRepository.findById(id);
            if(foundUser.isPresent()){
                return  ResponseEntity.status(HttpStatus.OK).
                        body(new ResponseObject(200,"success", userService.deleteUser(id)));
            }
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(new ResponseObject(200,"User not found", "" ));
        }
}
