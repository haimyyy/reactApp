/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
var user = require('./userController');
var mongopath = 'mongodb://reactApp:shenkar6196@ds159527.mlab.com:59527/reactapp';

/*var options = {
	db: { native_parser : true }
}

//connection to mongo
mongoose.connect(mongopath,options);

db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', function () {
	console.log("connected through mongoose");
    app.get('/', user.registerUser);
});

db.on('disconnected', function()
{
	console.log("you are disconnected, reconnecting");
	mongoose.connect(mongopath,options);
});
app.get('/', user.registerUser);*/
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
