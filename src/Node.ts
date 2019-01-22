import { Colors } from './Colors';

export default class Node {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    ip: string;
    connections: Node[];
    revealed: boolean;
    scanned: boolean;
    connected: boolean;
    root: boolean;

    constructor(
        x: number,
        y: number,
        ip: string,
        ctx: CanvasRenderingContext2D
    ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.ip = ip;
        this.connections = new Array();
        this.revealed = false;
        this.scanned = false;
        this.connected = false;
        this.root = false;
    }

    render() {
        if (!this.revealed) return;

        this.ctx.strokeStyle = Colors.Foreground;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        if (!this.scanned) this.ctx.setLineDash([6, 4]);
        else this.ctx.setLineDash([]);
        this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '20px monospace';
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.fillText(this.ip, this.x, this.y + 50);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    reveal() {
        this.revealed = true;
    }

    exploit() {
        
    }

    revealOthers() {
        let ips = new Array();
        this.connections.forEach(node => {
            node.reveal();
            ips.push(node.ip);
        });
        this.scanned = true;
        return ips.join('\n');
    }
}
