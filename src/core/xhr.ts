import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createAxiosError } from '../helpers/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
	return new Promise((resolve, reject) => {
		const { url, data = null, method = 'get', headers, responseType, timeout } = config
		const request = new XMLHttpRequest()

		if (responseType) request.responseType = responseType

		request.open(method, url!, true)

		/* default is 0 , no timeout */
		if (timeout) {
			request.timeout = timeout
		}

		Object.keys(headers).forEach(header => {
			if (data === null && header.toUpperCase() === 'CONTENT-TYPE') {
				delete headers[header]
			} else {
				request.setRequestHeader(header, headers[header])
			}
		})

		request.send(data)

		/* request process */
		request.onreadystatechange = function() {
			/* xhr未完成时不做处理 */
			if (request.readyState !== 4) return
			/* 网络和超时错误 */
			if (request.status === 0) return

			const responseHeaders = request.getAllResponseHeaders()
			const responseData = request.responseType === 'text' ? request.responseText : request.response
			const response: AxiosResponse = {
				data: responseData,
				headers: parseHeaders(responseHeaders),
				status: request.status,
				statusText: request.statusText,
				config: config,
				request
			}
			handleResponse(response)
		}

		/* network error */
		request.onerror = function() {
			reject(createAxiosError('Netword Error', config, null, request))
		}

		/* timeout error */
		request.ontimeout = function() {
			reject(
				createAxiosError(
					`Timeout error, the timeout is ${timeout}ms`,
					config,
					'ECONNABORTED',
					request
				)
			)
		}

		function handleResponse(response: AxiosResponse): void {
			const { status } = response
			if (status >= 200 && status < 300) {
				resolve(response)
			} else {
				reject(
					createAxiosError(
						`Request failed, the status code is ${status}`,
						config,
						null,
						request,
						response
					)
				)
			}
		}
	})
}

export default xhr
