package com.bookscraper.scheduler;

import com.bookscraper.service.ScraperService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScraperScheduler {
    private final ScraperService scraperService;

    @Scheduled(cron = "0 0 0 * * *") // Run every day at midnight
    public void scheduleScrape() {
        scraperService.scrapeAll();
    }
}
