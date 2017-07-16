

## Considerations

This is a learning project, so not everything may be best practice, or the best way to do things.  The goal was to practice with javascript/es6, react, redux, and immutable.


## Some Anticipated Questions

* What is this?  This is basically a re-make of an earlier learning project I wrote in Elm, [link](https://github.com/bobgeis/LookOutSpaceRocks), but in javascript using js libraries instead.

* Why are you making a game like asteroids using immutable data structures? I wanted practice programming in javascript, but also using react, redux, and immutable data structures.  I'd like to use redux-undo in a game mechanic as well.

* Isn't that really inefficient? Yes probably, lots of garbage will be generated every frame, but if the browser has fast enough garbage collection (eg Chrome) then it should run reasonably and be playable.


## Architecture

* index.html loads the bundle produced by webpack
* index.jsx is the entry point for webpack so everying must start there.  It creates the redux store, and renders the app using the react-redux Provider and game-container.js.
* game-container.js contains game-component.jsx and passes it props and actions.
* game-component.jsx contains the canvas and other UI elements.  It also calls the canvas render functions and dispatches key actions.  This component does a lot!
* canvas/render.js has the primary functions for drawing things to the canvas.  canvas/images.js has some utilities and preloading stuff.
* reduers/reducer.js has the main reducer which combines reducers from key-reducer.js and game-reducer.js
* update/game-update.js is called by the tick action on the game-reducer.  It does all the time-step updates of the game model which is a large portion of the code.


## Things Learned

* By default, React components do not accept Immutable data structures (like Maps) as props, and will throw an error.  This is a little surprising considering how much React/Redux promote the use of such data structures.  Apparently a common work-around is to pass the immutable data but wrapped in a normal js object, eg: ```{data: immutableMap}```

* Chrome dev tool extensions are useful and pretty.  Overview of Chrome DevTools [here](https://developer.chrome.com/devtools).  Some useful DevTool extensions: [Immutable.js Object formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog), and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

* Redux doesn't like you queuing new actions from inside a reducer.  Dispatching a state changing action from within a reducer might mean changing the state in the middle of a reducer call which could do weird things, but you'd expect there to be an easy way to pass back one or more actions to be handled immediately after the current one finishes.  After all that is what Elm (one of the inspiriations for redux) does.  There are a number of different ways of dealing with this.  [redux-thunk](https://github.com/gaearon/redux-thunk) seems popular, [redux-loop](https://github.com/redux-loop/redux-loop) seems closer to Elm.  There's some other solutions offered, like redux-saga which is probably too much, and [this](https://lazamar.github.io/dispatching-from-inside-of-reducers/), but that isn't an npm package.

* The way I did this, it seems like there is a lot of game logic mixed in with (what I think is) display code.  I'm not totally comfortable with that, but I didn't see an obvious better way.  If it works I'll leave it be for now.  Could it be avoided using Elm or reagent/re-frame in cljs?  For reference: [Elm lang](http://elm-lang.org/) and also [re-frame](https://github.com/Day8/re-frame) and a [doc](https://purelyfunctional.tv/guide/re-frame-building-blocks/) about it.

* I believe redux dev tools that track actions can slow things down if there is an action every rAF.  Either way, try hiding that if there are performance issues.  If performance issues persist, then it may just be that my usage of redux is to slow for this type of game.

* On the topic of redux being too slow, I encountered [this](https://reactrocket.com/post/react-redux-optimization/) article.  It includes links to two libraries that try to mimic good things from functional languages.  [reselect](https://github.com/reactjs/reselect) has some commonalities with re-frame's subscriptions, and [ramda](http://ramdajs.com/) has some higher order functions that act on immutable data structures. Ramda has a [cookbook](https://github.com/ramda/ramda/wiki/Cookbook) with suggestions on how to use it as well.  Unfortunately, Ramda does NOT integrate with ImmutableJs, so probably not useful here (reselect still might be though).

* Some other maybe useful chrome extensions: [Github Repo Size viewer](https://chrome.google.com/webstore/detail/github-repository-size/apnjnioapinblneaedefcnopcjepgkci), and [Github Repo Tree viewer "Octotree"](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

* If you want to have react components with local state that persists between renders, use this.setState({}) to put it in that component's this.state object.  This was necessary to keep game-component.jsx's canvas context from being emptied.

* If you use redux' combineReducers, then the different reducers don't have access to one another's state.  I was planning on having separate reducers for handle the tick actions (undoably update an immutable map) and for handling user key presses (store active keys in a mutable object).  But the tick reducer would need access to the current key state.  Redux is aware of this stumblingn block, see [discussion](http://redux.js.org/docs/faq/Reducers.html#reducers-share-state.) Middleware?

* I handled the above issue by having the keys object be part of the tick action and have that passed into the reducer that way.  Works.

* I actually kind of like nesting ternary expressions, that is code like: ```isColliding() ? die() : bang ? makeBullet() : return``` which is basically a more concise way of writing ```if () {} else if () {} else {}```  My eslint doesn't like it though, I assume because it can be confusing, but I've had some practice reading code composed of punctuation.  I'll leave it in a couple places and see if I agree that it's confusing when I come back to it later.

* In asteroids you have to write code that collides bullets with asteroids and remove items from both lists if they collide.  Using mutable data structures, you probably have objects representing both items, and you can just set a kill flag and cull them later.  Using immutable objects you need to be more clever.  In Elm, which enforced purity to a high degree, we wrote a function that would return a list of all colliding pairs.  In this case, I was able to write a pair of nested filter loops that would call side effects if needed.  This isn't ideal: we're filter looping over the second list many times.  Consider better approaches in the future.


## TODO

* Previously I used a graphics library (Elm) or drawing sprites onto the canvas (CoffeeScript).  The plan for this is to go the sprites on canvas route first, but then perhaps change them to using the canvas' path methods.  SVGs in react are another option to consider.

* An asteroids game doesn't really benefit much from being written in react/redux using immutable data structures (even if the undo/time travel is kind of neat).  If another game is to be done with those libraries, consider something more turn and/or text based.


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

* Rock Calving

* Player-Rock Collisions

* ~~Ships~~

* ~~Ship Spawning~~

* Ship-Rock Collisions

* Explosions

* Rock Loot

* Ship Loot

* Player-Loot Collisions

* FTL Flashes

* Cargo Delivery

* Score

* High Score