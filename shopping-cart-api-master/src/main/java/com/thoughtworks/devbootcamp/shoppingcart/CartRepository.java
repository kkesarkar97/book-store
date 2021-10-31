package com.thoughtworks.devbootcamp.shoppingcart;

import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
