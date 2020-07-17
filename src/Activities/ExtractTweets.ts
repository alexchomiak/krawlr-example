import { Activity, Actor, LifeCycle, LifeCycleEvent, NavigationEvent } from 'krawlr'
import { ExtractTimelineTweets } from '../Extractors/ExtractTimelineTweets'
import { ExtractConversationStats } from '../Extractors/ExtractConverstationStats'
import { ExtractTweetData } from '../Extractors/ExtractTweetData'

export class ExtractTweets extends Activity {
    public async setup() {
        const prep = [new NavigationEvent(() => 'https://twitter.com')]
        const stimulus: LifeCycleEvent[] = []
        // * Empty Actor to stash all requests made
        stimulus.push(new Actor(async () => {}))
        stimulus.push(ExtractTweetData)
        stimulus.push(ExtractConversationStats)
        this.setLifeCycle(new LifeCycle(prep, stimulus, this))
    }
}
