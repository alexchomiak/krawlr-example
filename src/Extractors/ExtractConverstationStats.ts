import { NetworkAnalyzer, Activity } from 'krawlr'

interface ConversationBody {
    globalObjects: {
        tweets: Object
    }
}

interface Tweet {
    id_str: string
}

export const ExtractConversationStats = new NetworkAnalyzer(
    async ({ requests, responses }, ref: Activity) => {
        const store = ref.getStore()
        let data = []
        // * Loop through each response grabbing the tweets
        // * from any responses associated with the conversation
        responses.forEach(res => {
            if (res.url.includes(`/timeline/conversation/${store.get('tweetID')}`)) {
                const body = res.body as ConversationBody
                data = [...data, ...Object.values(body.globalObjects.tweets)]
            }
        })

        // * Filter out the main tweet from the responses
        let mainTweet = null
        data = data.filter((tweet: Tweet) => {
            if (tweet.id_str == store.get('tweetID')) {
                mainTweet = tweet
                return false
            } else return true
        })

        // * Return the statistics
        return { tweet: mainTweet, replies: data }
    },
    {
        clearStash: false
    }
)
