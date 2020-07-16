import {NavigationEvent, Activity} from 'krawlr'
export const NavigateToProfile = new NavigationEvent((ref: Activity) => {
    const store = ref.getStore()
    return `https://twitter.com/${store.get('username')}`
})

