const { connect } = require("puppeteer-real-browser");

const url_browser = process.env.URL_BROWSER;
const url_random = process.env.URL;
const url = url_random[Math.floor(Math.random() * url_random.length)];
const minutos = parseInt(process.env.MINUTOS);

const run = async () => {
  const { page, browser } = await connect({
    args: ["--start-maximized"],
    turnstile: false,
    headless: false,
    customConfig: {},
    connectOption: {
      defaultViewport: null,
    },
  });

  try {
    await page.goto(url_browser, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 5000));
    await page.waitForSelector("#url");
    await page.type("#url", url);
    await new Promise((r) => setTimeout(r, 2000));
    await page.click("text=Launch Workspace");
    await new Promise((r) => setTimeout(r, minutos * 60 * 1000));
    await page.screenshot({ path: "screen.png" });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};

run();
