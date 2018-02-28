# Riven

Riven is meant to be the bare minimum to a flow-based programming framework. Nodes have 2 ways of communicating with each other, one is a send/receive pattern, the other, a request/awnser pattern.

## Selector

You are given a node selection tool `Ø()`, you can type the character with `alt+shift+O`.

### Selecting a node

`Ø("template")` will select the template node.

### Selecting a port

`Ø("template output")` will select the output port of the template node.

### Creating a basic node

`Ø("parser").create()` will create a new node at 0,0. 

### Creating a custom node

`Ø("parser").cast(ParserNode)` will create a *ParserNode* at 0,0.

### Connecting nodes

`Ø("template").connect("parser")` will connect the *template* node to the *parser* node. You can also connect to multiple nodes at once with `Ø("template").connect(["parser","console"])`. The `Ø("template").connect("parser")` command is equivalent to `Ø("template output").connect("parser input")`, and the `Ø("template").connect("parser", ROUTE_TYPES.template)` is equivalent to `Ø("template request").connect("parser answer")`.

## Communication

TODO..