package com.thoughtworks.devbootcamp.shoppingcart;

import com.thoughtworks.devbootcamp.shoppingcart.model.Book;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin
public interface BookRepository extends PagingAndSortingRepository<Book,Long> {
}
