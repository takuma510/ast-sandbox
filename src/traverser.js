const babelParser = require('@babel/parser');
const code = '1 + 2 * (3 + 4)';

const isNode = (obj) => {
  if (typeof obj !== 'object') {
    return false;
  }

  if (Array.isArray(obj)) {
    return obj.find(v => isNode(v)) !== undefined;
  }

  return obj && 'constructor' in obj && obj.constructor.name === 'Node';
};

const getCode = node => code.substr(node.start, node.end - node.start);

const traverser = (node, exitVisitor, indent = 0) => {
  console.log(`${' '.repeat(indent)}enter: ${node.type} '${getCode(node)}'`);

  if (!(node.type in exitVisitor)) {
    console.error(`unknown type ${node.type}`);
    console.log(JSON.stringify(node, null, '  '));
    process.exit(1);
  };

  const res = {};
  Object.keys(node).forEach(key => {
    if (!isNode(node[key])) return;
    if (Array.isArray(node[key])) {
      res[key] = node[key].map(v => traverser(v, exitVisitor, indent + 2));
    } else {
      res[key] = traverser(node[key], exitVisitor, indent + 2);
    }
  });

  console.log(`${' '.repeat(indent)}exit: ${node.type} '${getCode(node)}'`);
  return exitVisitor[node.type](node, res, indent);
};

const exitVisitor = {
  File: (node, res) => res.program,
  Program: (node, res) => res.body,
  ExpressionStatement: (node, res) => {
  },
  BinaryExpression: (node, res, indent) => {
  },
  NumericLiteral: (node, res, indent) => {
  }
};

const results = traverser(babelParser.parse(code), exitVisitor);
console.log('');
results.forEach(result => console.log(result));
