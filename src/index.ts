import Terminal from './Terminal';
import Game from './Game';

let canvas = document.getElementsByClassName('game')[0] as HTMLCanvasElement;
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let terminalElement = document.getElementsByClassName('console')[0] as HTMLDivElement;
let input = document.getElementsByClassName('input')[0] as HTMLInputElement;

const game = new Game(ctx, canvas);
const terminal = new Terminal(terminalElement, input, game);

function loop() {
    ctx.clearRect(0, 0, 1024, 768);
    game.render();
    requestAnimationFrame(loop);
}

terminal.initSequence();

loop();
