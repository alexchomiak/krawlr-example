import {NetworkAnalyzer, Activity} from 'krawlr'
export const ExtractTimelineTweets = new NetworkAnalyzer(async ({ requests, responses }, ref: Activity) => {
    let data = []
    for (let i = 0; i < responses.length; i++) {
        const response = responses[i]
        if (response.url.includes('/timeline/profile/')) {
            const d = response.body
            data.push(d)
        }
    }

    if (data.length > 0) {
        let delivery = {}

        for (let i = 0; i < data.length; i++) {
            delivery = {
                ...delivery,
                //@ts-ignore
                ...data[i].globalObjects.tweets
            }
        }

        const store = ref.getStore()
        if (store.get('tweets')) {
            const tweets = store
                .get('tweets')
                //@ts-ignore
                .map((tweet: Object) => tweet.full_text)

            const updatedTweets = Object.values(delivery)

            let newTweet = null
            updatedTweets.forEach((tweet: Object) => {
                //@ts-ignore
                if (!tweets.includes(tweet.full_text)) {
                    newTweet = tweet
                }
            })

            store.set('tweets', updatedTweets)
            if (newTweet) {
                return newTweet
            } else {
                console.log(`No new tweets for ${store.get('username')}`)
            }
        } else {
            store.set('tweets', Object.values(delivery))
        }
    }
})