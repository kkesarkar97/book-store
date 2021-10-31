package unit.com.thoughtworks.devbootcamp.shoppingcart;

import com.thoughtworks.devbootcamp.shoppingcart.CartRepository;
import com.thoughtworks.devbootcamp.shoppingcart.OrderController;
import com.thoughtworks.devbootcamp.shoppingcart.OrderRepository;
import com.thoughtworks.devbootcamp.shoppingcart.model.Order;
import com.thoughtworks.devbootcamp.shoppingcart.request.OrderRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static builder.OrderRequestBuilder.*;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class OrderControllerTest {


    @InjectMocks
    private OrderController orderController;

    @Mock
    OrderRepository orderRepository;

    @Mock
    CartRepository cartRepository;

    @Test
    public void shouldCreateOrderFromCartAndCustomerDetails(){


        OrderRequest orderRequest = buildOrderRequest();
        orderController.createOrderFromCart(orderRequest);

        ArgumentCaptor<Order> argumentCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).save(argumentCaptor.capture());

        Order order = argumentCaptor.getValue();
        assertThat(order.getItems().size(), is(2));
        assertThat(order.getItems().get(0).getBookId(), is(BOOK_1.getId()));
        assertThat(order.getItems().get(0).getName(), is(BOOK_1.getName()));
        assertThat(order.getItems().get(0).getPrice(), is(BOOK_1.getPrice()));
        assertThat(order.getItems().get(0).getQuantity(), is(2));

        assertThat(order.getItems().get(1).getBookId(), is(BOOK_2.getId()));
        assertThat(order.getItems().get(1).getName(), is(BOOK_2.getName()));
        assertThat(order.getItems().get(1).getPrice(), is(BOOK_2.getPrice()));
        assertThat(order.getItems().get(1).getQuantity(), is(1));


        assertThat(order.getCustomer().getName(), is(CUSTOMER.getName()));
        assertThat(order.getCustomer().getEmail(), is(CUSTOMER.getEmail()));
        assertThat(order.getCustomer().getAdderss().getAddress(), is(ADDRESS.getAddress()));
        assertThat(order.getCustomer().getAdderss().getCity(), is(ADDRESS.getCity()));
        assertThat(order.getCustomer().getAdderss().getPincode(), is(ADDRESS.getPincode()));
        assertThat(order.getCustomer().getAdderss().getCountry(), is(ADDRESS.getCountry()));


        verify(cartRepository).delete(orderRequest.getCart());

    }


}
