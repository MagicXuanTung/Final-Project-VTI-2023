package com.vti.QuizTest.controller;

import com.vti.QuizTest.model.Category;
import com.vti.QuizTest.model.Question;
import com.vti.QuizTest.model.Topic;
import com.vti.QuizTest.model.ResponseObject;
import com.vti.QuizTest.repository.CategoryRepository;
import com.vti.QuizTest.repository.TopicRepository;
import com.vti.QuizTest.service.SequenceGeneratorService;
import com.vti.QuizTest.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path  = "/api/v1/Topics")


public class TopicController {
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicService topicService;

    @Autowired
    CategoryRepository categoryRepository;
    private SequenceGeneratorService sequenceGeneratorService;


    // GET ALL TOPIC http://localhost:8080/api/v1/Topics
    @GetMapping("")
    ResponseEntity<ResponseObject> getTopic()
    {
        List<Topic> TopicList = topicRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", TopicList));
    }


    // INSERT TOPICS http://localhost:8080/api/v1/Topics/insert
    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertTopic(@RequestBody Topic newTopic) {

        Optional<Topic> foundTopic = topicRepository.findByTopic(newTopic.getTopic());

        if (foundTopic.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(new ResponseObject(200, "Topics already exist", ""));
        }
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", topicService.insertTopic(newTopic)));
    }

    // UPDATE TOPICS http://localhost:8080/api/v1/Topics/update/{id}
    @PutMapping("/topics/{topicID}")
    public ResponseEntity<ResponseObject> updateTopic(@PathVariable long topicID, @RequestBody List<Long> listQuestionID) {
        Topic updatedTopic = topicService.updateTopic(topicID, listQuestionID);


        List<Question> questionList = topicService.getListQuestionByTopicID(topicID);
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", questionList));
    }



    // DELETE TOPICS http://localhost:8080/api/v1/Topics/delete/1
    @DeleteMapping("/delete/{id}")
    ResponseEntity<ResponseObject> deleteById(@PathVariable Long id) {
        Optional<Topic> foundTopic = topicRepository.findById(id);
        if (foundTopic.isPresent()) {
            topicRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).
                    body(new ResponseObject(200, "SUCCESS", foundTopic.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).
                body(new ResponseObject(200, "Topic not found", ""));
    }
}
