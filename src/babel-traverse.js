// https://babeljs.io/docs/en/babel-traverse

const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `1 + 2`;

const ast = babelParser.parse(code);

const visitor = {
  BinaryExpression: (nodePath) => {
    console.log(nodePath.node);
  }
};

traverse(ast, visitor);
