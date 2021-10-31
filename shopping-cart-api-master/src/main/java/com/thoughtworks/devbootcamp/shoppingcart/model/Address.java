package com.thoughtworks.devbootcamp.shoppingcart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Address {

    private String address;
    private String city;
    private String pincode;
    private String country;
}
