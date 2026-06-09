package com.bookscraper.service;

import com.bookscraper.entity.Book;
import com.bookscraper.entity.Category;
import com.bookscraper.repository.BookRepository;
import com.bookscraper.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScraperService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final String BASE_URL = "https://books.toscrape.com/";

    public void scrapeAll() {
        try {
            Document doc = Jsoup.connect(BASE_URL).get();
            Elements categories = doc.select(".side_categories ul li ul li a");

            for (Element categoryEl : categories) {
                String categoryName = categoryEl.text().trim();
                String categoryUrl = categoryEl.absUrl("href");
                
                Category category = categoryRepository.findByName(categoryName)
                        .orElseGet(() -> categoryRepository.save(Category.builder().name(categoryName).url(categoryUrl).build()));

                scrapeCategory(categoryUrl, category);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void scrapeCategory(String url, Category category) {
        try {
            Document doc = Jsoup.connect(url).get();
            Elements books = doc.select(".product_pod");

            for (Element bookEl : books) {
                String title = bookEl.select("h3 a").attr("title");
                String productUrl = bookEl.select("h3 a").first().absUrl("href");
                String imageUrl = bookEl.select(".image_container img").first().absUrl("src");
                String priceStr = bookEl.select(".price_color").text().replace("£", "");
                Double price = Double.parseDouble(priceStr);
                String availability = bookEl.select(".instock.availability").text().trim();
                String rating = bookEl.select(".star-rating").attr("class").replace("star-rating ", "");

                Optional<Book> existingBook = bookRepository.findByProductUrl(productUrl);
                if (existingBook.isEmpty()) {
                    Book book = Book.builder()
                            .title(title)
                            .productUrl(productUrl)
                            .imageUrl(imageUrl)
                            .price(price)
                            .availability(availability)
                            .rating(rating)
                            .category(category)
                            .build();
                    bookRepository.save(book);
                }
            }

            // Check for next page
            Element nextButton = doc.selectFirst(".next a");
            if (nextButton != null) {
                String nextUrl = nextButton.absUrl("href");
                scrapeCategory(nextUrl, category);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
