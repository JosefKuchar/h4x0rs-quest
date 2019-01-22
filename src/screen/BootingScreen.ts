import Screen from '../Screen';
import { Colors } from '../Colors';
import Game from '../Game';
import { State } from '../Game';

export default class BootingScreen extends Screen {
    progress: number;
    total: number;
    game: Game;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        super(ctx);
        this.progress = 0;
        this.total = 0;
        this.game = game;
    }

    render() {
        this.ctx.fillStyle = Colors.Background;
        this.ctx.fillRect(0, 0, 1024, 768);
        this.ctx.strokeStyle = Colors.Foreground;
        this.ctx.rect(50, 768 / 2 - 50 / 2, 1024 - 50 * 2, 100);
        this.ctx.stroke();
        this.ctx.fillStyle = Colors.Foreground;
        this.ctx.fillRect(50, 768 / 2 - 50 / 2, (this.progress / this.total) * (1024 - 50 * 2), 100);

        if (this.total > 0 && this.progress == this.total) {
            this.game.screens.game.start();
            this.game.state = State.Game;
        }
    }
}