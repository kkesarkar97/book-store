package com.thoughtworks.devbootcamp.shoppingcart.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "orderid")
    private List<OrderItem> items;

    @ManyToOne(cascade = CascadeType.ALL)
    private Customer customer;

    private Double totalPrice;

    public static Order create(Cart cart, Customer customerDetails) {

        Order order = new Order();
        order.customer = customerDetails;
        order.totalPrice = cart.getTotalPrice();

        order.items = cart.getItems().stream().map(OrderItem::from).collect(Collectors.toList());

        return order;
    }
}
