import { Actor, Activity } from 'krawlr'
import { Page } from 'puppeteer'

interface ScrollParams {
    scrollIntervalX: number
    scrollIntervalY: number
    scrollIntervalMS: number
    scrollMaxTime: number
}

export const InfiniteScroll = new Actor(async (page: Page, ref: Activity) => {
    const store = ref.getStore()

    // * Grab Params out of Activity store
    const scrollIntervalX = (store.get('scrollIntervalX') as number) || 0
    const scrollIntervalY = (store.get('scrollIntervalY') as number) || 0
    const scrollIntervalMS = (store.get('scrollIntervalMS') as number) || 500
    const scrollMaxTime = (store.get('scrollMaxTimeMS') as number) || 20000

    // * Start infinite scroll
    await page.evaluate(
        async (params: ScrollParams) => {
            await new Promise(async (res, rej) => {
                const { scrollIntervalX, scrollIntervalY, scrollIntervalMS, scrollMaxTime } = params
                let totalXDistance = 0
                let totalYDistance = 0
                let time = 0
                const scroll = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight
                    const scrollWidth = document.body.scrollWidth

                    // * Scroll in intervals
                    window.scrollBy(scrollIntervalX, scrollIntervalY)
                    totalXDistance += scrollIntervalX
                    totalYDistance += scrollIntervalY

                    if (
                        (scrollIntervalY > 0 && totalYDistance == scrollHeight) ||
                        (scrollIntervalX > 0 && totalXDistance == scrollWidth)
                    ) {
                        clearInterval(scroll)
                        res()
                    }
                    time += scrollIntervalMS
                    if (time >= scrollMaxTime) {
                        clearInterval(scroll)
                        res()
                    }
                }, scrollIntervalMS)
            })
        },
        {
            scrollIntervalX,
            scrollIntervalY,
            scrollIntervalMS,
            scrollMaxTime
        }
    )
})
