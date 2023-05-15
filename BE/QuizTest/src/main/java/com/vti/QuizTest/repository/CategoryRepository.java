package com.vti.QuizTest.repository;

import com.vti.QuizTest.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    Optional<Category> findById(long id);
    Optional<Category> deleteById(long id);
    Optional<Category> findByCategory(String category);
    Page<Category> findAllByIsDelete(boolean b, Pageable pageable);
}
