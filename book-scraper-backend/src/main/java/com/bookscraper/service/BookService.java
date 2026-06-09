package com.bookscraper.service;

import com.bookscraper.entity.Book;
import com.bookscraper.entity.Category;
import com.bookscraper.repository.BookRepository;
import com.bookscraper.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getBooksByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow();
        return bookRepository.findByCategory(category);
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCase(query);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
