// This is a basic example strategy for Gekko.
// For more information on everything please refer
// to this document:
//
// https://gekko.wizb.it/docs/strategies/creating_a_strategy.html
//
// The example below is pretty bad investment advice: on every new candle there is
// a 10% chance it will recommend to change your position (to either
// long or short).

var log = require('../core/log');

// Let's create our own strat
var strat = {};
var action = null
var prevAction = null
var trade = null

// Prepare everything our method needs
strat.init = function() {
  this.input = 'candle';
  this.requiredHistory = this.tradingAdvisor.historySize;
  this.addIndicator('ema', 'EMA', 55);
  this.addIndicator('rsi', 'RSI', { interval: 14 });
}

// What happens on every new candle?
strat.update = function(candle) {

  prevAction = action
  action = {
    type: candle.close > this.indicators.ema.result ? 'long' : 'short',
    price: candle.close,
    rsi: this.indicators.rsi.result,
  };

}

// For debugging purposes.
strat.log = function() {
  // log.debug('calculated random number:');
  // log.debug('\t', this.randomNumber.toFixed(3));
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function() {

  if (trade) {

    var profit
    var nextTrend = trade.type === 'short' ? 'long' : 'short'

    if (trade.type === 'short') {
      profit = trade.price * 100 / action.price - 100
    } else {
      profit = action.price * 100 / trade.price - 100
    }

    if (profit >= 1 || profit <= -0.5) {
      this.advice(nextTrend)
      trade = null
    }

    return

  }

  if (
    prevAction.type !== action.type && action.type === 'long' &&
    (action.price * 100 / prevAction.price - 100) >= 1
  ) {
    this.advice(action.type);
    trade = action
    return
  }

}

module.exports = strat;
