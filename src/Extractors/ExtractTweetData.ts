import { NetworkAnalyzer, Activity } from 'krawlr'

interface ConversationBody {
    globalObjects: {
        tweets: Object
    }
}

export const ExtractTweetData = new NetworkAnalyzer(
    async ({ requests, responses }, ref: Activity) => {
        let data = []

        // * Loop through each response grabbing the tweets
        responses.forEach(res => {
            if (
                res.url.includes(`/notifications/all`) ||
                res.url.includes(`/search/adaptive`) ||
                res.url.includes(`/timeline/profile/`)
            ) {
                const body = res.body as ConversationBody
                data = [...data, ...Object.values(body.globalObjects.tweets)]
            }
        })

        // * Return the statistics
        return data
    },
    {
        clearStash: false // * Prevents request/response stash from clearing before next analyzer
    }
)
