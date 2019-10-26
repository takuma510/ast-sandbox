// https://babeljs.io/docs/en/babel-parser
const babelParser = require('@babel/parser');
const printAST = require('ast-pretty-print');

const code = '1 + 2 * (3 + 4)';
const ast = babelParser.parse(code);

const isNode = (obj) => {
  if (typeof obj !== 'object') {
    return false;
  }

  if (Array.isArray(obj)) {
    return obj.find(v => isNode(v)) !== undefined;
  }

  return obj && 'constructor' in obj && obj.constructor.name === 'Node';
};
const replacer = (key, value) => {
  if (!key || key === 'type' || isNode(value)) {
    return value;
  }

  return undefined;
};

//console.log(ast);
//console.log(printAST(ast, true));
console.log(JSON.stringify(ast, replacer, ' '));
