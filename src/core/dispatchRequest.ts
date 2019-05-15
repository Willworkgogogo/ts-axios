import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponseData } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'

/* core dispatch request */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
	processConfig(config)
	return xhr(config).then(res => transfromResponse(res))
}

function processConfig(config: AxiosRequestConfig): void {
	config.url = transformUrl(config)
	config.headers = transformHeaders(config)
	config.data = transformData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
	const { url, params } = config
	return buildURL(url!, params)
}

function transformData(config: AxiosRequestConfig): any {
	const { data } = config
	return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
	const { headers = {}, data } = config
	return processHeaders(headers, data)
}

function transfromResponse(res: AxiosResponse): AxiosResponse {
	res.data = transformResponseData(res.data)
	return res
}
