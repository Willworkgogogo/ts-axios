import { isPlainObject } from './util'

export function transformRequest(val: any): any {
	if (isPlainObject(val)) return JSON.stringify(val)
	return val
}

export function transformResponseData(data: any): any {
	if (typeof data === 'string') {
		try {
			data = JSON.parse(data)
		} catch (e) {
			// do nothing
		}
	}
	return data
}
