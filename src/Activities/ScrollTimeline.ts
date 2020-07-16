import {Activity, LifeCycle, LifeCycleEvent, Actor, NavigationEvent} from 'krawlr'
import {NavigateToProfile} from '../Actors/NavigateToProfile'
import { InfiniteScroll } from '../Actors/InfiniteScroll'
export class ScrollTimeline extends Activity {
    public async setup() {
        const stimulus: LifeCycleEvent[] = []
        stimulus.push(NavigateToProfile)

        stimulus.push(InfiniteScroll)

        this.setLifeCycle(new LifeCycle([], stimulus, this))
    }
}