import { NetworkAnalyzer, Activity } from 'krawlr'

interface ConversationBody {
    globalObjects: {
        tweets: Object
    }
}

interface Tweet {
    id_str: string
}

export const ExtractTweetData = new NetworkAnalyzer(
    async ({ requests, responses }, ref: Activity) => {
        let data = []

        // * Loop through each response grabbing the tweets
        // * from any responses associated with the conversation
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
        clearStash: false
    }
)
