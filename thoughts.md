

## Considerations

This is a learning project, so not everything may be best practice, or the best way to do things.  The goal was to practice with javascript es6, react, and redux.


## Anticipated Questions

* What is this?  This is basically a re-make of an earlier learning project I wrote in Elm, [link](https://github.com/bobgeis/LookOutSpaceRocks), but in javascript using js libraries instead.

* Why are you making a game like asteroids using immutable data structures? I wanted practice programming in javascript, but also using react, redux, and immutable data structures.  I'd like to use redux-undo in a game mechanic as well.

* Isn't that really inefficient? Yes probably, lots of garbage will be generated every frame, but if the browser has fast enough garbage collection (eg Chrome) then it should run reasonably and be playable.


## Architecture

* index.html loads the bundle produced by webpack
* index.jsx is the entry point for webpack so everying must start there.  It creates the redux store, and renders the app using the react-redux Provider and the Game component.
* containers/game.js contains the game.jsx component and passes it props and actions.
* components/game.jsx contains the canvas and other UI elements.


## Things Learned

* By default, React components do not accept Immutable data structures (like Maps) as props, and will throw an error.  This is a little surprising considering how much React/Redux promote the use of such data structures.  Apparently a common work-around is to pass the immutable data but wrapped in a normal js object, eg: ```{data: immutableMap}```

* Chrome dev tool extensions are useful and pretty.  Overview of Chrome DevTools [here](https://developer.chrome.com/devtools).  Some useful DevTool extensions: [Immutable.js Object formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog), and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

* Redux doesn't like you queuing new actions from inside a reducer.  Dispatching a state changing action from within a reducer might mean changing the state in the middle of a reducer call which could do weird things, but you'd expect there to be an easy way to pass back one or more actions to be handled immediately after the current one finishes.  After all that is what Elm (one of the inspiriations for redux) does.  There are a number of different ways of dealing with this.  [redux-thunk](https://github.com/gaearon/redux-thunk) seems popular, [redux-loop](https://github.com/redux-loop/redux-loop) seems closer to Elm.  There's some other solutions offered, like redux-saga which is probably too much, and [this](https://lazamar.github.io/dispatching-from-inside-of-reducers/), but that isn't an npm package.

* The way I did this, it seems like there is a lot of game logic mixed in with (what I think is) display code.  I'm not totally comfortable with that, but I didn't see an obvious better way.  If it works I'll leave it be for now.  Could it be avoided using Elm or reagent/re-frame in cljs?  For reference: [Elm lang](http://elm-lang.org/) and also [re-frame](https://github.com/Day8/re-frame) and a [doc](https://purelyfunctional.tv/guide/re-frame-building-blocks/) about it.

* Call console.log every rAF can slow things down.  I believe redux dev tools that track actions can also do this if there is an action every rAF.  Either way, try turning limiting those if there are performance issues.  If performance issues persist, then it may just be that my usage of redux is to slow for this type of game.  If that is the case, consider making a simple civ-in-space game like Mast of Orion.

* On the topic of redux being too slow, I encountered [this](https://reactrocket.com/post/react-redux-optimization/) article.  It includes links to two libraries that try to mimic good things from functional languages.  [reselect](https://github.com/reactjs/reselect) has some commonalities with re-frame's subscriptions, and [ramda](http://ramdajs.com/) has some higher order functions that act on immutable data structures. Ramda has a [cookbook](https://github.com/ramda/ramda/wiki/Cookbook) with suggestions on how to use it as well.  Unfortunately, Ramda does NOT integrate with Immutable, so probably not useful here (reselect still might be though).

* Some other maybe useful chrome extensions: [Github Repo Size viewer](https://chrome.google.com/webstore/detail/github-repository-size/apnjnioapinblneaedefcnopcjepgkci), and [Github Repo Tree viewer "Octotree"](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

* If you want to have react components with local state that persists between renders, use this.setState({}) to put it in that component's this.state object.  This was necessary to keep game.jsx's canvas context from being emptied.

## TODO
