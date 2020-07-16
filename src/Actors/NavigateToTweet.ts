import { NavigationEvent, Activity } from 'krawlr'

export const NavigateToTweet = new NavigationEvent((ref: Activity) => {
    // * Grab DataStore from activity
    const store = ref.getStore()

    // * Return URL of desired tweet
    return `https://twitter.com/${store.get('username')}/status/${store.get('tweetID')}`
})
