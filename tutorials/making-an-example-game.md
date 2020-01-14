> If you haven't already, go and read the [getting started tutorial](/tutorial-getting-started) before proceeding with this!

**NOTE:** I will be using the webpack method of including webvoxel for this tutorial, as I find it much easier. However, if you want to use the `<script>` tag method, it is about the same, except all your main game code goes in another `<script>` tag.

First we will create a new `World` object to store our world. Then, we will add some blocks with the identifier example:dirt.
```js
const dirtId = new Identifier('example', 'dirt');
const world = new World();

world.addBlock(new Block({
    type: dirtId,
    x: 0, y: 0, z: 0,
}));

world.addBlock(new Block({
    type: dirtId,
    x: 0, y: 0, z: -1,
}));

world.addBlock(new Block({
    type: dirtId,
    x: 0, y: 0, z: 1,
}));
```

Next we should instantiate the game, and start it.
```js
const game = new Game({
    initialWorld: world,
});

game.start();
```

Now when you run the game, you should see a blue screen, but no blocks! lets fix that by adding some controls so you can look around and move. Run `yarn add @webvoxel/plugin-wasdcontrols` and add this to your code above everything else:
```js
const wasd = new WASDControlsPlugin();
```

Then add it to your game by adding the plugins field to your game options, like so:
```js
const game = new Game({
    // ...
    plugins: [wasd],
});
```

Once you have it added to your game, you can add an event listener to the game's renderer element so that when a player clicks the renderer, it takes control of their pointer. Here is how I do it:
```js
game.renderer.domElement.addEventListener('click', () => wasd.controls.lock());
```
