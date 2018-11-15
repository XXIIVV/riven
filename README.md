# Ø(Riven)

[Riven](http://wiki.xxiivv.com/Riven) is a bare minimum **flow-based programming framework** (eg: [math](https://rawgit.com/XXIIVV/Riven/master/example.math.html) & [conditional](https://rawgit.com/XXIIVV/Riven/master/example.conditional.html)). Nodes have 2 ways of communicating with each other, one is a `send/receive` pattern, the other, a `request/answer` pattern. Despite its minimal toolset, it can be expanded into a complete [web framework](http://wiki.xxiivv.com/riven.html).

<img src='https://raw.githubusercontent.com/XXIIVV/Riven/master/PREVIEW.png' width="600"/>

## The Ø Selector

You are given a node selection tool `Ø()`, you can type the character with `alt+shift+O`(Alt +0216). If you are on Windows, or cannot easily type this character, try wrapping this function into a character of your choosing, like `function R(a){ return Ø(a); }`.

### Create a node

`Ø("template").create({x:2,y:2})` will create a **template** node at 2,2. 

### Select a node

`Ø("template")` will select the **template** node.

### Connect a node

`Ø("template").connect("parser")` will connect the **template** node to the **parser** node. 

You can also connect to **multiple nodes** at once with `Ø("template").connect(["parser","console"])`. The `Ø("template").bind("parser")` will create both a **connection and a syphon** between the 2 nodes.

## Communication

### .Send()

`Ø("template").send("hello")` will send *"hello"* to all receiving connected nodes.

### .Receive()

`Ø("template").receive(q) => {}`, method is triggered by send().

### .Request()

`Ø("template").request("cake")` will request *"cake"* from all answering connected nodes.

### .Answer()

`Ø("template").answer("cake")`, method is triggered by request().

## Extras

### .Bang()

`Ø("template").bang()`, is a convenience method equivalent to `.send(true)`, will send *true* to all receiving connected nodes.

### .Signal()

Looks for a connected node(receiving/answering) with the parameter id, `Ø("template").signal("parser").send("hello")`. Will send *"hello"*, directly to the *parser* node.

### Mesh

You can group nodes into scopes with `.mesh(pos,[nodes])` to visually groups the nodes into a single element that can be moved as one.

```
Ø("template").mesh({x:2,y:2},[
  Ø("parser").create({x:1,y:2}),
  Ø("header").create({x:2,y:3})
])
```

# That's it!

This framework does nothing else, but it does this well.

Enjoy.
