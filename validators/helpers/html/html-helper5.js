'use strict';
const expect = require('../../expect');
const cheerio = require('cheerio');

module.exports = {
  evaluateElement: function(answer, element, string) {
    const $ = cheerio.load(answer);
    expect($(element)).to.appear(1);
    expect($(element).attr('class')).to.eql('my-list');
    expect($(element).children().first().text()).to.eql('learn to program');
    expect($(element).children().first().attr('key')).to.eql('1');
    expect($(element).children().last().text()).to.eql('become a developer');
    expect($(element).children().first().attr('key')).to.eql('2');
    expect($(element).find('li').length).to.eql(2);
  }
};