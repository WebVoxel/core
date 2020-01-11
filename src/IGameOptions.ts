import { Plugin } from './plugin/Plugin';
import { World } from './world/World';

export interface IGameOptions {
	plugins?: Plugin[];
	initialWorld: World;
}
