import { Plugin } from './plugin/Plugin';
import { World } from './world/World';

/**
 * Game options
 * @author RailRunner16
 */
export interface IGameOptions {
	/**
	 * Plugins to apply to the game
	 */
	plugins?: Plugin[];

	/**
	 * The root path to the game textures.
	 */
	textureRoot?: string;

	/**
	 * The initial world to load
	 */
	initialWorld: World;
}
