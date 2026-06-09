package com.bookscraper.controller;

import com.bookscraper.service.ScraperService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scraper")
@RequiredArgsConstructor
public class ScraperController {
    private final ScraperService scraperService;

    @PostMapping("/trigger")
    public String triggerScrape() {
        scraperService.scrapeAll();
        return "Scraping started!";
    }
}
