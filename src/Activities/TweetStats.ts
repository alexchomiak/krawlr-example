import { Activity, LifeCycle, LifeCycleEvent } from 'krawlr'
import { NavigateToTweet } from '../Actors/NavigateToTweet'
import { InfiniteScroll } from '../Actors/InfiniteScroll'
import { ExtractConversationStats } from '../Extractors/ExtractConverstationStats'
export class TweetStats extends Activity {
    public async setup() {
        const stimulus: LifeCycleEvent[] = []
        stimulus.push(NavigateToTweet)
        stimulus.push(InfiniteScroll)
        stimulus.push(ExtractConversationStats)
        this.setLifeCycle(new LifeCycle([], stimulus, this))
    }
}
