package com.vti.QuizTest.repository;


import com.vti.QuizTest.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface QuestionRepository extends MongoRepository<Question, Long> {
    Optional<Question> findById(long id);
    Optional<Question> deleteById(long id);
    Optional<Question> findByQuestion(String question);
    Page<Question> findAllByIsDelete(boolean b, Pageable pageable);
}

