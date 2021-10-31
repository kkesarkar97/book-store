package unit.com.thoughtworks.devbootcamp.shoppingcart.model;

import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class CartTest {

    @Test
    public void shouldAddBookIfNotExist(){
        Cart cart = new Cart(1L);
        Book book = Book.builder().build();
        cart.addBook(book);

        assertThat(cart.getItems().size(), is(1));
        assertThat(cart.getItems().get(0).getBook(), is(book));
        assertThat(cart.getItems().get(0).getQuantity(), is(1));
    }

    @Test
    public void shouldIncrementQuantityIfExistsOnAdd(){
        Cart cart = new Cart(1L);
        Book book = Book.builder().id(2).build();
        cart.addBook(book);
        cart.addBook(book);

        assertThat(cart.getItems().size(), is(1));
        assertThat(cart.getItems().get(0).getBook(), is(book));
        assertThat(cart.getItems().get(0).getQuantity(), is(2));
    }

    @Test
    public void shouldDecrementQuantityIfExistsOnRemove(){
        Cart cart = new Cart(1L);
        Book book = Book.builder().id(2).build();
        cart.addBook(book);
        cart.addBook(book);

        cart.removeBook(book);
        assertThat(cart.getItems().get(0).getQuantity(), is(1));
    }

    @Test
    public void shouldRemoveItemIfLastOnRemove(){
        Cart cart = new Cart(1L);
        Book book1 = Book.builder().id(1).build();
        Book book2 = Book.builder().id(2).build();
        cart.addBook(book1);
        cart.addBook(book2);

        cart.removeBook(book1);
        assertThat(cart.getItems().size(), is(1));
        assertThat(cart.getItems().get(0).getBook(), is(book2));
    }

    @Test
    public void shouldReturnTotalPrice(){
        Cart cart = new Cart(1L);
        Book book1 = Book.builder().id(1).price(100).build();
        Book book2 = Book.builder().id(2).price(200).build();
        cart.addBook(book1);
        cart.addBook(book1);
        cart.addBook(book2);
        assertThat(cart.getTotalPrice(), is(400D));
    }
}
