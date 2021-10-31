package integration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.thoughtworks.devbootcamp.shoppingcart.Application;
import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class CartApiTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void shouldFetchCart() throws Exception {
        mockMvc.perform(
                get("/cart/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items.length()").value(2))
                .andExpect(jsonPath("$.items[0].book.id").isNumber())
                .andExpect(jsonPath("$.items[0].book.name").isString())
                .andExpect(jsonPath("$.items[0].book.imageUrl").isString())
                .andExpect(jsonPath("$.items[0].book.price").isNumber())
                .andExpect(jsonPath("$.items[0].quantity").value(4))
        ;
    }

    @Test
    public void shouldAddBookToCart() throws Exception {
        Book book = Book.builder().id(1).build();
        mockMvc.perform(post("/cart/3")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items.length()").value(1))
        ;
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Test
    public void shouldRemoveBookFromCart() throws Exception {
        mockMvc.perform(delete("/cart/2/items/1"))
                .andExpect(status().isOk())
        .andExpect(jsonPath("$.items.length()").value(1))
        ;
    }

    @Test
    public void shouldReturnNotFoundErrorCodeWhenCartDoesNotExistOnRemoveBookFromCart() throws Exception {
        mockMvc.perform(delete("/cart/222/items/1"))
                .andExpect(status().isNotFound())
        ;
    }

    @Test
    public void shouldReturnNotFoundErrorCodeWhenCartDoesNotExistOnFetch() throws Exception {

        mockMvc.perform(
                get("/cart/155"))
                .andExpect(status().isNotFound());
    }
}
