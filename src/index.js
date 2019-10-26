const { transform } = require('@babel/core');

const src = '1 + 2';

const plugin = () => ({
});

const { code } = transform(src, { plugins: [plugin] });

console.log(code);
