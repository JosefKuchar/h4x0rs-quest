import Screen from '../Screen';
import { Colors } from '../Colors';
import Game, { State } from '../Game';
import Node from '../Node';
import Exploit from '../Exploit';
import AutomaticExploit from '../exploit/AutomaticExploit';

export default class GameScreen extends Screen {
    game: Game;
    score: number;
    timeLeft: number;
    nodes: Node[];
    currentNode: Node;
    exploitRunning: boolean;
    currentExploit: Exploit | undefined;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        super(ctx);
        this.game = game;
        this.score = 0;
        this.timeLeft = 60;
        this.nodes = new Array();
        this.currentNode = new Node(0,0,'err',this.ctx); // Placeholder node
        this.generateNodes();
        this.exploitRunning = false;
        this.currentExploit = new AutomaticExploit(this.ctx, this);
    }

    start() {
        // Time countdown
        setInterval(() => {
            this.timeLeft--;
        }, 1000);
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

        // Exploit
        if (this.exploitRunning === true) {
            if (this.currentExploit)
                this.currentExploit.render();
        }

        // End the game
        if (this.timeLeft <= 0) {
            this.game.state = State.End;
            this.game.screens.end.score = this.score;
        }
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
        start.root = true;
        start.connected = true;

        // Generate connections
        let queue = [start]

        while (queue.length > 0) {
            let current = queue.shift() as Node;

            do {
                let nodes = this.nodes.filter(node => !node.connected);
                if (nodes.length == 0) break;
                let node = nodes[Math.floor(Math.random() * nodes.length)];
                current.connections.push(node);
                node.connected = true;
                queue.push(node);
            } while (Math.random() < 0.5)
        }

        // Set first node as current
        this.currentNode = start;
    }

    randomIp() {
        return new Array(4).fill(0).map(x => Math.floor(Math.random() * 256)).join('.');
    }

    exploit() {
        this.exploitRunning = true;
        this.currentExploit = new AutomaticExploit(this.ctx, this);
    }

    exploitDone() {
        this.exploitRunning = false;
        this.currentNode.root = true;
        this.score += 50;
        this.timeLeft += 10;
        this.currentExploit = undefined;

        // Regenerate nodes
        if (!this.nodes.some(node => !node.root)) {
            this.nodes = new Array();
            this.generateNodes();
        }
    }
}
