package com.bookscraper.repository;

import com.bookscraper.entity.Book;
import com.bookscraper.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByProductUrl(String productUrl);
    List<Book> findByCategory(Category category);
    List<Book> findByTitleContainingIgnoreCase(String title);
}
