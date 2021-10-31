package com.thoughtworks.devbootcamp.shoppingcart.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
@Data
@NoArgsConstructor
public class CartItem {


    @ManyToOne
    private Book book;

    private int quantity;

    public CartItem(Book book) {

        this.book = book;
    }

    public void incrementQuantity() {
        this.quantity++;
    }

    public void decrementQuantity() {
        this.quantity--;
    }
}
