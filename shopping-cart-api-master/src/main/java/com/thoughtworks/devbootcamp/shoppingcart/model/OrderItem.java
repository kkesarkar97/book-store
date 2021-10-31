package com.thoughtworks.devbootcamp.shoppingcart.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long bookId;
    private String name;
    private double price;
    private int quantity;

    public static OrderItem from(CartItem item) {
        OrderItem orderItem = new OrderItem();

        orderItem.bookId=item.getBook().getId();
        orderItem.name = item.getBook().getName();
        orderItem.price = item.getBook().getPrice();
        orderItem.quantity = item.getQuantity();

        return orderItem;
    }
}
