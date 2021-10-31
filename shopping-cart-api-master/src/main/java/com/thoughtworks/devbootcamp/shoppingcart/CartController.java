package com.thoughtworks.devbootcamp.shoppingcart;


import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/cart/{cartId}")
    public Cart addToCart(@PathVariable long cartId, @Valid @RequestBody Book book) {
        Cart cart = cartRepository
                .findById(cartId)
                .orElseGet(() -> new Cart(cartId));
        cart.addBook(book);
        cart = cartRepository.save(cart);
        return cart;
    }

    @DeleteMapping("/cart/{cartId}/items/{bookId}")
    public Cart removeFromCart(@PathVariable long cartId, @PathVariable long bookId) throws Exception {
        Cart cart = cartRepository
                .findById(cartId)
                .orElseThrow(()-> new ResourceNotFoundException("Not Found"));

        cart.removeBook(Book.builder().id(bookId).build());

        cart = cartRepository.save(cart);
        return cart;
    }

    @GetMapping("/cart/{cartId}")
    public Cart getCart(@PathVariable long cartId) throws Exception {

        return cartRepository
                .findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Not Found"));
    }
}
