# Installing WebVoxel
The easiest way to use webvoxel is by including it as a `<script>` tag in a HTML file, along with its dependency, THREE.js:
```html
<script type='text/javascript' src='path/to/three.min.js'></script>
<script type='text/javascript' src='path/to/webvoxel.min.js'></script>
<script type='text/javascript'>
    // Your code here!
</script>
```
**Note:** In the browser, all WebVoxel classes are under the `Voxel` namespace, so instead of doing `new Game()` you would do `new Voxel.Game()`. Plugins are also all namespaced this same way, even non-official ones. 

Of course you can import it through node, Webpack or another module bundler, but it must be ran in the browser! An example with webpack below:

```js
import { Game, World } from '@webvoxel/core'; // The necessary imports to get a game up and running
```

# Installing WebVoxel Plugins

## Webpack
All official WebVoxel plugins are available on NPM. Just do `yarn add @webvoxel/plugin-<plugin name>`.

To import and use a plugin:
```js
// Make sure to import your things from @webvoxel/core here first!
import MyPlugin from '@webvoxel/plugin-<plugin name>';

const game = new Game({
    plugins: [
        new MyPlugin(),
    ],
    // ...
});
```

## HTML
Since all official plugins are available on NPM, that means they are also all available on [unpkg](https://unpkg.com).

To include and use a plugin:
```html
<!-- Make sure to import THREE.js and WebVoxel core before this! -->
<script type='text/javascript' src='unpkg.com/@webvoxel/plugin-<plugin name>/dist/webvoxel-plugin-<plugin name>'></script>
<script type='text/javascript'>
    const game = new Voxel.Game({
        plugins: [
            new Voxel.MyPlugin(),
        ],
    });
</script>
```
