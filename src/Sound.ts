// https://stackoverflow.com/a/13194087
let beep = (function() {
    var ctxClass =
        (window as any).audioContext ||
        (window as any).AudioContext ||
        (window as any).webkitAudioContext;
    var ctx = new ctxClass();
    return function(duration: number, type: number, finishedCallback: () => void) {
        var osc = ctx.createOscillator();
        osc.type = type;
        //osc.type = "sine";
        osc.connect(ctx.destination);
        if (osc.start) osc.start();
        setTimeout(function() {
            if (osc.stop) osc.stop();
            finishedCallback();
        }, duration);
    };
})();
