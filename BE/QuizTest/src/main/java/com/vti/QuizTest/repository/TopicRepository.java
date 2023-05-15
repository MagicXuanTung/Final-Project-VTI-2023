package com.vti.QuizTest.repository;



import com.vti.QuizTest.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends MongoRepository<Topic, Long> {

    Optional<Topic> findById(long id);
    Optional<Topic> deleteById(long id);
    Optional<Topic> findByTopic(String category);
    Page<Topic> findAllByIsDelete(boolean b, Pageable pageable);
}
