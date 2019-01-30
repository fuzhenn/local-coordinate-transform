import lct from '../src/index.js';
// var lct = require('../dist/local-coords-transform');
import assert from 'assert';

//local和wgs84是控制点数据，用来生成转换函数
var localSamples = [ [ -8797.705978459271, -8993.371382255224 ],
[ -8283.305160346732, -8505.738585286075 ],
[ -6943.737953213451, -8126.486025049468 ],
[ -6359.556882573757, -8643.883626252704 ],
[ -7328.668372900924, -9012.36640388437 ],
[ -7586.993911318015, -8887.387559140858 ],
[ -8540.888023241656, -8977.154924226576 ],
[ -8046.942813511472, -8886.475888854417 ],
[ -8415.071092087135, -9500.933204580506 ],
[ -7961.222764147446, -9289.597782096651 ] ];

var wgs84Samples = [ [ 121.37488150121452, 31.15430386446369 ],
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
var transform = lct(localSamples, wgs84Samples);

describe('coordinate transform specs', function () {
    //本地坐标 => wgs84
    it('#fromLocal', function () {
        //第一个参数是用来接收结果的数组，第二个参数是本地坐标值
        var result = transform.fromLocal([], [ -7961.222764147446, -9289.597782096651 ]);
        //wgs84坐标的转换精度为1E-5
        var delta = 1E-5;
        assert.ok(approx(result[0], 121.38365648516356, delta));
        assert.ok(approx(result[1], 31.15163789378666, delta));
    });

    //wgs84 => 本地坐标
    it('#toLocal', function () {
        //第一个参数是用来接收结果的数组，第二个参数是84坐标值
        var result = transform.toLocal([], [ 121.38365648516356, 31.15163789378666 ]);
        //本地坐标的转换精度为0.5m
        var delta = 0.5;
        assert.ok(approx(result[0], -7961.222764147446, delta), result[0]);
        assert.ok(approx(result[1], -9289.597782096651, delta), result[1]);
    });

    it('#fromLocal with object', function () {
        var result = transform.fromLocal([], { x : -7961.222764147446, y : -9289.597782096651 });
        var delta = 1E-5;
        assert.ok(approx(result[0], 121.38365648516356, delta));
        assert.ok(approx(result[1], 31.15163789378666, delta));
    });

    it('#toLocal with object', function () {
        var result = transform.toLocal([], { x : 121.38365648516356, y : 31.15163789378666 });
        var delta = 0.5;
        assert.ok(approx(result[0], -7961.222764147446, delta), result[0]);
        assert.ok(approx(result[1], -9289.597782096651, delta), result[1]);
    });
});

function approx(a, b, delta) {
    return Math.abs(a - b) < delta;
}
