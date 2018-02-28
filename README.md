# Ø(Riven)

Riven is meant to be the bare minimum to a flow-based programming framework. Nodes have 2 ways of communicating with each other, one is a send/receive pattern, the other, a request/answer pattern.

## Selector

You are given a node selection tool `Ø()`, you can type the character with `alt+shift+O`.

### Selecting a node

`Ø("template")` will select the template node.

### Selecting a port

`Ø("template output")` will select the output port of the template node.

## Node

### Creating a basic node

`Ø("parser").create()` will create a new node at 0,0. 

### Creating a custom node

`Ø("parser").cast(ParserNode)` will create a **ParserNode** at 0,0.

### Connecting nodes

`Ø("template").connect("parser")` will connect the **template** node to the **parser** node. You can also connect to multiple nodes at once with `Ø("template").connect(["parser","console"])`. 

The `Ø("template").connect("parser")` command is equivalent to `Ø("template output").connect("parser input")`, and the `Ø("template").connect("parser", ROUTE_TYPES.template)` is equivalent to `Ø("template request").connect("parser answer")`.

### Meshing nodes

You can group nodes into scopes with `.mesh()`, it visually groups the nodes into a single element that can be moved as one.

```
Ø("template").mesh({x:2,y:2},[
  Ø("parser").create({x:1,y:2}),
  Ø("header").create({x:2,y:3})
])
```

## Communication

### Bang()

`Ø("template").bang()` will send *true* to all receiving connected nodes.

### Send()

`Ø("template").send("hello")` will send *"hello"* to all receiving connected nodes.

### Receive()

`Ø("template").receive("hello")` will receive *"hello"*, method is triggered by send().

### Request()

`Ø("template").request("cake")` will request *"cake"* from all answering connected nodes.

### Answer()

`Ø("template").answer("cake")` will answer for *"cake"*, method is triggered by request().

### Signal()

To signal a target connected receiving/answering node, use `Ø("template").signal("parser").send("hello")`.

# That's it!

This framework does nothing else, but it does this well.
Enjoy.

