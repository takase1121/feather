import svgo from 'svgo';
import cheerio from 'cheerio';
import { format } from 'prettier';

import DEFAULT_ATTRS from '../src/default-attrs.json';

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
function processSvg(svg) {
  return (
    optimize(svg)
      .then(setAttrs)
      .then(svg => format(svg, { parser: 'html' }))
      // remove semicolon inserted by prettier
      // because prettier thinks it's formatting JSX not HTML
      .then(svg => svg.replace(/;/g, ''))
  );
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
function optimize(svg) {
  return new Promise(resolve => {
    resolve(
      svgo.optimize(svg, {
        plugins: [
          { name: 'convertShapeToPath', params: false },
          { name: 'mergePaths', params: false },
          { name: 'removeAttrs', params: { attrs: '(fill|stroke.*)' } },
          { name: 'removeTitle', params: true },
        ],
      }).data,
    );
  });
}

/**
 * Set default attibutes on SVG.
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function setAttrs(svg) {
  const $ = cheerio.load(svg);

  Object.keys(DEFAULT_ATTRS).forEach(key =>
    $('svg').attr(key, DEFAULT_ATTRS[key]),
  );

  return $('body').html();
}

export default processSvg;
