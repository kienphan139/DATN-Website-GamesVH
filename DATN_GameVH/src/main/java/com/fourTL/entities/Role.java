package com.fourTL.entities;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name="role")
public class Role  implements Serializable{
	@Id
    @Column(name="Id", unique=true, nullable=false, length=10)
    private String id;
    @Column(name="Name", nullable=false, length=50)
    private String name;
    @OneToMany(mappedBy="role")
    private List<Authority> authority;
}