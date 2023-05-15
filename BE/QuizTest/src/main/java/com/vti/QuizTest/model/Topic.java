package com.vti.QuizTest.model;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Topic {
    @Transient
    public static final String SEQUENCE_NAME = "topic_sequence";
    @Id
    private Long id;
    private String topic;
    private List<Long>questionListID;
    private List<Question>questionList;
    private boolean isDelete;

    public List<Long> getQuestionListID() {
        return questionListID;
    }
}