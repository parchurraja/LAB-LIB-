package com.bookscraper.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double price;

    private String availability;

    private String rating;

    private String imageUrl;

    @Column(unique = true)
    private String productUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
