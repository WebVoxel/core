import { Plugin } from './plugin/Plugin';
import { World } from './world/World';

export interface IGameOptions {
	rootElement?: HTMLElement;
	plugins?: Plugin[];
	initialWorld: World;
}
