var baudio = require('baudio');
var tau = Math.PI * 2;
var tune = [ 0, -1/6, 1/2, -3/4, -1/5, 1/6 ]
    .map(function (x) { return 800 * Math.pow(2, x) })
;
var alt = [ -1/6, 4/2, 1/4, 1/3 ]
    .map(function (x) { return 1600 * Math.pow(2, x) })
;

var b = baudio(function (t) {
    t += 22;
    if (t % 32 >= 23 && t % 32 < 25) {
        t = Math.sin((t - 23) * tau / 8); // drop
    }
    if (t % 32 >= 31 && t % 32 < 32) {
        t = Math.sin((t - 26) * tau / 4); // undrop
    }
    if (t % 32 >= 25 && t % 32 < 31) {
        t = 25 + (t % 32 - 25) * 0.5;
    }
    
    var f = 120 + Math.sin(1000 * (t % 1));
    var n = tune[Math.floor(t % tune.length)];
    
    if (t % 16 >= 15) return variant(n);
    if ((t % 32 > 21 && t % 32 < 22)) {
        return variant(n * 0.5) * sin(2); // mini-drop
    }
    if (t % 32 > 22 && t % 2 < 1) {
        return (variant(n / 2) + primary(n / 2)) / 2 * sin(8); // punctuate
    }
    
    if (t % 32 > 17 && t % 32 < 19) {
        var speed = t % 32 < 18 ? 2 : 4;
        n = alt[Math.floor(t * speed % alt.length)];
        return (variant(n) + primary(n)) / 2;
    }
    else {
        return (t < 4 ? t / 4 : 1) * primary(n);
    }
    
    function sin (x) {
        return Math.sin(tau * (t % 32) * x);
    }
    
    function square (x) {
        var n = Math.sin(tau * (t % 32) * x);
        return n > 0 ? 1 : -1;
    }
    
    function sawtooth (x) {
        return (t % 32) % (1 / x) * x * 2 - 1;
    }
     
    function variant (n) {
        return (
            square(n / 4) + sawtooth(n * 2)
            + sin(n) + sin(n + 2)
            + 2 * sin(f)
        ) / 3 * sin(2 + (Math.floor(t * 2 % 4)));
    }
    
    function primary (n) {
        return sin(f)
            * (t % 32 < 8 ? 1 : sin(4))
            + (t % 64 < 16 ? 0 : (t % 3/4 < 3/16) * sin(f) * sin(12))
            + (sawtooth(n) * square(4)) * (sin(31) + sin(8))
        ;
    }
    
});
b.play();
