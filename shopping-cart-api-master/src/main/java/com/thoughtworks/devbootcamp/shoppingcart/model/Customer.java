package com.thoughtworks.devbootcamp.shoppingcart.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String email;
    @Embedded
    private Address adderss;
}
