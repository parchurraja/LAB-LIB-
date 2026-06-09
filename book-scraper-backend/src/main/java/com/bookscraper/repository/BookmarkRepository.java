package com.bookscraper.repository;

import com.bookscraper.entity.Book;
import com.bookscraper.entity.Bookmark;
import com.bookscraper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByUserAndBook(User user, Book book);
    List<Bookmark> findByUser(User user);
}
