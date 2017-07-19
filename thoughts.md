

## Considerations

This is a learning project, so not everything may be best practice, or the best way to do things.  The goal was to practice with javascript/es6, react, redux, and immutable.


## Some Anticipated Questions

* _What is this?_  This is basically a re-make of an earlier learning project I wrote in Elm [(link)](https://github.com/bobgeis/LookOutSpaceRocks), but in javascript using js libraries instead.

* _Why are you making a game like asteroids using immutable data structures?_  I wanted practice programming in javascript, but also using react, redux, and immutable data structures.  I'd like to use redux-undo in a game mechanic as well (time travel!).

* _Isn't that really inefficient?_  Yes probably.  Lots of garbage will be generated every frame, but if the browser has fast enough garbage collection (eg Chrome) then it should run reasonably and be playable.


## Architecture

* index.html loads the dist/bundle.js produced by webpack
* res/* has non-js resource files, like images and css.
* index.jsx is the entry point for webpack so everything must start there.  It creates the redux store, and renders the app using the react-redux Provider and game-container.js.
* game-container.js contains game-component.jsx and passes it props and actions.
* game-component.jsx contains the canvas and other UI elements.  It also calls the canvas render functions and dispatches actions.  This component does a lot!
* canvas/render.js has the primary functions for drawing things to the canvas.  canvas/images.js has some utilities and preloading stuff.  The other files are specific to types of game entities.
* reducers/reducer.js has the main reducer which combines reducers from key-reducer.js and game-reducer.js
* update/game-update.js is called by the tick action on the game-reducer.  It does all the time-step updates of the game model which is a large portion of the code.  The basic/self update logic are in the *-update.js files, while the pairwise interactions are in the files named after pairs eg: rocks-bullets.js.


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

* Make it less ugly -> Make it look okay -> Make it pretty

* Proper production build with uglify or closure

* Better File Names/Structure?  eg: Is physics.js necessary?  Why is loot-update.js exporting more than just update?

* Code doc! And cleanup... (somewhat related to file structure)

* Hot module reloading.  It seemed unnecessary at first, but it is a common tool, so it would be good to get used to.

* Experiment with canvas paths, SVGs, and/or img elements

* Deterministic RNG?  This would mean that the omeag-13 would give you knowledge of the future, rather than just a another chance.

* Graphical indicator of loot age.

* Testing and bug fixes.  Eg: ship double flash bug, 4-rock omission.

* Script/automated pushing to gh-pages?

* Hooligan ships?
