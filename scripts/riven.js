// NETWORK MANAGER

var PORT_TYPES = {default:"default",input:"input",output:"output",request:"request",answer:"answer"}
var ROUTE_TYPES = {default:"default",request:"request"}

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

  this.cast = function(type,rect)
  {
    var node = new type(this.id,rect)  
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

  this.install = function(port_id,port_type)
  {
    this.ports.push(new Port(this,port_id,port_type))
  }

  this.query = function(q)
  {
    console.log(`${this.id} transit`,q)
    var port = this.port("out")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.port.host.query(q)  
      }
    }
  }

  this.broadcast = function(payload)
  {
    for(port_id in this.ports){
      this.ports[port_id].broadcast(payload);
    }
  }

  this.request = function(node)
  {
    console.log("Leeching")
  }

  this.answer = function(query)
  {
    return "missing answer"
  }

  this.bang = function()
  {
    this.query(true)
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
      this.routes.push({type:type,port:Ø(b)})
      // Ø(b).routes.push({type:type,port:this})
    }

    this.broadcast = function(payload) // Send to all routes
    {
      // if(this.port_type != PORT_TYPES.output){ return; }
      for(route_id in this.routes){
        var route = this.routes[route_id];
        if(!route){ continue; }
        route.port.host.query(payload)  
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

    this.signal = function(target,q)
    {
      for(route_id in this.routes){
        var route = this.routes[route_id];
        if(route.port.host.id == target){
          return route.port.host
        }
      }
      return null;
    }
  }
}

function Mesh(id,rect) 
{
  Node.call(this,id,rect);

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