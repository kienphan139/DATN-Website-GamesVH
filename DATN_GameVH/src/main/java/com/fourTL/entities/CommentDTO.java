package com.fourTL.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Integer id_comment;
    private String content_comment;
    Date createDate_comment = new Date();
    private String Username_comment;
}
