package com.vti.QuizTest.service;


import com.vti.QuizTest.model.Category;
import com.vti.QuizTest.model.Question;
import com.vti.QuizTest.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Configurable
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SequenceGeneratorService sequenceGeneratorService;


    public List<Category> getListCategory(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Category> listCategory = categoryRepository.findAllByIsDelete(false,pageable);
        return listCategory.stream().toList();
    }

    // GET ALL CATEGORY
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }



    //  INSERT CATEGORY
    public Category insert(Category category){
        category.setQuestionList(new ArrayList<>());
        category.setId(sequenceGeneratorService.generateSequence(category.SEQUENCE_NAME));
        return categoryRepository.save(category);
    }


    // UPDATE CATEGORY
    public Category updateCategory(Category newCategory) {
        Optional<Category> categoryOption = categoryRepository.findById(newCategory.getId());
        List<Question> questionList = categoryOption.get().getQuestionList();
        Category categoryUpdate = categoryOption.get();
        categoryUpdate.setCategory(newCategory.getCategory());
        categoryUpdate.setDelete(newCategory.isDelete());
        categoryUpdate.setQuestionList(questionList);
        return categoryRepository.save(categoryUpdate);
    }


    // DELETE CATEGORY
    public Category deleteCategory(Long id) {
        Optional<Category> CategoryrOptional = categoryRepository.findById(id);
        Category Category = CategoryrOptional.get();
        Category.setDelete(true);
        Category returnAnswer = categoryRepository.save(Category);
        return returnAnswer;
    }


//=======================================================================================================================================


    // GET ALL QUESTION
    public List<Question> getAllQuestions(Long categoryId, int pageNumber, int pageSize) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            List<Question> questionList = category.getQuestionList();
            int startIndex = pageNumber * pageSize;
            int endIndex = Math.min(startIndex + pageSize, questionList.size());
            if (startIndex > endIndex) {
                return new ArrayList<>();
            }
            return questionList.subList(startIndex, endIndex);
        } else {
            throw new RuntimeException("Category not found");
        }}



        // INSERT QUESTION
    public Category insertQuestion(Question question, Long categoryID)
    {
        Optional<Category> optionalGroup = categoryRepository.findById(categoryID);
        if(optionalGroup.isPresent()){
            Category category = optionalGroup.get();
            List<Question> questionList = category.getQuestionList();
            question.setId(sequenceGeneratorService.generateSequence(question.SEQUENCE_NAME));

            boolean dupplicate = false;
            for(Question question1: questionList)
            {
                if(question.getQuestion().equals(question1.getQuestion()))
                {
                    dupplicate = true;
                }
            }
            if(dupplicate== false){
                questionList.add(question);
            }
            category.setQuestionList(questionList);


            return categoryRepository.save(category);
        }
        return null;
    }

    public Question getQuestionByID(long questionID){

        for(Category category: categoryRepository.findAll())
        {
            for(Question question: category.getQuestionList())
            {
                if(question.getId()== questionID){
                    return question;
                }
            }
        }
        return null;

    }

    // UPDATE QUESTION
    public Category updateQuestion(Long questionId, Long categoryId, Question updatedQuestion) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            List<Question> questionList = category.getQuestionList();
            for (Question question : questionList) {
                if (question.getId().equals(questionId)) {
                    question.setQuestion(updatedQuestion.getQuestion());
                    question.setLevel(updatedQuestion.getLevel());
                    break;
                }
            }
            category.setQuestionList(questionList);
            return categoryRepository.save(category);
        } else {
            throw new RuntimeException("Category not found");
        }
    }



    // DELETE QUESTION
    public Category deleteQuestion(Long questionID, Long categoryID)
    {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryID);
        if(optionalCategory.isPresent()){
            Category category = optionalCategory.get();
            List<Question> questionList = category.getQuestionList();

            for(Question question: questionList)
            {
                if(question.getId() == questionID)
                {

                    questionList.remove(question);
                    break;
                }
            }
            category.setQuestionList(questionList);
            return categoryRepository.save(category);
        }

        return null;
    }

}
