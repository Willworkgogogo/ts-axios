import dispatchRequest from './dispatchRequest'
import { AxiosPromise, AxiosRequestConfig, Method } from '../types'

export default class Axios {
	request(url?: any, config?: any): AxiosPromise {
		if (typeof url === 'string') {
			if (!config) {
				config = {}
			}
			config.url = url
		} else {
			/* url 就是 传入的config */
			config = url
		}
		return dispatchRequest(config)
	}

	get(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData(url, 'get', config)
	}

	delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData(url, 'delete', config)
	}

	head(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData(url, 'head', config)
	}

	options(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData(url, 'options', config)
	}

	post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData(url, 'post', data, config)
	}

	put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData(url, 'put', data, config)
	}

	patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData(url, 'patch', data, config)
	}

	_requestMethodWithoutData(url: string, method: Method, config?: AxiosRequestConfig) {
		return this.request(
			Object.assign(config || {}, {
				method,
				url
			})
		)
	}

	_requestMethodWithData(
		url: string,
		method: Method,
		data?: any,
		config?: AxiosRequestConfig
	): AxiosPromise {
		return this.request(Object.assign(config || {}, url, method, data))
	}
}
