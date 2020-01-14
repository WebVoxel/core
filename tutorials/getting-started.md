# Getting Started with WebVoxel
The easiest way to use webvoxel is by including it as a `<script>` tag in a HTML file, along with its dependency, THREE.js:
```html
<script type='text/javascript' src='path/to/three.min.js'></script>
<script type='text/javascript' src='path/to/webvoxel.min.js'></script>
<script type='text/javascript'>
    // Your code here!
</script>
```

Of course you can import it through node, Webpack or another module bundler, but it must be ran in the browser! An example with webpack below:

```js
import { Game, World } from '@webvoxel/core'; // The necessary imports to get a game up and running
```

