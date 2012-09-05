
/*!
 * socket.io-node
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var format = require('util').format
  , debug = require('debug')
  , toArray = require('./util').toArray;

/**
 * Log levels.
 */

var levels = [
    'error'
  , 'warn'
  , 'info'
  , 'debug'
];

/**
 * debug instances, see below
 */
var debug_loggers = {};


/**
 * Logger (see debug module).
 *
 * @api public
 */

var Logger = module.exports = function (opts) {
  opts = opts || {}
  this.level = 3;
  this.enabled = true;
};

/**
 * Log method.
 *
 * @api public
 */

Logger.prototype.log = function (type) {
  var index = levels.indexOf(type);

  if (index > this.level || !this.enabled)
    return this;

  if(debug_loggers[type]) {
    debug_loggers[type](
      format.apply(null, toArray(arguments).slice(1))
    );
  }

  return this;
};

/**
 * Generate methods and logger instances
 */

levels.forEach(function (name) {
  Logger.prototype[name] = function () {
    this.log.apply(this, [name].concat(toArray(arguments)));
  };
  debug_loggers[name] = debug('socket.io:'+name);
});
