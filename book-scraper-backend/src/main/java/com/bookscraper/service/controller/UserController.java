package com.bookscraper.controller;

import com.bookscraper.entity.Book;
import com.bookscraper.entity.Bookmark;
import com.bookscraper.entity.User;
import com.bookscraper.repository.BookRepository;
import com.bookscraper.repository.BookmarkRepository;
import com.bookscraper.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import com.bookscraper.entity.Cart;
import com.bookscraper.repository.CartRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Transactional
public class UserController {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BookmarkRepository bookmarkRepository;
    private final CartRepository cartRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow();
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<Book>> getWishlist() {
        User user = getCurrentUser();
        List<Book> books = bookmarkRepository.findByUser(user).stream()
                .map(Bookmark::getBook)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    @PostMapping("/wishlist/{bookId}")
    public ResponseEntity<String> toggleWishlist(@PathVariable Long bookId) {
        User user = getCurrentUser();
        Book book = bookRepository.findById(bookId).orElseThrow();
        
        Optional<Bookmark> existing = bookmarkRepository.findByUserAndBook(user, book);
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return ResponseEntity.ok("Removed from wishlist");
        } else {
            bookmarkRepository.save(Bookmark.builder().user(user).book(book).build());
            return ResponseEntity.ok("Added to wishlist");
        }
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Book>> getCart() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> cartRepository.save(Cart.builder().user(user).books(new ArrayList<>()).build()));
        return ResponseEntity.ok(cart.getBooks());
    }

    @PostMapping("/cart/{bookId}")
    public ResponseEntity<String> toggleCart(@PathVariable Long bookId) {
        User user = getCurrentUser();
        Book book = bookRepository.findById(bookId).orElseThrow();
        
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> cartRepository.save(Cart.builder().user(user).books(new ArrayList<>()).build()));
        
        if (cart.getBooks().contains(book)) {
            cart.getBooks().remove(book);
            cartRepository.save(cart);
            return ResponseEntity.ok("Removed from cart");
        } else {
            cart.getBooks().add(book);
            cartRepository.save(cart);
            return ResponseEntity.ok("Added to cart");
        }
    }
}
