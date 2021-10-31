package com.thoughtworks.devbootcamp.shoppingcart.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Data
@NoArgsConstructor
public class Cart {

    @Id
    Long id;

    @ElementCollection
    List<CartItem> items = new ArrayList<>();

    public Cart(Long id) {
        this.id = id;
    }

    public double getTotalPrice(){
        return items.stream().mapToDouble(item->item.getQuantity()*item.getBook().getPrice()).sum();
    }

    public void addBook(Book book) {

        CartItem item = findItemWithBook(book)
                .orElseGet(() -> {
                    CartItem newItem = new CartItem(book);
                    items.add(newItem);
                    return newItem;
                });
        item.incrementQuantity();
    }

    private Optional<CartItem> findItemWithBook(Book book) {
        return items.stream()
                .filter(item -> item.getBook().equals(book))
                .findFirst();
    }

    public void removeBook(Book book) {

        Optional<CartItem> item = findItemWithBook(book);
        if(item.isPresent()){
            CartItem cartItem = item.get();
            cartItem.decrementQuantity();
            if(cartItem.getQuantity() == 0){
                this.items.remove(cartItem);
            }
        }
    }
}
