'use strict';

var debug = require('debug')('calendar:month'),
  express = require('express'),
  dayRouter = require('./day'),
  validators = require('../lib/validators'),
  kollavarsham = require('./../lib/kollavarsham');

var monthRouter = express.Router({mergeParams : true});

monthRouter.route('/:month').get(validators.validateYear, validators.validateMonth, function (req, res) {
  var year = parseInt(req.params.year, 10);
  var month = parseInt(req.params.month, 10);

  var output = kollavarsham.getMonth(year, month - 1, req.query.lang);

  if (req.accepts('text')) {
    debug('sending text output');
    res.send(output.text);
    return;
  }

  if (req.accepts('json')) {
    debug('sending json output');
    res.send(output.json);
    return;
  }

  res.type('txt').send(output.text);
});

monthRouter.use('/:month/days', dayRouter);

module.exports = monthRouter;