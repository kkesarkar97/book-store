package builder;

import com.thoughtworks.devbootcamp.shoppingcart.model.Address;
import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import com.thoughtworks.devbootcamp.shoppingcart.model.Customer;
import com.thoughtworks.devbootcamp.shoppingcart.request.OrderRequest;

public class OrderRequestBuilder {
    public static final Address ADDRESS = Address.builder()
            .address("123 east street")
            .city("Pune")
            .country("India")
            .pincode("411033")
            .build();
    public static final Customer CUSTOMER = Customer.builder()
            .adderss(ADDRESS)
            .name("Mark Holder")
            .email("mark@holder.com")
            .build();
    public static final Book BOOK_1 = Book.builder()
            .id(1)
            .name("Book1")
            .price(100)
            .build();
    public static final Book BOOK_2 = Book.builder()
            .id(2)
            .name("Book2")
            .price(200)
            .build();


    public static OrderRequest buildOrderRequest() {
        Cart cart= new Cart(5L);
        cart.addBook(OrderRequestBuilder.BOOK_1);
        cart.addBook(OrderRequestBuilder.BOOK_1);
        cart.addBook(OrderRequestBuilder.BOOK_2);

        return OrderRequest.builder().cart(cart).customerDetails(OrderRequestBuilder.CUSTOMER).build();
    }
}
