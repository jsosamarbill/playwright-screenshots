// @ts-check
const { test, expect } = require('@playwright/test');

test.use({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 marbillbot/v0.0.1'});

// Change the test data here
import { urls } from './screenshot-concepts.json'

for (const url of urls) {
  test(`${url} screenshot test`, async ({ page }, testInfo) => {
    
    const pageURL = `https://${url}`;
    await page.goto(`${pageURL}`);

    // Function to scroll to the bottom of the page
    async function scrollToBottom(page) {
      await page.evaluate(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      });

      // Optionally, wait for the scroll animation to complete
      await page.waitForTimeout(1000);
      //await page.locator('#redirect-modal .btn-close').click();
      //await page.locator('.global-announcement-box .global-announcement-close').click();
      await page.evaluate(() => {
        if (document.querySelector('.global-announcement-box')) {
          // @ts-ignore
          document.querySelector('.global-announcement-box').style.display = 'none';
        }
        if (document.querySelector('#redirect-modal')) {
          // @ts-ignore
          document.querySelector('#redirect-modal').style.display = 'none';
        }
        if (document.querySelector('#chat-widget-container')) {
          // @ts-ignore
          document.querySelector('#chat-widget-container').style.display = 'none';
        }
        if (document.querySelector('.modal-backdrop')) {
          // @ts-ignore
          document.querySelector('.modal-backdrop').style.display = 'none';
        }
      })
    }
    
    // Desktop Screenshot
    await scrollToBottom(page);
    const desktopScreenshot = await page.screenshot({ fullPage: true });
    testInfo.attach('Desktop Screenshot', {
      body: desktopScreenshot,
      contentType: 'image/png'
    });

    // Mobile Screenshot
    await page.setViewportSize({ width: 576, height: 768 });
    await scrollToBottom(page);
    const mobileScreenshot = await page.screenshot({ fullPage: true });
    testInfo.attach('Mobile Screenshot', {
      body: mobileScreenshot,
      contentType: 'image/png'
    });

  });
  
}