// https://babeljs.io/docs/en/babel-parser
const babelParser = require('@babel/parser');
const printAST = require('ast-pretty-print');

const code = '1 + 2 * (3 + 4)';

const ast = babelParser.parse(code);

//console.log(ast);
console.log(printAST(ast, true));
