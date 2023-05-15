package com.vti.QuizTest.controller;

import com.vti.QuizTest.model.Answer;
import com.vti.QuizTest.model.Category;
import com.vti.QuizTest.model.Question;
import com.vti.QuizTest.model.ResponseObject;
import com.vti.QuizTest.repository.CategoryRepository;
import com.vti.QuizTest.service.CategoryService;
import com.vti.QuizTest.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// CATEGORY VÀ QUESTION ANSWER CONTROLLER

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(path  = "/api/v1/category")
public class CategoryController {


    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    QuestionService questionService;



    // GET ALL CATEGORY + QUESTION + ANSWER: http://localhost:8080/api/v1/category
    @GetMapping("")
    ResponseEntity<ResponseObject> getCategory()
    {
        List<Category> categoryList = categoryRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryList));
    }

    //GET ALL CATEGORY ONLY
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        List<Category> activeCategories = new ArrayList<>();
        for (Category category : categoryList) {
            if (!category.isDelete()) {
                Category activeCategory = new Category();
                activeCategory.setId(category.getId());
                activeCategory.setCategory(category.getCategory());
                activeCategories.add(activeCategory);
            }
        }
        return activeCategories;
    }



    // INSERT CATEGORY: http://localhost:8080/api/v1/category/insert
    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertcategory(@RequestBody Category newcategory) {
        Optional<Category> foundCategory = categoryRepository.findByCategory(newcategory.getCategory());

        if(foundCategory.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(new ResponseObject(200, "CATEGORY EXIST", ""));
        }
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryService.insert(newcategory)));

    }


    // UPDATE CATEGORY: http://localhost:8080/api/v1/category/update/{id}
    @PutMapping("/update/{id}")
    ResponseEntity<ResponseObject> updateCategoryById(@RequestBody Category newCategory) {
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryService.updateCategory(newCategory)));
    }


    // DELETE CATEGORY: http://localhost:8080/api/v1/category/delete/{id}
    @DeleteMapping("/delete/{id}")
    ResponseEntity<ResponseObject> deleteCategoryById(@PathVariable Long id) {
        Optional<Category> foundCategory = categoryRepository.findById(id);
        if (foundCategory.isPresent()) {
            categoryRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).
                    body(new ResponseObject(200, "SUCCESS", foundCategory.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).
                body(new ResponseObject(200, "Category not found", ""));
    }

//==================================================================================================================================================================================

    // GET ALL QUESTION IN CATEGORY
    @GetMapping("/{categoryId}/questions")
    public List<Question> getAllQuestions(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {

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

    // INSERT QUESTION: http://localhost:8080/api/v1/category/insertQuestion?categoryID=1
    @PostMapping("/insertQuestion")
    ResponseEntity<ResponseObject> insertQuestion(@RequestBody Question newQuestion,@RequestParam Long categoryID) {
        Optional<Category> foundQuestion = categoryRepository.findByCategory(newQuestion.getQuestion());
        if(foundQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(new ResponseObject(200, "Question EXIST", ""));
        }
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryService.insertQuestion(newQuestion, categoryID)));
    }


    // UPDATE QUESTION: http://localhost:8080/api/v1/category/updateQuestion?categoryID=1
    @PutMapping("/updateQuestion/{categoryId}/questions/{questionId}")
    ResponseEntity<ResponseObject> updateQuestion(@PathVariable Long categoryId,
                                                  @PathVariable Long questionId,
                                                  @RequestBody Question updatedQuestion) {
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryService.updateQuestion(questionId, categoryId, updatedQuestion)));
    }


    //  DELETE QUESTION: http://localhost:8080/api/v1/category/deleteQuestion?categoryID=1
    @DeleteMapping("/deleteQuestion/{questionID}/{categoryID}")
    public ResponseEntity<ResponseObject> deleteQuestion(@PathVariable Long questionID,
                                                   @PathVariable Long categoryID) {
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", categoryService.deleteQuestion(questionID, categoryID)));

    }

//==========================================================================================================================================================================

    //GET ALL ANSWER IN CATEGORY
    @GetMapping("/{categoryId}/questions/{questionId}/answers")
    public List<Answer> getAllAnswers(
            @PathVariable Long categoryId,
            @PathVariable Long questionId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {

        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            List<Question> questionList = category.getQuestionList();
            Optional<Question> optionalQuestion = questionList.stream()
                    .filter(q -> q.getId().equals(questionId))
                    .findFirst();
            if (optionalQuestion.isPresent()) {
                Question question = optionalQuestion.get();
                List<Answer> answerList = question.getAnswerList();

                int startIndex = pageNumber * pageSize;
                int endIndex = Math.min(startIndex + pageSize, answerList.size());
                if (startIndex > endIndex) {
                    return new ArrayList<>();
                }
                return answerList.subList(startIndex, endIndex);
            } else {
                throw new RuntimeException("Question not found");
            }
        } else {
            throw new RuntimeException("Category not found");
        }
    }





    // INSERT ANSWER: http://localhost:8080/api/v1/category/insertAnswer/{questionID}/{categoryID}
    @PostMapping("/insertAnswer/{questionID}/{categoryID}")
    ResponseEntity<ResponseObject> insertAnswer(@RequestBody Answer newAnswer,
                                                @PathVariable Long questionID, @PathVariable Long categoryID) {
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", questionService
                        .insertAnswer(newAnswer, questionID,categoryID)));
    }


    // UPDATE ANSWER: http://localhost:8080/api/v1/category/updateAnswer/{answerID}/{questionID}/{categoryID}
    @PutMapping("/updateAnswer/{answerID}/{questionID}/{categoryID}")
    public ResponseEntity<ResponseObject> updateAnswer(@RequestBody Answer updatedAnswer, @PathVariable Long answerID,
                                                       @PathVariable Long questionID, @PathVariable Long categoryID) {
        Category updatedCategory = questionService.updateAnswer(updatedAnswer, answerID, questionID, categoryID);
        if (updatedCategory != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject(200, "SUCCESS", updatedCategory));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject(400, "FAILED", null));
        }
    }




    //  DELETE ANSWER: http://localhost:8080/api/v1/category/deleteAnswer/{answerID}/{questionID}/{categoryID}
    @DeleteMapping("/deleteAnswer/{answerID}/{questionID}/{categoryID}")
    ResponseEntity<ResponseObject> deleteAnswer(@PathVariable Long answerID,
                                                  @PathVariable Long questionID, @PathVariable Long categoryID) {
        return ResponseEntity.status(HttpStatus.OK).
                body(new ResponseObject(200, "SUCCESS", questionService.deleteAnswer(answerID,questionID,categoryID)));
    }



}
