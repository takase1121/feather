import path from 'path';
import { spawnSync } from 'child_process';
import { rmSync, mkdirSync, copyFileSync, readdirSync } from 'fs';

const OUTPUT_DIR = path.resolve(__dirname, '../dist/outline-icons');
const INPUT_DIR = path.resolve(__dirname, '../icons');

// check if inkscape can be run
const inkscapeExists = spawnSync('inkscape', ['--help']);
if (inkscapeExists.error) throw inkscapeExists.error;

console.log(`Building outlined SVGs in ${OUTPUT_DIR}...`);

// copy the input into output dir
const list = readdirSync(INPUT_DIR);
list.forEach(l => copyFileSync(`${INPUT_DIR}/${l}`, `${OUTPUT_DIR}/${l}`));

// run inkscape
const args = [
  '--actions=select-all;object-stroke-to-path;vacuum-defs;export-plain-svg;export-overwrite;export-do',
  ...list.map(l => `${OUTPUT_DIR}/${l}`),
];
spawnSync('inkscape', args);
