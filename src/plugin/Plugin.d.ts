import { EventHandler } from '../EventHandler';
import { Game } from '../Game';
export declare abstract class Plugin {
    private events;
    readonly name: string;
    protected game?: Game;
    constructor(name: string);
    protected on(eventName: string, handler: EventHandler): void;
    dispatch(eventName: string, data: any): void;
    setGame(game: Game): void;
    abstract init(): void;
}
