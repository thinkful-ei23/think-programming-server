'use strict';
const expect = require('../../expect');
const cheerio = require('cheerio');

module.exports = {
  evaluateElement: function(answer, element, string) {
    const $ = cheerio.load(answer);
    expect($(element)).to.appear(1);
    expect($(element).text()).to.eql(string);
    expect($(element).attr('class','think-programming-title'));
  }
};