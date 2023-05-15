package com.vti.QuizTest.service;

import com.vti.QuizTest.model.Answer;

import com.vti.QuizTest.model.Category;
import com.vti.QuizTest.model.Question;


import com.vti.QuizTest.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Configuration
public class QuestionService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;
    @Autowired
    SequenceGeneratorService sequenceGeneratorService;

    // GET ALL ANSWER
    public List<Answer> getAllAnswers(Long categoryId, Long questionId, int pageNumber, int pageSize) {
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

    // INSERT ANSWER
    public Category insertAnswer(Answer answer, Long questionID, Long categoryID)
    {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryID);

        Question questionValue = getQuestionById(questionID, categoryID);
        long id_anwser = sequenceGeneratorService.generateSequence(answer.SEQUENCE_NAME);
        answer.setId(id_anwser);

        List<Answer> answerList = questionValue.getAnswerList();
        answerList.add(answer);
        questionValue.setAnswerList(answerList);

        System.out.println(questionValue.getQuestion());
        Category categoryFound = optionalCategory.get();

        for(int j = 0;j < categoryFound.getQuestionList().size() ;j++)
        {
            if(categoryFound.getQuestionList().get(j).getId() ==questionID){

                categoryFound.getQuestionList().get(j).setQuestion(questionValue.getQuestion());
                categoryFound.getQuestionList().get(j).setAnswerList(questionValue.getAnswerList());

                categoryFound.getQuestionList().get(j).setLevel(questionValue.getLevel());
                break;
            }
        }
            return categoryRepository.save(categoryFound);


    }



    public Question getQuestionById(long questionID, long categoryID){


        Optional<Category> optionalCategory = categoryRepository.findById(categoryID);

        Category category = optionalCategory.get();

        for(Question question: category.getQuestionList()){

            if(question.getId() == questionID){
                return question;
            }
        }

        return  null;
    }

    // UPDATE ANSWER
    public Category updateAnswer(Answer updateAnswer, Long answerID, Long questionID, Long categoryID) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryID);

        if (optionalCategory.isPresent()) {
            Category categoryFound = optionalCategory.get();
            List<Question> questionList = categoryFound.getQuestionList();

            for (Question question : questionList) {
                if (question.getId().equals(questionID)) {
                    List<Answer> answerList = question.getAnswerList();

                    for (Answer answer : answerList) {
                        if (answer.getId().equals(answerID)) {
                            answer.setAnswer(updateAnswer.getAnswer());
                            answer.setIsCorrect(updateAnswer.getIsCorrect());
                            break;
                        }
                    }

                    question.setAnswerList(answerList);
                    break;
                }
            }

            return categoryRepository.save(categoryFound);
        }

        return null;
    }



        //   DELETE ANSWER
        public Category deleteAnswer(Long answerID, Long questionID, Long categoryID) {
            Optional<Category> optionalCategory = categoryRepository.findById(categoryID);
            Category categoryFound = optionalCategory.get();

            Question questionValue = getQuestionById(questionID, categoryID);
            List<Answer> answerList = questionValue.getAnswerList();

            answerList.removeIf(answer -> answer.getId().equals(answerID));

            questionValue.setAnswerList(answerList);

            for(int j = 0; j < categoryFound.getQuestionList().size(); j++) {
                if(categoryFound.getQuestionList().get(j).getId() == questionID) {
                    categoryFound.getQuestionList().get(j).setAnswerList(questionValue.getAnswerList());
                    break;
                }
            }

            return categoryRepository.save(categoryFound);
        }

}
