const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify').uglify;
const pkg = require('./package.json');

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2018-${new Date().getFullYear()} fuzhenn\n */`;

module.exports = {
    input: 'src/index.js',
    plugins: [
        commonjs(),
        resolve(),
        uglify({
            output : { comments : /^!/ }
        })
    ],
    output: [
        {
            'globals' : {
                'least-squares' : 'lsq'
            },
            'sourcemap': false,
            'format': 'umd',
            'name': 'lct',
            'banner': banner,
            'file': pkg.main
        }
    ]
};
