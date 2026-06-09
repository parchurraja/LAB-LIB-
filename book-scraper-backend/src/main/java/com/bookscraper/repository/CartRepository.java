package com.bookscraper.repository;

import com.bookscraper.entity.Cart;
import com.bookscraper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
