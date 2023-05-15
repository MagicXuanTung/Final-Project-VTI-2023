package com.vti.QuizTest.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Category {
    @Transient
    public static final String SEQUENCE_NAME = "category_sequence";
    @Id
    private  Long id;
    private String category;

    public List<Question> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Question> questionList) {
        this.questionList = questionList;
    }

    private List<Question>questionList;
    private  boolean isDelete;
}
