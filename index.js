var express = require('express'),
	bodyParser = require('body-parser'),
	apiErrorHandler = require('api-error-handler'),
	expressDomainMiddleware = require('express-domain-middleware'),
	_ = require('lodash'),
	userRouter = require('./service/userRouter')


var app = express()
app.use(function(req, res, next) {
	console.log(req.method + ': ' + req.url);
	//console.log('/bower_components')
	next();
})
app.use(express.static('vendor'))
app.use(express.static('grid-common'))
app.use(express.static('grid-dk-grid'))
//app.use(express.static('grid-trNgGrid'))
app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	if(req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if ('OPTIONS' == req.method)
		res.status(200).end();
	else
		next();
})

app.use('/api/users', userRouter);


app.use(function (req, res) {
	res.status(404).send('Oops, file not found')
})
app.use(apiErrorHandler())
app.listen(3001, function(){console.log('listening on 3001')});
