package unit.com.thoughtworks.devbootcamp.shoppingcart;

import com.thoughtworks.devbootcamp.shoppingcart.CartController;
import com.thoughtworks.devbootcamp.shoppingcart.CartRepository;
import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import com.thoughtworks.devbootcamp.shoppingcart.model.Cart;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CartControllerTest {

    @InjectMocks
    private CartController cartController;

    @Mock
    private CartRepository cartRepository;


    @Test
    public void shouldCreateCartIfNotExisting() {

        Book book = Book.builder().build();

        long cartId = 100;
        cartController.addToCart(cartId,book);
        ArgumentCaptor<Cart> argument = ArgumentCaptor.forClass(Cart.class);

        verify(cartRepository).save(argument.capture());

        assertThat(argument.getValue().getItems().get(0).getBook(), is(book));
        assertThat(argument.getValue().getId(), is(cartId));
    }

    @Test
    public void shouldUpdateCartIfExisting() {

        long cartId = 100;
        Cart existingCart = new Cart(cartId);
        Book existingBook = Book.builder().id(10).build();
        existingCart.addBook(existingBook);
        when(cartRepository.findById(cartId)).thenReturn(java.util.Optional.of(existingCart));

        Book newBook = Book.builder().id(20).build();

        cartController.addToCart(cartId,newBook);
        ArgumentCaptor<Cart> argument = ArgumentCaptor.forClass(Cart.class);

        verify(cartRepository).save(argument.capture());

        assertThat(argument.getValue().getItems().get(0).getBook(), is(existingBook));
        assertThat(argument.getValue().getItems().get(1).getBook(), is(newBook));
        assertThat(argument.getValue().getId(), is(cartId));
    }

    @Test
    public void shouldGetCartIfExisting() throws Exception {
        long cartId = 100;
        Cart existingCart = new Cart(cartId);
        when(cartRepository.findById(cartId)).thenReturn(Optional.of(existingCart));

        Cart actualCart = cartController.getCart(cartId);

        assertThat(actualCart, is(existingCart));

    }

    @Test(expected = Exception.class)
    public void shouldThrowErrorIfNotExisting() throws Exception {
        cartController.getCart(10L);
    }

    @Test
    public void shouldRemoveFromCart() throws Exception {
        long cartId = 10;
        long bookId = 20;
        Cart existingCart = new Cart(cartId);
        existingCart.addBook(Book.builder().id(bookId).build());
        when(cartRepository.findById(cartId)).thenReturn(Optional.of(existingCart));

        cartController.removeFromCart(cartId,bookId);

        ArgumentCaptor<Cart> argument = ArgumentCaptor.forClass(Cart.class);
        verify(cartRepository).save(argument.capture());

        assertThat(argument.getValue().getId(), is(cartId));
        assertThat(argument.getValue().getItems().size(), is(0));
    }

    @Test(expected = Exception.class)
    public void shouldThrowErrorWhenCartDoesNotExistAndRemoveFromCart() throws Exception {
        long nonExistingCartId = 22;
        int bookId = 12;
        cartController.removeFromCart(nonExistingCartId, bookId);
    }
}
