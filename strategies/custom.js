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
var strat = {
  params: {
    position: null,
    trend: null,
  },
};
var stopLoseProcent = 1;
var profitPercent = 1;

// Prepare everything our method needs
strat.init = function() {
  this.input = 'candle';
  this.requiredHistory = this.tradingAdvisor.historySize;
  this.addIndicator('ema55', 'EMA', 55);
  this.addIndicator('ema21', 'EMA', 21);
  this.addIndicator('ema13', 'EMA', 13);
  this.addIndicator('ema8', 'EMA', 8);
}

// What happens on every new candle?
strat.update = function(candle) {

  this.candle = candle;

  if (
    this.indicators.ema55.result < this.indicators.ema21.result &&
    this.indicators.ema21.result < this.indicators.ema13.result &&
    this.indicators.ema13.result < this.indicators.ema8.result
  ) {
    this.params.trend = 'long';
  } else if (
    this.indicators.ema55.result > this.indicators.ema21.result &&
    this.indicators.ema21.result > this.indicators.ema13.result &&
    this.indicators.ema13.result > this.indicators.ema8.result
  ) {
    this.params.trend = 'short';
  }

}

// For debugging purposes.
strat.log = function() {
  // log.debug('calculated random number:');
  // log.debug('\t', this.randomNumber.toFixed(3));
}

strat.short = function() {
  this.params.position = 'short';
  // this.stoplose = this.candle.close + (this.candle.close * stopLoseProcent / 100);
  // this.nextProfit = this.candle.close - (this.candle.close * profitPercent / 100);
  this.advice('short');
  return true;
}

strat.long = function() {
  this.params.position = 'long';
  // this.stoplose = this.candle.close - (this.candle.close * stopLoseProcent / 100);
  // this.nextProfit = this.candle.close + (this.candle.close * profitPercent / 100);
  this.advice('long');
  return true;
}

// strat.checkStopLoss = function() {
//   if (this.params.position === 'short') {
//     if (this.candle.close >= this.stoplose) {
//       return this.long();
//     }
//   } else if (this.params.position === 'long') {
//     if (this.candle.close >= this.stoplose) {
//       return this.short();
//     }
//   }
// }
//
// strat.checkProfit = function() {
//   if (this.params.position === 'short') {
//     if (this.nextProfit && this.nextProfit > this.candle.close) {
//       return this.long();
//     }
//   } else if (this.params.position === 'long') {
//     if (this.nextProfit && this.nextProfit < this.candle.close) {
//       return this.short();
//     }
//   }
// }

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function() {

  // if (this.checkStopLoss()) {
  //   return;
  // }

  // if (strat.checkProfit()) {
  //   return;
  // }

  // console.log(this.params.trend);

  if (this.params.trend) {
    if (!this.params.position) {
      this.params.position = this.params.trend;
    } else {
      if (this.params.position !== this.params.trend) {
        this[this.params.trend]();
      }
    }
  }


  // if (this.prevadvice === 'long') {
  //   this.advice('short');
  //   this.prevadvice = 'short';
  // } else {
  //   this.advice('long');
  //   this.prevadvice = 'long';
  // }

  // if (this.tradezone) {
  //   if (this.trend === 'up') {
  //     if (this.params.position === 'short') {
  //       return this.long();
  //     }
  //   }
  //
  //   if (this.trend === 'down') {
  //     if (this.params.position === 'long') {
  //       return this.short();
  //     }
  //   }
  // }

}

module.exports = strat;
