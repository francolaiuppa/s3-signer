'use strict';
var faker = require('faker');
var TestClass = require('./index');
var testClass = new TestClass();

const TEST_SUITE_NAME = 'Photos';

function generateSample() {
  return {
    name: faker.name.findName(),
    filename: faker.name.findName(),
    height: 500,
    width: 500,
    dominantColor: 'ff0000'
  };
};

function TestSuite() {}

TestSuite.prototype.methodName = function() {
  // it must blabla
};

function executeTestSuite() {
  var Suite = new TestSuite();
  // describe
}

describe(TEST_SUITE_NAME,executeTestSuite);
