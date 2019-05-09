import axios from '../../src/index'
/* promise return test */
axios({
	url: '/base/post',
	method: 'post',
	headers: {
		'content-type': 'application/json;charset=utf-8',
	},
	data: {
		name: 'will',
		age: 2
	}
}).then(res => {
	console.log('promise return : ', res)
})

/* promise with responseType test  */
axios({
	url: '/base/post',
	method: 'post',
	headers: {
		'content-type': 'application/json;charset=utf-8',
	},
	responseType: 'json',
	data: {
		name: 'will',
		age: 2
	}
}).then(res => {
	console.log('responseType, json : ', res)
})

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
