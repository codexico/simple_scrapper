import puppeteer from "puppeteer";
import links from "./links.json";

async function getHref(browser, page) {
  const selector = "#content > a:not(small):last-of-type";
  if (page) {
    console.log(`Loading: ${page}`);

    const newPage = await browser.newPage();
    await newPage.goto(page, { waitUntil: "load" });

    const attr = await newPage.evaluate(() =>
      document.querySelector(selector)?.getAttribute("href"),
    );

    await newPage.close();
    return attr;
  }
}

(async () => {
  const result = [];
  const browser = await puppeteer.launch();

  for (let i = 1; i < links.length; i++) {
    const href = await getHref(browser, links[i]);
    console.log(href);
    result.push(href);
  }

  await browser.close();
  console.log(result);
})();
