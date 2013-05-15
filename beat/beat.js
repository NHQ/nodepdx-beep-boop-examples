var baudio = require('baudio');
var tau = Math.PI * 2;
var tune = [ 0, -1/6, 1/2, -3/4, -1/5, 1/6 ]
    .map(function (x) { return 800 * Math.pow(2, x) })
;

var b = baudio(function (t) {
    var n = tune[Math.floor(t % tune.length)];
    
    var f = 120 + Math.sin(1000 * (t % 1));
    return sin(f)
        * (t % 32 < 8 ? 1 : sin(4))
        + (t % 64 < 16 ? 0 : (t % 3/4 < 3/16) * sin(f) * sin(12))
        + (sawtooth(n) * square(4)) * (sin(31) + sin(8))
    ;
    
    function sin (x) {
        return Math.sin(tau * t * x);
    }
    
    function square (x) {
        var n = Math.sin(tau * t * x);
        return n > 0 ? 1 : -1;
    }
    
    function sawtooth (x) {
        return t % (1 / x) * x * 2 - 1;
    }
});
b.play();
