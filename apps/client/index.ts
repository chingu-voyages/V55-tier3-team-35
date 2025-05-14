import { treaty } from '@elysiajs/eden'
import type { App } from '@api'

const app = treaty<App>('localhost:3000')

export default app
