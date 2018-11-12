'use strict';
const expect = require('../../expect');
const cheerio = require('cheerio');

module.exports = {
  evaluateElement: function(answer, element, string) {
    const $ = cheerio.load(answer);
    expect($(element)).to.appear(1);
    expect($(element).attr('src'));
    expect($(element).attr('src')).to.eql('jquery-3.3.1.min.js');
  }
};