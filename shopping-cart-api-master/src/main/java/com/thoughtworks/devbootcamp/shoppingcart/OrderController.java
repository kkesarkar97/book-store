package com.thoughtworks.devbootcamp.shoppingcart;

import com.thoughtworks.devbootcamp.shoppingcart.model.Order;
import com.thoughtworks.devbootcamp.shoppingcart.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // should be communicating with cart service async
    @Autowired
    private CartRepository cartRepository;

    @RequestMapping("/orders")
    public Order createOrderFromCart(@RequestBody OrderRequest request){


        Order order = Order.create(request.getCart(), request.getCustomerDetails());
        order = orderRepository.save(order);

        cartRepository.delete(request.getCart());

        return order;
    }
}
