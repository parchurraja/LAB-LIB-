package com.bookscraper;

import com.bookscraper.service.ScraperService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BookScraperApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookScraperApplication.class, args);
    }

    @Bean
    public CommandLineRunner initScraper(ScraperService scraperService) {
        return args -> {
            System.out.println("Triggering initial data scrape on startup...");
            scraperService.scrapeAll();
            System.out.println("Initial data scrape completed.");
        };
    }
}
