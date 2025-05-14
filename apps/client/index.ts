import { treaty } from '@elysiajs/eden'
import type { App } from '@api'

const app = treaty<App>('http://localhost:3000')

export default app
