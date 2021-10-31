package com.thoughtworks.devbootcamp.shoppingcart.request;

import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import com.thoughtworks.devbootcamp.shoppingcart.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class OrderRequest {

    private Cart cart;

    private Customer customerDetails;
}
