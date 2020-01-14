/**
 * Options for a new plugin
 */
export interface IPluginOptions {
    /**
     * A list of names of plugins this plugin depends on.
     */
    dependencies?: string[];
}