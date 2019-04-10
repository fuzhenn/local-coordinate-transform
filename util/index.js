const fs = require('fs');
const program = require('commander');
const parse = require('csv-parse');
const lct = require('../dist/local-coordinate-transform.js');

//local和wgs84是控制点数据，用来生成转换函数
const localSamples = [ [ -8797.705978459271, -8993.371382255224 ],
[ -8283.305160346732, -8505.738585286075 ],
[ -6943.737953213451, -8126.486025049468 ],
[ -6359.556882573757, -8643.883626252704 ],
[ -7328.668372900924, -9012.36640388437 ],
[ -7586.993911318015, -8887.387559140858 ],
[ -8540.888023241656, -8977.154924226576 ],
[ -8046.942813511472, -8886.475888854417 ],
[ -8415.071092087135, -9500.933204580506 ],
[ -7961.222764147446, -9289.597782096651 ] ];

const wgs84Samples = [ [ 121.37488150121452, 31.15430386446369 ],
[ 121.38027245297057, 31.158705639773533 ],
[ 121.39431945643642, 31.16213467320355 ],
[ 121.40044976841277, 31.157471270229813 ],
[ 121.39028834317925, 31.154142336752663 ],
[ 121.38757821744674, 31.155267977543215 ],
[ 121.3775747764141, 31.154451971945033 ],
[ 121.38275439214293, 31.1552732299672 ],
[ 121.37889854203316, 31.14972870761177 ],
[ 121.38365648516356, 31.15163789378666 ] ];

//生成转换函数
const transform = lct(localSamples, wgs84Samples);

program
  .option('-f, --file [file]', 'File to parse')
  .option('-e, --encoding', 'encoding of the file')
  .option('-x, --columnx [columnx]', 'x\'s column')
  .option('-y, --columny [columny]', 'y\'s column')
  .parse(process.argv);

const file = program.file;
const encoding = program.encoding || 'utf-8';
const columnx = +program.columnx;
const columny = +program.columny;

const input = fs.readFileSync(file, { encoding });
parse(input, {
}, function(err, csv){
  const output = new Array(csv.length);
  for (let i = 0; i < csv.length; i++) {
    const x = +csv[i][columnx];
    const y = +csv[i][columny];
    if (isNaN(x) || isNaN(y)) {
      csv[i].splice(columny + 1, 0, ['','']);
    } else {
      csv[i].splice(columny + 1, 0, transform.fromLocal([], [x, y]));
    }
    output[i] = csv[i];
  }
  let outputPath = file;
  const ext = outputPath.lastIndexOf('.csv');
  if (ext > 0) {
    outputPath = outputPath.substring(0, ext);
  }
  fs.writeFileSync(outputPath + '_output.csv', output.join('\n'))  ;
});

