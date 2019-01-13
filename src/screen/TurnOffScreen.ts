import Screen from '../Screen';

export default class TurnOffScreen extends Screen {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    render() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 1024, 768);
    }
}