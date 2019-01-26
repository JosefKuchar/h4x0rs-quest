import Screen from "../Screen";
import { Colors } from "../Colors";

export default class EndScreen extends Screen {
    score: number;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.score = 0;
    }

    render() {
        this.ctx.fillStyle = Colors.Background;
        this.ctx.fillRect(0, 0, 1024, 768);
        this.ctx.textAlign = 'center';
        this.ctx.font = '60px monospace';
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.fillText('Final score: ' + this.score, 1024 / 2, 768 / 2);
        this.ctx.textAlign = 'center';
        this.ctx.font = '20px monospace';
        this.ctx.fillText('Refresh (F5) to restart the game', 1024 / 2, 768 - 20);
    }
}