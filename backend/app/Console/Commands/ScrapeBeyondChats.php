<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest BeyondChats blog articles';

    public function handle()
    {
        $client = new Client([
            'timeout' => 20,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (compatible; BeyondChatsBot/1.0)'
            ]
        ]);

        $baseUrl = 'https://beyondchats.com';
        $blogsUrl = $baseUrl . '/blogs/';

        $this->info('Fetching blogs page...');
        $response = $client->get($blogsUrl);
        $crawler = new Crawler($response->getBody()->getContents());

        // 1Find LAST pagination link
        $lastPageLink = $crawler->filter('a.page-numbers')->last()->attr('href');

        $this->info("Last page: $lastPageLink");

        // 2️Fetch last page
        $response = $client->get($lastPageLink);
        $crawler = new Crawler($response->getBody()->getContents());

        // 3️Get article links (oldest)
        $links = $crawler
            ->filter('h2 a')
            ->each(fn ($node) => $node->attr('href'));

        $oldestLinks = array_slice($links, 0, 5);

        foreach ($oldestLinks as $link) {
            $this->info("Scraping: $link");

            // Avoid duplicates
            if (Article::where('source_url', $link)->exists()) {
                $this->warn('Already exists, skipping.');
                continue;
            }

            $articleResponse = $client->get($link);
            $articleCrawler = new Crawler($articleResponse->getBody()->getContents());

            $title = trim($articleCrawler->filter('h1')->text());

            $content = $articleCrawler
                ->filter('.entry-content')
                ->each(fn ($node) => $node->html());

            Article::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => implode("\n", $content),
                'source_url' => $link,
                'type' => 'original',
                'reference_links' => null,
            ]);

            $this->info("Saved: $title");
        }

        $this->info('Scraping completed successfully.');
    }
}
