#!/usr/bin/env node --experimental-modules

import puppeteer from 'puppeteer'
import {links} from "./links.js"
import fs from "fs-extra"
import path from 'path';


(async () => {

	const filter = process.argv[2];
	const browser = await puppeteer.launch({timeout: 100000});

	for (const [slug, url] of Object.entries(links)) {
		if (slug.includes(filter) || filter === undefined) {

			fs.mkdirp(path.dirname(slug))
			const page = await browser.newPage();
			await page.goto(url, {waitUntil: 'networkidle2'});
			await page.waitForTimeout(500);
			await page.setViewport({width: 1920, height: 1428});
			await page.screenshot({path: slug + '.png', fullPage: true});

			console.log("Take screenshot of " + url);
		}
	}

	await browser.close();
})();