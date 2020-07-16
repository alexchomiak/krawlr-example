import { Crawler, DataStore } from 'krawlr'
import * as puppeteer from 'puppeteer'

import { TweetStats } from './Activities/TweetStats'
import { ExtractTweets } from './Activities/ExtractTweets'
;(async () => {
    // * Initialize Crawler Instance
    const TwitterCrawler = new Crawler(await puppeteer.launch({ headless: false, userDataDir: '' }))

    // // * Instantiate Activity
    // const tweetStats = new TweetStats(
    //     {
    //         cron: null,
    //         callback: delivery => {
    //             console.log(delivery.tweet)
    //             console.log(`Replies ${delivery.replies.length}`)
    //         }
    //     },
    //     new DataStore(), // * Data Store is key,value store for storing params
    //     {
    //         username: 'chicagobulls',
    //         tweetID: '1280245134609678336',
    //         scrollIntervalY: 200,
    //         scrollIntervalMS: 150
    //     }
    // )

    // // * Schedule activity
    // await TwitterCrawler.schedule(tweetStats)

    const extractTweets = new ExtractTweets(
        {
            cron: '*/10 * * * * *',
            callback: delivery => console.log(delivery)
        },
        new DataStore(),
        {}
    )

    // * Schedule activity
    await TwitterCrawler.schedule(extractTweets)
})()
