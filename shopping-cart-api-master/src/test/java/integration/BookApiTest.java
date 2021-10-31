package integration;

import com.thoughtworks.devbootcamp.shoppingcart.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class BookApiTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void shouldReturnBooks() throws Exception {
        mockMvc.perform(
                get("/books"))
            .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$._embedded.books.length()").value(20))
        .andExpect(jsonPath("$._embedded.books[0].name").isString())
        .andExpect(jsonPath("$._embedded.books[0].authors").isArray())
        .andExpect(jsonPath("$._embedded.books[0].description").isString())
        .andExpect(jsonPath("$._embedded.books[0].imageUrl").value(startsWith("http://")))
        .andExpect(jsonPath("$._embedded.books[0].price").isNumber())
        .andExpect(jsonPath("$._embedded.books[0]._links.self.href").value(startsWith("http://")))
        .andExpect(jsonPath("$._links.first.href").value(startsWith("http://")))
        .andExpect(jsonPath("$._links.last.href").value(startsWith("http://")))
        .andExpect(jsonPath("$._links.next.href").value(startsWith("http://")))
        .andExpect(jsonPath("$._links.prev.href").doesNotExist())
        ;
    }
}

