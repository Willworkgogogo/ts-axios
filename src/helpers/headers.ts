import { isPlainObject } from './util'

function normalizeHeadersName(headers: any, normalizeName: string): void {
	if (!headers) return
	Object.keys(headers).forEach(name => {
		/* 解决属性大小写不一致的问题 */
		if (name !== normalizeName || name.toUpperCase() === normalizeName.toUpperCase()) {
			headers[normalizeName] = headers[name]
			delete headers[name]
		}
	})
}

/**
 * @param { headers }
 * @param { data } 检测data类型，如果是普通对象，则应该自动设置header
 */
export function processHeaders(headers: any, data: any): any {
	const normalizeName = 'Content-Type'
	normalizeHeadersName(headers, normalizeName)
	if (isPlainObject(data)) {
		if (headers && !headers[normalizeName]) {
			headers[normalizeName] = 'application/json;charset=utf-8'
		}
	}

	return headers
}

/* 将response headers字符串解析成对象 */
export function parseHeaders(headers: string): any {
	const parsed = Object.create(null)
	if (!headers) return parsed
	headers.split('\r\n').forEach(item => {
		let [key, val] = item.split(':')
		key = key.trim().toLowerCase()
		if (!key) return
		if (val) {
			val = val.trim()
		}
		parsed[key] = val
	})

	return parsed
}
