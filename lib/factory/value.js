var esprima = require('esprima');

var Literal = require('../nodes/Literal.js');
var ObjectExpression = require('../nodes/ObjectExpression.js');

/**
 * Create a value node from a value string
 * @param  {String} valStr Value string
 * @return {Object}        Value node
 */
exports.create = function (valStr) {
  var tree = esprima.parse('var astValFactory = ' + valStr);
  return tree.body[0].declarations[0].init;
};

/**
 * Wrap a value node in a relevant type helper.
 * @param  {Object} node AST node
 * @return {Object}      Wrapped node
 */
exports.wrap = function (node) {
  if (node.type === 'Literal') {
    return new Literal(node);
  }
  if (node.type === 'ObjectExpression') {
    return new ObjectExpression(node);
  }
  return node;
};