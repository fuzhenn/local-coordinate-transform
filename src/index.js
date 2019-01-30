import lsq from 'least-squares';

var XY = [], OUT = [];

export default function lct(localCoords, wgs84Coords) {
    var count = localCoords.length;
    var localX = new Array(count), localY = new Array(count), coordX = new Array(count), coordY = new Array(count);
    var out = [];
    for (var i = 0; i < count; i++) {
        var coord = wgs84Coords[i];
        if (coord.x !== undefined) {
            coord = [coord.x, coord.y];
        }
        project(out, coord);
        coordX[i] = out[0];
        coordY[i] = out[1];
        localX[i] = localCoords[i].x !== undefined ? localCoords[i].x : localCoords[i][0];
        localY[i] = localCoords[i].y !== undefined ? localCoords[i].y : localCoords[i][1];
    }
    var errorX = {}, errorY = {};
    var fx = lsq(localX, coordX, errorX);
    var fy = lsq(localY, coordY, errorY);

    var rfx = function (y) {
        return (y - errorX.b) / errorX.m;
    };
    var rfy = function (y) {
        return (y - errorY.b) / errorY.m;
    };


    return {
        toLocal : function (out, wgs84) {
            if (wgs84.x !== undefined) {
                XY[0] = wgs84.x;
                XY[1] = wgs84.y;
                wgs84 = XY;
            }
            var prj = project(OUT, wgs84);
            out[0] = rfx(prj[0]),
            out[1] = rfy(prj[1]);
            return out;
        },

        fromLocal : function (out, local) {
            var x = local.x !== undefined ? local.x : local[0];
            var y = local.y !== undefined ? local.y : local[1];
            
            XY[0] = fx(x);
            XY[1] = fy(y);
            return unproject(out, XY);   
        }
    };
}



function project(out, lnglat) {
    var rad = Math.PI / 180,
        metersPerDegree = 6378137 * Math.PI / 180,
        max = 85.0511287798;
    var lng = lnglat[0],
        lat = Math.max(Math.min(max, lnglat[1]), -max);
    var c;
    if (lat === 0) {
        c = 0;
    } else {
        c = Math.log(Math.tan((90 + lat) * rad / 2)) / rad;
    }
    out[0] = lng * metersPerDegree;
    out[1] = c * metersPerDegree;
    return out;
}

function unproject(out, pLnglat) {
    var x = pLnglat[0],
        y = pLnglat[1];
    var rad = Math.PI / 180,
        metersPerDegree = 6378137 * Math.PI / 180,
        maxLatitude = 85.0511287798;
    var c;
    if (y === 0) {
        c = 0;
    } else {
        c = y / metersPerDegree;
        c = (2 * Math.atan(Math.exp(c * rad)) - Math.PI / 2) / rad;
    }
    out[0] = wrap(x / metersPerDegree, -180, 180);
    out[1] = wrap(c, -maxLatitude, maxLatitude);
    return out;
}

function wrap(n, min, max) {
    if (n === max || n === min) {
        return n;
    }
    var d = max - min;
    var w = ((n - min) % d + d) % d + min;
    return w;
}