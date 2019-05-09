import { AxiosRequestConfig } from './types'

function xhr(config: AxiosRequestConfig): void {
	const { url, data = null, method = 'get', headers } = config
	const request = new XMLHttpRequest()
	request.open(method, url, true)
	Object.keys(headers).forEach(header => {
		if (data === null && header.toUpperCase() === 'CONTENT-TYPE') {
			delete headers[header]
		} else {
			request.setRequestHeader(header, headers[header])
		}
	})
	request.send(data)
}

export default xhr
