import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { isPlainObject } from './helpers/util'

function xhr(config: AxiosRequestConfig): AxiosPromise {
	return new Promise(resolve => {
		const { url, data = null, method = 'get', headers, responseType } = config
		const request = new XMLHttpRequest()

		if (responseType) request.responseType = responseType

		request.open(method, url, true)

		Object.keys(headers).forEach(header => {
			if (data === null && header.toUpperCase() === 'CONTENT-TYPE') {
				delete headers[header]
			} else {
				request.setRequestHeader(header, headers[header])
			}
		})

		request.send(data)

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				const responseHeaders = request.getAllResponseHeaders()
				const responseData =
					request.responseType === 'text' ? request.responseText : request.response
				const response: AxiosResponse = {
					data: responseData,
					headers: parseHeaders(responseHeaders),
					status: request.status,
					statusText: request.statusText,
					config: config,
					request
				}
				resolve(response)
			} else {
				return
			}
		}
	})
}

export default xhr
