import {Crawler, DataStore} from 'krawlr'
import * as puppeteer from 'puppeteer'

import { WatchTimeline } from './Activities/WatchTimeline'
;(async () => {
    // * Initialize Crawler Instance
    const TwitterCrawler = new Crawler(await puppeteer.launch({headless: false}))

    // * Initialize instance of WatchTimeline Activity
    const WatchStupidCounter = new WatchTimeline({
            cron: '*/30 * * * * *',
            callback: async data => {
                console.log(data[0])
            }
        },
        new DataStore(),
        await TwitterCrawler.getPage()
    )

    // * Activity Uses username for watch timeline event
    WatchStupidCounter.getStore().set('username', 'StupidCounter')

    // * Schedule event
    await TwitterCrawler.schedule(WatchStupidCounter)

})()
