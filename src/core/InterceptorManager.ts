import { FulfilledFn, RejectedFn } from '../types'

interface Interceptor<T> {
	fulfilled: FulfilledFn<T>
	rejected?: RejectedFn
}

export default class InterceptorManager<T> {
	private handlers: Array<Interceptor<T> | null>

	constructor() {
		this.handlers = []
	}

	use(fulfilled: FulfilledFn<T>, rejected?: RejectedFn): number {
		this.handlers.push({
			fulfilled,
			rejected
		})

		return this.handlers.length - 1
	}

	eject(id: number): void {
		if (this.handlers[id]) {
			this.handlers[id] = null
		}
    }
    
    forEach(fn: (h: Interceptor<T>) => void): void {
        this.handlers.forEach(h => {
            if (h !== null) {
                fn(h)
            }
        })
    }
}
