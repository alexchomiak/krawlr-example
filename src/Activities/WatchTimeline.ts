import {Activity, LifeCycle, LifeCycleEvent} from 'krawlr'
import {NavigateToProfile} from '../Actors/NavigateToProfile'
import {ExtractTimelineTweets} from '../Extractors/ExtractTimelineTweets'
export class WatchTimeline extends Activity {
    public async setup() {
        const stimulus: LifeCycleEvent[] = []
        stimulus.push(NavigateToProfile)
        stimulus.push(ExtractTimelineTweets)
        this.setLifeCycle(new LifeCycle([], stimulus, this))
    }
}