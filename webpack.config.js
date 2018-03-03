const path = require('path');

module.exports = {
    entry: './test/main.js',
    output: {
        filename: 'main-compiled.js',
        path: path.resolve(__dirname, 'test')
    }
};