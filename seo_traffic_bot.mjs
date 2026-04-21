import puppeteer from 'puppeteer';

// Configuration
const SEARCH_QUERY = 'AI calling autointerview ai';
const TARGET_DOMAIN = 'autointerviewai.com';
const ITERATIONS = 10; // Number of times to simulate the search and click
const DELAY_BETWEEN_SESSIONS = 5000; // 5 seconds

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSession(iteration) {
    console.log(`Starting iteration ${iteration}/${ITERATIONS}...`);

    // Launch browser (headless: false to see it happen)
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        // Navigate to Google
        await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

        // Type and search
        await page.type('textarea[name="q"]', SEARCH_QUERY, { delay: 100 });
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Find the link matching our domain
        console.log('Searching for target link...');
        const links = await page.$$('a');
        let clicked = false;

        for (const link of links) {
            const href = await page.evaluate(el => el.href, link);
            if (href && href.includes(TARGET_DOMAIN)) {
                console.log(`Found target link: ${href}`);
                await link.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
                clicked = true;
                break;
            }
        }

        if (clicked) {
            console.log('Successfully navigated to the blog post. Simulating reading...');
            // Scroll down gradually
            for (let i = 0; i < 5; i++) {
                await page.evaluate(() => window.scrollBy(0, 500));
                await delay(1000);
            }
            // Stay on page for an extra 5 seconds
            await delay(5000);
            console.log(`Iteration ${iteration} completed successfully.`);
        } else {
            console.log(`Target link not found on the first page for iteration ${iteration}.`);
        }

    } catch (error) {
        console.error(`Error during iteration ${iteration}:`, error.message);
    } finally {
        // Always close browser memory
        await browser.close();
    }
}

async function main() {
    for (let i = 1; i <= ITERATIONS; i++) {
        await runSession(i);
        if (i < ITERATIONS) {
            console.log(`Waiting ${DELAY_BETWEEN_SESSIONS / 1000} seconds before next session...`);
            await delay(DELAY_BETWEEN_SESSIONS);
        }
    }
    console.log('Traffic simulation completed!');
}

main().catch(console.error);
