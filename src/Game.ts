import TurnOffScreen from './screen/TurnOffScreen';
import BootingScreen from './screen/BootingScreen';
import GameScreen from './screen/GameScreen';

export enum State {
    TurnOff,
    Booting,
    Game
}

export default class Game {
    state: State;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    screens: {
        turnOff: TurnOffScreen;
        booting: BootingScreen;
        game: GameScreen
    };

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.state = State.TurnOff;
        this.canvas = canvas;
        this.screens = {
            turnOff: new TurnOffScreen(ctx),
            booting: new BootingScreen(ctx, this),
            game: new GameScreen(ctx, this)
        };
    }

    render() {
        switch (this.state) {
            case State.TurnOff:
                this.screens.turnOff.render();
                break;
            case State.Booting:
                this.screens.booting.render();
                break;
            case State.Game:
                this.screens.game.render();
                break;
        }
    }

    boot() {
        if (this.state === State.TurnOff) {
            this.state = State.Booting;
            return true;
        } else {
            return false;
        }
    }
}
