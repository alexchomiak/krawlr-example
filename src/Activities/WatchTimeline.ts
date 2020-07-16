import {Activity, LifeCycle, LifeCycleEvent} from 'krawlr'
import {NavigateToProfile} from '../Actors/NavigateToProfile'
import {ExtractTimelineTweets} from '../Extractors/ExtractTimelineTweets'
import {SwipeUp} from '../Actors/SwipeUp'
export class WatchTimeline extends Activity {
    public async setup() {
        const stimulus: LifeCycleEvent[] = []
        this.getStore().set('username', 'ChrisKanich')
        stimulus.push(NavigateToProfile)
        stimulus.push(ExtractTimelineTweets)
        stimulus.push(SwipeUp)
        this.setLifeCycle(new LifeCycle([], stimulus, this))
    }
}