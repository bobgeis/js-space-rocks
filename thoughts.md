

## Considerations

This is a learning project, so not everything may be best practice, or the best way to do things.  The goal was to practice with javascript/es6, react, redux, and immutable.


## Some Anticipated Questions

* _What is this?_  This is basically a re-make of an earlier learning project I wrote in Elm [(link)](https://github.com/bobgeis/LookOutSpaceRocks), but in javascript using js libraries instead.

* _Why are you making a game like asteroids using immutable data structures?_  I wanted practice programming in javascript, but also using react, redux, and immutable data structures.  I'd like to use redux-undo in a game mechanic as well (time travel!).

* _Isn't that really inefficient?_  Yes probably.  Lots of garbage will be generated every frame, but if the browser has fast enough garbage collection (eg Chrome) then it should run reasonably and be playable.


## Architecture

* index.html loads the dist/bundle.js produced by webpack

* index.jsx is the entry point for webpack so everything must start there.  It creates the redux store, and renders the app using the react-redux Provider and game-container.js.

* game-container.js contains game-component.jsx and passes it props and actions.

* game-component.jsx contains the canvas and other UI elements.  It also calls the canvas render functions and dispatches actions.  This component does a lot!

* src/canvas/render.js has the primary functions for drawing things to the canvas.  canvas/images.js has some utilities and preloading stuff.  The other files are specific to types of game entities.

* src/reducers/reducer.js has the main reducer which combines reducers from key-reducer.js and game-reducer.js

* src/update/game-update.js is called by the tick action on the game-reducer.  It does all the time-step updates of the game model which is a large portion of the code.  The basic/self update logic are in the *-logic.js files, while the pairwise interactions/collisions are in the files named after pairs eg: bullets-rocks.js.  Right now collisions are circle collisions, which is plenty fast with this small number of game entities.  If we wanted to do some with better big O behavior (like a quad tree), then we could put the insertion logic in the self update code, which is called first.

* src/constants has files of game constants, eg: what is turning rate of the player ship in radians per tick?  This is game is tick based on rAF calls, not dt (delta-time) based.  This means that it slows down as the FPS slow down, and stops if you go to a different tab.

* src/res/* has non-js resource files, like images, and css.

* Config stuff: webpack.config has the configuration for the webpack compiler.  hmrServer has an express.js server that does hot module reloading when called with node.  eslintrc and babelrc have config for eslint and babel respectively.  gitignore is for things that shouldn't get committed, yarnlock has data for yarn about how deps were added, and package.json has project info, lists of dependencies, and scripts that can be run with yarn or npm.


## Dependencies Discussion

Lots of dependencies!  What do they all do?

#### dependencies:

* babel-polyfill: for backfilling for old browsers.

* immutable: immutable data structures used for game state

* jquery: a useful DOM library for smoothing browser quirks.

* lodash: a useful FP-oriented library.

* react: a front end library with vdom

* react-dom: for actually using react with the DOM.

* react-redux: for using redux with react.

* redux: state management library

* redux-actions

* redux-immutablejs

* redux-thunk: an approach to handle side effects in redux.

* redux-undo: lib to make a reducer undoable.


#### Devdeps:

* babel-cli: used for node-babel in the hmr script.  This lets us write webpack config in babelese.

* babel-core: we want this to translate es6+ into stuff that will run on less furistic browsers.

* babel-eslint: so eslint will recognize babelese.

* babel-loader: so webpack can handle babelese.

* babel-*: presets and settings for babel.

* css-loader: lets webpack load css files into the bundle.  Use them with a call like ```import './res/css/style.css';``` in the js code.

* eslint: lints our es :)

* eslint-loader: so we can lint modules as webpack loads them, and try to autofix them too. needed?

* eslint-plugin-react: so eslint knows about jsx/react stuff.

* express: this is our hmr dev server

* file-loader: peer dependency of url-loader below

* jest: for testing (need to write tests for it!)

* rimraf: for clearing /dist/ between builds

* style-loader: for loading css & stylesheets (use it with css-loader)

* url-loader: for loading images into the webpack bundle

* webpack: for compiling js (and other) files into a single bundle file

* webpack-dev-middleware: for using dev middleware

* webpack-hot-middleware: for using hot module replacement in dev


#### Things not being used.

* [eslint-loader](https://github.com/MoOx/eslint-loader): for linting while you webpack.

* [jquery](https://github.com/jquery/jquery): a very powerful and well loved browser library, that I ended up not needing.

* [lodash]()https://github.com/lodash/lodash: a functional programming oriented utility library.

* [redux-immutablejs](https://github.com/gajus/redux-immutable): a library to solve the state as immutable collection issue mentioned in Things Learned.

* [redux-actions](https://github.com/acdlite/redux-actions): a library for doing common things with redux actions.


## Things Learned

* By default, React components do not accept Immutable data structures (like Maps) as props, and will throw an error.  This is a little surprising considering how much React/Redux promote the use of such data structures.  Apparently a common work-around is to pass the immutable data but wrapped in a normal js object, eg: ```{data: immutableMap}```

* Chrome dev tool extensions are useful and pretty.  Overview of Chrome DevTools [here](https://developer.chrome.com/devtools).  Some useful DevTool extensions: [Immutable.js Object formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog), and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

* Redux doesn't like you queuing new actions from inside a reducer.  Dispatching a state changing action from within a reducer might mean changing the state in the middle of a reducer call which could do weird things, but you'd expect there to be an easy way to pass back one or more actions to be handled immediately after the current one finishes.  After all that is what Elm (one of the inspiriations for redux) does.  There are a number of different ways of dealing with this.  [redux-thunk](https://github.com/gaearon/redux-thunk) seems popular, [redux-loop](https://github.com/redux-loop/redux-loop) seems closer to Elm.  There's some other solutions offered, like redux-saga which is probably too much, and [this](https://lazamar.github.io/dispatching-from-inside-of-reducers/), but that isn't an npm package.

* The way I did this, it seems like there is a lot of game logic mixed in with (what I think is) display code.  I'm not totally comfortable with that, but I didn't see an obvious better way.  If it works I'll leave it be for now.  Could it be avoided using Elm or reagent/re-frame in cljs?  For reference: [Elm lang](http://elm-lang.org/) and also [re-frame](https://github.com/Day8/re-frame) and a [doc](https://purelyfunctional.tv/guide/re-frame-building-blocks/) about it.

* I believe redux dev tools that track actions can slow things down if there is an action every rAF.  Either way, try hiding that if there are performance issues.  If performance issues persist, then it may just be that my usage of redux is to slow for this type of game.  Note: it seems like it was redux dev tools, the game itself runs fine on my machine if those tools aren't used.

* On the topic of redux being too slow, I encountered [this](https://reactrocket.com/post/react-redux-optimization/) article.  It includes links to two libraries that try to mimic good things from functional languages.  [reselect](https://github.com/reactjs/reselect) has some commonalities with re-frame's subscriptions, and [ramda](http://ramdajs.com/) has some higher order functions that act on immutable data structures. Ramda has a [cookbook](https://github.com/ramda/ramda/wiki/Cookbook) with suggestions on how to use it as well.  Unfortunately, Ramda does NOT integrate with ImmutableJs, so probably not useful here (reselect still might be though).

* Some other maybe useful chrome extensions: [Github Repo Size viewer](https://chrome.google.com/webstore/detail/github-repository-size/apnjnioapinblneaedefcnopcjepgkci), and [Github Repo Tree viewer "Octotree"](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

* If you want to have react components with local state that persists between renders, use ```this.setState({key: value})``` to merge it in that component's ```this.state``` object.  This was necessary to keep game-component.jsx's canvas context from being emptied.

* If you use redux' combineReducers, then the different reducers don't have access to one another's state.  I was planning on having separate reducers for handle the tick actions (undoably update an immutable map) and for handling user key presses (store active keys in a mutable object).  But the tick reducer would need access to the current key state.  Redux is aware of this stumblingn block, see [discussion](http://redux.js.org/docs/faq/Reducers.html#reducers-share-state).  Middleware?

* I handled the above issue by having the keys object be part of the tick action and have that passed into the reducer that way.  Works.

* I actually kind of like nesting ternary expressions, that is code like: ```isColliding() ? die() : bang ? makeBullet() : return``` which is basically a more concise way of writing ```if () {} else if () {} else {}```  My eslint doesn't like it though, I assume because it can be confusing, but I've had some practice reading code composed of punctuation.  I'll leave it in a couple places and see if I agree that it's confusing when I come back to it later.

* In asteroids you have to write code that collides bullets with asteroids and remove items from both lists if they collide.  Using mutable data structures, you probably have objects representing both items, and you can just set a kill flag and cull them later.  Using immutable objects you need to be more clever.  In Elm, which enforced purity to a high degree, we wrote a function that would return a list of all colliding pairs.  In this case, I was able to write a pair of nested filter loops that would call side effects if needed.  This isn't ideal: we're filter looping over the second list many times.  Consider better approaches in the future.

* By default, canvas will draw over all other elements.  You can fix this with z-index style attributes ('zIndex' in react), with higher z's drawn above others, but every such element must have it's position attribute defined as either relative or absolute!

* Something I hadn't fully appreciated: local storage is shared across the domain.  This means that the 'HiScore' object stored for [js-space-rocks](https://bobgeis.github.io/js-space-rocks/) is the *same* object as the one stored for [coffeeAsteroids](https://bobgeis.github.io/coffeeAsteroids/)]!  Need to rename it to make them unique!  (It was a funny moment when I went into the game on gh-pages and saw that I already had a high score!)

* In my haste to get the game to a playable state, I did some things in an impure way.  Two obvious ones: random number generation with ```Math.random()```, and the setting and getting of local-storage.  Using math.random() is understandable in an asteroids game, but if it was deterministic (at least for a subset of rng uses) then using the omega-13 would actually help the player prepare better.  Accessing local storage in an impure manner actually resulted in some subtle bugs about when the hi-score gets updated.  It might be worth going back and doing those again.

* Many of the examples I've seen declare javascript functions with ```function functionName(args) {...}``` whereas I've been using ```const functionName = (args) => {...}``` which I suspect is not idiomatic.  I'm surprised my eslint didn't complain by default!  It's unclear whether going back to convert top level function definitions to ```function functionName(args) {...}``` is an improvement, or just a different choice of style. For now I'll leave it as almost all/almost all arrow functions.

* I do most development in Chrome, and it runs smoothly there (on my machine at least).  I expected it to stutter on Firefox, but it ran pretty smoothly there too!  In IE it didn't work at all, but I believe I made some mistakes in the way the eventhandlers were set up (key handlers specifically) that IE doesn't like.  Investigate!  Also test in Safari at some point...  Was smooth in Safari :)

* The dev dist bundle is 1.6 MB.  That's not super huge, but maybe it could be smaller.  After using uglify with webpack, it's 443 KB!  But it mangled the Omega symbol...  Aha! Setting output.ascii_only = true in the config fixed it.  Many options are defined [here](https://github.com/mishoo/UglifyJS2/tree/harmony#parse-options) but not all of them work in the webpack plugin (eg the compress.inline option is not recognized and will throw an error).  For file size reference, the star background is 195 KB, and all the other images are much smaller.

* I added gray rocks for variety, but I find that the small ones often look too much like the transport ships if I'm not focused on them, and if they are against the lighter parts of the background I don't necessarily see them at all.  Giving the rocks an outline helped with the second issue, but I still sometimes think an approaching rock is a friendly ship and crash, and the outline is counter to the otherwise flat aesthetic.  The colors may need to be re-thought.

* More thoughts on re-frame like patterns: I think in redux if I want co-effects I should add functions that get them to the actions, and if I want side-effects I should use redux-thunk (more stuff in actions) or redux-loop (more stuff in reducer return).  This makes actions "thick" as opposed to "thin" or "dumb", but it may still be worth a try.  To some extent this will let different sub-stores of the reducer talk to each other, though this smells like an anti-pattern.  Try it anyway and see what happens?

* I used to have shorter names for files, like game.jsx, but when there were similarly named files in multiple folders, which each might throw errors with similar sounding stack traces, it became confusing.  So now every file has a unique name, even if it's location in the folder structure makes that otherwise unnecessary.

* Hot module reloading seems to be done slightly differently in many different places.  [This](https://github.com/ahfarmer/webpack-hmr-3-ways) repo demonstrates three ways to do it.  However there seems to be a common trend of creating a server.js file and having it set up the dev server with express and then your dev script calls it with node.  I've gotten pretty far with just ```webpack --watch```, but lets give hmr a try!

* Now to install a bunch of devdeps...  Some interesting errors: made the publicPath not be '/dist/' for a bit and was getting 'Unexpected token <' errors because for some reason the index.html was getting itself when it asked for the bundle.js.  Next we needed to get the resources (img & css) to load properly as the hmr html & bundle apparently can't look in the res folder directly (it's right there guys...), also an error was thrown about redux 2.0 not liking hmr.  I bet there are more devdeps I can get for these issues...

* Everyone seems to call their output directory something different.  At some point I need to research or have someone explain precisely what the difference is between: '/dist/', '/assets/', '/static/', '/public/', '/res/', '/resources/', '/lib/'.  Some of them are more likely to be used for certain purposes than for others, but if there's actually a single unifying convention to determine when you use one or another, then I haven't come across it.

* Redux 2.0's problem with HMR, and it's solution, is outlined [here](https://github.com/reactjs/react-redux/releases/tag/v2.0.0).  It looks like a small code change needs to be made to the place where the store is created.  In my case that is in src/index.jsx.  Apparently there's a react-hot-loader package.  I'll look into that if I find I need it.

* Getting css in required css-loader and style-loader, and after using file-loader and image-webpack-loader I found only url-loader was actually necessary for imagees.  And I needed to move the res folder into the src folder (might want to think about that), but then HMR worked!  Adding the loaders to the prod and dev config appeared to make those work as well.  Getting all the resources packed into the bundle increased its size:  dev (not ugly) is 2 MB (up from 1.6 MB) and prod (uglified!) is 863 KB (up from 443 KB).

* I also discovered that webpack doesn't like dynamic require()s much.  This mattered for requiring images.  If I passed the image path in as a variable: ```require(imgString)```, then webpack wouldn't find it and would complain, even if hardcoding the same string worked fine: ```require('./res/img/something.jpg')```.  If I made it a template string with only part of it as a variable, then it worked! ```require(`./res/img/${sourceFile}`)```  The documentation [here](https://webpack.github.io/docs/context.html) explains this some, even though it's out of date.  I didn't find comparable doc for the current webpack.

### Feature Checklist

* ~~Background~~

* ~~Player~~

* ~~Omega13~~

* ~~Bases~~

* ~~Rocks~~

* ~~Pause~~

* ~~Bullet Spawning~~

* ~~Bullets~~

* ~~Rock Spawning~~

* ~~Bullet-Rock Collisions~~

* ~~Rock Calving~~

* ~~Ships~~

* ~~Ship Spawning~~

* ~~Ship-Rock Collisions~~

* ~~Rock Loot~~

* ~~Ship Loot~~

* ~~Player-Loot Collisions~~

* ~~Cargo Delivery~~

* ~~Explosions~~

* ~~Player-Rock Collisions~~

* ~~FTL Flashes~~

* ~~Game Over and Restart~~

* ~~Score~~

* ~~Preload~~

* ~~Splash Mode~~

* ~~High Score + local storage~~

* ~~Rock polygons~~

* ~~Rock color variants~~

* ~~Break up huge constants.js~~

* ~~Rename some files~~

* ~~Squish bundle with uglify~~

* ~~Hot Module Replacement~~

* ~~Deterministic RNG (for timer spawns)~~

* Player cargo counts

* Make it less ugly

* Rock behaviors

* Rock appearance needs to not be confusing: 1) don't blend in with bg, 2) more distinct from friendly ships.  This is a problem for gray rocks.

* Make it look okay -> Make it pretty

* Code doc! And cleanup...

* Player death releases some/all undelivered cargo

* Use redux-thunk or redux-loop for side effects (eg local storage)

* Using omega-13 creates flash or indicator where player ship is (the human player won't usually remember where they were 13 seconds ago and this can cause issues).

* Experiment with canvas paths, SVGs, and/or img elements

* Graphical indicator of loot age.

* Testing and bug fixes.  Eg: ship double flash bug, 4-rock omission.

* Compare bundle squishing with Uglify vs Google Closure Compiler vs Prepack.

* Script/automated pushing to gh-pages?

* Sound / Music?

* Hooligan ships?
