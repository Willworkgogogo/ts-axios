const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const WebpackConfig = require('./webpack.config')
const compiler = webpack(WebpackConfig)

const app = express()
const router = express.Router()

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

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm')
})

router.get('/simple/get', (req, res) => {
	res.json({
		data: 'success'
	})
})

app.use(router)

const PORT = process.env.PORT || 9999
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/index.htm`)
})
