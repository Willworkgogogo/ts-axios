import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): void {
	processConfig(config)
	xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
	config.url = transformUrl(config)
	config.headers = transformHeaders(config)
	config.data = transformData(config)
	console.log(config)
}

function transformUrl(config: AxiosRequestConfig): string {
	const { url, params } = config
	return buildURL(url, params)
}

function transformData(config: AxiosRequestConfig): any {
	const { data } = config
	return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
	const { headers = {}, data } = config
	return processHeaders(headers, data)
}
