package com.bookscraper.controller;

import com.bookscraper.entity.Category;
import com.bookscraper.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final BookService bookService;

    @GetMapping
    public List<Category> getAllCategories() {
        return bookService.getAllCategories();
    }
}
