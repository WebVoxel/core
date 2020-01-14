import { EventHandler } from '../EventHandler';
import { Game } from '../Game';
import { IPluginOptions } from './IPluginOptions';
export declare abstract class Plugin {
    private events;
    readonly name: string;
    readonly dependencies?: string[];
    protected game?: Game;
    constructor(name: string, options?: IPluginOptions);
    protected on(eventName: string, handler: EventHandler): void;
    dispatch(eventName: string, data: any): void;
    setGame(game: Game): void;
    abstract init(): void;
}
