const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const WebpackConfig = require('./webpack.config')
const compiler = webpack(WebpackConfig)

const app = express()
const router = express.Router()

const sleep = time => {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time * 1000)
	})
}

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: WebpackConfig.output.publicPath,
		stats: {
			color: true,
			chunks: false
		}
	})
)

app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const testSimpleDirRouter = () => {
	router.get('/simple/get', (req, res) => {
		res.json({
			data: 'success'
		})
	})
}

const testBaseDirRouter = () => {
	router.get('/base/get', (req, res) => {
		res.json(req.query)
	})

	router.post('/base/post', (req, res) => {
		sleep(10).then(() => {
			res.json(req.body)
		})
	})

	router.post('/base/buffer', (req, res) => {
		let msg = []
		req.on('data', chunk => {
			if (chunk) msg.push(chunk)
		})

		req.on('end', () => {
			let buf = Buffer.concat(msg)
			res.json(buf.toJSON())
		})
	})

	router.post('/extend/post', (req, res) => {
		res.json(req.body)
	})
}

const testExtendDirRouter = () => {
	router.get('/extend/user', (req, res) => {
		res.json({
			code: 200,
			message: 'success',
			result: {
				name: 'will',
				age: 18
			}
		})
	})
}

testSimpleDirRouter()
testBaseDirRouter()
testExtendDirRouter()

app.use(router)

const PORT = process.env.PORT || 9999
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})

