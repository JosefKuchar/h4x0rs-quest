import Screen from '../Screen';
import { Colors } from '../Colors';
import Game from '../Game';
import Node from '../Node';

export default class GameScreen extends Screen {
    game: Game;
    score: number;
    timeLeft: number;
    nodes: Node[];

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        super(ctx);
        this.game = game;
        this.score = 500;
        this.timeLeft = 50;
        this.nodes = new Array();
        this.generateNodes();
    }

    render() {
        this.ctx.fillStyle = Colors.Background;
        this.ctx.fillRect(0, 0, 1024, 768);

        // Nodes
        this.nodes.forEach(node => node.render());

        // Score
        this.ctx.textAlign = 'start';
        this.ctx.font = '40px monospace';
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.fillText('Score: ' + this.score.toString(), 30, 60);
        this.ctx.stroke();

        // Time left
        this.ctx.textAlign = 'end';
        this.ctx.fillText(
            'Time left: ' + this.timeLeft.toString() + 's',
            994,
            60
        );
    }

    generateNodes() {
        this.nodes.push(new Node(512, 700, '127.0.0.1', this.ctx));
        this.nodes.push(new Node(512, 500, this.randomIp(), this.ctx));

        // Reveal the first node
        this.nodes[0].reveal();
    }

    randomIp() {
        return new Array(4).fill(0).map(x => Math.floor(Math.random() * 256)).join('.');
    }
}
