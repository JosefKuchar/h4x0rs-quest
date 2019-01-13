import { Colors } from './Colors';

export default class Node {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    ip: string;
    connected: Node[];
    revealed: boolean;
    
    constructor(x: number, y: number, ip: string, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.ip = ip;
        this.connected = new Array();
        this.revealed = false;
    }

    render() {
        if (!this.revealed) return;

        this.ctx.strokeStyle = Colors.Foreground;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '20px monospace';
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.fillText(this.ip, this.x, this.y + 50);
        this.ctx.stroke();
    }

    reveal() {
        this.revealed = true;
    }

    revealOthers() {
        this.connected.forEach(node => node.reveal());
    }
}