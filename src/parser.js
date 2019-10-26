// https://babeljs.io/docs/en/babel-parser
const babelParser = require('@babel/parser');

const code = '1 + 1';

const ast = babelParser.parse(code);

console.log(ast);
