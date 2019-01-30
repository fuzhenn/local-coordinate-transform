# Local Coordinate Transform

[![NPM Version](https://img.shields.io/npm/v/local-coordinate-transform.svg)](https://github.com/fuzhenn/local-coordinate-transform) [![CircleCI](https://circleci.com/gh/fuzhenn/local-coordinate-transform.svg?style=shield)](https://circleci.com/gh/fuzhenn/local-coordinate-transform)

A lib based on least square to convert 2d coordinate to wgs84 coordinate and vice versa.

一个基于最小二乘法，互相转化wgs坐标与二维本地坐标的js库.

## Usage

### npm
```shell
npm i local-coordinate-transform --save
```

```js
import lct from 'local-coordinate-transform';

//sample control points
//控制点样本数据
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

const transform = lct(localSamples, wgs84Samples);

const local = transform.toLocal([ 121.38365648516356, 31.15163789378666 ]);
const wgs84 = transform.fromLocal([ -7961.222764147446, -9289.597782096651 ]);
```

### Browser
```html
<script src="https://cdn.jsdelivr.net/npm/local-coordinate-transform/dist/local-coordinate-transform.js"></script>

<script>
const transform = lct(localSamples, wgs84Samples);
</script>

```
