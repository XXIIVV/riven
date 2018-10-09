# Ø(Riven)

[Riven](http://wiki.xxiivv.com/Riven) is meant to be the bare minimum to a **flow-based programming framework** (eg: [math](https://rawgit.com/XXIIVV/Riven/master/example.math.html), [parser](https://rawgit.com/XXIIVV/Riven/master/example.parser.html), [conditional](https://rawgit.com/XXIIVV/Riven/master/example.conditional.html)). Nodes have 2 ways of communicating with each other, one is a send/receive pattern, the other, a request/answer pattern.

<img src='https://raw.githubusercontent.com/XXIIVV/Riven/master/PREVIEW.png' width="600"/>

## Selector

You are given a node selection tool `Ø()`, you can type the character with `alt+shift+O`(Alt +0216). If you are on Windows, or cannot easily type this character, try wrapping this function into a character of your choosing, like `function R(a){ return Ø(a); }`.

### Create

`Ø("template").create({x:2,y:2})` will create a **template** node at 2,2. 

### Select

`Ø("template")` will select the **template** node.

### Connect

`Ø("template").connect("parser")` will connect the **template** node to the **parser** node. 

You can also connect to **multiple nodes** at once with `Ø("template").connect(["parser","console"])`. The `Ø("template").bind("parser")` will create both a **connection and a syphon** between the 2 nodes.

## Communication

### .Bang()

`Ø("template").bang()` will send *true* to all receiving connected nodes.

### .Send()

`Ø("template").send("hello")` will send *"hello"* to all receiving connected nodes.

### .Receive()

`Ø("template").receive("hello")` will receive *"hello"*, method is triggered by send().

### .Request()

`Ø("template").request("cake")` will request *"cake"* from all answering connected nodes.

### .Answer()

`Ø("template").answer("cake")` will answer for *"cake"*, method is triggered by request().

### .Signal()

To signal a target connected receiving/answering node, use `Ø("template").signal("parser").send("hello")`.

## Mesh

You can group nodes into scopes with `.mesh()`, it visually groups the nodes into a single element that can be moved as one.

```
Ø("template").mesh({x:2,y:2},[
  Ø("parser").create({x:1,y:2}),
  Ø("header").create({x:2,y:3})
])
```

# That's it!

This framework does nothing else, but it does this well.

Enjoy.
