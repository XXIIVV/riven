// NETWORK MANAGER

function Riven()
{
  var grid_size = 20;
  this.network = {}; // root:new Node(null,"root",{x:0,y:0,w:300,h:200})

  this.inject = function(node)
  {
    this.network[node.id] = node
    node.setup();
  }

  this.create = function(name,rect)
  {
    var node = new Node(name,rect)
    this.network[name] = node
    node.setup();
  }

  this.clone = function(name,rect,type)
  {
    var node = new type(name,rect)  
    this.network[name] = node
    node.setup();
  }

  this.connect = function(a,b)
  {
    var node_a = this.network[a.id]
    var port_a = node_a.ports.out[a.port] ? node_a.ports.out[a.port] : node_a.ports.in[a.port];
    if(!node_a){ console.warn(`Unknown node: ${a.id}`); return;}
    if(!port_a){ console.warn(`Unknown port: ${a.port}`); return;}
    var node_b = this.network[b.id]
    var port_b = node_b.ports.in[b.port] ? node_b.ports.in[b.port] : node_b.ports.out[b.port];
    if(!node_b){ console.warn(`Unknown node: ${b.id}`); return;}
    if(!port_b){ console.warn(`Unknown port: ${b.port}`); return;}
    port_a.connect(port_b);
  }

  this.bang = function(a)
  {
    this.network[a].bang();
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

function Node(id,rect={x:0,y:0,w:5,h:5},ports=[])
{
  this.id = id;
  this.ports = ports
  this.rect = rect;
  this.rect.w = this.rect.w ? this.rect.w : 0
  this.rect.h = this.rect.h ? this.rect.h : 0

  this.setup = function()
  {
    this.ports.push(new Port(this,"in"))
    this.ports.push(new Port(this,"out"))
    this.rect.w = this.rect.w ? this.rect.w : 0
    this.rect.h = this.rect.h ? this.rect.h : 0
  }

  this.create = function(rect)
  {
    this.rect = rect
    RIVEN.inject(this)
  }

  this.cast = function(type,rect)
  {
    var node = new type(this.id,rect)  
    RIVEN.inject(node);
  }

  this.connect = function(q)
  {
    this.port("in").connect(Ø(`${q} o`));
  }

  this.install = function(port_id)
  {
    this.ports.push(new Port(this,port_id))
  }

  this.query = function(q)
  {
    console.log(`${this.id} transit ${q}`)
    var port = this.port("out")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.port.host.query(q)  
      }
    }
  }

  this.bang = function()
  {
    console.log(`${this.id} bang!`)
    var port = this.port("out")
    if(!port){ return; }
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.port.host.bang()  
      }
    }    
  }

  this.port = function(target)
  {
    for(id in this.ports){
      var port = this.ports[id];
      if(port.id == target){ return port; }
    }
  }

  function Port(host,id)
  {
    this.host = host;
    this.id = id;
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
    }
  }
}