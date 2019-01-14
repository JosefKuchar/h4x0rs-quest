import Screen from '../Screen';
import { Colors } from '../Colors';
import Game from '../Game';
import Node from '../Node';

export default class GameScreen extends Screen {
    game: Game;
    score: number;
    timeLeft: number;
    nodes: Node[];
    currentNode: Node;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        super(ctx);
        this.game = game;
        this.score = 500;
        this.timeLeft = 50;
        this.nodes = new Array();
        this.currentNode = new Node(0,0,'err',this.ctx); // Placeholder node
        this.generateNodes();
    }

    render() {
        this.ctx.fillStyle = Colors.Background;
        this.ctx.fillRect(0, 0, 1024, 768);

        // Nodes
        this.nodes.forEach(node => node.render());

        // Current node
        this.ctx.setLineDash([]);
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.beginPath();
        this.ctx.arc(this.currentNode.x, this.currentNode.y, 6, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();

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
        let start = new Node(512, 650, '127.0.0.1', this.ctx);
        this.nodes.push(start);
        
        // Generate grid
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 4; y++) {
                if (x == 2 && y == 0) continue;
                if (Math.random() <= 0.2) {
                    const node = new Node(100 + x * 206, 650 - y * 170, this.randomIp(), this.ctx);
                    this.nodes.push(node);
                }
            }
        }

        // Reveal the first node
        start.reveal();
        start.connected = true;

        // Generate connections
        /*
        let queue = [start]

        if (queue.length > 0) {
            const current = queue.shift();
            this.nodes.filter(node => !node.connected)
        }*/

        // Set first node as current
        this.currentNode = start;
    }

    randomIp() {
        return new Array(4).fill(0).map(x => Math.floor(Math.random() * 256)).join('.');
    }
}
