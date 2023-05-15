package com.vti.QuizTest.service;


import com.vti.QuizTest.model.Category;
import com.vti.QuizTest.model.Question;
import com.vti.QuizTest.model.Topic;
import com.vti.QuizTest.repository.CategoryRepository;
import com.vti.QuizTest.repository.QuestionRepository;
import com.vti.QuizTest.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Configuration
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    public List<Topic> getTopicByPaging(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Topic> listTopic = topicRepository.findAllByIsDelete(false,pageable);
        return listTopic.stream().toList();
    }


    //  INSERT TOPIC
    public Topic insertTopic(Topic topic){
        topic.setQuestionListID(new ArrayList<>());
        topic.setId(sequenceGeneratorService.generateSequence(topic.SEQUENCE_NAME));
        return topicRepository.save(topic);
    }


    // UPDATE TOPIC
    public Topic updateTopic(long topicID, List<Long> listQuestionID) {
        Optional<Topic> topicOption = topicRepository.findById(topicID);
        List<Long> questionListID = topicOption.get().getQuestionListID();
        Topic topicUpdate = topicOption.get();
        topicUpdate.setQuestionListID(listQuestionID);
        return topicRepository.save(topicUpdate);
    }

    public  List<Question> getListQuestionByTopicID(long topicID)
    {
        Optional<Topic> topicOptional = topicRepository.findById(topicID);
        List<Question> questionList = new ArrayList<>();
        if(topicOptional.isPresent()){
            List<Long> listQuestionID =  topicOptional.get().getQuestionListID();
            for(long i : listQuestionID)
            {
                Question question = categoryService.getQuestionByID(i);
                questionList.add(question);
            }
        }
        return questionList;
    }

    // DELETE TOPIC
    public Topic deleteById(Long id) {
        Optional<Topic> TopicOptional = topicRepository.findById(id);
        Topic Topic = TopicOptional.get();
        Topic.setDelete(true);
        Topic returnTopic = topicRepository.save(Topic);
        return returnTopic;
    }








}
