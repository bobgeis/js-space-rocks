

## Considerations

This is a learning project, so not everything may be best practice, or the best way to do things.


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

* Chrome dev tool extensions are useful and pretty.  Overview of Chrome DevTools [here](https://developer.chrome.com/devtools).  Some useful DevTool extensions: Immutable.js Object formatter [link](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog), and Redux DevTools [link](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)


## TODO
