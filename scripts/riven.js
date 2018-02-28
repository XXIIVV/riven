
// Don't forget, the portal combination's in my journal. Good luck. — Catherine
// NETWORK MANAGER

function Riven()
{
  this.network = {}

  this.add = function(node)
  {
    node.setup();
    this.network[node.id] = node
  }
}

// QUERY

function Ø(s,network = RIVEN.network)
{
  if(s.indexOf(" ") > -1){
    var node_id = s.split(" ")[0];
    var port_id = s.split(" ")[1];
    return network[node_id] && network[node_id].port(port_id) ? network[node_id].port(port_id) : null;
  }
  else if(network[s]){
    return network[s];
  }
  else{
    return new Node(s);
  }
}

// NODE

function Node(id,rect={x:0,y:0,w:2,h:2},ports=[])
{
  this.glyph = "M150,60 L150,60 L60,150 L150,240 L240,150 Z"
  this.id = id;
  this.ports = ports
  this.rect = rect;
  this.rect.w = this.rect.w ? this.rect.w : 0
  this.rect.h = this.rect.h ? this.rect.h : 0
  this.parent = null;
  this.children = [];

  this.setup = function()
  {
    this.ports.push(new Port(this,"out",PORT_TYPES.output))
    this.ports.push(new Port(this,"in",PORT_TYPES.input))
    this.ports.push(new Port(this,"answer",PORT_TYPES.answer))
    this.ports.push(new Port(this,"request",PORT_TYPES.request))
    this.rect.w = this.rect.w ? this.rect.w : 0
    this.rect.h = this.rect.h ? this.rect.h : 0
  }

  this.create = function(pos)
  {
    this.rect.x = pos.x
    this.rect.y = pos.y
    RIVEN.add(this);
    return this
  }

  this.cast = function(type,pos)
  {
    var node = new type(this.id,rect)  
    this.rect.x = pos.x
    this.rect.y = pos.y
    RIVEN.add(node);
    return node
  }

  this.mesh = function(pos,n)
  {
    var node = new Mesh(this.id,pos)  
    node.rect.x = pos.x
    node.rect.y = pos.y
    RIVEN.add(node);

    if(n instanceof Array){
      for(id in n){
        n[id].parent = node;
        node.children.push(n[id]);  
        node.update();
      }
    }
    else{
      n.parent = node;
      node.children.push(n);  
      node.update();
    }
    return node;
  }

  this.connect = function(q,type)
  {
    if(q instanceof Array){
      for(id in q){
        this.connect(q[id],type)
      }
    }
    else{
      this.port(type == ROUTE_TYPES.request ? "request" : "out").connect(`${q} ${type == ROUTE_TYPES.request ? "answer" : "in"}`,type);  
    }
  }

  this.signal = function(target,q)
  {
    console.log("signal")
    for(port_id in this.ports){
      var port = this.ports[port_id]
      console.log(port)
      for(route_id in port.routes){
        var route = port.routes[route_id];
        console.log(route)
        // if(route.host.id == target){
        //   return route.port.host
        // }
      }
    }
    return null;
  }

  // SEND/RECEIVE

  this.bang = function()
  {
    console.log(`${this.id} bang!`)
    this.send(true)
  }

  this.send = function(payload)
  {
    console.log(`${this.id} sends`,payload)
    this.port("out").send(payload)
  }
  
  this.receive = function(q)
  {
    console.log(`${this.id} receives`,q)
    var port = this.port("out")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.host.receive(q)  
      }
    }
  }

  // REQUEST/ANSWER

  this.request = function(q)
  {
    var payload = {};
    var port = this.port("request")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        payload[route.host.id] = route.host.answer(q)
      }
    }
    return payload
  }

  this.answer = function(q)
  {
    return this.request(q)
  }

  //

  

  this.install = function(port_id,port_type)
  {
    this.ports.push(new Port(this,port_id,port_type))
  }


  this.port = function(target)
  {
    for(id in this.ports){
      var port = this.ports[id];
      if(port.id == target){ return port; }
    }
    console.warn(`Unknown "${target}" port for ${this.id}.`,this,this.ports)
  }

  function Port(host,id,type = PORT_TYPES.default)
  {
    this.host = host;
    this.id = id;
    this.type = type;
    this.routes = [];

    this.pos = function()
    {
      var x = this.host.rect.x*grid_size;
      var y = this.host.rect.y*grid_size;
      var w = this.host.rect.w*grid_size;
      var h = this.host.rect.h*grid_size;
      var spacing = h/(this.ports.in.length)
      return {x:x,y:y+(id*spacing)+(spacing/2)}; 
    }

    this.connect = function(b,type = "transit")
    {
      this.routes.push(Ø(b))
      // Ø(b).routes.push({type:type,port:this})
    }

    this.send = function(payload) // Send to all routes
    {
      console.log(this)
      if(this.type != PORT_TYPES.output){ return; }
      for(route_id in this.routes){
        var route = this.routes[route_id];
        if(!route){ continue; }
        route.host.receive(payload)
      }
    }

    this.request = function(target,q)
    {
      for(route_id in this.routes){
        var route = this.routes[route_id];
        if(!route || route.type != ROUTE_TYPES.request){ continue; }
        if(route.port.host.id == target){
          return route.port.host.answer()
        }
      }
      return null;
    }
  }
}

function Mesh(id,rect) 
{
  Node.call(this,id,rect);

  this.is_mesh = true;

  this.setup = function()
  {
  }

  this.update = function()
  {
    var bounds = {x:0,y:0};
    for(id in this.children){
      var node = this.children[id];
      bounds.x = node.rect.x > bounds.x ? node.rect.x : bounds.x
      bounds.y = node.rect.y > bounds.y ? node.rect.y : bounds.y
    }
    this.rect.w = bounds.x+4;
    this.rect.h = bounds.y+5;
  }
}

var PORT_TYPES = {default:"default",input:"input",output:"output",request:"request",answer:"answer"}
var ROUTE_TYPES = {default:"default",request:"request"}
var NODE_GLYPHS = {
  router:"M60,60 L60,60 L240,60 M120,120 A30,30 0 0,1 150,150 M150,150 A30,30 0 0,0 180,180 M180,180 L180,180 L240,180 M120,120 L120,120 L60,120 M60,240 L60,240 L240,240 M240,120 L240,120 L180,120 M60,180 L60,180 L120,180",
  entry:"M60,150 L60,150 L240,150 L240,150 L150,240 M150,60 L150,60 L240,150"
}