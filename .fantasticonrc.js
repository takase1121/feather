const path = require('path');

module.exports = {
	name: 'feather-icons',
	inputDir: path.resolve(__dirname, 'dist/outline-icons'),
	outputDir: path.resolve(__dirname, 'dist'),
	fontTypes: ['ttf'],
	assetTypes: [],
	codepoints: require('./src/codepoints')
};
