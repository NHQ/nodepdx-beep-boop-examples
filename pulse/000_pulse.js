var baudio = require('baudio');
var tau = Math.PI * 2;
var b = baudio(function (t) {
    var g = [
        1, 0, 5/4, 0, 1, 3/5, 0, 0,
    ][Math.floor(t * 2 % 8)];
    var grunge = (g > 0) * Math.pow(2, -2) * Math.pow(2, g);
    
    return (
        (
            0.2 * square(100 * grunge * Math.floor(t * 40) % 3200)
            + 0.2 * sin(124 * grunge * 20 + Math.floor(t) % 16 * 20)
            + 0.2 * sawtooth(612 * grunge - 1)
            + 0.2 * sawtooth(404 * grunge - 1)
        ) * (
            (square(400) + square(404))
            / 15 + sin(400) * 0.5 + sin(4) + sin(3)
        ) / 4
        + (t % 8 > 7) * (square(280) + square(285)) * (sin(4) + sin(10)) / 20
    );
    
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

