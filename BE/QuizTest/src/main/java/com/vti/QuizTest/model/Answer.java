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
public class Answer {
    @Transient
    public static final String SEQUENCE_NAME = "answer_sequence";
    @Id
    private Long id;
    private String answer;
    private Boolean isCorrect;
    private Boolean isDelete;

}
