'use strict';

module.exports = function(target){
  let obj = { target };
  obj.to = obj;
  obj.have = obj;
  obj.be = obj;
  obj.appear = function($length){
    if(this.target.length !== $length){
      console.log('Not breaking when I should');
      throw `appears ${this.target.length} times, not the expected ${$length} times`;
    }
  };
  obj.length = function($length){
    if(this.target.length !== $length){
      throw `has length ${this.target.length} not the expected length ${$length}`;
    }
  };
  obj.eql = function($val){
    if(this.target !== $val){
      throw `"${this.target}" is not the expected value "${$val}"`;
    }
  };
  obj.class = function($class){
    const regex = new RegExp(`\\.${$class}\\{[\\s\\w\\:\\@\\#\\;\\-\\(\\)\\,]*\\}`);
    if(!regex.test(this.target)){
      throw `${$class} is not present on "${this.target}"`;
    }
  };
  obj.match = function($value){
    if(!this.target.match($value)){
      throw `${this.target} does not match with "${$value}"`;
    }
  };
  return obj;
};