'use strict';
const expect = require('../../expect');
const cheerio = require('cheerio');

module.exports = {
  evaluateElement: function(answer, element, string) {
    const $ = cheerio.load(answer);
    expect($(element)).to.appear(1);
    expect($(element).attr('class','my-list'));
    console.log(expect($(element).attr('class','my-list')));
    expect($(element).find('li').length).to.eql(2);
    console.log(expect($(element).find('li').length).to.eql(2));
    console.log(expect($(element).find('li').text()));
  }
};