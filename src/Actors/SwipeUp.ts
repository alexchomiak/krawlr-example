import { Actor, Activity } from 'krawlr'

import {Page} from 'puppeteer'
export const SwipeUp = new Actor(async (page: Page, ref: Activity) => {
    const store = ref.getStore()
    await page.mouse.down()
    await page.mouse.move(0, store.get('y-offset'))
    await page.mouse.up()
}) 