import { AxiosError } from './../../src/types/index';
import axios, { AxiosError } from '../../src/index'

/* timeout test */
axios({
	url: '/base/post',
	method: 'post',
	timeout: 1,
	headers: {
		'content-type': 'application/json;charset=utf-8'
	},
	data: {
		name: 'will',
		age: 18
	}
})
	.then(res => {
		console.log('timeout test res: ', res)
	})
	.catch((err: AxiosError) => {
		console.log(err.message)
		console.log(err.code)
		console.log(err.request)
		console.log(err.config)
		console.log(err.response)
	})

/* promise return test */
// axios({
// 	url: '/base/post',
// 	method: 'post',
// 	headers: {
// 		'content-type': 'application/json;charset=utf-8',
// 	},
// 	data: {
// 		name: 'will',
// 		age: 2
// 	}
// }).then(res => {
// 	console.log('promise return : ', res)
// })

/* promise with responseType test  */
// axios({
// 	url: '/base/post',
// 	method: 'post',
// 	headers: {
// 		'content-type': 'application/json;charset=utf-8',
// 	},
// 	responseType: 'json',
// 	data: {
// 		name: 'will',
// 		age: 2
// 	}
// }).then(res => {
// 	console.log('responseType, json : ', res)
// })

/* headers test */
// axios({
// 	url: '/base/post',
// 	method: 'post',
// 	headers: {
// 		'content-type': 'application/json;charset=utf-8',
// 	},
// 	data: {
// 		name: 'will',
// 		age: 2
// 	}
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//       foo: {
//         bar: 'baz'
//       }
//     }
//   })

//   const date = new Date()

//   axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//       date
//     }
//   })

//   axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//       foo: '@:$, '
//     }
//   })

//   axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//       foo: 'bar',
//       baz: null
//     }
//   })

//   axios({
//     method: 'get',
//     url: '/base/get#hash',
//     params: {
//       foo: 'bar'
//     }
//   })

//   axios({
//     method: 'get',
//     url: '/base/get?foo=bar',
//     params: {
//       bar: 'baz'
//     }
//   })
